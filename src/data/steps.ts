export interface StrategyStep {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  accent: string;
  tags: string[];
  stat: {
    value: string;
    label: string;
  };
}

export const strategySteps: StrategyStep[] = [
  {
    id: 1,
    number: "01",
    title: "Define Your Target",
    subtitle: "Precision begins with clarity",
    description:
      "SniperThink starts by locking in your exact market position. We identify the specific audience, problem, and outcome — so every decision that follows is aimed at something real.",
    icon: "🎯",
    accent: "#FF4D00",
    tags: ["Market Research", "Audience Mapping", "Problem Definition"],
    stat: { value: "3x", label: "Faster Clarity" },
  },
  {
    id: 2,
    number: "02",
    title: "Intelligence Gathering",
    subtitle: "Know before you act",
    description:
      "We analyze competitive landscapes, behavioral signals, and data patterns to build a complete intelligence picture. No guessing — just insight-driven strategy.",
    icon: "🔍",
    accent: "#00C2FF",
    tags: ["Competitor Analysis", "Data Patterns", "Signal Detection"],
    stat: { value: "94%", label: "Signal Accuracy" },
  },
  {
    id: 3,
    number: "03",
    title: "Strategic Execution",
    subtitle: "Move with surgical precision",
    description:
      "Each move is calculated, timed, and optimized. SniperThink builds execution playbooks that eliminate wasted effort and maximize impact at every touchpoint.",
    icon: "⚡",
    accent: "#7B2FFF",
    tags: ["Playbook Design", "Resource Optimization", "Impact Mapping"],
    stat: { value: "2.8x", label: "Execution Speed" },
  },
  {
    id: 4,
    number: "04",
    title: "Measure & Adapt",
    subtitle: "Evolve or fall behind",
    description:
      "Real-time feedback loops keep your strategy sharp. We track outcomes, surface insights instantly, and adapt your approach before the market even shifts.",
    icon: "📡",
    accent: "#00FF88",
    tags: ["Real-time Analytics", "Feedback Loops", "Adaptive Strategy"],
    stat: { value: "∞", label: "Iterations" },
  },
  {
    id: 5,
    number: "05",
    title: "Scale & Dominate",
    subtitle: "From precision to power",
    description:
      "Once your model is proven, SniperThink amplifies it. We engineer scalable systems that multiply your results without multiplying your effort.",
    icon: "🚀",
    accent: "#FFD700",
    tags: ["Growth Systems", "Automation", "Market Expansion"],
    stat: { value: "10x", label: "Scale Factor" },
  },
];