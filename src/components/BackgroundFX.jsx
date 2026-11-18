/**
 * Ambient investigation-room backdrop: faint perspective grid,
 * drifting particles, and a slow radar sweep. Kept subdued so the
 * photo always stays the visual focus.
 *
 * Performance note: particles are pure CSS animations (GPU-composited,
 * no JS running every frame) instead of a canvas/requestAnimationFrame
 * loop, which was the main cause of continuous lag on lower-powered
 * machines.
 */
const PARTICLE_COUNT = 22;

function seededParticles(count) {
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: rand() * 100,
    size: rand() * 1.6 + 0.6,
    duration: rand() * 14 + 12,
    delay: rand() * -20,
    opacity: rand() * 0.35 + 0.08,
  }));
}

const particles = seededParticles(PARTICLE_COUNT);

export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, #0e1620 0%, #05070a 55%, #030405 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(80% 60% at 50% 30%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(80% 60% at 50% 30%, black 0%, transparent 75%)",
        }}
      />
      <div className="absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-[var(--color-cyan)]"
            style={{
              left: `${p.left}%`,
              bottom: "-10px",
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animation: `drift-up ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, white 0px, white 1px, transparent 1px, transparent 3px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 220px 60px rgba(0,0,0,0.75)" }}
      />
    </div>
  );
}
