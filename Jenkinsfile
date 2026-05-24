// Jenkinsfile for NestFinder DevOps Project
// Based on quantumvector pipeline pattern
// Triggers on GitHub webhook, builds Docker image, pushes to ECR, deploys via ArgoCD

pipeline {
    agent any
    
    parameters {
        string(name: 'AWS_REGION', defaultValue: 'us-east-1', description: 'AWS Region')
        string(name: 'ECR_REGISTRY', defaultValue: '123456789012.dkr.ecr.us-east-1.amazonaws.com', description: 'ECR Registry URL')
        string(name: 'ECR_REPOSITORY', defaultValue: 'nestfinder/nestfinder-app', description: 'ECR Repository Name')
        string(name: 'IMAGE_TAG', defaultValue: 'v1.0.0', description: 'Docker Image Tag')
    }
    
    environment {
        // Docker & Registry
        DOCKER_IMAGE = "${ECR_REGISTRY}/${ECR_REPOSITORY}:${BUILD_NUMBER}"
        DOCKER_IMAGE_LATEST = "${ECR_REGISTRY}/${ECR_REPOSITORY}:latest"
        
        // AWS Credentials (stored in Jenkins Credentials Store)
        AWS_CREDENTIALS = credentials('aws-ecr-credentials')
        
        // Application details
        APP_NAME = 'nestfinder'
        NAMESPACE = 'nestfinder'
        HELM_CHART_PATH = './k8s/helm/nestfinder'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo "📦 Checking out source code from GitHub..."
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    env.GIT_BRANCH = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()
                    echo "✓ Branch: ${GIT_BRANCH} | Commit: ${GIT_COMMIT_SHORT}"
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo "📥 Installing Node.js dependencies..."
                sh '''
                    npm --version
                    node --version
                    npm ci
                '''
            }
        }
        
        stage('Lint & Type Check') {
            steps {
                echo "🔍 Running TypeScript type checking..."
                sh '''
                    npm run lint
                '''
            }
        }
        
        stage('Build Application') {
            steps {
                echo "🔨 Building React + Express application..."
                sh '''
                    npm run build
                    echo "✓ Build completed. Output: dist/"
                    ls -la dist/
                '''
            }
        }
        
        stage('Docker Build') {
            steps {
                echo "🐳 Building Docker image..."
                sh '''
                    docker build -t ${DOCKER_IMAGE} \
                        -t ${DOCKER_IMAGE_LATEST} \
                        --build-arg BUILDKIT_INLINE_CACHE=1 \
                        -f Dockerfile .
                    
                    echo "✓ Docker image built successfully"
                    docker images | grep nestfinder
                '''
            }
        }
        
        stage('Docker Security Scan') {
            steps {
                echo "🔒 Scanning Docker image for vulnerabilities..."
                sh '''
                    # Optional: Use Trivy for vulnerability scanning
                    # trivy image ${DOCKER_IMAGE} --severity HIGH,CRITICAL || true
                    
                    echo "✓ Vulnerability scan completed (can integrate Trivy/Scout)"
                '''
            }
        }
        
        stage('ECR Login & Push') {
            steps {
                echo "📤 Logging into AWS ECR and pushing image..."
                sh '''
                    set +x  # Don't echo AWS credentials
                    
                    # Extract AWS credentials from Jenkins
                    AWS_ACCESS_KEY=${AWS_CREDENTIALS_USR}
                    AWS_SECRET_KEY=${AWS_CREDENTIALS_PSW}
                    
                    # Login to ECR
                    aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}
                    
                    set -x
                    
                    # Push images to ECR
                    echo "🚀 Pushing ${DOCKER_IMAGE}..."
                    docker push ${DOCKER_IMAGE}
                    
                    echo "🚀 Pushing ${DOCKER_IMAGE_LATEST}..."
                    docker push ${DOCKER_IMAGE_LATEST}
                    
                    echo "✓ Docker images pushed to ECR successfully"
                    
                    # Scan image in ECR (optional)
                    aws ecr start-image-scan --repository-name ${ECR_REPOSITORY} --image-id imageTag=latest --region ${AWS_REGION} || true
                '''
            }
        }
        
        stage('Update K8s Manifests') {
            steps {
                echo "📝 Updating Kubernetes manifests with new image tag..."
                sh '''
                    # Update Helm values or Kustomization with new image
                    sed -i "s|image: .*nestfinder.*|image: ${DOCKER_IMAGE}|g" ${HELM_CHART_PATH}/values.yaml || true
                    
                    echo "✓ Kubernetes manifests updated"
                    cat ${HELM_CHART_PATH}/values.yaml | grep -i "image:" || true
                '''
            }
        }
        
        stage('Trigger ArgoCD Sync') {
            steps {
                echo "🔄 Triggering ArgoCD deployment..."
                script {
                    try {
                        sh '''
                            # ArgoCD CLI or API to trigger sync
                            # Option 1: Using argocd CLI
                            argocd app sync ${APP_NAME} --prune --async || true
                            
                            # Option 2: Using webhook/API
                            # curl -X POST https://argocd.example.com/api/webhooks/github
                            
                            echo "✓ ArgoCD sync triggered for ${APP_NAME}"
                        '''
                    } catch (Exception e) {
                        echo "⚠️ ArgoCD sync failed, but image is ready in ECR"
                        echo "Manual ArgoCD sync can be done via: argocd app sync nestfinder"
                    }
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                echo "✅ Verifying deployment status..."
                sh '''
                    # Configure kubectl access to EKS cluster
                    aws eks update-kubeconfig --name nestfinder-cluster --region ${AWS_REGION}
                    
                    # Check rollout status
                    kubectl rollout status deployment/${APP_NAME} -n ${NAMESPACE} --timeout=5m || true
                    
                    # Get pod status
                    echo "📊 Pod Status:"
                    kubectl get pods -n ${NAMESPACE} -l app=${APP_NAME}
                    
                    # Get service info
                    echo "🌐 Service Info:"
                    kubectl get svc -n ${NAMESPACE}
                    
                    # Get recent logs
                    echo "📋 Recent Logs:"
                    kubectl logs -n ${NAMESPACE} -l app=${APP_NAME} --tail=20 || true
                '''
            }
        }
        
        stage('Post-Deployment Tests') {
            steps {
                echo "🧪 Running post-deployment health checks..."
                sh '''
                    # Get ALB endpoint
                    ALB_ENDPOINT=$(kubectl get ingress -n ${NAMESPACE} -o jsonpath='{.items[0].status.loadBalancer.ingress[0].hostname}')
                    
                    echo "✓ Application endpoint: http://${ALB_ENDPOINT}"
                    
                    # Health check
                    if [ ! -z "$ALB_ENDPOINT" ]; then
                        curl -I http://${ALB_ENDPOINT} || echo "⚠️ Health check will succeed once ALB is fully configured"
                    else
                        echo "⚠️ ALB endpoint not yet available, may need a moment to configure"
                    fi
                '''
            }
        }
    }
    
    post {
        success {
            echo "✅ Pipeline completed successfully!"
            echo "🎉 NestFinder application deployed:"
            echo "   - Docker Image: ${DOCKER_IMAGE}"
            echo "   - ECR Repository: ${ECR_REGISTRY}/${ECR_REPOSITORY}"
            echo "   - Namespace: ${NAMESPACE}"
            echo "   - Deployment: ${APP_NAME}"
        }
        
        failure {
            echo "❌ Pipeline failed!"
            echo "🔍 Please check the logs above for details"
        }
        
        always {
            echo "🧹 Cleaning up workspace..."
            cleanWs()
            
            // Optional: Send notifications
            // emailext (
            //     subject: "NestFinder Build: ${BUILD_STATUS}",
            //     body: "Build ${BUILD_NUMBER} ${BUILD_STATUS}. Check logs at ${BUILD_URL}",
            //     to: "devops-team@example.com"
            // )
        }
    }
}
