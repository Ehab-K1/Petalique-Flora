"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  FileText,
  Clock,
  TrendingUp,
  Plus,
  Search,
  Download,
  ChevronRight,
  Star,
  ShoppingBag,
} from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";
import { WHOLESALE_TIERS } from "@/lib/constants";

const MOCK_ORDERS = [
  {
    id: "WO-2024-001",
    date: new Date("2024-12-01"),
    status: "FULFILLED",
    total: 1250,
    items: 8,
  },
  {
    id: "WO-2024-002",
    date: new Date("2024-11-15"),
    status: "PROCESSING",
    total: 890,
    items: 5,
  },
  {
    id: "WO-2024-003",
    date: new Date("2024-11-02"),
    status: "DELIVERED",
    total: 2100,
    items: 14,
  },
];

const MOCK_FAVORITES = [
  {
    id: "1",
    name: "White Garden Roses",
    sku: "WGR-001",
    price: 85,
    image: "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?w=200&q=80",
    inStock: true,
  },
  {
    id: "2",
    name: "Ivory Lisianthus",
    sku: "ILS-002",
    price: 65,
    image: "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=200&q=80",
    inStock: true,
  },
  {
    id: "3",
    name: "Eucalyptus Bundle",
    sku: "EUC-003",
    price: 45,
    image: "https://images.unsplash.com/photo-1462530260150-162092dbf011?w=200&q=80",
    inStock: false,
  },
];

const STATUS_STYLES: Record<string, string> = {
  FULFILLED: "bg-green-50 text-green-700",
  PROCESSING: "bg-amber-50 text-amber-700",
  DELIVERED: "bg-blue-50 text-blue-700",
  PENDING: "bg-stone-100 text-stone-600",
};

export default function WholesaleDashboard() {
  const [activeTab, setActiveTab] = useState<"orders" | "catalog" | "favorites" | "invoices">("orders");
  const tier = WHOLESALE_TIERS.GOLD;

  return (
    <div className="min-h-screen bg-cream pt-24">
      <div className="max-w-9xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            {/* Account Card */}
            <div className="bg-ivory border border-bone/40 p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-champagne/20 flex items-center justify-center">
                  <span className="font-serif text-lg text-champagne">S</span>
                </div>
                <div>
                  <p className="font-sans text-body-sm font-medium text-charcoal">
                    Sana Blooms Studio
                  </p>
                  <p className="font-sans text-label-sm text-smoke">Gold Tier</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-champagne/20 to-champagne/5 border border-champagne/30 px-4 py-3">
                <p className="font-sans text-label-sm uppercase tracking-widest text-champagne mb-0.5">
                  Gold Tier Discount
                </p>
                <p className="font-serif text-2xl text-charcoal">
                  {Math.round(tier.discount * 100)}% off
                </p>
              </div>
            </div>

            {/* Nav */}
            <nav className="space-y-1">
              {[
                { id: "orders", label: "Orders", icon: Package },
                { id: "catalog", label: "Order Catalog", icon: ShoppingBag },
                { id: "favorites", label: "Favorites", icon: Star },
                { id: "invoices", label: "Invoices", icon: FileText },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as typeof activeTab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 font-sans text-body-sm transition-colors ${
                    activeTab === item.id
                      ? "bg-charcoal text-ivory"
                      : "text-charcoal/70 hover:text-charcoal hover:bg-bone/40"
                  }`}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main */}
          <main className="flex-1">
            {activeTab === "orders" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="font-serif text-display-md text-charcoal">My Orders</h1>
                  <Link href="/wholesale/dashboard/new-order" className="btn-primary">
                    <Plus className="w-4 h-4" />
                    New Order
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "This Month", value: formatPrice(4240), icon: TrendingUp },
                    { label: "Pending", value: "1 order", icon: Clock },
                    { label: "Total Orders", value: "23", icon: Package },
                  ].map((s) => (
                    <div key={s.label} className="bg-ivory border border-bone/40 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-sans text-label-sm text-smoke uppercase tracking-wider">
                          {s.label}
                        </p>
                        <s.icon className="w-4 h-4 text-champagne" />
                      </div>
                      <p className="font-serif text-2xl text-charcoal">{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Orders table */}
                <div className="bg-ivory border border-bone/40">
                  <div className="p-4 border-b border-bone/40 flex items-center gap-3">
                    <div className="flex-1 relative">
                      <Search className="w-4 h-4 text-smoke absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="search"
                        placeholder="Search orders..."
                        className="w-full bg-transparent border border-bone/40 pl-9 pr-4 py-2 font-sans text-body-sm focus:outline-none focus:border-charcoal/40"
                      />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-bone/40">
                          {["Order", "Date", "Items", "Total", "Status", ""].map((h) => (
                            <th
                              key={h}
                              className="px-4 py-3 text-left font-sans text-label-sm text-smoke uppercase tracking-wider"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-bone/30">
                        {MOCK_ORDERS.map((order) => (
                          <tr key={order.id} className="hover:bg-bone/20 transition-colors">
                            <td className="px-4 py-4 font-sans text-body-sm font-medium text-charcoal">
                              {order.id}
                            </td>
                            <td className="px-4 py-4 font-sans text-body-sm text-smoke">
                              {formatDate(order.date, { month: "short", day: "numeric", year: "numeric" })}
                            </td>
                            <td className="px-4 py-4 font-sans text-body-sm text-smoke">
                              {order.items} items
                            </td>
                            <td className="px-4 py-4 font-sans text-body-sm text-charcoal font-medium">
                              {formatPrice(order.total)}
                            </td>
                            <td className="px-4 py-4">
                              <span
                                className={`font-sans text-label-sm px-2 py-1 rounded-sm ${STATUS_STYLES[order.status] || "bg-stone-100 text-stone-600"}`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <button className="p-1 text-smoke hover:text-charcoal transition-colors flex items-center gap-1 font-sans text-label-sm">
                                View <ChevronRight className="w-3 h-3" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "favorites" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="font-serif text-display-md text-charcoal">Saved Products</h1>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {MOCK_FAVORITES.map((p) => (
                    <div key={p.id} className="bg-ivory border border-bone/40 p-4 flex gap-4">
                      <div className="w-16 h-16 bg-bone/30 flex-shrink-0 relative overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-sans text-body-sm font-medium text-charcoal mb-0.5">
                          {p.name}
                        </p>
                        <p className="font-sans text-label-sm text-smoke mb-2">{p.sku}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-body-sm text-charcoal">
                            {formatPrice(p.price)}
                          </span>
                          <span
                            className={`font-sans text-label-sm ${p.inStock ? "text-green-600" : "text-rosewood"}`}
                          >
                            {p.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "invoices" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="font-serif text-display-md text-charcoal">Invoices</h1>
                </div>
                <div className="bg-ivory border border-bone/40 divide-y divide-bone/30">
                  {MOCK_ORDERS.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 hover:bg-bone/20 transition-colors"
                    >
                      <div>
                        <p className="font-sans text-body-sm font-medium text-charcoal">
                          INV-{order.id}
                        </p>
                        <p className="font-sans text-label-sm text-smoke">
                          {formatDate(order.date, { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                      </div>
                      <p className="font-sans text-body-sm text-charcoal">
                        {formatPrice(order.total)}
                      </p>
                      <button className="flex items-center gap-1.5 font-sans text-label-sm text-charcoal/60 hover:text-charcoal transition-colors">
                        <Download className="w-3.5 h-3.5" />
                        PDF
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "catalog" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="font-serif text-display-md text-charcoal">Order Catalog</h1>
                  <div className="relative">
                    <Search className="w-4 h-4 text-smoke absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="search"
                      placeholder="Search products..."
                      className="bg-transparent border border-bone/60 pl-9 pr-4 py-2 font-sans text-body-sm focus:outline-none focus:border-charcoal/40 w-64"
                    />
                  </div>
                </div>
                <p className="font-sans text-body-sm text-smoke">
                  Browse and order from our full wholesale catalog. Prices shown include your{" "}
                  <strong className="text-champagne">
                    {Math.round(tier.discount * 100)}% Gold tier discount
                  </strong>
                  .
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
