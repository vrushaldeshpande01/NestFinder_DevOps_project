# NestFinder AWS EKS Deployment Guide

## Quick Architecture Overview

```
GitHub (Source Code)
    ↓
Jenkins (CI/CD Orchestration)
    ├─ Build: npm install && npm run build
    ├─ Test: npm run lint
    └─ Containerize: docker build & push to ECR
    ↓
AWS ECR (Container Registry)
    ↓
ArgoCD (GitOps & Deployment)
    ├─ Watches ECR for new images
    ├─ Updates K8s manifests
    └─ Syncs to EKS cluster
    ↓
AWS EKS Cluster
    ├─ Deployment (manages 2-5 pods)
    ├─ Service (internal traffic)
    ├─ Ingress (ALB routing)
    ├─ ConfigMap (app config)
    └─ Secret (API keys)
    ↓
AWS ALB (Load Balancer)
    ↓
Internet (Users access via DNS)
```

---

## Part 1: Phase 1 - Infrastructure Setup (Terraform/AWS CLI)

### Prerequisites
- AWS CLI configured with credentials
- Terraform installed (or AWS Console)
- kubectl configured
- Helm installed

### 1.1 Create EKS Cluster

```bash
# Using AWS CLI
export CLUSTER_NAME="nestfinder-cluster"
export AWS_REGION="us-east-1"
export NODE_ROLE_ARN="arn:aws:iam::123456789012:role/eks-node-role"
export CLUSTER_ROLE_ARN="arn:aws:iam::123456789012:role/eks-cluster-role"

# Create EKS cluster
aws eks create-cluster \
  --name $CLUSTER_NAME \
  --version 1.28 \
  --role-arn $CLUSTER_ROLE_ARN \
  --resources-vpc-config subnetIds=subnet-xxxxx,subnet-yyyyy \
  --region $AWS_REGION \
  --logging '{"clusterLogging":[{"enabled":true,"types":["api","audit","authenticator","controllerManager","scheduler"]}]}'

# Wait for cluster to be ACTIVE (takes ~10-15 minutes)
aws eks describe-cluster --name $CLUSTER_NAME --region $AWS_REGION \
  --query 'cluster.status' --output text
```

### 1.2 Create Node Group

```bash
export NODE_GROUP_NAME="nestfinder-nodes"
export NODE_ROLE_ARN="arn:aws:iam::123456789012:role/eks-node-role"

# Create node group
aws eks create-nodegroup \
  --cluster-name $CLUSTER_NAME \
  --nodegroup-name $NODE_GROUP_NAME \
  --role-arn $NODE_ROLE_ARN \
  --scaling-config minSize=2,maxSize=5,desiredSize=2 \
  --instance-types t3.medium \
  --region $AWS_REGION

# Verify node group
aws eks describe-nodegroup \
  --cluster-name $CLUSTER_NAME \
  --nodegroup-name $NODE_GROUP_NAME \
  --region $AWS_REGION
```

### 1.3 Configure kubectl Access

```bash
# Update kubeconfig to access the cluster
aws eks update-kubeconfig \
  --region $AWS_REGION \
  --name $CLUSTER_NAME

# Verify cluster access
kubectl cluster-info
kubectl get nodes
```

### 1.4 Create ECR Repository

```bash
export ECR_REPO="nestfinder/nestfinder-app"

# Create ECR repository
aws ecr create-repository \
  --repository-name $ECR_REPO \
  --region $AWS_REGION \
  --image-scanning-configuration scanOnPush=true \
  --encryption-configuration encryptionType=AES

# Get repository URL
ECR_URL=$(aws ecr describe-repositories \
  --repository-names $ECR_REPO \
  --region $AWS_REGION \
  --query 'repositories[0].repositoryUri' \
  --output text)

echo "ECR Repository: $ECR_URL"
```

### 1.5 Create Namespaces & Secrets

```bash
# Create namespace
kubectl create namespace nestfinder

# Create secret for Gemini API key
kubectl create secret generic gemini-api-key \
  --from-literal=GEMINI_API_KEY='your-actual-api-key-here' \
  -n nestfinder

# Verify secret
kubectl get secrets -n nestfinder
```

---

## Part 2: Phase 2 - Kubernetes & Observability Setup

### 2.1 Install AWS Load Balancer Controller

```bash
# Add the EKS chart repo
helm repo add eks https://aws.github.io/eks-charts
helm repo update

# Create IAM policy for ALB controller
curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.6.0/docs/install/iam_policy.json

aws iam create-policy \
  --policy-name AWSLoadBalancerControllerIAMPolicy \
  --policy-document file://iam_policy.json

# Create IRSA (IAM Role for Service Account)
eksctl create iamserviceaccount \
  --cluster=$CLUSTER_NAME \
  --namespace=kube-system \
  --name=aws-load-balancer-controller \
  --role-name AWSLoadBalancerControllerRole \
  --attach-policy-arn=arn:aws:iam::123456789012:policy/AWSLoadBalancerControllerIAMPolicy \
  --approve

# Install ALB controller via Helm
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=$CLUSTER_NAME \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller
```

### 2.2 Install Prometheus for Metrics Collection

```bash
# Add Prometheus Helm repo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install Prometheus Operator
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --values - <<EOF
prometheus:
  prometheusSpec:
    retention: 7d
    storageSpec:
      volumeClaimTemplate:
        spec:
          accessModes: ["ReadWriteOnce"]
          resources:
            requests:
              storage: 10Gi

grafana:
  adminPassword: admin123
  persistence:
    enabled: true
    size: 5Gi

alertmanager:
  alertmanagerSpec:
    storage:
      volumeClaimTemplate:
        spec:
          accessModes: ["ReadWriteOnce"]
          resources:
            requests:
              storage: 5Gi
EOF
```

### 2.3 Install Grafana Dashboard

```bash
# Grafana is already installed in the step above
# Get Grafana admin password
kubectl get secret prometheus-grafana -n monitoring \
  -o jsonpath="{.data.admin-password}" | base64 --decode

# Port-forward to access Grafana
kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80

# Access: http://localhost:3000
# Default user: admin
# Password: <from above>
```

### 2.4 Install ArgoCD for GitOps

```bash
# Create argocd namespace
kubectl create namespace argocd

# Install ArgoCD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Wait for ArgoCD to be ready
kubectl rollout status deployment/argocd-server -n argocd

# Get ArgoCD admin password
ARGOCD_PASSWORD=$(kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d)

echo "ArgoCD Password: $ARGOCD_PASSWORD"

# Port-forward to access ArgoCD UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Access: http://localhost:8080
# Default user: admin
# Password: <from above>
```

---

## Part 3: Phase 3 - Jenkins Pipeline Setup

### 3.1 Create Jenkins Job

```bash
# SSH into Jenkins server
ssh -i jenkins-key.pem ec2-user@jenkins-server-ip

# Create Jenkins job directory
mkdir -p /var/lib/jenkins/jobs/nestfinder-devops

# Create Jenkins job config (XML)
# This would be created via Jenkins UI or seed job

# Alternative: Using Jenkins CLI
java -jar jenkins-cli.jar \
  -s http://localhost:8080 \
  create-job nestfinder-devops < job-config.xml
```

### 3.2 Configure GitHub Webhook

```bash
# In GitHub repository settings:
# 1. Go to Settings > Webhooks
# 2. Add webhook:
#    - Payload URL: http://jenkins-server/github-webhook/
#    - Content type: application/json
#    - Events: push, pull_request
#    - Active: ✓

# Or via GitHub CLI:
gh repo webhook add \
  --url http://jenkins-server/github-webhook/ \
  --events push,pull_request \
  --active
```

### 3.3 Configure Jenkins Credentials

```bash
# Jenkins Dashboard > Manage Jenkins > Manage Credentials
# Add credentials:
# 1. AWS ECR Credentials:
#    - Username: AWS_ACCESS_KEY_ID
#    - Password: AWS_SECRET_ACCESS_KEY
#    - ID: aws-ecr-credentials

# 2. GitHub Personal Access Token:
#    - Kind: Username with password
#    - Username: your-github-username
#    - Password: github_pat_xxxxx
#    - ID: github-credentials
```

### 3.4 Trigger First Build

```bash
# Option 1: Push code to trigger webhook
git push origin main

# Option 2: Trigger manually via Jenkins UI
# Jenkins Dashboard > nestfinder-devops > Build Now

# Watch build logs
# Jenkins Dashboard > nestfinder-devops > <Build #> > Console Output
```

---

## Part 4: Phase 4 - Deploy NestFinder to EKS

### 4.1 Apply Kubernetes Manifests

```bash
# Create namespace
kubectl create namespace nestfinder

# Create secret for Gemini API key
kubectl create secret generic gemini-api-key \
  --from-literal=GEMINI_API_KEY='your-api-key' \
  -n nestfinder

# Apply all manifests
kubectl apply -f kubernetes-manifests.yaml

# Verify resources created
kubectl get all -n nestfinder
```

### 4.2 Verify Deployment Status

```bash
# Check deployment status
kubectl get deployment nestfinder -n nestfinder

# Check pods
kubectl get pods -n nestfinder
kubectl describe pod <pod-name> -n nestfinder

# Check service
kubectl get svc nestfinder-service -n nestfinder

# Check ingress
kubectl get ingress -n nestfinder
```

### 4.3 Get ALB Endpoint

```bash
# Wait for ALB to be provisioned (takes ~2-3 minutes)
kubectl get ingress -n nestfinder -w

# Get ALB DNS name
ALB_DNS=$(kubectl get ingress nestfinder-ingress -n nestfinder \
  -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')

echo "NestFinder URL: http://$ALB_DNS"
```

### 4.4 Test Application Health

```bash
# Check pod logs
kubectl logs -n nestfinder deployment/nestfinder --tail=50

# Port-forward to test locally
kubectl port-forward -n nestfinder svc/nestfinder-service 3000:80

# Test API endpoint
curl http://localhost:3000/

# Test chat API
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Find me a PG in Bangalore", "history": []}'
```

---

## Part 5: Monitoring & Observability

### 5.1 View CloudWatch Logs

```bash
# Stream logs from all pods
kubectl logs -f -n nestfinder deployment/nestfinder

# View specific pod logs
kubectl logs -n nestfinder <pod-name> --tail=100

# View logs from previous crashed pod
kubectl logs -n nestfinder <pod-name> --previous
```

### 5.2 Check Prometheus Metrics

```bash
# Port-forward to Prometheus
kubectl port-forward -n monitoring svc/prometheus-operated 9090:9090

# Access: http://localhost:9090
# Query examples:
# - up{job="nestfinder"}
# - rate(http_requests_total[5m])
# - container_cpu_usage_seconds_total
```

### 5.3 Create Grafana Dashboards

```bash
# Login to Grafana: http://localhost:3000
# 1. Add Prometheus data source (http://prometheus-operated:9090)
# 2. Import dashboard:
#    - ID: 6417 (Kubernetes Cluster Monitoring)
#    - ID: 1860 (Node Exporter)
# 3. Create custom dashboard for NestFinder metrics
```

### 5.4 Set Up Alerts

```bash
# Create AlertManager rules (Prometheus)
kubectl apply -f - <<EOF
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: nestfinder-alerts
  namespace: monitoring
spec:
  groups:
  - name: nestfinder
    interval: 30s
    rules:
    - alert: NestFinderHighErrorRate
      expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
      for: 5m
      annotations:
        summary: "High error rate on NestFinder"
    
    - alert: NestFinderPodDown
      expr: up{job="nestfinder"} == 0
      for: 2m
      annotations:
        summary: "NestFinder pod is down"
EOF
```

---

## Part 6: Auto-Scaling Configuration

### 6.1 Horizontal Pod Autoscaler (HPA)

```bash
# HPA is already defined in kubernetes-manifests.yaml
# View HPA status
kubectl get hpa -n nestfinder

# Watch HPA scaling in action
kubectl get hpa -n nestfinder -w

# Check current metrics
kubectl get hpa nestfinder-hpa -n nestfinder -o wide
```

### 6.2 Cluster Autoscaler (Optional)

```bash
# Install Cluster Autoscaler
helm repo add autoscaler https://kubernetes.github.io/autoscaler
helm repo update

helm install cluster-autoscaler autoscaler/cluster-autoscaler \
  --namespace kube-system \
  --set autoDiscovery.clusterName=$CLUSTER_NAME \
  --set awsRegion=$AWS_REGION \
  --set rbac.serviceAccount.annotations."eks\.amazonaws\.com/role-arn"=arn:aws:iam::123456789012:role/cluster-autoscaler-role
```

---

## Part 7: Security Best Practices

### 7.1 Enable Pod Security Policies

```bash
# View current pod security policies
kubectl get psp

# Apply security policies (already in manifests)
kubectl apply -f kubernetes-manifests.yaml
```

### 7.2 Enable Network Policies

```bash
# Verify NetworkPolicy is applied
kubectl get networkpolicy -n nestfinder

# Test network connectivity
kubectl exec -it <pod-name> -n nestfinder -- curl http://nestfinder-service/
```

### 7.3 Rotate Secrets

```bash
# Update API key in secret
kubectl patch secret gemini-api-key -n nestfinder \
  -p '{"data":{"GEMINI_API_KEY":"'$(echo -n 'new-key' | base64)'"}}'

# Restart pods to pick up new secret
kubectl rollout restart deployment/nestfinder -n nestfinder
```

---

## Part 8: Troubleshooting Commands

### 8.1 Debug Pod Issues

```bash
# Check pod status
kubectl describe pod <pod-name> -n nestfinder

# Check resource usage
kubectl top pods -n nestfinder

# Get pod events
kubectl get events -n nestfinder --sort-by='.lastTimestamp'

# SSH into pod
kubectl exec -it <pod-name> -n nestfinder -- /bin/sh
```

### 8.2 Verify Service Connectivity

```bash
# Test service DNS resolution
kubectl exec -it <pod-name> -n nestfinder -- nslookup nestfinder-service.nestfinder.svc.cluster.local

# Test service connectivity
kubectl exec -it <pod-name> -n nestfinder -- curl http://nestfinder-service:80/

# Test external connectivity
kubectl exec -it <pod-name> -n nestfinder -- curl https://generativelanguage.googleapis.com/
```

### 8.3 Check Ingress Configuration

```bash
# Describe ingress
kubectl describe ingress nestfinder-ingress -n nestfinder

# Check ALB logs in CloudWatch
aws logs tail /aws/alb/app/nestfinder --follow

# Test ALB health
curl -v http://<ALB-DNS>/
```

---

## Part 9: Cleanup & Tear Down

### 9.1 Delete NestFinder Application

```bash
# Delete all NestFinder resources
kubectl delete namespace nestfinder

# Delete ArgoCD application (if using)
kubectl delete app nestfinder -n argocd
```

### 9.2 Delete Monitoring Stack (Optional)

```bash
# Delete Prometheus
helm uninstall prometheus -n monitoring

# Delete ArgoCD
kubectl delete namespace argocd
```

### 9.3 Delete EKS Cluster

```bash
# Delete node groups first
aws eks delete-nodegroup \
  --cluster-name $CLUSTER_NAME \
  --nodegroup-name $NODE_GROUP_NAME \
  --region $AWS_REGION

# Wait for nodegroup deletion
aws eks wait nodegroup-deleted \
  --cluster-name $CLUSTER_NAME \
  --nodegroup-name $NODE_GROUP_NAME \
  --region $AWS_REGION

# Delete cluster
aws eks delete-cluster \
  --name $CLUSTER_NAME \
  --region $AWS_REGION

# Delete ECR repository
aws ecr delete-repository \
  --repository-name $ECR_REPO \
  --force \
  --region $AWS_REGION
```

---

## Useful kubectl Shortcuts

```bash
# Namespace shortcuts
k config set-context --current --namespace=nestfinder

# Frequent commands
alias k=kubectl
alias kgp="k get pods -n nestfinder"
alias kgs="k get svc -n nestfinder"
alias klog="k logs -n nestfinder"
alias kdesc="k describe pod -n nestfinder"

# Watch pod creation
watch -n 1 'kubectl get pods -n nestfinder'

# Stream logs from all pods
k logs -f -n nestfinder -l app=nestfinder --all-containers=true
```

---

## Expected Success Indicators

✅ Cluster is ACTIVE
✅ All nodes are Ready
✅ NestFinder pods are Running
✅ Service has ClusterIP assigned
✅ Ingress has ALB endpoint
✅ ALB responds with HTTP 200
✅ /api/chat endpoint returns AI response
✅ Prometheus scraping metrics
✅ Grafana dashboard shows pod metrics
✅ No critical errors in pod logs

---

**Generated for NestFinder DevOps Project | AWS EKS Deployment**
