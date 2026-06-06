"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Search, Heart, User, ChevronDown } from "lucide-react";
import { useCart } from "@/components/shop/CartProvider";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    label: "Weddings",
    href: "/weddings",
    mega: [
      {
        title: "Bridal",
        items: [
          { label: "Bridal Bouquets", href: "/weddings/bridal-bouquets" },
          { label: "Bridesmaid Bouquets", href: "/weddings/bridesmaid-bouquets" },
          { label: "Boutonnieres", href: "/weddings/boutonnieres" },
          { label: "Flower Crowns", href: "/weddings/flower-crowns" },
        ],
      },
      {
        title: "Ceremony",
        items: [
          { label: "Wedding Arches", href: "/weddings/arches" },
          { label: "Mandap Florals", href: "/weddings/mandap" },
          { label: "Aisle Décor", href: "/weddings/aisle-decor" },
          { label: "Ceremony Florals", href: "/weddings/ceremony" },
        ],
      },
      {
        title: "Reception",
        items: [
          { label: "Centerpieces", href: "/weddings/centerpieces" },
          { label: "Walima Florals", href: "/weddings/walima" },
          { label: "Mehndi Décor", href: "/weddings/mehndi" },
          { label: "Reception Florals", href: "/weddings/reception" },
        ],
      },
      {
        title: "Packages",
        items: [
          { label: "Luxury Packages", href: "/weddings/packages" },
          { label: "Car Décor", href: "/weddings/car-decor" },
          { label: "Bedroom Décor", href: "/weddings/bedroom-decor" },
          { label: "Book Consultation", href: "/contact?type=wedding" },
        ],
      },
    ],
  },
  {
    label: "Shop",
    href: "/shop",
    mega: [
      {
        title: "Bouquets",
        items: [
          { label: "Luxury Bouquets", href: "/shop/luxury-bouquets" },
          { label: "Seasonal", href: "/shop/seasonal-collections" },
          { label: "Subscription", href: "/shop/subscriptions" },
          { label: "Same-Day Delivery", href: "/shop?filter=same-day" },
        ],
      },
      {
        title: "Gifts",
        items: [
          { label: "Gift Collections", href: "/shop/gift-collections" },
          { label: "Corporate Gifts", href: "/shop/corporate-gifts" },
          { label: "Gift Boxes", href: "/shop/gift-boxes" },
          { label: "Custom Arrangements", href: "/contact?type=custom" },
        ],
      },
    ],
  },
  {
    label: "Events",
    href: "/events",
    mega: null,
  },
  {
    label: "Wholesale",
    href: "/wholesale",
    mega: null,
  },
  {
    label: "About",
    href: "/about",
    mega: null,
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const { items, openCart } = useCart();
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const isHome = pathname === "/";
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  const handleMenuEnter = (label: string) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const navBg = isScrolled || !isHome
    ? "bg-cream/95 backdrop-blur-sm border-b border-bone/40"
    : "bg-transparent";

  const textColor = isScrolled || !isHome ? "text-charcoal" : "text-ivory";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          navBg
        )}
      >
        <div className="max-w-9xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-start">
              <span
                className={cn(
                  "font-serif text-xl lg:text-2xl tracking-wide transition-colors duration-300",
                  textColor
                )}
              >
                Petalique Flora
              </span>
              <span
                className={cn(
                  "font-sans text-[0.55rem] uppercase tracking-[0.3em] transition-colors duration-300 hidden sm:block",
                  isScrolled || !isHome ? "text-smoke" : "text-ivory/60"
                )}
              >
                Luxury Floral Design
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-8"
              ref={menuRef}
              onMouseLeave={handleMenuLeave}
            >
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.mega ? handleMenuEnter(item.label) : undefined}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 font-sans text-label-sm uppercase tracking-[0.15em] transition-all duration-300",
                      isScrolled || !isHome
                        ? "text-charcoal/70 hover:text-charcoal"
                        : "text-ivory/80 hover:text-ivory",
                      pathname.startsWith(item.href) && item.href !== "/"
                        ? isScrolled || !isHome ? "text-charcoal" : "text-ivory"
                        : ""
                    )}
                  >
                    {item.label}
                    {item.mega && (
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform duration-300",
                          activeMenu === item.label ? "rotate-180" : ""
                        )}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                className={cn(
                  "hidden lg:flex p-2 transition-colors duration-300",
                  isScrolled || !isHome
                    ? "text-charcoal/60 hover:text-charcoal"
                    : "text-ivory/70 hover:text-ivory"
                )}
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              <Link
                href="/account/wishlist"
                className={cn(
                  "hidden lg:flex p-2 transition-colors duration-300",
                  isScrolled || !isHome
                    ? "text-charcoal/60 hover:text-charcoal"
                    : "text-ivory/70 hover:text-ivory"
                )}
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" />
              </Link>

              <Link
                href="/account"
                className={cn(
                  "hidden lg:flex p-2 transition-colors duration-300",
                  isScrolled || !isHome
                    ? "text-charcoal/60 hover:text-charcoal"
                    : "text-ivory/70 hover:text-ivory"
                )}
                aria-label="Account"
              >
                <User className="w-4 h-4" />
              </Link>

              <button
                onClick={openCart}
                className={cn(
                  "flex items-center gap-2 p-2 transition-colors duration-300 relative",
                  isScrolled || !isHome
                    ? "text-charcoal/60 hover:text-charcoal"
                    : "text-ivory/70 hover:text-ivory"
                )}
                aria-label={`Cart: ${cartCount} items`}
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rosewood text-ivory text-[9px] rounded-full flex items-center justify-center font-sans font-medium">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>

              <button
                className={cn(
                  "lg:hidden p-2 transition-colors duration-300",
                  isScrolled || !isHome
                    ? "text-charcoal"
                    : "text-ivory"
                )}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {activeMenu && NAV_ITEMS.find((i) => i.label === activeMenu)?.mega && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 bg-cream/98 backdrop-blur-md border-b border-bone/40 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
              onMouseEnter={() => handleMenuEnter(activeMenu)}
              onMouseLeave={handleMenuLeave}
            >
              <div className="max-w-9xl mx-auto px-12 py-10">
                <div className="grid grid-cols-4 gap-12">
                  {NAV_ITEMS.find((i) => i.label === activeMenu)?.mega?.map((col) => (
                    <div key={col.title}>
                      <p className="font-sans text-label-sm uppercase tracking-[0.2em] text-champagne mb-5">
                        {col.title}
                      </p>
                      <ul className="space-y-3">
                        {col.items.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              className="font-sans text-body-sm text-charcoal/70 hover:text-charcoal transition-colors duration-200"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-cream lg:hidden overflow-y-auto"
          >
            <div className="pt-28 pb-12 px-6 space-y-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="font-serif text-display-sm text-charcoal block mb-2"
                  >
                    {item.label}
                  </Link>
                  {item.mega && (
                    <div className="pl-4 space-y-1 mt-3">
                      {item.mega.flatMap((col) =>
                        col.items.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block font-sans text-body-sm text-smoke hover:text-charcoal transition-colors py-1"
                          >
                            {subItem.label}
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
              <div className="pt-6 border-t border-bone flex flex-col gap-4">
                <Link href="/account" className="btn-outline w-full text-center">
                  My Account
                </Link>
                <Link href="/contact?type=wedding" className="btn-primary w-full text-center">
                  Book Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
