import { motion } from "framer-motion";
import { lecturers } from "../data/lecturers";

const HUB_CODE = "QLB"; // Bu Qilba — kepala program, jadi pusat jaringan

function CardPhoto({ image, name }) {
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover grayscale-[20%]"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-[var(--color-charcoal-2)]">
      <svg viewBox="0 0 100 100" className="h-1/2 w-1/2 opacity-25">
        <circle cx="50" cy="36" r="18" fill="var(--color-ink-dim)" />
        <path d="M12 96c4-24 20-38 38-38s34 14 38 38" fill="var(--color-ink-dim)" />
      </svg>
    </div>
  );
}

function seeded(seedInit) {
  let seed = seedInit;
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function buildNetwork() {
  const rand = seeded(11);
  const hub = lecturers.find((l) => l.code === HUB_CODE);
  const rest = lecturers.filter((l) => l.code !== HUB_CODE);

  const innerCount = 8;
  const inner = rest.slice(0, innerCount);
  const outer = rest.slice(innerCount);

  const innerRx = 16;
  const innerRy = 27;
  const outerRx = 30;
  const outerRy = 45;
  const centerX = 50;
  const centerY = 50;
  const jitter = 1.6;

  const innerNodes = inner.map((l, i) => {
    const angle = (i / inner.length) * 2 * Math.PI - Math.PI / 2;
    return {
      ...l,
      ring: "inner",
      x: centerX + innerRx * Math.cos(angle) + (rand() - 0.5) * jitter,
      y: centerY + innerRy * Math.sin(angle) + (rand() - 0.5) * jitter,
      rotate: (rand() - 0.5) * 20,
      taped: rand() > 0.45,
      stamped: rand() > 0.8,
    };
  });

  const outerStep = (2 * Math.PI) / outer.length;
  const outerNodes = outer.map((l, i) => {
    const angle = i * outerStep - Math.PI / 2 + outerStep / 2;
    return {
      ...l,
      ring: "outer",
      x: centerX + outerRx * Math.cos(angle) + (rand() - 0.5) * jitter,
      y: centerY + outerRy * Math.sin(angle) + (rand() - 0.5) * jitter,
      rotate: (rand() - 0.5) * 24,
      taped: rand() > 0.5,
      stamped: rand() > 0.82,
    };
  });

  const nodes = [...innerNodes, ...outerNodes];

  const crossLinks = [];
  for (let i = 0; i < 12; i++) {
    const a = nodes[Math.floor(rand() * nodes.length)];
    const b = nodes[Math.floor(rand() * nodes.length)];
    if (a && b && a.code !== b.code) crossLinks.push([a, b]);
  }

  const notes = [
    { text: "VERIFY", x: 8, y: 20, r: -6 },
    { text: "LINKED", x: 91, y: 24, r: 5 },
    { text: "SOURCE UNKNOWN", x: 6, y: 78, r: 4 },
    { text: "CROSS-REF", x: 92, y: 74, r: -4 },
    { text: "PENDING", x: 50, y: 10, r: 0 },
  ];

  const scatter = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: rand() * 90 + 5,
    y: rand() * 80 + 8,
    kind: i % 3 === 0 ? "x" : "pin",
    r: (rand() - 0.5) * 40,
  }));

  return { hub, nodes, centerX, centerY, crossLinks, notes, scatter };
}

const { hub, nodes, centerX, centerY, crossLinks, notes, scatter } = buildNetwork();

export default function CaseBoardIntro({ onEnter }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col overflow-hidden bg-[var(--color-void)]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 50%, #12191f 0%, #05070a 55%, #030405 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ boxShadow: "inset 0 0 200px 50px rgba(0,0,0,0.8)" }}
        />
        <svg
          viewBox="0 0 200 100"
          className="absolute right-4 top-4 h-8 w-16 opacity-[0.12] sm:right-8 sm:top-6 sm:h-10 sm:w-20"
        >
          <ellipse cx="100" cy="55" rx="90" ry="16" fill="var(--color-cyan)" />
          <ellipse cx="100" cy="38" rx="34" ry="22" fill="var(--color-cyan)" />
        </svg>

        <div
          className="absolute -left-10 -top-10 h-16 w-40 opacity-40"
          style={{
            background:
              "repeating-linear-gradient(45deg, #f5b400 0 10px, #05070a 10px 20px)",
            transform: "rotate(-45deg)",
          }}
        />

        <svg
          viewBox="0 0 40 40"
          className="absolute bottom-4 left-4 h-8 w-8 opacity-[0.18] sm:bottom-6 sm:left-8 sm:h-10 sm:w-10"
        >
          <circle cx="17" cy="17" r="12" fill="none" stroke="var(--color-ink)" strokeWidth="2.5" />
          <line x1="26" y1="26" x2="36" y2="36" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 shrink-0 pt-4 text-center sm:pt-6"
      >
        <div className="mb-1.5 flex items-center justify-center gap-2 font-[var(--font-mono)] text-[9px] tracking-[0.3em] text-[var(--color-red)] sm:text-[10px]">
          <span className="h-[3px] w-[3px] rounded-full bg-[var(--color-red)]" />
          CASE FILE — XF-04 · UNIDENTIFIED ORIGIN
        </div>
        <h1 className="font-[var(--font-display)] text-lg font-bold tracking-tight text-white sm:text-2xl">
          SENIOR AGENT
        </h1>
        <p className="mt-1 font-[var(--font-mono)] text-[10px] tracking-wide text-[var(--color-ink-dim)] sm:text-xs">
          {lecturers.length} PERSONNEL FILES · NETWORK ROOTED AT AGENT &quot;{HUB_CODE}&quot;
        </p>
      </motion.div>

      <div className="relative z-10 min-h-0 flex-1">
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="laserGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.7" />
            </filter>
          </defs>
          <g filter="url(#laserGlow)">
            {nodes.map((n, i) => (
              <motion.line
                key={`glow-${n.code}`}
                x1={centerX}
                y1={centerY}
                x2={n.x}
                y2={n.y}
                stroke="var(--color-red)"
                strokeWidth={0.5}
                strokeOpacity={0.55}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.55 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.02 }}
              />
            ))}
          </g>
          <g>
            {nodes.map((n, i) => (
              <motion.line
                key={`core-${n.code}`}
                x1={centerX}
                y1={centerY}
                x2={n.x}
                y2={n.y}
                stroke="var(--color-red)"
                strokeWidth={0.12}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.02 }}
                style={{ animation: "laser-pulse 2.4s ease-in-out infinite" }}
              />
            ))}
          </g>

          <g filter="url(#laserGlow)">
            {crossLinks.map(([a, b], i) => (
              <motion.line
                key={`cross-glow-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--color-red)"
                strokeWidth={0.28}
                strokeOpacity={0.3}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.03 }}
              />
            ))}
          </g>
          <g>
            {crossLinks.map(([a, b], i) => (
              <motion.line
                key={`cross-core-${i}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--color-red)"
                strokeWidth={0.06}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.45 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.03 }}
              />
            ))}
          </g>
        </svg>

        {notes.map((note) => (
          <div
            key={note.text}
            className="pointer-events-none absolute z-10 hidden font-[var(--font-mono)] text-[7px] tracking-[0.15em] text-[var(--color-red)]/70 sm:block"
            style={{
              left: `${note.x}%`,
              top: `${note.y}%`,
              transform: `translate(-50%, -50%) rotate(${note.r}deg)`,
            }}
          >
            {note.text}
          </div>
        ))}

        {scatter.map((s) => (
          <div
            key={s.id}
            className="pointer-events-none absolute z-0"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              transform: `translate(-50%, -50%) rotate(${s.r}deg)`,
            }}
          >
            {s.kind === "pin" ? (
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-red)]/50" />
            ) : (
              <span className="font-[var(--font-mono)] text-[10px] text-[var(--color-red)]/30">
                ✕
              </span>
            )}
          </div>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="absolute z-20"
          style={{
            left: `${centerX}%`,
            top: `${centerY}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative">
            <div
              className="absolute inset-0 -m-2 rounded-full border border-[var(--color-red)]"
              style={{ animation: "radar-pulse 2.4s ease-out infinite" }}
            />
            <div className="absolute -right-3 -top-3 z-10 rotate-[10deg] border border-[var(--color-red)] bg-[var(--color-void)] px-1.5 py-0.5 font-[var(--font-mono)] text-[7px] font-bold tracking-[0.1em] text-[var(--color-red)] sm:text-[8px]">
              MASTER FILE
            </div>
            <div className="relative border-2 border-[var(--color-red)] bg-[var(--color-charcoal)] p-1 shadow-[0_0_22px_2px_rgba(255,77,94,0.35)]">
              <div className="relative aspect-[3/4] w-[clamp(58px,9vh,104px)] overflow-hidden bg-[var(--color-charcoal-2)]">
                <CardPhoto image={hub.image} name={hub.name} />
              </div>
              <div className="mt-1 text-center">
                <div className="font-[var(--font-mono)] text-[8px] tracking-[0.1em] text-[var(--color-red)] sm:text-[9px]">
                  HEAD OF PROGRAM
                </div>
                <div className="font-[var(--font-mono)] text-[9px] font-bold tracking-[0.15em] text-white sm:text-[11px]">
                  &quot;{hub.code}&quot;
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {nodes.map((n, i) => {
          const size =
            n.ring === "inner" ? "clamp(38px,5.4vh,60px)" : "clamp(28px,4vh,46px)";
          return (
            <motion.div
              key={n.code}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, rotate: n.rotate }}
              transition={{ duration: 0.35, delay: 0.35 + i * 0.02 }}
              className="absolute z-10"
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                translateX: "-50%",
                translateY: "-50%",
              }}
            >
              <div className="relative">
                <div className="absolute -top-1 left-1/2 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--color-red)] shadow-[0_0_5px_1px_rgba(255,77,94,0.7)]" />
                {n.taped && (
                  <div className="absolute -top-1.5 right-0 z-10 h-2.5 w-5 rotate-[18deg] bg-[var(--color-ink)]/20" />
                )}
                <div className="border border-[var(--color-line)] bg-[var(--color-charcoal)] p-[3px] shadow-[0_4px_14px_-4px_rgba(0,0,0,0.7)]">
                  <div
                    className="relative aspect-[3/4] overflow-hidden bg-[var(--color-charcoal-2)]"
                    style={{ width: size }}
                  >
                    <CardPhoto image={n.image} name={n.name} />
                    {n.stamped && (
                      <span className="absolute bottom-0.5 right-0.5 rotate-[-8deg] border border-[var(--color-red)]/80 bg-black/40 px-1 py-[1px] font-[var(--font-mono)] text-[5.5px] font-bold leading-none tracking-[0.05em] text-[var(--color-red)]">
                        CLASS.
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-center font-[var(--font-mono)] text-[7px] tracking-[0.08em] text-[var(--color-cyan)] sm:text-[8px]">
                    &quot;{n.code}&quot;
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        className="relative z-10 flex shrink-0 flex-col items-center gap-1.5 pb-4 sm:pb-6"
      >
        <button
          onClick={onEnter}
          className="group flex items-center gap-3 border border-[var(--color-cyan)] bg-[var(--color-cyan)]/5 px-5 py-2.5 font-[var(--font-mono)] text-[11px] tracking-[0.3em] text-[var(--color-cyan)] transition-colors duration-200 hover:bg-[var(--color-cyan)]/15 sm:px-6 sm:py-3 sm:text-xs"
        >
          BUKA INVESTIGASI
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </button>
        <span className="font-[var(--font-mono)] text-[8px] tracking-[0.25em] text-[var(--color-ink-dim)] sm:text-[9px]">
          CLEARANCE LEVEL 4 REQUIRED
        </span>
      </motion.div>
    </motion.div>
  );
}
