type DetailSectionProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function DetailSection({ title, subtitle, children }: DetailSectionProps) {
  return (
    <section className="border-t border-zinc-200 px-4 py-6">
      <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-zinc-500">{subtitle}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}
