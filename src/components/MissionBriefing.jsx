import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LOGS = [
  {
    tag: "LOG_001 · 90 HARI LALU",
    text: "Divisi Riset Sistem Informasi kehilangan kontak dengan Agent Sigma, arsiparis senior penjaga The Core — artefak yang menjadi sumber inovasi dan kolaborasi setiap generasi Agent S.I.",
  },
  {
    tag: "LOG_002 · TRANSMISI TERAKHIR",
    text: "Rekaman rusak. Sinyal penuh gangguan. Satu kalimat bertahan dari kebisingan — sebuah teka-teki tentang cara \u201cmelihat\u201d tanpa mata biasa.",
    glitch: true,
  },
  {
    tag: "LOG_003 · STATUS SAAT INI",
    text: "Tim MIB membuka markas darurat. Perekrutan agen baru dimulai — bukan sekadar orientasi, tapi misi nyata.",
  },
  {
    tag: "LOG_004 · PERINGATAN",
    text: "Dicurigai ada pihak dalam kampus yang terlibat memindahkan atau menyembunyikan Core sebelum PKKMB dimulai. Motif belum diketahui.",
    warn: true,
  },
];

/**
 * Cinematic story opener: a corrupted-transmission mission briefing that
 * sets up the Agent Sigma / The Core narrative before the recruit ever
 * reaches the case board. Log entries reveal one at a time; a brief
 * static/glitch burst plays once on mount (CSS only, not continuous).
 */
export default function MissionBriefing({ onEnter }) {
  const [revealed, setRevealed] = useState(0);
  const [showMission, setShowMission] = useState(false);

  useEffect(() => {
    if (revealed >= LOGS.length) {
      const t = setTimeout(() => setShowMission(true), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setRevealed((r) => r + 1), 1400);
    return () => clearTimeout(t);
  }, [revealed]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 40%, #0c0f12 0%, #030405 60%, #000 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, white 0px, white 1px, transparent 1px, transparent 3px)",
          }}
        />
        <div
          className="absolute inset-0 bg-white"
          style={{ animation: "static-burst 0.9s steps(2) 1" }}
        />
        <div
          className="absolute inset-0"
          style={{ boxShadow: "inset 0 0 240px 70px rgba(0,0,0,0.9)" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-2xl flex-col justify-center px-6 py-10 sm:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center gap-2 font-[var(--font-mono)] text-[10px] tracking-[0.35em] text-[var(--color-red)] sm:text-xs"
        >
          <span
            className="h-2 w-2 rounded-full bg-[var(--color-red)]"
            style={{ animation: "blink-dot 1s infinite" }}
          />
          TRANSMISI MASUK — SINYAL TERPUTUS
        </motion.div>

        <div className="flex flex-col gap-5">
          {LOGS.map((log, i) => (
            <motion.div
              key={log.tag}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: revealed > i ? 1 : 0, x: revealed > i ? 0 : -10 }}
              transition={{ duration: 0.5 }}
              className="border-l-2 pl-4"
              style={{
                borderColor: log.warn ? "var(--color-red)" : "var(--color-line)",
              }}
            >
              <div
                className="mb-1 font-[var(--font-mono)] text-[9px] tracking-[0.25em] sm:text-[10px]"
                style={{
                  color: log.warn ? "var(--color-red)" : "var(--color-ink-dim)",
                }}
              >
                {log.tag}
              </div>
              <p
                className={`font-[var(--font-body)] text-sm leading-relaxed text-[var(--color-ink)] sm:text-base ${
                  log.glitch ? "italic" : ""
                }`}
              >
                {log.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showMission ? 1 : 0, y: showMission ? 0 : 10 }}
          transition={{ duration: 0.5 }}
          className="mt-9 border-t border-[var(--color-line)] pt-6"
        >
          <div className="mb-1 font-[var(--font-mono)] text-[9px] tracking-[0.3em] text-[var(--color-cyan)] sm:text-[10px]">
            MISI ANDA
          </div>
          <p className="mb-6 font-[var(--font-mono)] text-xs leading-relaxed text-[var(--color-ink-dim)] sm:text-sm">
            Susun ulang petunjuk. Lupakan pola pikir lama. Temukan The Core —
            sebelum jatuh ke tangan yang salah.
          </p>
          <button
            onClick={onEnter}
            disabled={!showMission}
            className="group flex items-center gap-3 border border-[var(--color-cyan)] bg-[var(--color-cyan)]/5 px-5 py-2.5 font-[var(--font-mono)] text-[11px] tracking-[0.3em] text-[var(--color-cyan)] transition-colors duration-200 hover:bg-[var(--color-cyan)]/15 disabled:opacity-0 sm:px-6 sm:py-3 sm:text-xs"
          >
            BUKA MARKAS INVESTIGASI
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
