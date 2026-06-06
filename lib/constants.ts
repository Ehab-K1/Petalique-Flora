export const BRAND = {
  name: "Petalique Flora",
  tagline: "Floral Design for Moments That Become Memories",
  email: "hello@petaliqueflora.com",
  phone: "+1 (647) 555-0123",
  address: "Mississauga, Ontario, Canada",
  instagram: "https://instagram.com/petaliqueflora",
  facebook: "https://facebook.com/petaliqueflora",
  pinterest: "https://pinterest.com/petaliqueflora",
  tiktok: "https://tiktok.com/@petaliqueflora",
};

export const TAX_RATE = 0.13;

export const SHIPPING_RATES = {
  STANDARD: 12.99,
  EXPRESS: 24.99,
  SAME_DAY: 39.99,
  FREE_THRESHOLD: 150,
};

export const WHOLESALE_TIERS = {
  BRONZE: {
    name: "Bronze",
    discount: 0.15,
    minOrder: 500,
    color: "#CD7F32",
  },
  SILVER: {
    name: "Silver",
    discount: 0.22,
    minOrder: 1500,
    color: "#C0C0C0",
  },
  GOLD: {
    name: "Gold",
    discount: 0.30,
    minOrder: 3000,
    color: "#A07840",
  },
  PLATINUM: {
    name: "Platinum",
    discount: 0.38,
    minOrder: 5000,
    color: "#E5E4E2",
  },
};

export const WEDDING_PACKAGES = [
  {
    name: "Intimate Ceremony",
    price: 2500,
    description: "For up to 50 guests",
    includes: ["Bridal bouquet", "2 bridesmaid bouquets", "Boutonniere", "Altar arrangement"],
  },
  {
    name: "Signature Wedding",
    price: 6500,
    description: "For 50-150 guests",
    includes: [
      "Bridal bouquet",
      "4 bridesmaid bouquets",
      "4 boutonnieres",
      "Ceremony arch",
      "8 centerpieces",
      "Cake flowers",
    ],
  },
  {
    name: "Grand Luxury",
    price: 15000,
    description: "For 150+ guests",
    includes: [
      "Bridal bouquet",
      "6 bridesmaid bouquets",
      "6 boutonnieres",
      "Ceremony arch",
      "20 centerpieces",
      "Cake flowers",
      "Welcome display",
      "Mandap florals",
    ],
  },
];

export const CATEGORIES = [
  { name: "Bridal Bouquets", slug: "bridal-bouquets", icon: "🌸" },
  { name: "Luxury Bouquets", slug: "luxury-bouquets", icon: "🌹" },
  { name: "Artificial Arrangements", slug: "artificial-arrangements", icon: "✨" },
  { name: "Wedding Packages", slug: "wedding-packages", icon: "💍" },
  { name: "Event Florals", slug: "event-florals", icon: "🎉" },
  { name: "Gift Collections", slug: "gift-collections", icon: "🎁" },
  { name: "Corporate Gifts", slug: "corporate-gifts", icon: "🏢" },
  { name: "Seasonal Collections", slug: "seasonal-collections", icon: "🍂" },
];

export const LOCATIONS = [
  {
    city: "Mississauga",
    slug: "wedding-florist-mississauga",
    description: "Premier wedding florist serving Mississauga and surrounding areas.",
  },
  {
    city: "Milton",
    slug: "wedding-florist-milton",
    description: "Luxury floral design for Milton weddings and events.",
  },
  {
    city: "Oakville",
    slug: "wedding-florist-oakville",
    description: "Bespoke wedding florals for Oakville's most beautiful venues.",
  },
  {
    city: "Brampton",
    slug: "wedding-florist-brampton",
    description: "Exquisite floral design for Brampton weddings and celebrations.",
  },
  {
    city: "Toronto",
    slug: "wedding-florist-toronto",
    description: "Toronto's trusted luxury wedding florist.",
  },
];

export const BUDGET_RANGES = [
  { value: "under-2500", label: "Under $2,500" },
  { value: "2500-5000", label: "$2,500 – $5,000" },
  { value: "5000-10000", label: "$5,000 – $10,000" },
  { value: "10000-20000", label: "$10,000 – $20,000" },
  { value: "20000-plus", label: "$20,000+" },
  { value: "discuss", label: "Prefer to discuss" },
];
