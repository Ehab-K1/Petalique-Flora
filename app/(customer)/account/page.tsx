"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  MapPin,
  User,
  Settings,
  FileText,
  RefreshCw,
  LogOut,
  ChevronRight,
  Package,
} from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

const MOCK_ORDERS = [
  {
    id: "PF-K8XMWY-4QL",
    date: new Date("2024-12-10"),
    status: "DELIVERED",
    total: 185,
    items: [{ name: "Ivory Elegance Bouquet", qty: 1 }],
  },
  {
    id: "PF-J7VNBZ-3RT",
    date: new Date("2024-11-22"),
    status: "FULFILLED",
    total: 295,
    items: [{ name: "Blush Bridal Cascade", qty: 1 }],
  },
];

const STATUS_COLORS: Record<string, string> = {
  DELIVERED: "text-green-700 bg-green-50",
  FULFILLED: "text-blue-700 bg-blue-50",
  PROCESSING: "text-amber-700 bg-amber-50",
  PENDING: "text-stone-600 bg-stone-100",
};

const NAV_ITEMS = [
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "profile", label: "Profile", icon: User },
  { id: "invoices", label: "Invoices", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen bg-cream pt-24">
      <div className="max-w-9xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-ivory border border-bone/40 p-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-dusty-rose/20 rounded-full flex items-center justify-center">
                  <span className="font-serif text-xl text-dusty-rose">S</span>
                </div>
                <div>
                  <p className="font-sans text-body-sm font-medium text-charcoal">Sana Ahmed</p>
                  <p className="font-sans text-label-sm text-smoke">sana@email.com</p>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
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
              <button className="w-full flex items-center gap-3 px-4 py-3 font-sans text-body-sm text-rose-600/70 hover:text-rose-600 transition-colors mt-4">
                <LogOut className="w-4 h-4 flex-shrink-0" />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Main */}
          <main className="flex-1">
            {activeTab === "orders" && (
              <div>
                <h1 className="font-serif text-display-md text-charcoal mb-8">My Orders</h1>
                {MOCK_ORDERS.length === 0 ? (
                  <div className="text-center py-20 bg-ivory border border-bone/40">
                    <ShoppingBag className="w-10 h-10 text-smoke/40 mx-auto mb-4" />
                    <p className="font-serif text-display-sm text-charcoal mb-2">No orders yet</p>
                    <p className="font-sans text-body-sm text-smoke mb-6">
                      Explore our collection and place your first order.
                    </p>
                    <Link href="/shop" className="btn-outline">
                      Browse Shop
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {MOCK_ORDERS.map((order) => (
                      <div key={order.id} className="bg-ivory border border-bone/40 p-5">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <p className="font-sans text-body-sm font-medium text-charcoal">
                              {order.id}
                            </p>
                            <p className="font-sans text-label-sm text-smoke">
                              {formatDate(order.date, { month: "long", day: "numeric", year: "numeric" })}
                            </p>
                          </div>
                          <span
                            className={`font-sans text-label-sm px-2 py-1 ${STATUS_COLORS[order.status] || ""}`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="space-y-1 mb-4">
                          {order.items.map((item) => (
                            <p key={item.name} className="font-sans text-body-sm text-charcoal/70">
                              {item.qty}× {item.name}
                            </p>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-sans text-body-sm font-medium text-charcoal">
                            {formatPrice(order.total)}
                          </p>
                          <div className="flex gap-3">
                            <button className="flex items-center gap-1.5 font-sans text-label-sm text-charcoal/60 hover:text-charcoal transition-colors">
                              <RefreshCw className="w-3 h-3" /> Reorder
                            </button>
                            <button className="flex items-center gap-1.5 font-sans text-label-sm text-charcoal/60 hover:text-charcoal transition-colors">
                              <Package className="w-3 h-3" /> Track
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div>
                <h1 className="font-serif text-display-md text-charcoal mb-8">My Profile</h1>
                <div className="bg-ivory border border-bone/40 p-8 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="field-label">First Name</label>
                      <input defaultValue="Sana" className="field-luxury" />
                    </div>
                    <div>
                      <label className="field-label">Last Name</label>
                      <input defaultValue="Ahmed" className="field-luxury" />
                    </div>
                  </div>
                  <div>
                    <label className="field-label">Email Address</label>
                    <input type="email" defaultValue="sana@email.com" className="field-luxury" />
                  </div>
                  <div>
                    <label className="field-label">Phone</label>
                    <input type="tel" defaultValue="+1 647 555 0123" className="field-luxury" />
                  </div>
                  <button className="btn-primary">Save Changes</button>
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div>
                <h1 className="font-serif text-display-md text-charcoal mb-8">Wishlist</h1>
                <p className="font-sans text-body-sm text-smoke text-center py-20">
                  Your saved items will appear here.
                </p>
              </div>
            )}

            {activeTab === "addresses" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="font-serif text-display-md text-charcoal">Saved Addresses</h1>
                  <button className="btn-outline text-sm px-5 py-2.5">+ Add Address</button>
                </div>
                <div className="bg-ivory border border-bone/40 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-sans text-body-sm font-medium text-charcoal mb-1">
                        Home (Default)
                      </p>
                      <p className="font-sans text-body-sm text-smoke">
                        123 Lakeshore Blvd W, Apt 4<br />
                        Mississauga, ON L5B 1M2<br />
                        Canada
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button className="font-sans text-label-sm text-charcoal/60 hover:text-charcoal transition-colors uppercase tracking-wider">
                        Edit
                      </button>
                      <button className="font-sans text-label-sm text-rosewood/60 hover:text-rosewood transition-colors uppercase tracking-wider">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
