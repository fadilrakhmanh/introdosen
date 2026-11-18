import { AnimatePresence, motion } from "framer-motion";
import { lecturers } from "../data/lecturers";
import { useHorizontalSlider } from "../hooks/useHorizontalSlider";
import AgentFile from "./AgentFile";

/**
 * "Berkas Personel" — one full-screen personnel file per lecturer.
 * Navigate via scroll wheel, arrow keys, drag/swipe, dot indicators,
 * or the prev/next controls.
 */
export default function PersonnelSlider() {
  const total = lecturers.length;
  const { index, next, prev, goTo, isFirst, isLast, containerRef } =
    useHorizontalSlider(total);
  const agent = lecturers[index];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-30 flex flex-col overflow-hidden"
    >
      {/* header */}
      <div className="flex items-center justify-between px-6 pt-6 sm:px-10">
        <div className="font-[var(--font-mono)] text-[9px] tracking-[0.3em] text-[var(--color-ink-dim)] sm:text-xs">
          BERKAS PERSONEL // DIVISI SISTEM INFORMASI
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]"
            style={{ animation: "blink-dot 1.4s infinite" }}
          />
          <span className="font-[var(--font-mono)] text-[9px] tracking-[0.2em] text-[var(--color-cyan)] sm:text-[10px]">
            LIVE ACCESS
          </span>
        </div>
      </div>

      {/* slide area */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <AgentFile
            key={agent.code}
            agent={agent}
            index={index}
            total={total}
            onNext={next}
            onPrev={prev}
          />
        </AnimatePresence>

        <button
          onClick={prev}
          disabled={isFirst}
          aria-label="Sebelumnya"
          className="absolute left-2 top-1/2 hidden -translate-y-1/2 border border-[var(--color-line)] bg-black/40 px-2 py-3 font-[var(--font-mono)] text-[var(--color-cyan)] transition-opacity hover:bg-black/60 disabled:opacity-20 sm:block"
        >
          ‹
        </button>
        <button
          onClick={next}
          disabled={isLast}
          aria-label="Berikutnya"
          className="absolute right-2 top-1/2 hidden -translate-y-1/2 border border-[var(--color-line)] bg-black/40 px-2 py-3 font-[var(--font-mono)] text-[var(--color-cyan)] transition-opacity hover:bg-black/60 disabled:opacity-20 sm:block"
        >
          ›
        </button>
      </div>

      {/* footer nav */}
      <div className="flex flex-col items-center gap-4 pb-8">
        <div className="flex items-center gap-3 sm:hidden">
          <button
            onClick={prev}
            disabled={isFirst}
            className="border border-[var(--color-line)] px-4 py-1.5 font-[var(--font-mono)] text-xs text-[var(--color-cyan)] disabled:opacity-20"
          >
            ‹ PREV
          </button>
          <button
            onClick={next}
            disabled={isLast}
            className="border border-[var(--color-line)] px-4 py-1.5 font-[var(--font-mono)] text-xs text-[var(--color-cyan)] disabled:opacity-20"
          >
            NEXT ›
          </button>
        </div>

        <div className="flex max-w-[90vw] flex-wrap justify-center gap-1.5 px-4">
          {lecturers.map((l, i) => (
            <button
              key={l.code}
              onClick={() => goTo(i)}
              aria-label={l.name}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === index ? "18px" : "6px",
                background: i === index ? "var(--color-cyan)" : "var(--color-line)",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
