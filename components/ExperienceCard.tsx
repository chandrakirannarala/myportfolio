import { BriefcaseBusiness } from 'lucide-react';
import type { Experience } from '@/data/portfolio';

export function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <article className="reveal relative pl-12 pb-12 last:pb-0">
      {/* Timeline dot with icon — matches reference */}
      <div className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-surface text-zinc-400">
        <BriefcaseBusiness size={16} />
      </div>

      {/* Connector line */}
      <div className="absolute left-[17px] top-9 bottom-0 w-px bg-white/[0.06] last:hidden" />

      {/* Header row: company + date badge */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
        <h3 className="text-xl font-semibold text-white leading-snug">
          {exp.company}
        </h3>
        <span className="shrink-0 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-400 font-medium mt-0.5">
          {exp.period}
        </span>
      </div>

      {/* Role + location */}
      <p className="text-sm mb-4">
        <span className="text-zinc-300 font-medium">{exp.role}</span>
        {exp.location && (
          <>
            <span className="text-zinc-600 mx-1.5">•</span>
            <span className="text-zinc-500">{exp.location}</span>
          </>
        )}
      </p>

      {/* Bullet points */}
      <ul className="space-y-2">
        {exp.points.map((point) => (
          <li key={point} className="text-zinc-400 text-[0.93rem] leading-relaxed flex gap-2">
            <span className="text-zinc-600 mt-[7px] shrink-0 text-[0.45rem]">●</span>
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}
