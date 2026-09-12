export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Living Room' | 'Bedroom' | 'Dining' | 'Workspace' | 'Outdoor' | 'Storage';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: 'Best Sale' | 'Top Rated' | 'Best Price' | 'New Arrival' | 'Atelier Signature';
  image: string;
  secondaryImage?: string;
  colors: {
    name: string;
    hex: string;
    image?: string;
  }[];
  dimensions: string;
  materials: string;
  leadTime: string;
  description: string;
  featuredInNewArrivals?: boolean;
  isBestseller?: boolean;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
  productPurchased: string;
  verified: boolean;
  productImage: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
