import { motion } from "framer-motion";

export default function AgentPreview({ lecturer, side }) {
  if (!lecturer) return null;
  const isRight = side === "right";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 flex-col items-center sm:flex ${
        isRight ? "right-2 md:right-8" : "left-2 md:left-8"
      }`}
      style={{ filter: "blur(1.5px)" }}
    >
      <div className="mb-2 font-[var(--font-mono)] text-[9px] tracking-[0.3em] text-[var(--color-ink-dim)]">
        {isRight ? "NEXT SUBJECT" : "PREVIOUS SUBJECT"}
      </div>
      <div className="relative h-[26vh] w-[16vw] max-w-[130px] overflow-hidden border border-[var(--color-line)] bg-[var(--color-charcoal)] opacity-40">
        {lecturer.image ? (
          <img
            src={lecturer.image}
            alt=""
            className="h-full w-full object-cover grayscale"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[var(--color-charcoal-2)]">
            <svg viewBox="0 0 100 100" className="h-1/2 w-1/2 opacity-30">
              <circle cx="50" cy="36" r="18" fill="var(--color-ink-dim)" />
              <path d="M12 96c4-24 20-38 38-38s34 14 38 38" fill="var(--color-ink-dim)" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="mt-2 font-[var(--font-mono)] text-[10px] tracking-wider text-[var(--color-ink-dim)]">
        AGENT &quot;{lecturer.code}&quot;
      </div>
    </motion.div>
  );
}
