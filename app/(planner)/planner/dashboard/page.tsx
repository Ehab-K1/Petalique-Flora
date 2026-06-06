"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users, FolderOpen, FileText, DollarSign,
  Plus, ArrowRight, Calendar, CheckCircle,
  Clock, MoreHorizontal,
} from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

const MOCK_CLIENTS = [
  { id: "1", name: "Priya & Arjun", event: "Wedding", date: new Date("2025-03-15"), budget: 8500, status: "ACTIVE" },
  { id: "2", name: "Fatima & Omar", event: "Walima", date: new Date("2025-04-02"), budget: 4200, status: "PROPOSAL_SENT" },
  { id: "3", name: "Sarah & Mike", event: "Wedding", date: new Date("2025-05-18"), budget: 12000, status: "ACTIVE" },
];

const STATUS_BADGE: Record<string, string> = {
  ACTIVE: "bg-green-50 text-green-700",
  PROPOSAL_SENT: "bg-amber-50 text-amber-700",
  COMPLETED: "bg-blue-50 text-blue-700",
  LEAD: "bg-stone-100 text-stone-600",
};

export default function PlannerDashboard() {
  const [activeTab, setActiveTab] = useState<"clients" | "projects" | "proposals" | "earnings">("clients");

  return (
    <div className="min-h-screen bg-cream pt-24">
      <div className="max-w-9xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <span className="section-tag">Planner Portal</span>
            <h1 className="font-serif text-display-xl text-charcoal">Welcome back, Sarah.</h1>
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4" />
            New Client
          </button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Active Clients", value: "3", icon: Users, color: "text-dusty-rose" },
            { label: "Open Projects", value: "5", icon: FolderOpen, color: "text-champagne" },
            { label: "Proposals Sent", value: "2", icon: FileText, color: "text-smoke" },
            { label: "Earned This Year", value: formatPrice(2840), icon: DollarSign, color: "text-green-600" },
          ].map((s) => (
            <div key={s.label} className="bg-ivory border border-bone/40 p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="font-sans text-label-sm text-smoke uppercase tracking-wider">{s.label}</p>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <p className="font-serif text-3xl text-charcoal">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-bone/40 mb-8">
          {(["clients", "projects", "proposals", "earnings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-sans text-label-sm uppercase tracking-widest pb-3 mr-6 border-b-2 transition-all duration-200 capitalize ${
                activeTab === tab ? "border-charcoal text-charcoal" : "border-transparent text-smoke hover:text-charcoal"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "clients" && (
          <div>
            <div className="space-y-3">
              {MOCK_CLIENTS.map((client) => (
                <div key={client.id} className="bg-ivory border border-bone/40 p-5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-dusty-rose/15 flex items-center justify-center flex-shrink-0">
                    <span className="font-serif text-dusty-rose">{client.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-body-sm font-medium text-charcoal">{client.name}</p>
                    <p className="font-sans text-label-sm text-smoke">
                      {client.event} · {formatDate(client.date, { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="font-sans text-body-sm text-charcoal">{formatPrice(client.budget)}</p>
                    <p className="font-sans text-label-sm text-smoke">Floral budget</p>
                  </div>
                  <span className={`font-sans text-[10px] px-2 py-1 uppercase tracking-wider flex-shrink-0 ${STATUS_BADGE[client.status]}`}>
                    {client.status.replace("_", " ")}
                  </span>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="p-2 text-smoke hover:text-charcoal transition-colors" aria-label="View client">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "proposals" && (
          <div>
            <div className="bg-ivory border border-bone/40 p-8 text-center">
              <FileText className="w-10 h-10 text-smoke/30 mx-auto mb-4" />
              <p className="font-serif text-display-sm text-charcoal mb-2">Create Your First Proposal</p>
              <p className="font-sans text-body-sm text-smoke mb-6">
                Generate professional floral proposals with itemised pricing and your client&apos;s vision.
              </p>
              <button className="btn-primary">
                <Plus className="w-4 h-4" />
                New Proposal
              </button>
            </div>
          </div>
        )}

        {activeTab === "earnings" && (
          <div>
            <div className="bg-ivory border border-bone/40 p-8">
              <h3 className="font-serif text-display-md text-charcoal mb-6">Commission Earnings</h3>
              <div className="bg-green-50 border border-green-100 p-5 mb-6">
                <p className="font-sans text-body-sm font-medium text-green-700 mb-1">
                  Your commission rate: <strong>10%</strong>
                </p>
                <p className="font-sans text-body-sm text-green-600">
                  Earned on every completed booking from your referred clients.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { client: "Priya & Arjun", amount: 850, status: "PAID", date: new Date("2024-11-15") },
                  { client: "Sana & Faisal", amount: 1240, status: "PAID", date: new Date("2024-10-01") },
                  { client: "Emily & James", amount: 750, status: "PENDING", date: new Date("2024-12-01") },
                ].map((e) => (
                  <div key={e.client} className="flex items-center gap-4 py-3 border-b border-bone/40">
                    <div className="flex-1">
                      <p className="font-sans text-body-sm text-charcoal">{e.client}</p>
                      <p className="font-sans text-label-sm text-smoke">
                        {formatDate(e.date, { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                    <p className="font-sans text-body-sm font-medium text-charcoal">{formatPrice(e.amount)}</p>
                    <span className={`font-sans text-label-sm ${e.status === "PAID" ? "text-green-600" : "text-amber-600"}`}>
                      {e.status === "PAID" ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </span>
                  </div>
                ))}
              </div>
              <p className="font-sans text-body-sm text-smoke mt-4">
                Total earned: <strong className="text-charcoal">{formatPrice(2840)}</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
