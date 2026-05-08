import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { LandingSection } from "@/components/landing-section";
import { ProjectsSection } from "@/components/projects-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPortfolioContent } from "@/lib/content";
import { hasSanityConfig } from "@/lib/sanity";

export default async function Home() {
  const { personalInfo, projects, experiences, contact } =
    await getPortfolioContent();

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[min(60vh,520px)] opacity-70 dark:opacity-50"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -20%, color-mix(in oklch, var(--accent) 22%, transparent), transparent), radial-gradient(ellipse 55% 40% at 100% 0%, color-mix(in oklch, var(--accent-secondary) 12%, transparent), transparent)",
        }}
      />

      <SiteHeader brandName={personalInfo.fullName} />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-24 px-5 pb-20 pt-10 sm:gap-28 sm:px-8 lg:gap-20 lg:px-10 lg:pt-14">
        {!hasSanityConfig ? (
          <div className="rounded-2xl border border-amber-500/35 bg-amber-500/8 px-4 py-4 text-sm text-amber-900 dark:border-amber-400/35 dark:bg-amber-400/10 dark:text-amber-100">
            Add your Sanity variables in{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem]">
              .env.local
            </code>{" "}
            to load portfolio content.
          </div>
        ) : null}
        <LandingSection personalInfo={personalInfo} />
        <AboutSection personalInfo={personalInfo} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experiences={experiences} />
        <ContactSection contact={contact} socialLinks={contact.socialLinks} />
      </main>

      <SiteFooter />
    </div>
  );
}
