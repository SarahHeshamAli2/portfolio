"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const MQ = "(prefers-color-scheme: dark)";

export type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme | string | ((prev: Theme) => Theme)) => void;
  resolvedTheme: "light" | "dark";
  forcedTheme: undefined;
  systemTheme: "light" | "dark" | undefined;
  themes: string[];
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/** Bumps subscriber count so useSyncExternalStore re-reads localStorage after same-tab writes. */
const themeExternals = { v: 0 };
const themeListeners = new Set<() => void>();

function subscribeGlobalTheme(storageKey: string, onStoreChange: () => void) {
  themeListeners.add(onStoreChange);
  const mq = window.matchMedia(MQ);
  const onStorage = (e: StorageEvent) => {
    if (e.key === storageKey || e.key === null) onStoreChange();
  };
  mq.addEventListener("change", onStoreChange);
  window.addEventListener("storage", onStorage);
  return () => {
    themeListeners.delete(onStoreChange);
    mq.removeEventListener("change", onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function bumpGlobalThemeConsumers() {
  themeExternals.v += 1;
  themeListeners.forEach((fn) => fn());
}

function systemPref(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia(MQ).matches ? "dark" : "light";
}

function resolve(theme: Theme): "light" | "dark" {
  return theme === "system" ? systemPref() : theme;
}

function applyDocumentTheme(resolved: "light" | "dark") {
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

function deriveDefaultTheme(enableSystem: boolean, defaultTheme: string): Theme {
  if (defaultTheme === "dark" || defaultTheme === "light") return defaultTheme;
  if (defaultTheme === "system" || enableSystem) return "system";
  return "light";
}

function readStoredTheme(storageKey: string, enableSystem: boolean, defaultTheme: string): Theme {
  let stored = deriveDefaultTheme(enableSystem, defaultTheme);
  if (typeof window === "undefined") return stored;
  try {
    const v = localStorage.getItem(storageKey);
    if (v === "light" || v === "dark") stored = v;
    else if (v === "system" && enableSystem) stored = "system";
  } catch {
    /* ignore */
  }
  if (!enableSystem && stored === "system") stored = "light";
  return stored;
}

type ThemeProviderProps = {
  children: ReactNode;
  /** API compatibility — theme is persisted under `storageKey`. */
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  enableColorScheme?: boolean;
  storageKey?: string;
  themes?: string[];
  forcedTheme?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  storageKey = "theme",
}: ThemeProviderProps) {
  const subscribe = useCallback(
    (onChange: () => void) => subscribeGlobalTheme(storageKey, onChange),
    [storageKey],
  );

  const getSnapshot = useCallback((): Theme => {
    void themeExternals.v;
    return readStoredTheme(storageKey, enableSystem, defaultTheme);
  }, [storageKey, enableSystem, defaultTheme]);

  const getServerSnapshot = useCallback(
    (): Theme => deriveDefaultTheme(enableSystem, defaultTheme),
    [enableSystem, defaultTheme],
  );

  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const resolvedTheme = resolve(theme);

  useLayoutEffect(() => {
    applyDocumentTheme(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = useCallback(
    (value: Theme | string | ((prev: Theme) => Theme)) => {
      const current = readStoredTheme(storageKey, enableSystem, defaultTheme);
      const raw =
        typeof value === "function" ? (value as (p: Theme) => Theme)(current) : value;
      let next: Theme =
        raw === "light" || raw === "dark" || raw === "system" ? raw : current;
      if (!enableSystem && next === "system") next = "light";
      try {
        localStorage.setItem(storageKey, next);
      } catch {
        /* ignore */
      }
      bumpGlobalThemeConsumers();
    },
    [storageKey, enableSystem, defaultTheme],
  );

  const value = useMemo((): ThemeContextValue => {
    return {
      theme,
      setTheme,
      resolvedTheme,
      forcedTheme: undefined,
      systemTheme: typeof window === "undefined" ? undefined : systemPref(),
      themes: enableSystem ? ["light", "dark", "system"] : ["light", "dark"],
    };
  }, [theme, resolvedTheme, setTheme, enableSystem]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
