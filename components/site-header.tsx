"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

// const nav = [
//   { href: "#about", label: "About" },
//   { href: "#projects", label: "Projects" },
//   { href: "#experience", label: "Experience" },
//   { href: "#contact", label: "Contact" },
// ];

interface SiteHeaderProps {
  brandName: string;
}

export function SiteHeader({ brandName }: SiteHeaderProps) {
  const displayName = brandName.trim() || "Portfolio";

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl backdrop-saturate-150 supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-6xl px-5 py-3 sm:px-8 lg:px-10">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="min-w-0 flex-1">
            <Link
              href=""
              className="group inline-flex max-w-full items-center gap-2.5 font-semibold tracking-tight text-foreground transition-opacity hover:opacity-85">
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-accent to-accent-secondary text-xs font-bold text-accent-foreground shadow-md shadow-accent/25 ring-1 ring-white/15 dark:ring-white/10">
                {(displayName[0] || "P").toUpperCase()}
              </span>
              <span className="truncate text-sm sm:text-[0.9375rem]">
                {displayName}
              </span>
            </Link>
          </div>
          {/* 
          <nav
            className="hidden shrink-0 items-center gap-0.5 md:flex"
            aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-[0.8125rem] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav> */}

          <div className="flex shrink-0 justify-end md:min-w-11">
            <ThemeToggle />
          </div>
        </div>
        {/* 
        <nav
          className="mt-3 flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] md:mt-0 md:hidden [&::-webkit-scrollbar]:hidden"
          aria-label="Sections">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-[0.6875rem] font-medium text-muted-foreground shadow-sm transition-colors hover:border-accent/35 hover:text-foreground active:scale-[0.98]">
              {item.label}
            </a>
          ))}
        </nav> */}
      </div>
    </motion.header>
  );
}
