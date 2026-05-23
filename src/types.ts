export interface Property {
  id: string;
  name: string;
  location: string;
  locality: string;
  city: string;
  rating: number;
  reviewsCount: number;
  rent: number;
  image: string;
  status: 'Available' | 'Limited' | 'Full';
  category: 'student' | 'professional' | 'luxury';
  roomTypes: ('single' | 'double' | 'triple')[];
  amenities: string[];
  description: string;
  houseRules: { title: string; desc: string; icon: string }[];
  manager: { name: string; role: string; image: string };
  gallery: string[];
  sharingPrices?: { [key: string]: number }; // e.g. { "2 Sharing": 8500, "3 Sharing": 7000 }
}

export interface SearchFilters {
  city: string;
  locality: string;
  roomTypes: ('single' | 'double' | 'triple')[];
  amenities: string[];
  budget: number;
  category: 'all' | 'student' | 'professional' | 'luxury';
}

export interface OwnerProperty {
  id: string;
  name: string;
  location: string;
  image: string;
  status: 'Available' | 'Full' | 'Draft';
  activeTenants: string; // e.g., "18/24"
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  visitDate: string;
  visitTime: string;
  contactName: string;
  contactPhone: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}
