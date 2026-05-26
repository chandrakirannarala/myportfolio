import { GraduationCap } from 'lucide-react';

export type Education = {
  institution: string;
  degree: string;
  location: string;
  period: string;
  courses?: string[];
};

export function EducationCard({ edu }: { edu: Education }) {
  return (
    <article className="reveal relative pl-12 pb-12 last:pb-0">
      {/* Timeline dot with GraduationCap icon */}
      <div className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 dark:border-white/15 bg-surface text-zinc-400 light-border light-surface">
        <GraduationCap size={16} />
      </div>

      {/* Connector line */}
      <div className="absolute left-[17px] top-9 bottom-0 w-px bg-white/[0.06] dark:bg-white/[0.06] last:hidden connector-line" />

      {/* Header row: institution + date badge */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
        <h3 className="text-xl font-semibold text-white leading-snug">
          {edu.institution}
        </h3>
        <span className="shrink-0 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-400 font-medium mt-0.5 date-badge">
          {edu.period}
        </span>
      </div>

      {/* Degree + location */}
      <p className="text-sm mb-4">
        <span className="text-zinc-300 font-medium">{edu.degree}</span>
        {edu.location && (
          <>
            <span className="text-zinc-600 mx-1.5">•</span>
            <span className="text-zinc-500">{edu.location}</span>
          </>
        )}
      </p>

      {/* Courses */}
      {edu.courses && edu.courses.length > 0 && (
        <ul className="space-y-2">
          {edu.courses.map((course) => (
            <li
              key={course}
              className="text-zinc-400 text-[0.93rem] leading-relaxed flex gap-2"
            >
              <span className="text-zinc-600 mt-[7px] shrink-0 text-[0.45rem]">●</span>
              {course}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
