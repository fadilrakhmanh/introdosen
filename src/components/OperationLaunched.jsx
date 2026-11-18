import { motion } from "framer-motion";

/**
 * Placeholder closing beat after the recruit accepts the mission.
 * This is where the next chapter (clue puzzle, conspiracy board,
 * recruitment form, etc.) can be built once that part of the story
 * is defined — for now it confirms the operation has begun so the
 * experience doesn't dead-end.
 */
export default function OperationLaunched() {
  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-4 flex items-center gap-2 font-[var(--font-mono)] text-[10px] tracking-[0.35em] text-[var(--color-cyan)]"
      >
        <span
          className="h-2 w-2 rounded-full bg-[var(--color-cyan)]"
          style={{ animation: "blink-dot 1.4s infinite" }}
        />
        STATUS: OPERASI DIMULAI
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="font-[var(--font-display)] text-2xl font-bold tracking-tight text-white sm:text-4xl"
      >
        MARKAS INVESTIGASI TERBUKA
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="mt-4 max-w-md font-[var(--font-mono)] text-xs leading-relaxed text-[var(--color-ink-dim)] sm:text-sm"
      >
        Babak selanjutnya — conspiracy board, petunjuk, dan misi pencarian
        The Core — menyusul di sini.
      </motion.p>
    </div>
  );
}
