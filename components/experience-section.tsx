import type { Experience } from "@/lib/types";
import { SectionShell } from "./section-shell";

interface ExperienceSectionProps {
  experiences: Experience[];
}

function formatRange(startDate: string, endDate?: string, isCurrent?: boolean) {
  const start = new Date(startDate).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });

  const end = isCurrent || !endDate ? "Present" : new Date(endDate).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });

  return `${start} — ${end}`;
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (experiences.length === 0) {
    return (
      <SectionShell id="experience" kicker="Journey" title="Experience">
        <p className="max-w-xl text-muted-foreground">No experience entries yet.</p>
      </SectionShell>
    );
  }

  return (
    <SectionShell id="experience" kicker="Journey" title="Experience">
      <ol className="relative space-y-0 border-l border-border pl-8">
        {experiences.map((item) => (
          <li key={item._id} className="relative pb-12 last:pb-0">
            <span
              className="absolute -left-[39px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-background bg-accent shadow-[0_0_0_4px_var(--muted)]"
              aria-hidden
            />
            <p className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {formatRange(item.startDate, item.endDate, item.isCurrent)}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
              {item.role}
              <span className="font-normal text-muted-foreground"> · </span>
              <span className="text-lg">{item.company}</span>
            </h3>
            {item.location ? (
              <p className="mt-0.5 text-sm text-muted-foreground">{item.location}</p>
            ) : null}
            <p className="mt-3 max-w-3xl text-muted-foreground leading-relaxed">{item.summary}</p>
            {item.highlights?.length ? (
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {item.highlights.map((h, j) => (
                  <li key={`${item._id}-h-${j}`} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
