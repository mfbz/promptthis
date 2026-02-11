interface SectionProps {
  id: string;
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function Section({
  id,
  number,
  title,
  description,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className="py-12 border-b border-neutral-200 last:border-b-0"
    >
      <div className="mb-8">
        <div className="text-5xl text-neutral-200 leading-none mb-2">
          {number}
        </div>
        <h2 className="text-[28px] font-bold tracking-tight leading-tight">
          {title}
        </h2>
      </div>
      <p className="text-[15px] text-neutral-600 leading-relaxed mb-6 max-w-xl">
        {description}
      </p>
      {children}
    </section>
  );
}
