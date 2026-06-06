import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency = "CAD"): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }).format(new Date(date));
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "…";
}

export function generateOrderNumber(): string {
  const prefix = "PF";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function generateInvoiceNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `INV-${year}-${random}`;
}

export function generateQuoteNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `QT-${year}-${random}`;
}

export function calculateTax(subtotal: number, taxRate = 0.13): number {
  return Math.round(subtotal * taxRate * 100) / 100;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPostalCode(code: string): boolean {
  return /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i.test(code);
}

export function shimmer(w: number, h: number): string {
  return `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#E8E0D4" offset="20%" />
          <stop stop-color="#F5F0E8" offset="50%" />
          <stop stop-color="#E8E0D4" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#E8E0D4" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;
}

export function toBase64(str: string): string {
  if (typeof window !== "undefined") {
    return window.btoa(str);
  }
  return Buffer.from(str).toString("base64");
}

export function blurDataUrl(w = 8, h = 8): string {
  return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
}
