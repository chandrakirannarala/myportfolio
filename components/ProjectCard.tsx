import { Github } from 'lucide-react';
import type { Project } from '@/data/portfolio';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="reveal group flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-300">
      {/* Title row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-[1.05rem] font-semibold text-white leading-snug group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <a
          href={project.githubUrl ?? '#'}
          aria-label={`GitHub — ${project.title}`}
          className="shrink-0 text-zinc-600 hover:text-zinc-300 transition-colors mt-0.5"
          target="_blank"
          rel="noreferrer"
        >
          <Github size={18} />
        </a>
      </div>

      {/* Description */}
      <p className="text-zinc-400 text-[0.88rem] leading-relaxed flex-1 mb-5">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[0.72rem] text-zinc-400"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
