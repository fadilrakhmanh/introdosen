import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScanningEffect({ playKey }) {
  const [percent, setPercent] = useState(0);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    setPercent(0);
    setVerified(false);
    let raf;
    const duration = 1100;
    const start = performance.now();

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      setPercent(Math.floor(t * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setVerified(true);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playKey]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {!verified && (
        <motion.div
          key={`sweep-${playKey}`}
          className="absolute left-0 right-0 h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-cyan), transparent)",
            boxShadow: "0 0 12px 2px var(--color-cyan)",
          }}
          initial={{ top: "0%" }}
          animate={{ top: "100%" }}
          transition={{ duration: 1.1, ease: "linear" }}
        />
      )}

      <motion.div
        className="absolute inset-0"
        style={{ background: "var(--color-cyan)" }}
        initial={{ opacity: 0.06 }}
        animate={{ opacity: verified ? 0 : 0.06 }}
        transition={{ duration: 0.4 }}
      />

      <div className="absolute bottom-3 left-3 font-[var(--font-mono)] text-[11px] tracking-wider">
        <AnimatePresence mode="wait">
          {!verified ? (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 rounded-sm bg-black/60 px-2 py-1 text-[var(--color-cyan)]"
            >
              <span>SCANNING</span>
              <span className="mono-tabular">{percent}%</span>
            </motion.div>
          ) : (
            <motion.div
              key="verified"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 rounded-sm bg-black/60 px-2 py-1 text-emerald-400"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ animation: "blink-dot 1.6s infinite" }} />
              <span>IDENTITY VERIFIED</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
