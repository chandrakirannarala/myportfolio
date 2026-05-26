export function SkillPill({ skill }: { skill: string }) {
  return (
    <span className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-zinc-300 hover:border-white/20 hover:text-white transition-all duration-200 cursor-default select-none">
      {skill}
    </span>
  );
}
