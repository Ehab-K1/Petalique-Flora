export type { User, Product, Category, Order, OrderItem, Address } from "@prisma/client";

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image?: string;
  options?: Record<string, string>;
  deliveryDate?: string;
  giftMessage?: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  promoCode?: string;
  discount: number;
}

export interface ProductWithDetails {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  shortDesc?: string | null;
  price: number;
  comparePrice?: number | null;
  images: string[];
  videoUrl?: string | null;
  tags: string[];
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
  variants: Array<{
    id: string;
    name: string;
    price: number;
    images: string[];
    options: Record<string, string>;
    inventory?: { quantity: number } | null;
  }>;
  inventory?: { quantity: number; lowStockAt: number } | null;
  reviews?: Array<{
    id: string;
    rating: number;
    title?: string | null;
    body: string;
    guestName?: string | null;
    user?: { name?: string | null } | null;
    createdAt: Date;
  }>;
  isFeatured: boolean;
  isGiftable: boolean;
  requiresDeliveryDate: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  featured?: {
    title: string;
    image: string;
    href: string;
  };
}

export interface ConsultationFormData {
  name: string;
  email: string;
  phone?: string;
  type: "WEDDING" | "EVENT" | "CORPORATE" | "CUSTOM";
  weddingDate?: string;
  venue?: string;
  guestCount?: number;
  budget?: string;
  vision?: string;
  inspirationUrls?: string[];
}

export interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  deliveryDate?: string;
  giftMessage?: string;
  notes?: string;
}

export interface WholesaleRegistrationData {
  businessName: string;
  website?: string;
  businessLicense?: string;
  taxNumber?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
}

export interface SanityProduct {
  _id: string;
  _type: string;
  name: string;
  slug: { current: string };
  description?: string;
  price: number;
  comparePrice?: number;
  images: Array<{ asset: { _ref: string } }>;
  category?: { name: string; slug: { current: string } };
  isFeatured?: boolean;
  tags?: string[];
}

export interface TestimonialData {
  id: string;
  name: string;
  role?: string;
  body: string;
  rating?: number;
  image?: string;
  videoUrl?: string;
  weddingDate?: string;
  venue?: string;
}

export interface GalleryItemData {
  id: string;
  title?: string;
  imageUrl: string;
  category?: string;
  tags?: string[];
}

export interface LocationPage {
  city: string;
  slug: string;
  headline: string;
  description: string;
  services: string[];
}
