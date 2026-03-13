import { motion, MotionValue } from "framer-motion";
import type { StrategyStep } from "../data/steps";

interface ProgressIndicatorProps {
  steps: StrategyStep[];
  activeIndex: number;
  scrollProgress: MotionValue<number>;
}

export default function ProgressIndicator({
  steps,
  activeIndex,
  scrollProgress,
}: ProgressIndicatorProps) {
  return (
    <div className="relative md:sticky top-auto md:top-[50vh] md:-translate-y-1/2 flex flex-row md:flex-col items-center justify-center md:items-center gap-3 md:gap-0 w-full md:w-[60px] md:min-w-[60px] self-start mb-5 md:mb-0 py-4 md:py-0">
      <div className="fixed top-0 left-0 w-[2px] h-[100vh] bg-border-subtle z-10 hidden md:block">
        <motion.div
          className="w-full h-full bg-gradient-to-b from-[#FF4D00] via-[#00C2FF] to-[#FFD700]"
          style={{ scaleY: scrollProgress, transformOrigin: "top" }}
        />
      </div>

      <div className="flex flex-row md:flex-col items-center gap-3 md:gap-0">
        {steps.map((step, i) => (
          <div key={step.id} className="flex flex-col items-center">
            <motion.div
              className="w-[10px] h-[10px] rounded-full border-[1.5px] cursor-pointer"
              style={{ "--accent": step.accent } as React.CSSProperties}
              animate={{
                scale: i === activeIndex ? 1.5 : 1,
                backgroundColor: i <= activeIndex ? step.accent : "transparent",
                borderColor: step.accent,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            {i < steps.length - 1 && (
              <motion.div
                className="w-[1.5px] h-[48px] hidden md:block"
                animate={{
                  scaleY: i < activeIndex ? 1 : 0,
                  backgroundColor: steps[i + 1].accent,
                }}
                style={{ transformOrigin: "top" }}
                transition={{ duration: 0.4 }}
              />
            )}
          </div>
        ))}
      </div>

      <motion.div
        className="font-mono text-[11px] md:mt-3 tracking-[0.1em] hidden md:block"
        key={activeIndex}
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        style={{ color: steps[activeIndex]?.accent }}
      >
        {steps[activeIndex]?.number}
      </motion.div>
    </div>
  );
}