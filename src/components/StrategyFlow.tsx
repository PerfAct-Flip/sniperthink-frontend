import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { strategySteps, type StrategyStep } from "../data/steps";
import StepCard from "./StepCard";
import ProgressIndicator from "./ProgressIndicator";
import InterestModal from "./InterestModal";

export default function StrategyFlow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedStep, setSelectedStep] = useState<StrategyStep | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const orbX = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let best = { index: activeIndex, ratio: 0 };
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLDivElement).dataset.index);
          if (entry.intersectionRatio > best.ratio) {
            best = { index: idx, ratio: entry.intersectionRatio };
          }
        });
        if (best.ratio > 0) setActiveIndex(best.index);
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [activeIndex]);

  return (
    <section className="relative min-h-screen overflow-hidden" ref={containerRef}>
      {/* Backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:60px_60px]" />
      <div className="fixed inset-0 opacity-[0.04] bg-[length:180px] pointer-events-none z-0 bg-noise" />

      <motion.div
        className="fixed w-[600px] h-[600px] rounded-full blur-[120px] -top-[100px] -left-[100px] pointer-events-none z-0 transition-colors duration-800"
        style={{ y: orbY, x: orbX }}
        animate={{ background: strategySteps[activeIndex]?.accent + "18" }}
        transition={{ duration: 0.8 }}
      />

      {/* Hero */}
      <motion.div className="relative z-10 px-6 pt-[120px] pb-[80px] max-w-[800px] mx-auto text-center md:px-12 md:pt-[120px]" style={{ y: headlineY, opacity: headlineOpacity }}>
        <motion.span
          className="inline-block font-mono text-[11px] tracking-[0.2em] uppercase text-muted border border-border-subtle px-4 py-1.5 rounded-full mb-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          How It Works
        </motion.span>

        <motion.h1
          className="font-display text-[clamp(60px,10vw,130px)] leading-[0.92] tracking-[0.01em] text-text-main mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: "spring", damping: 20 }}
        >
          Think Sharp.
          <br />
          <span className="text-transparent" style={{ WebkitTextStroke: "1.5px var(--color-text-main)" }}>Strike True.</span>
        </motion.h1>

        <motion.p
          className="text-[17px] text-muted max-w-[480px] mx-auto mb-12 leading-[1.7]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          Five precision steps that transform your strategy from scattered to surgical.
        </motion.p>

        <motion.div
          className="flex flex-col flex-nowrap items-center gap-2 text-muted text-[11px] font-mono tracking-[0.12em] uppercase"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="w-[1px] h-[40px] bg-gradient-to-b from-muted to-transparent" />
          <span>Scroll to explore</span>
        </motion.div>
      </motion.div>

      {/* Flow Layout */}
      <div className="relative z-10 flex flex-col md:flex-row gap-0 max-w-[1100px] mx-auto px-4 md:px-6 pt-5 pb-20 md:pt-10 md:pb-[120px]">
        <ProgressIndicator
          steps={strategySteps}
          activeIndex={activeIndex}
          scrollProgress={scrollYProgress}
        />

        <div className="flex-1 flex flex-col gap-6 md:gap-10 md:pl-5">
          {strategySteps.map((step, i) => (
            <div
              key={step.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              data-index={i}
              className="scroll-mt-[40vh]"
            >
              <StepCard
                step={step}
                index={i}
                isActive={i === activeIndex}
                onClick={setSelectedStep}
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedStep && (
          <InterestModal step={selectedStep} onClose={() => setSelectedStep(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}