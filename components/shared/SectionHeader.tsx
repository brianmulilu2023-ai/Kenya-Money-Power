type SectionHeaderProps = {
  title: string;
  description?: string;
};

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm uppercase tracking-[0.35em] text-gold">{title}</p>
      {description ? <p className="max-w-2xl text-3xl font-semibold text-slate-900 sm:text-4xl">{description}</p> : null}
    </div>
  );
}
