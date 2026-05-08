import type { PersonalInfo } from "@/lib/types";
import { SectionShell } from "./section-shell";

interface AboutSectionProps {
  personalInfo: PersonalInfo;
}

export function AboutSection({ personalInfo }: AboutSectionProps) {
  return (
    <SectionShell id="about" kicker="Profile" title="About">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:items-start">
        <p className="max-w-3xl font-sans text-lg leading-relaxed text-muted-foreground">
          {personalInfo.bio}
        </p>

        {/* Terminal card */}
        <div className="overflow-hidden rounded-xl border border-border bg-muted/30 dark:bg-[#0c0a10]">
          {/* Topbar */}
          <div className="flex items-center gap-1.5 border-b border-border bg-muted/60 dark:bg-[#111019] px-3.5 py-2.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>

          {/* Body */}
          <div className="p-5 font-mono">
            <p className="mb-3 text-sm text-accent before:content-['$_']">
              skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {personalInfo.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-[#3d3560] bg-muted/40 px-2.5 py-1 text-xs font-medium dark:text-[#c4bdf5] transition-colors dark:hover:border-accent/60 dark:hover:bg-muted dark:hover:text-[#e0d9ff]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
