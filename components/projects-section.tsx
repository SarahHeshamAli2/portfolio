"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IconExternalLink, IconBrandGithub } from "@tabler/icons-react";
import type { Project } from "@/lib/types";
import { SectionShell } from "./section-shell";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (projects.length === 0) {
    return (
      <SectionShell id="projects" kicker="Work" title="Projects">
        <p className="max-w-xl text-muted-foreground">
          No projects published yet.
        </p>
      </SectionShell>
    );
  }

  return (
    <SectionShell id="projects" kicker="Selected work" title="Projects">
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, index) => (
          <Card
            key={project._id}
            as={motion.div}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.45,
              delay: index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden transition-[border-color,box-shadow] hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10">
            {/* Cover image */}
            <div className="relative overflow-hidden border-b border-border bg-muted/40 dark:bg-muted/20">
              {project.featured && (
                <span className="absolute right-3 top-3 z-10 rounded-full border border-accent/35 bg-accent/10 px-2.5 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-widest text-accent">
                  Featured
                </span>
              )}
              <div className="absolute inset-0 z-10 bg-linear-to-t from-card/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {project.coverImageUrl ? (
                <div className="relative aspect-video w-full">
                  <Image
                    src={project.coverImageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/50">
                    Preview
                  </span>
                </div>
              )}
            </div>

            {/* Body */}
            <CardContent className="flex flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[17px] font-semibold tracking-tight text-foreground">
                  {project.title}
                </h3>
                <div className="flex shrink-0 gap-1.5">
                  {project.projectUrl && (
                    <Button
                      as="a"
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="sm"
                      className="h-7 border-accent/30 bg-accent/8 font-semibold text-accent hover:bg-accent/15">
                      <IconExternalLink size={11} />
                      Live
                    </Button>
                  )}
                  {project.repoUrl && (
                    <Button
                      as="a"
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="sm"
                      className="h-7">
                      <IconBrandGithub size={11} />
                      Code
                    </Button>
                  )}
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.techStack?.map((tech) => (
                  <span
                    key={`${project._id}-${tech}`}
                    className="rounded-lg border border-border bg-muted/40 px-2.5 py-1 font-mono text-[11px] font-medium  transition-colors group-hover:border-accent/20 dark:bg-accent/40">
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
