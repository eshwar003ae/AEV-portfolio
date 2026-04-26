import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate name in
    tl.from(nameRef.current, {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
      duration: 0.8,
      ease: "power3.out",
    });


    // Progress bar
    tl.to(
      progressRef.current,
      {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
        onUpdate: function () {
          if (percentRef.current) {
            const progress = Math.round(this.progress() * 100);
            percentRef.current.textContent = `${progress}%`;
          }
        },
      },
      "-=0.2"
    );

    // Fade out preloader
    tl.to(preloaderRef.current, {
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = "none";
        }
        onComplete();
      },
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      {/* Background orbs */}
      <div className="floating-orb w-64 h-64 top-1/4 left-1/4 bg-primary animate-float" />
      <div
        className="floating-orb w-48 h-48 bottom-1/4 right-1/4 bg-neon-cyan"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <h1
          ref={nameRef}
          className="text-3xl md:text-5xl font-bold font-display gradient-text tracking-tight pb-2"
        >
          Welcome to My Page
        </h1>

        {/* Progress bar */}
        <div className="w-64 md:w-80 mt-8">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-muted-foreground tracking-wider">
              LOADING
            </span>
            <span
              ref={percentRef}
              className="text-xs text-primary font-mono"
            >
              0%
            </span>
          </div>
          <div className="h-[2px] w-full bg-secondary rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full w-0 rounded-full"
              style={{ background: "var(--gradient-button)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
