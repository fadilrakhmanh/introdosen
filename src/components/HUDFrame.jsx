export default function HUDFrame() {
  const corner = "absolute h-5 w-5 border-[var(--color-cyan)]";
  return (
    <div className="pointer-events-none absolute -inset-3 sm:-inset-4">
      <div className={`${corner} left-0 top-0 border-l-2 border-t-2`} />
      <div className={`${corner} right-0 top-0 border-r-2 border-t-2`} />
      <div className={`${corner} left-0 bottom-0 border-l-2 border-b-2`} />
      <div className={`${corner} right-0 bottom-0 border-r-2 border-b-2`} />

      <div className="absolute -right-8 top-1/2 hidden -translate-y-1/2 rotate-90 font-[var(--font-mono)] text-[9px] tracking-[0.3em] text-[var(--color-ink-dim)] md:block">
        34.0522N / 118.2437W
      </div>
    </div>
  );
}
