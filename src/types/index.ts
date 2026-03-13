export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  from: string;
  to: string;
  fromCode: string;
  toCode: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  badge?: 'Best Deal' | 'Fastest' | 'Popular' | 'AI Pick';
  features: string[];
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  pricePerNight: number;
  amenities: string[];
  image: string;
  badge?: 'Best Deal' | 'Top Rated' | 'Popular' | 'AI Pick';
  reviews: number;
  stars: number;
}

export interface Package {
  id: string;
  name: string;
  destination: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  includes: string[];
  badge?: 'Best Deal' | 'Popular' | 'AI Pick' | 'Limited Offer';
  flights: number;
  hotels: number;
}

export interface ComparisonItem {
  id: string;
  type: 'flight' | 'hotel' | 'package';
  item: Flight | Hotel | Package;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export interface Stat {
  id: string;
  value: string;
  suffix: string;
  label: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export type SearchTab = 'flights' | 'hotels' | 'packages';
