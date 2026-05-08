"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import type { PersonalInfo } from "@/lib/types";

interface LandingSectionProps {
  personalInfo: PersonalInfo;
}

const nav = [
  {
    href: "#about",
    label: "About",
    winLabel: "C:\\USER\\about",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="h-full w-full">
        <path
          d="M6 14a3 3 0 013-3h26a3 3 0 013 3v22a3 3 0 01-3 3H9a3 3 0 01-3-3V14z"
          fill="var(--card)"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
        <path d="M6 18h32" stroke="#8b7cf5" strokeWidth="1" />
        <rect x="11" y="7" width="10" height="5" rx="2" fill="#8b7cf5" />
        <circle
          cx="22"
          cy="27"
          r="5"
          fill="#a78bfa"
          fillOpacity="0.2"
          stroke="#a78bfa"
          strokeWidth="1.2"
        />
        <circle cx="22" cy="25" r="2.5" fill="#a78bfa" />
        <path
          d="M16 32c0-3 2.7-4.5 6-4.5s6 1.5 6 4.5"
          stroke="#8b7cf5"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "#projects",
    label: "Projects",
    winLabel: "C:\\USER\\projects",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="h-full w-full">
        <path
          d="M6 14a3 3 0 013-3h26a3 3 0 013 3v22a3 3 0 01-3 3H9a3 3 0 01-3-3V14z"
          fill="var(--card)"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
        <path d="M6 18h32" stroke="#a78bfa" strokeWidth="1" />
        <rect x="11" y="7" width="10" height="5" rx="2" fill="#a78bfa" />
        <rect
          x="11"
          y="22"
          width="9"
          height="8"
          rx="1.5"
          fill="#8b7cf5"
          fillOpacity="0.3"
          stroke="#8b7cf5"
          strokeWidth="1"
        />
        <rect
          x="24"
          y="22"
          width="9"
          height="5"
          rx="1.5"
          fill="#a78bfa"
          fillOpacity="0.3"
          stroke="#a78bfa"
          strokeWidth="1"
        />
        <rect
          x="24"
          y="29"
          width="9"
          height="3"
          rx="1"
          fill="#8b7cf5"
          fillOpacity="0.2"
          stroke="#8b7cf5"
          strokeWidth="0.8"
        />
      </svg>
    ),
  },
  {
    href: "#experience",
    label: "Experience",
    winLabel: "C:\\USER\\experience",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="h-full w-full">
        <path
          d="M6 14a3 3 0 013-3h26a3 3 0 013 3v22a3 3 0 01-3 3H9a3 3 0 01-3-3V14z"
          fill="var(--card)"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
        <path d="M6 18h32" stroke="#8b7cf5" strokeWidth="1" />
        <rect x="11" y="7" width="10" height="5" rx="2" fill="#8b7cf5" />
        <rect
          x="11"
          y="22"
          width="22"
          height="1.5"
          rx="0.75"
          fill="#a78bfa"
          fillOpacity="0.7"
        />
        <rect
          x="11"
          y="26"
          width="16"
          height="1.5"
          rx="0.75"
          fill="#a78bfa"
          fillOpacity="0.5"
        />
        <rect
          x="11"
          y="30"
          width="19"
          height="1.5"
          rx="0.75"
          fill="#a78bfa"
          fillOpacity="0.35"
        />
        <circle
          cx="31"
          cy="30"
          r="4"
          fill="#8b7cf5"
          fillOpacity="0.2"
          stroke="#8b7cf5"
          strokeWidth="1"
        />
        <path
          d="M29.5 30l1 1 2-2"
          stroke="#8b7cf5"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "#contact",
    label: "Contact",
    winLabel: "C:\\USER\\contact",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="h-full w-full">
        <path
          d="M6 14a3 3 0 013-3h26a3 3 0 013 3v22a3 3 0 01-3 3H9a3 3 0 01-3-3V14z"
          fill="var(--card)"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
        <path d="M6 18h32" stroke="#a78bfa" strokeWidth="1" />
        <rect x="11" y="7" width="10" height="5" rx="2" fill="#a78bfa" />
        <path
          d="M10 23l12 8 12-8"
          stroke="#8b7cf5"
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
        />
        <rect
          x="10"
          y="22"
          width="24"
          height="14"
          rx="2"
          stroke="#8b7cf5"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    ),
  },
];

function DesktopIcon({
  href,
  label,
  icon,
  delay = 0,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group flex w-16 cursor-pointer flex-col items-center gap-1.5 rounded px-1 py-2 transition-colors hover:bg-accent/10">
      <div className="h-11 w-11">{icon}</div>
      <span className="font-mono text-[11px] text-foreground/70 group-hover:text-accent-secondary">
        {label.toLowerCase()}
      </span>
    </motion.a>
  );
}

// State: 'idle' | 'scrolling' | 'paused'
type ScrollState = "idle" | "scrolling" | "paused";

function StartButton() {
  const rafId = useRef<number | null>(null);
  const acc = useRef(0);
  const scrollState = useRef<ScrollState>("idle");
  const SPEED = 0.6;

  const stopRaf = () => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  const tick = () => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    if (window.scrollY < maxScroll) {
      acc.current += SPEED;
      if (acc.current >= 1) {
        const step = Math.floor(acc.current);
        window.scrollBy(0, step);
        acc.current -= step;
      }
      rafId.current = requestAnimationFrame(tick);
    } else {
      rafId.current = null;
      scrollState.current = "idle";
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // don't jump to /#top

    if (scrollState.current === "idle") {
      // Start scrolling
      scrollState.current = "scrolling";
      acc.current = 0;
      rafId.current = requestAnimationFrame(tick);
    } else {
      // Was scrolling or paused — stop entirely
      stopRaf();
      scrollState.current = "idle";
      acc.current = 0;
    }
  };

  const handleMouseEnter = () => {
    if (scrollState.current === "scrolling") {
      stopRaf();
      scrollState.current = "paused";
    }
  };

  const handleMouseLeave = () => {
    if (scrollState.current === "paused") {
      scrollState.current = "scrolling";
      rafId.current = requestAnimationFrame(tick);
    }
  };

  return (
    <Link
      href="/#top"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative shrink-0 overflow-hidden rounded-[3px] bg-accent px-3 py-1 font-mono text-[13px] text-white hover:bg-accent-secondary transition-colors">
      <span className="flex items-center gap-1.5">
        <span>▶ START</span>
        <span
          className="inline-block animate-bounce text-[9px] opacity-70"
          aria-hidden>
          ▼
        </span>
      </span>
      <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-card border border-border px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        scroll paused
      </span>
    </Link>
  );
}

function WinBar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-2 bg-accent px-3 py-1.5">
      <span className="font-mono text-[13px] tracking-wide text-white/90">
        {title}
      </span>
      <div className="flex gap-1">
        <button className="flex h-3.5 w-3.5 items-center justify-center rounded-xs bg-white/20 text-[8px] text-white hover:bg-white/30">
          −
        </button>
        <button className="flex h-3.5 w-3.5 items-center justify-center rounded-xs bg-white/20 text-[8px] text-white hover:bg-white/30">
          □
        </button>
        <button className="flex h-3.5 w-3.5 items-center justify-center rounded-xs bg-red-500/80 text-[8px] text-white hover:bg-red-500">
          ✕
        </button>
      </div>
    </div>
  );
}

export function LandingSection({ personalInfo }: LandingSectionProps) {
  const [firstName, ...rest] = personalInfo.fullName?.split(" ") ?? [
    "Your",
    "Name",
  ];
  const lastName = rest.join(" ");
  const initial = (personalInfo.fullName?.[0] ?? "S").toUpperCase();

  return (
    <section
      id="top"
      className="relative min-h-[calc(100vh-64px)] overflow-hidden"
      style={{
        backgroundColor: "var(--background)",
        backgroundImage: `
          linear-gradient(var(--grid-color) 1px, transparent 1px),
          linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
        `,
        backgroundSize: "28px 28px",
      }}>
      {/* Left icons — About & Projects */}
      <div className="absolute left-4 top-8 flex flex-col gap-3 lg:left-8">
        {nav.slice(0, 2).map((item, i) => (
          <DesktopIcon
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            delay={0.1 + i * 0.07}
          />
        ))}
      </div>

      {/* Right icons — Experience & Contact */}
      <div className="absolute right-4 top-16 flex flex-col gap-3 lg:right-8">
        {nav.slice(2).map((item, i) => (
          <DesktopIcon
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            delay={0.2 + i * 0.07}
          />
        ))}
      </div>

      {/* Center windows */}
      <div className="flex min-h-[calc(100vh-64px-44px)] flex-col items-center md:justify-center justify-end gap-5 md:px-20 py-16">
        {/* Profile window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-150 overflow-hidden rounded-md border border-border shadow-2xl shadow-black/40">
          <WinBar title={`C:\\USER\\portfolio`} />
          <div className="flex items-center gap-5 bg-card p-5">
            {/* Avatar */}
            <div
              className="relative flex h-18 w-18 shrink-0 items-center justify-center rounded-full border border-border text-2xl font-bold text-white"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
              }}>
              <span className="relative z-10">{initial}</span>
              {/* scanline overlay */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-full opacity-20"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px)",
                }}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-0.5 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                hi! i&apos;m
              </p>
              <p className="font-mono text-[26px] leading-[1.1] text-foreground">
                {firstName}{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(to right, var(--accent), var(--accent-secondary))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                  {lastName}
                </span>
              </p>
              <p className="mb-1.5 font-mono text-[10px] tracking-[2px] text-accent">
                {personalInfo.headline?.toUpperCase() ?? "FRONTEND DEVELOPER"}
              </p>
              <span className="text-xs">{personalInfo.bio}</span>
              {personalInfo.availability && (
                <p className="border-l-2 border-border pl-2 font-mono text-[10px] italic text-muted-foreground">
                  &quot;{personalInfo.availability}&quot;
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Taskbar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="absolute bottom-0 inset-x-0 flex h-11 items-center gap-2 border-t border-border bg-card px-3">
        <StartButton />
        <div className="h-6 w-px bg-border" />
        <div className="flex flex-1 gap-1.5 overflow-hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-xs border border-border bg-muted px-2.5 py-1 font-mono text-[10px] text-muted-foreground hover:border-accent/40 hover:text-accent-secondary">
              {item.label.toLowerCase()}.exe
            </a>
          ))}
        </div>
        {/* <Clock /> */}
      </motion.div>
    </section>
  );
}
