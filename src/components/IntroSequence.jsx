import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "SYSTEM INITIALIZING...",
  "ACCESSING PERSONNEL DATABASE...",
  "BIOMETRIC SYSTEM ONLINE...",
  "DATABASE CONNECTED",
  "IDENTITY VERIFICATION SYSTEM READY",
];

export default function IntroSequence({ onDone }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      const t = setTimeout(() => setExiting(true), 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineIndex((i) => i + 1), 420);
    return () => clearTimeout(t);
  }, [lineIndex]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(onDone, 500);
    return () => clearTimeout(t);
  }, [exiting, onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-void)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-md px-8 font-[var(--font-mono)] text-xs sm:text-sm tracking-wider text-[var(--color-cyan)]">
            {LINES.slice(0, lineIndex).map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-2 flex items-center gap-2"
              >
                <span className="text-[var(--color-ink-dim)]">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <span className={i === lineIndex - 1 && i === LINES.length - 1 ? "text-white" : ""}>
                  {line}
                </span>
              </motion.div>
            ))}
            <motion.span
              className="inline-block h-3 w-1.5 bg-[var(--color-cyan)] align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
          </div>

          <div className="absolute bottom-10 font-[var(--font-mono)] text-[10px] tracking-[0.3em] text-[var(--color-ink-dim)]">
            CLASSIFIED // LEVEL-4 CLEARANCE REQUIRED
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
