export function MassBuyStepCard({ step, title, items }: { step: number; title: string; items: string[] }) {
  return (
    <li className="glass group relative flex flex-col overflow-hidden rounded-[1.5rem] p-6 transition duration-500 ease-cine hover:-translate-y-1 hover:border-soft/40">
      <span aria-hidden className="pointer-events-none absolute -right-2 -top-6 font-serif text-[7rem] leading-none text-lilac/[0.06] transition group-hover:text-soft/15">
        {step}
      </span>
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.32em] text-soft">Bước {step}</p>
      <h3 className="mt-2 font-serif text-2xl text-cloud">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-lilac/80">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5">
            <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-soft/70" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}
