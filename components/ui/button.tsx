"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent" | "gradient";
  size?: "sm" | "md" | "lg" | "icon";
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
}

const Button = React.forwardRef<HTMLElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", as: Component = motion.button, ...props }, ref) => {
    const variants = {
      primary: "bg-accent text-accent-foreground hover:bg-accent/90",
      secondary: "bg-muted text-foreground hover:bg-muted/80",
      outline: "border border-border bg-transparent hover:bg-accent/10 hover:border-accent/50",
      ghost: "hover:bg-accent/10 hover:text-accent-secondary",
      accent: "bg-accent-secondary text-white hover:opacity-90",
      gradient: "bg-gradient-to-r from-accent to-accent-secondary text-white shadow-lg shadow-accent/20 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98]",
    };

    const sizes = {
      sm: "h-8 px-3 text-[11px]",
      md: "h-10 px-4 text-[13px]",
      lg: "h-12 px-6 text-[15px]",
      icon: "h-10 w-10 p-2",
    };

    const MotionComponent = React.useMemo(() => {
      if (typeof Component === "string") {
        return (motion as unknown as Record<string, React.ElementType>)[Component] || motion.create(Component);
      }
      return Component;
    }, [Component]) as React.ElementType;

    return (
      <MotionComponent
        ref={ref}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] font-mono transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          variants[variant as keyof typeof variants],
          sizes[size as keyof typeof sizes],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
