import type { ContactInfo, SocialLink } from "@/lib/types";
import { SectionShell } from "./section-shell";
import {
  IconMail,
  IconPhone,
  IconSend2, // send button
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
interface ContactSectionProps {
  contact: ContactInfo;
  socialLinks: SocialLink[];
}

const inputClass =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-sm transition-[border-color,box-shadow] placeholder:text-muted-foreground focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/25 dark:bg-card/80";

export function ContactSection({ contact, socialLinks }: ContactSectionProps) {
  return (
    <SectionShell id="contact" kicker="Say hello" title="Contact">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)] lg:items-start">
        {/* Form */}
        {contact.contactFormEndpoint ? (
          <form
            action={contact.contactFormEndpoint}
            method="POST"
            className="grid gap-3.5">
            <div className="grid gap-3.5 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                className={inputClass}
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className={inputClass}
            />
            <textarea
              name="message"
              required
              placeholder="Your message…"
              rows={5}
              className={`${inputClass} min-h-[130px] resize-y`}
            />
            <button
              type="submit"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-secondary px-7 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <IconSend2 className="size-4" />
              Send message
            </button>
          </form>
        ) : null}

        {/* Sidebar */}
        <aside className="flex flex-col gap-7 rounded-2xl border border-border bg-muted/30 p-6 dark:bg-muted/20">
          {(contact.email || contact.phone) && (
            <div>
              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted-foreground mb-3.5">
                Direct
              </p>
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center gap-2.5 rounded-xl border border-transparent px-3 py-2.5 text-[13.5px] font-medium text-foreground transition-colors hover:border-accent/25 hover:bg-accent/5 hover:text-accent mb-1.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors group-hover:border-accent/30 group-hover:text-accent">
                    <IconMail className="size-3.5" />
                  </span>
                  {contact.email}
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="group flex items-center gap-2.5 rounded-xl border border-transparent px-3 py-2.5 text-[13.5px] font-medium text-foreground transition-colors hover:border-accent/25 hover:bg-accent/5 hover:text-accent">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors group-hover:border-accent/30 group-hover:text-accent">
                    <IconPhone className="size-3.5" />
                  </span>
                  {contact.phone}
                </a>
              )}
            </div>
          )}

          {socialLinks.length > 0 && (
            <div>
              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted-foreground mb-3.5">
                Social
              </p>
              <div className="flex flex-wrap gap-1.5">
                {socialLinks.map((link) => (
                  <a
                    key={link._key || `${link.platform}-${link.url}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-border bg-card px-3.5 py-1.5 text-[12.5px] font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-accent/5 hover:text-accent">
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted-foreground mb-3.5">
              Availability
            </p>
            <div className="flex items-center gap-2 text-[13.5px] font-medium text-foreground">
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-green-500" />
              </span>
              Open to opportunities
            </div>
          </div>
        </aside>
      </div>
    </SectionShell>
  );
}
