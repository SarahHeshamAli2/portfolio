"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "portfolio_terminal_loader_seen";

const SCRIPT_LINES: { prompt: string; text: string }[] = [
  { prompt: "user@portfolio:~$ ", text: "./init --portfolio" },
  { prompt: "", text: "> booting… [####################] 100%" },
  { prompt: "", text: "✓ Portfolio ready." },
];

export function Loading({ children }: { children: React.ReactNode }) {
  return <TerminalLoader>{children}</TerminalLoader>;
}

export function TerminalLoader({ children }: { children: React.ReactNode }) {
  const [overlay, setOverlay] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const reduceMotionRef = useRef(false);

  const dismiss = useCallback(() => {
    setOverlay(false);
    try {
      if (process.env.NODE_ENV === "production") {
        sessionStorage.setItem(STORAGE_KEY, "1");
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    queueMicrotask(() => {
      try {
        if (
          process.env.NODE_ENV === "production" &&
          sessionStorage.getItem(STORAGE_KEY) === "1"
        ) {
          setOverlay(false);
        }
      } catch {
        /* ignore */
      }
    });
  }, []);

  useEffect(() => {
    if (!overlay) return;
    if (reduceMotionRef.current) {
      const t = window.setTimeout(dismiss, 150);
      return () => window.clearTimeout(t);
    }
    const line = SCRIPT_LINES[lineIndex];
    if (!line) {
      const done = window.setTimeout(dismiss, 100);
      return () => window.clearTimeout(done);
    }
    const full = line.text;
    if (charIndex < full.length) {
      const char = full[charIndex] ?? "";
      const delay =
        char === "." || char === "·"
          ? 25
          : char === "/" || char === "<" || char === ">"
            ? 18
            : /\s/.test(char)
              ? 5
              : 10 + Math.floor(Math.random() * 8);
      const t = window.setTimeout(() => setCharIndex((c) => c + 1), delay);
      return () => window.clearTimeout(t);
    }
    const pauseBetween =
      lineIndex < SCRIPT_LINES.length - 1 ? 80 + Math.random() * 40 : 150;
    const t = window.setTimeout(() => {
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    }, pauseBetween);
    return () => window.clearTimeout(t);
  }, [overlay, dismiss, lineIndex, charIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Escape" || e.key === "Enter") && overlay) dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlay, dismiss]);

  return (
    <>
      {children}
      <AnimatePresence>
        {overlay ? (
          <motion.div
            key="terminal-loader"
            role="presentation"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-300 cursor-default overscroll-none">
            {/* Backdrop — uses CSS variable so it adapts to light/dark */}
            <div
              className="relative flex min-h-full min-w-full flex-col items-center justify-center bg-background px-4 py-8 font-(family-name:--font-geist-mono) text-[13px] leading-relaxed antialiased sm:text-sm"
              onClick={dismiss}
              title="Tap to skip">
              {/* CRT scanlines — lighter opacity in light mode */}
              <span className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.07] bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_2px,rgba(0,0,0,0.7)_3px,rgba(0,0,0,0.7)_4px)]" />

              {/* Radial glow — uses hero-glow variable */}
              <span
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, var(--hero-glow) 0%, transparent 55%)",
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-1 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-[0_0_0_1px_rgba(139,124,245,0.08),0_24px_80px_rgba(0,0,0,0.12),0_0_48px_rgba(139,124,245,0.07)] dark:shadow-[0_0_0_1px_rgba(139,124,245,0.08),0_24px_80px_rgba(0,0,0,0.8),0_0_48px_rgba(139,124,245,0.07)]"
                onClick={(e) => e.stopPropagation()}>
                {/* Titlebar */}
                <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-2.5">
                  <span className="flex gap-1.5" aria-hidden>
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                  </span>
                  <span className="flex-1 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    bash · portfolio
                  </span>
                  <span className="w-14" aria-hidden />
                </div>

                {/* Terminal body */}
                <div className="space-y-1.5 px-5 py-5 text-left text-foreground sm:min-h-50 sm:p-6">
                  {SCRIPT_LINES.slice(0, lineIndex).map((row, idx) => (
                    <div
                      key={`done-${idx}`}
                      className="whitespace-pre-wrap wrap-break-word">
                      {row.prompt ? (
                        <span className="text-accent">{row.prompt}</span>
                      ) : (
                        <span className="text-accent opacity-60">┃ </span>
                      )}
                      {row.text}
                    </div>
                  ))}

                  {lineIndex < SCRIPT_LINES.length ? (
                    <div className="whitespace-pre-wrap wrap-break-word">
                      {SCRIPT_LINES[lineIndex]?.prompt ? (
                        <span className="text-accent">
                          {SCRIPT_LINES[lineIndex].prompt}
                        </span>
                      ) : (
                        <span className="text-accent opacity-60">┃ </span>
                      )}
                      {SCRIPT_LINES[lineIndex]?.text.slice(0, charIndex)}
                      <span className="ml-px inline-block w-2 animate-pulse text-accent motion-reduce:animate-none motion-reduce:opacity-75">
                        ▎
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* Footer */}
                <div className="border-t border-border px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]">
                  Tap backdrop · Esc · Enter to skip
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
