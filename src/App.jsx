import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { lecturers } from "./data/lecturers";
import { useHorizontalSlider } from "./hooks/useHorizontalSlider";
import BackgroundFX from "./components/BackgroundFX";
import CaseBoardIntro from "./components/CaseBoardIntro";
import IntroSequence from "./components/IntroSequence";
import AgentSlide from "./components/AgentSlide";
import AgentPreview from "./components/AgentPreview";
import NavigationDots from "./components/NavigationDots";
import SliderControls from "./components/SliderControls";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "35%" : "-35%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? "-35%" : "35%",
    opacity: 0,
  }),
};

export default function App() {
  // stage: "board" -> "boot" -> "main"
  const [stage, setStage] = useState("board");
  const { index, direction, next, prev, goTo, bind } = useHorizontalSlider(
    lecturers.length
  );

  const current = lecturers[index];
  const nextAgent = lecturers[index + 1];
  const prevAgent = lecturers[index - 1];

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[var(--color-void)] font-[var(--font-body)] text-[var(--color-ink)]">
      <BackgroundFX />

      <AnimatePresence mode="wait">
        {stage === "board" && (
          <CaseBoardIntro key="board" onEnter={() => setStage("boot")} />
        )}
        {stage === "boot" && (
          <IntroSequence key="boot" onDone={() => setStage("main")} />
        )}
      </AnimatePresence>

      {stage === "main" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative flex h-full w-full flex-col"
        >
          <header className="flex items-center justify-between px-5 py-4 sm:px-8">
            <div className="font-[var(--font-mono)] text-[10px] tracking-[0.3em] text-[var(--color-ink-dim)]">
              INFORMATION SYSTEM
            </div>
            <div className="hidden items-center gap-1.5 font-[var(--font-mono)] text-[10px] text-[var(--color-ink-dim)] sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]" style={{ animation: "blink-dot 2s infinite" }} />
              SECURITY LEVEL: 4
            </div>
          </header>

          <main className="relative flex-1 touch-pan-y" {...bind}>
            <AgentPreview lecturer={prevAgent} side="left" />
            <AgentPreview lecturer={nextAgent} side="right" />

            <AnimatePresence custom={direction} mode="popLayout">
              <motion.div
                key={current.code}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 will-change-transform"
              >
                <AgentSlide lecturer={current} index={index} active />
              </motion.div>
            </AnimatePresence>
          </main>

          <footer className="flex items-center justify-between px-5 py-5 sm:px-8">
            <NavigationDots total={lecturers.length} index={index} onSelect={goTo} />
            <SliderControls
              onPrev={prev}
              onNext={next}
              canPrev={index > 0}
              canNext={index < lecturers.length - 1}
            />
          </footer>
        </motion.div>
      )}
    </div>
  );
}
