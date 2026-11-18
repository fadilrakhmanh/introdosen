export default function SliderControls({ onPrev, onNext, canPrev, canNext }) {
  const base =
    "font-[var(--font-mono)] text-[10px] tracking-[0.25em] border border-[var(--color-line)] px-4 py-2 transition-colors duration-200 disabled:opacity-25 disabled:cursor-not-allowed hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]";
  return (
    <div className="flex items-center gap-3">
      <button onClick={onPrev} disabled={!canPrev} className={base}>
        ← PREV
      </button>
      <button onClick={onNext} disabled={!canNext} className={base}>
        NEXT →
      </button>
    </div>
  );
}
