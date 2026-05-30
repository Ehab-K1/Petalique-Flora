// Core domain types for the Petalique Flora storefront.

export type Occasion =
  | 'birthday'
  | 'anniversary'
  | 'apology'
  | 'congratulations'
  | 'sympathy'
  | 'just-because'
  | 'wedding'
  | 'new-baby';

export type ColourId =
  | 'white'
  | 'blush'
  | 'pink'
  | 'red'
  | 'peach'
  | 'lavender'
  | 'butter'
  | 'terracotta'
  | 'midnight'
  | 'ombre';

export interface Colour {
  id: ColourId;
  name: string;
  hex: string;
  upcharge: number;
  premium?: boolean;
}

export interface Option {
  id: string;
  name: string;
  upcharge: number;
  note?: string;
}

export interface Product {
  slug: string;
  name: string;
  latin: string;
  occasions: Occasion[];
  defaultColour: ColourId;
  colours: ColourId[];
  defaultCount: number;
  basePrice: number; // price at default count + included options
  blurb: string;
  description: string;
  badges?: string[];
  inSeason?: boolean;
  bestSeller?: boolean;
  rating: number;
  reviews: number;
  /** label used by the art-directed placeholder + future photography */
  shotLabel: string;
  imageTone: 'blush' | 'ember' | 'sage' | 'cream' | 'aubergine';
}

export interface AddOn {
  id: string;
  name: string;
  desc: string;
  price: number;
}

export interface CartLine {
  id: string; // unique line id
  productSlug: string;
  name: string;
  count: number;
  colour: ColourId;
  colourName: string;
  wrap: string;
  bow: string;
  engraving?: string;
  message?: string;
  schedule?: string;
  addOns: { id: string; name: string; price: number }[];
  unitPrice: number;
  qty: number;
}
