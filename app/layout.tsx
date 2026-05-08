import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TerminalLoader } from "@/components/terminal-loader";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import BackToTop from "@/components/back-to-top-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Portfolio",
  description: "AI-assisted portfolio powered by CMS content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider defaultTheme="dark">
          <TerminalLoader>{children}</TerminalLoader>
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
