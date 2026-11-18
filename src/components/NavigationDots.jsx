export default function NavigationDots({ total, index, onSelect }) {
  return (
    <div className="flex items-center gap-3 font-[var(--font-mono)] text-[11px] text-[var(--color-ink-dim)]">
      <span className="mono-tabular text-[var(--color-cyan)]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span>/</span>
      <span className="mono-tabular">{String(total).padStart(2, "0")}</span>

      <div className="ml-2 flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            aria-label={`Go to agent ${i + 1}`}
            className="h-[3px] rounded-full transition-all duration-300"
            style={{
              width: i === index ? "18px" : "6px",
              background: i === index ? "var(--color-cyan)" : "var(--color-line)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
