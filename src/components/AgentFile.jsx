import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CORNER_POSITIONS = [
  "top-0 left-0 border-t border-l",
  "top-0 right-0 border-t border-r",
  "bottom-0 left-0 border-b border-l",
  "bottom-0 right-0 border-b border-r",
];

/**
 * One full-screen "personnel file" slide: photo with HUD corner frame +
 * scanning sweep on mount, and an info panel with name/degree/skills.
 * Draggable left/right (mouse + touch via Framer Motion) to change slide.
 */
export default function AgentFile({ agent, index, total, onNext, onPrev }) {
  const [scanned, setScanned] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setScanned(false);
    setImgFailed(false);
    const t = setTimeout(() => setScanned(true), 1300);
    return () => clearTimeout(t);
  }, [agent.code]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      drag="x"
      dragElastic={0.12}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, info) => {
        if (info.offset.x < -80 || info.velocity.x < -400) onNext();
        else if (info.offset.x > 80 || info.velocity.x > 400) onPrev();
      }}
      className="flex h-full w-full cursor-grab flex-col items-center justify-center gap-8 px-6 py-8 active:cursor-grabbing sm:flex-row sm:gap-14 sm:px-16"
    >
      {/* PHOTO + HUD FRAME */}
      <div className="relative aspect-[4/5] w-full max-w-[240px] shrink-0 overflow-hidden border border-[var(--color-line)] bg-[var(--color-charcoal)] sm:max-w-[300px]">
        {!imgFailed ? (
          <img
            src={agent.image}
            alt={agent.name}
            draggable={false}
            className="h-full w-full select-none object-cover object-top"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[var(--color-charcoal-2)] font-[var(--font-mono)] text-[var(--color-ink-dim)]">
            <span className="text-3xl">▢</span>
            <span className="text-[9px] tracking-[0.2em]">NO PHOTO ON FILE</span>
          </div>
        )}

        {CORNER_POSITIONS.map((pos) => (
          <span
            key={pos}
            className={`pointer-events-none absolute h-5 w-5 ${pos} border-[var(--color-cyan)]`}
          />
        ))}

        {!scanned && (
          <div
            className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-[var(--color-cyan)]/30 to-transparent"
            style={{ animation: "scan-sweep 1.3s linear 1" }}
          />
        )}

        <div
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: "inset 0 0 40px 8px rgba(0,0,0,0.35)" }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scanned ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/70 px-2 py-1 font-[var(--font-mono)] text-[9px] tracking-[0.2em] text-[var(--color-cyan)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]" />
          IDENTITY VERIFIED
        </motion.div>

        <div className="absolute top-2 right-2 font-[var(--font-mono)] text-[9px] tracking-[0.2em] text-[var(--color-ink-dim)]">
          {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </div>
      </div>

      {/* INFO PANEL */}
      <div className="flex w-full max-w-md flex-col text-center sm:text-left">
        <div className="mb-2 font-[var(--font-mono)] text-[10px] tracking-[0.3em] text-[var(--color-cyan)]">
          AGENT FILE // {agent.code}
        </div>
        <h2 className="font-[var(--font-display)] text-2xl font-bold leading-tight text-white sm:text-3xl">
          {agent.name}
        </h2>
        {agent.degree && (
          <p className="mt-1 font-[var(--font-mono)] text-xs text-[var(--color-ink-dim)] sm:text-sm">
            {agent.degree}
          </p>
        )}

        <div className="mt-6 border-t border-[var(--color-line)] pt-4">
          <div className="mb-2 font-[var(--font-mono)] text-[9px] tracking-[0.3em] text-[var(--color-ink-dim)]">
            SKILL AREA
          </div>
          {agent.expertise && agent.expertise.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              {agent.expertise.map((skill) => (
                <span
                  key={skill}
                  className="border border-[var(--color-line)] bg-[var(--color-charcoal-2)] px-2.5 py-1 font-[var(--font-mono)] text-[10px] tracking-wide text-[var(--color-ink)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="font-[var(--font-mono)] text-xs italic text-[var(--color-ink-dim)]">
              DATA BELUM TERSEDIA
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
