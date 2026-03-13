import { useState } from "react";
import { motion, useMotionValue, useTransform, type Variants } from "framer-motion";
import { useInView } from "../hooks/useScroll";
import type { StrategyStep } from "../data/steps";

interface StepCardProps {
  step: StrategyStep;
  index: number;
  isActive: boolean;
  onClick: (step: StrategyStep) => void;
}

const stepVariants: Variants[] = [
  {
    hidden: { opacity: 0, x: -80, rotate: -4 },
    visible: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", damping: 18, stiffness: 100 } },
  },
  {
    hidden: { opacity: 0, y: -60, scale: 0.88 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 16 } },
  },
  {
    hidden: { opacity: 0, x: 80, skewX: 6 },
    visible: { opacity: 1, x: 0, skewX: 0, transition: { type: "spring", damping: 20 } },
  },
  {
    hidden: { opacity: 0, scale: 0.7, rotate: 3 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", damping: 14, stiffness: 90 } },
  },
  {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 20, stiffness: 110 } },
  },
];

export default function StepCard({ step, index, isActive, onClick }: StepCardProps) {
  const { ref, inView } = useInView(0.25);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-80, 80], [6, -6]);
  const rotateY = useTransform(mouseX, [-80, 80], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  const variant = stepVariants[index % stepVariants.length];

  return (
    <motion.div
      ref={ref}
      className="relative cursor-default"
      style={{ perspective: 800 } as React.CSSProperties}
      variants={variant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={`relative bg-surface border border-border-subtle rounded-[20px] p-7 md:p-10 overflow-hidden transition-colors duration-300 ${
          isActive ? "border-[var(--accent)]" : "hover:border-[currentColor!]" // we inject accent via style but wait
        }`}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          borderColor: isActive ? step.accent : hovered ? step.accent + "66" : undefined,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <motion.div
          className="absolute -inset-10 pointer-events-none z-0 rounded-[60px]"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: `radial-gradient(circle at center, ${step.accent}22, transparent 70%)` }}
        />

        <div className="relative z-10 flex justify-between items-center mb-7">
          <span className="font-mono text-[12px] tracking-[0.15em] font-medium" style={{ color: step.accent }}>{step.number}</span>
          <motion.span
            className="text-[32px] block"
            animate={{ rotate: hovered ? [0, -10, 10, -5, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            {step.icon}
          </motion.span>
        </div>

        <div className="relative z-10">
          <p className="font-mono text-[11px] text-muted tracking-[0.1em] uppercase mb-2.5">{step.subtitle}</p>
          <h3 className="font-display text-[32px] md:text-[clamp(36px,4vw,52px)] tracking-[0.02em] leading-[1.05] mb-4 text-text-main">{step.title}</h3>
          <p className="text-[15px] text-muted leading-[1.75] max-w-[520px] mb-6">{step.description}</p>

          <div className="flex flex-wrap gap-2 mb-9">
            {step.tags.map((tag, i) => (
              <motion.span
                key={tag}
                className="font-mono text-[10px] tracking-[0.1em] uppercase px-3 py-1 rounded-full border"
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                style={{ borderColor: step.accent + "55", color: step.accent }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between pt-7 border-t border-border-subtle gap-5 md:gap-0">
          <div className="flex flex-col gap-[2px]">
            <span className="font-display text-[40px] leading-none" style={{ color: step.accent }}>{step.stat.value}</span>
            <span className="font-mono text-[10px] text-muted tracking-[0.12em] uppercase">{step.stat.label}</span>
          </div>

          <motion.button
            className="font-body text-[14px] font-medium text-bg px-7 py-3 rounded-full cursor-pointer transition-colors duration-300 tracking-[0.02em] w-full md:w-auto text-center"
            style={{ backgroundColor: step.accent }}
            onClick={() => onClick(step)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            I'm Interested →
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}