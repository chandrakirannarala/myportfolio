type Props = {
  title: string;
  subtitle?: string;
};

export function SectionTitle({ title, subtitle }: Props) {
  return (
    <div className="text-center mb-12 reveal">
      <h2 className="text-[2rem] md:text-[2.6rem] font-semibold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-zinc-400 text-base max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
