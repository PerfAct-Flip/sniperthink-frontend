import { useState, useEffect, useRef, type RefObject } from "react";

interface ScrollProgressResult {
  scrollY: number;
  scrollProgress: number;
}

interface InViewResult {
  ref: RefObject<HTMLDivElement | null>;
  inView: boolean;
  progress: number;
}

export function useScrollProgress(): ScrollProgressResult {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - winHeight;
      const current = window.scrollY;
      setScrollY(current);
      setScrollProgress(Math.min(current / docHeight, 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollY, scrollProgress };
}

export function useInView(threshold: number = 0.3): InViewResult {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        setProgress(entry.intersectionRatio);
      },
      { threshold: [threshold, ...Array.from({ length: 21 }, (_, i) => i / 20)] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView, progress };
}