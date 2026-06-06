"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Building2,
  UserCog, FileText, BarChart3, TrendingUp, TrendingDown,
  Clock, CheckCircle, AlertCircle, RefreshCw, ArrowRight,
  DollarSign, Eye,
} from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/wholesale", label: "Wholesale", icon: Building2 },
  { href: "/admin/planners", label: "Planners", icon: UserCog },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

const STATS = [
  { label: "Total Revenue", value: "$48,320", sub: "+12% this month", icon: DollarSign, trend: "up" },
  { label: "Orders Today", value: "14", sub: "3 pending fulfillment", icon: ShoppingCart, trend: "up" },
  { label: "Wholesale Pending", value: "3", sub: "Applications awaiting review", icon: Building2, trend: "neutral" },
  { label: "Active Planners", value: "7", sub: "Across 12 projects", icon: UserCog, trend: "up" },
];

const RECENT_ORDERS = [
  { id: "PF-K8X-4QL", customer: "Sana Ahmed", amount: 185, status: "FULFILLED", date: new Date("2024-12-12"), items: 1 },
  { id: "PF-J7V-3RT", customer: "Priya Sharma", amount: 1250, status: "PROCESSING", date: new Date("2024-12-11"), items: 4 },
  { id: "PF-M2B-9YX", customer: "Emily Johnson", amount: 295, status: "PENDING", date: new Date("2024-12-11"), items: 1 },
  { id: "PF-Q5N-7WZ", customer: "Fatima Ali", amount: 2800, status: "CONFIRMED", date: new Date("2024-12-10"), items: 8 },
  { id: "PF-R3K-1PO", customer: "Jessica Lee", amount: 145, status: "DELIVERED", date: new Date("2024-12-10"), items: 2 },
];

const WHOLESALE_PENDING = [
  { business: "Bloom & Co Studio", contact: "Maya Patel", date: new Date("2024-12-10"), type: "Florist" },
  { business: "Grand Palace Hotel", contact: "Chris Dupont", date: new Date("2024-12-09"), type: "Hotel" },
  { business: "Eventique Planning", contact: "Sarah Kim", date: new Date("2024-12-08"), type: "Event Planner" },
];

const STATUS_BADGE: Record<string, string> = {
  FULFILLED: "bg-green-50 text-green-700",
  PROCESSING: "bg-amber-50 text-amber-700",
  PENDING: "bg-stone-100 text-stone-600",
  CONFIRMED: "bg-blue-50 text-blue-700",
  DELIVERED: "bg-emerald-50 text-emerald-700",
  CANCELLED: "bg-red-50 text-red-700",
};

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("/admin");

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-60 bg-charcoal z-40 flex flex-col">
        <div className="p-6 border-b border-ivory/10">
          <Link href="/" className="block">
            <span className="font-serif text-lg text-ivory">Petalique Flora</span>
            <span className="font-sans text-[10px] text-ivory/30 uppercase tracking-[0.2em] block">Admin Portal</span>
          </Link>
        </div>
        <nav className="flex-1 py-6 overflow-y-auto">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setActiveNav(item.href)}
              className={`flex items-center gap-3 px-6 py-3 font-sans text-body-sm transition-colors ${
                activeNav === item.href
                  ? "bg-ivory/10 text-ivory"
                  : "text-ivory/50 hover:text-ivory hover:bg-ivory/5"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-ivory/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-champagne/30 flex items-center justify-center">
              <span className="font-serif text-sm text-champagne">Z</span>
            </div>
            <div>
              <p className="font-sans text-label-sm text-ivory">Zara Malik</p>
              <p className="font-sans text-[10px] text-ivory/30 uppercase tracking-wider">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-60 flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-display-md text-charcoal">Dashboard</h1>
            <p className="font-sans text-body-sm text-smoke">
              {formatDate(new Date(), { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/orders" className="btn-outline text-sm px-5 py-2.5">
              View All Orders
            </Link>
            <Link href="/admin/products/new" className="btn-primary text-sm px-5 py-2.5">
              + New Product
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((s) => (
            <div key={s.label} className="bg-ivory border border-bone/40 p-6">
              <div className="flex items-start justify-between mb-3">
                <p className="font-sans text-label-sm uppercase tracking-wider text-smoke">{s.label}</p>
                <div className={`w-8 h-8 flex items-center justify-center ${
                  s.trend === "up" ? "bg-green-50" : s.trend === "down" ? "bg-red-50" : "bg-bone/40"
                }`}>
                  <s.icon className={`w-4 h-4 ${
                    s.trend === "up" ? "text-green-600" : s.trend === "down" ? "text-red-600" : "text-champagne"
                  }`} />
                </div>
              </div>
              <p className="font-serif text-3xl text-charcoal mb-1">{s.value}</p>
              <p className="font-sans text-label-sm text-smoke">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-ivory border border-bone/40">
            <div className="flex items-center justify-between px-6 py-4 border-b border-bone/40">
              <h2 className="font-sans text-body-sm font-medium text-charcoal uppercase tracking-wider">
                Recent Orders
              </h2>
              <Link href="/admin/orders" className="font-sans text-label-sm text-smoke hover:text-charcoal uppercase tracking-wider flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-bone/30">
              {RECENT_ORDERS.map((order) => (
                <div key={order.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-bone/20 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-body-sm font-medium text-charcoal">{order.customer}</p>
                    <p className="font-sans text-label-sm text-smoke">{order.id} · {order.items} item{order.items > 1 ? "s" : ""}</p>
                  </div>
                  <p className="font-sans text-body-sm text-charcoal font-medium">{formatPrice(order.amount)}</p>
                  <span className={`font-sans text-[10px] px-2 py-1 uppercase tracking-wider flex-shrink-0 ${STATUS_BADGE[order.status]}`}>
                    {order.status}
                  </span>
                  <Link href={`/admin/orders/${order.id}`} className="text-smoke hover:text-charcoal transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Wholesale Pending */}
            <div className="bg-ivory border border-bone/40">
              <div className="flex items-center justify-between px-5 py-4 border-b border-bone/40">
                <h2 className="font-sans text-body-sm font-medium text-charcoal uppercase tracking-wider">
                  Wholesale Pending
                </h2>
                <AlertCircle className="w-4 h-4 text-amber-500" />
              </div>
              <div className="divide-y divide-bone/30">
                {WHOLESALE_PENDING.map((app) => (
                  <div key={app.business} className="px-5 py-3.5">
                    <p className="font-sans text-body-sm font-medium text-charcoal">{app.business}</p>
                    <p className="font-sans text-label-sm text-smoke">{app.contact} · {app.type}</p>
                    <div className="flex gap-3 mt-2">
                      <button className="font-sans text-label-sm text-green-600 hover:text-green-700 uppercase tracking-wider">
                        Approve
                      </button>
                      <button className="font-sans text-label-sm text-rosewood hover:text-red-700 uppercase tracking-wider">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-bone/40">
                <Link href="/admin/wholesale" className="font-sans text-label-sm text-smoke hover:text-charcoal uppercase tracking-wider flex items-center gap-1">
                  Manage All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-ivory border border-bone/40 p-5">
              <h2 className="font-sans text-body-sm font-medium text-charcoal uppercase tracking-wider mb-4">
                Quick Actions
              </h2>
              <div className="space-y-2">
                {[
                  { label: "Add New Product", href: "/admin/products/new", icon: Package },
                  { label: "Process Refund", href: "/admin/orders?filter=refund", icon: RefreshCw },
                  { label: "View Consultations", href: "/admin/consultations", icon: Users },
                  { label: "Publish Blog Post", href: "/admin/content/blog/new", icon: FileText },
                ].map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-3 p-2.5 hover:bg-bone/40 transition-colors group"
                  >
                    <action.icon className="w-3.5 h-3.5 text-champagne" />
                    <span className="font-sans text-body-sm text-charcoal/70 group-hover:text-charcoal transition-colors">
                      {action.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
