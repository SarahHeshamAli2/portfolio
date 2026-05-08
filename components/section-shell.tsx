"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionShellProps {
  id: string;
  kicker: string;
  title: string;
  children: ReactNode;
}

export function SectionShell({
  id,
  kicker,
  title,
  children,
}: SectionShellProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-24 space-y-8">
      <header className="space-y-2">
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.28em] text-accent">
          {kicker}
        </p>
        <div className="flex flex-wrap items-end gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <span
            aria-hidden
            className="mb-2 hidden h-px flex-1 min-w-12 bg-linear-to-r from-border via-accent/35 to-transparent sm:block"
          />
        </div>
      </header>
      <div>{children}</div>
    </motion.section>
  );
}
