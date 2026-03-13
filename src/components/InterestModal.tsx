import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { StrategyStep } from "../data/steps";

type Status = "idle" | "loading" | "success" | "error";

interface InterestModalProps {
  step: StrategyStep;
  onClose: () => void;
}

interface FormState {
  name: string;
  email: string;
}

export default function InterestModal({ step, onClose }: InterestModalProps) {
  const [form, setForm] = useState<FormState>({ name: "", email: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg("Please fill in both fields.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          selectedStep: step.title,
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-[#080A0F]/85 backdrop-blur-[12px] z-[100] flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-surface2 border border-border-subtle rounded-[24px] p-8 md:p-12 w-full max-w-[480px] shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 40 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-5 right-5 bg-border-subtle text-muted border-none w-8 h-8 rounded-full cursor-pointer text-[12px] flex items-center justify-center" onClick={onClose}>✕</button>

        <div className="font-mono text-[11px] tracking-[0.15em] uppercase mb-6" style={{ color: step.accent }}>
          {step.number} — {step.title}
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              className="text-center py-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
            >
              <div className="text-[56px] font-bold mb-5 block" style={{ color: step.accent }}>✓</div>
              <h3 className="font-display text-[42px] mb-3">You're on the list.</h3>
              <p className="text-muted text-[15px] leading-[1.6]">We'll reach out to you soon about <strong>{step.title}</strong>.</p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 1 }}>
              <h2 className="font-display text-[48px] mb-2.5">I'm Interested</h2>
              <p className="text-[14px] text-muted mb-8 leading-[1.6]">
                Tell us who you are and we'll be in touch about{" "}
                <span style={{ color: step.accent }}>{step.title}</span>.
              </p>

              <div className="flex flex-col gap-1.5 mb-4">
                <label className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted">Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={status === "loading"}
                  className="bg-surface border border-border-subtle rounded-[10px] px-4 py-3.5 text-text-main font-body text-[15px] outline-none transition-colors duration-200 focus:border-[var(--focus-color)] placeholder:text-white/20"
                  style={{ "--focus-color": step.accent } as React.CSSProperties}
                />
              </div>

              <div className="flex flex-col gap-1.5 mb-4">
                <label className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={status === "loading"}
                  className="bg-surface border border-border-subtle rounded-[10px] px-4 py-3.5 text-text-main font-body text-[15px] outline-none transition-colors duration-200 focus:border-[var(--focus-color)] placeholder:text-white/20"
                  style={{ "--focus-color": step.accent } as React.CSSProperties}
                />
              </div>

              {errorMsg && <p className="text-[#ff4d4d] text-[13px] mb-3 font-mono">{errorMsg}</p>}
              {status === "error" && (
                <p className="text-[#ff4d4d] text-[13px] mb-3 font-mono">Something went wrong. Please try again.</p>
              )}

              <motion.button
                className="w-full mt-5 p-4 border-none rounded-[12px] font-body text-[15px] font-medium text-bg cursor-pointer flex items-center justify-center min-h-[52px] disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: step.accent }}
                onClick={handleSubmit}
                disabled={status === "loading"}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {status === "loading" ? (
                  <span className="w-5 h-5 border-[2px] border-[#080A0F]/30 border-t-bg rounded-full animate-spin" />
                ) : (
                  "Submit Interest"
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}