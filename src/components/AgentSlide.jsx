import { motion } from "framer-motion";
import HUDFrame from "./HUDFrame";
import ScanningEffect from "./ScanningEffect";

function PhotoOrPlaceholder({ image, name }) {
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover grayscale-[15%] contrast-[1.05]"
        draggable={false}
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-[var(--color-charcoal-2)]">
      <svg viewBox="0 0 100 100" className="h-2/3 w-2/3 opacity-30">
        <circle cx="50" cy="36" r="18" fill="var(--color-ink-dim)" />
        <path
          d="M12 96c4-24 20-38 38-38s34 14 38 38"
          fill="var(--color-ink-dim)"
        />
      </svg>
    </div>
  );
}

export default function AgentSlide({ lecturer, index, active }) {
  return (
    <div className="flex h-full w-full select-none flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : -6 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mb-6 flex items-center gap-2 font-[var(--font-mono)] text-[10px] tracking-[0.3em] text-[var(--color-ink-dim)]"
      >
        <span className="h-[3px] w-[3px] rounded-full bg-[var(--color-red)]" />
        CLASSIFIED PERSONNEL FILE
        <span className="text-[var(--color-line)]">·</span>
        FILE-{lecturer.code} / SEC-04
      </motion.div>

      <div className="relative">
        <HUDFrame />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0.15 }}
          transition={{ duration: 0.35 }}
          className="relative h-[46vh] w-[62vw] max-w-[300px] overflow-hidden border border-[var(--color-line)] bg-[var(--color-charcoal)] shadow-[0_0_60px_-10px_rgba(95,227,224,0.15)] sm:h-[52vh] sm:max-w-[340px]"
        >
          <PhotoOrPlaceholder image={lecturer.image} name={lecturer.name} />
          {active && <ScanningEffect playKey={lecturer.code} />}

          <div className="absolute right-2 top-2 rounded-sm bg-black/60 px-1.5 py-0.5 font-[var(--font-mono)] text-[10px] text-[var(--color-cyan)]">
            SUBJ. {String(index + 1).padStart(2, "0")}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
        transition={{ delay: 0.35, duration: 0.45 }}
        className="mt-6 flex flex-col items-center text-center"
      >
        <div className="font-[var(--font-mono)] text-xs tracking-[0.25em] text-[var(--color-cyan)]">
          AGENT &quot;{lecturer.code}&quot;
        </div>

        <h1 className="mt-2 font-[var(--font-display)] text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {lecturer.name}
        </h1>
        {lecturer.degree && (
          <div className="mt-1 font-[var(--font-mono)] text-xs text-[var(--color-ink-dim)]">
            {lecturer.degree}
          </div>
        )}

        {lecturer.expertise.length > 0 && (
          <div className="mt-5 w-full max-w-sm border-t border-[var(--color-line)] pt-4">
            <div className="mb-2 font-[var(--font-mono)] text-[10px] tracking-[0.3em] text-[var(--color-ink-dim)]">
              SPECIALIZATION
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {lecturer.expertise.map((skill) => (
                <span
                  key={skill}
                  className="rounded-sm border border-[var(--color-line)] bg-[var(--color-charcoal)] px-2.5 py-1 font-[var(--font-mono)] text-[11px] text-[var(--color-ink)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center gap-1.5 font-[var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--color-ink-dim)]">
          STATUS
          <span
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            style={{ animation: "blink-dot 1.8s infinite" }}
          />
          <span className="text-emerald-400">ACTIVE</span>
        </div>
      </motion.div>
    </div>
  );
}
