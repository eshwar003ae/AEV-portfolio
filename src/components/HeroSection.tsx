import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.5 });

    tl.from(headlineRef.current, {
      opacity: 0,
      y: 50,
      filter: "blur(10px)",
      duration: 1,
      ease: "power3.out",
    });

    tl.from(
      ctaRef.current,
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );

    // Floating orbs
    gsap.to(".hero-orb", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5,
    });

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
  <section
    id="hero"
    className="relative min-h-screen flex items-center overflow-hidden"
  >
    {/* Spline 3D Scene - FORCED TO THE RIGHT HALF OF THE SCREEN */}
    <div className="absolute inset-y-0 right-0 w-full md:w-1/2 z-0">
      <iframe
        src="https://my.spline.design/nexbotrobotcharacterconcept-tyNIBF7MjZdZ8aBkToQGOZuw/"
        frameBorder="0"
        width="100%"
        height="100%"
        className="w-full h-full"
        title="3D Hero"
      />
      {/* Hide Spline watermark */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-background z-10" />
    </div>

    {/* Content Container */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12">
      
      {/* Left Column: Your Text Content */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-8 pointer-events-none">
        <h1
          ref={headlineRef}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-display leading-tight gradient-text"
        >
          Hi, I'm Arunachala Eshwar Vetrivel
        </h1>
        
        {/* Increased font size (text-xl md:text-2xl) */}
        <p className="text-muted-foreground text-xl md:text-2xl max-w-lg">
          I'm an Artifical Intelligence & Data Science student specializing in Machine Learning, 
          Data Analytics, and building intelligent systems.
        </p>
      </div>

      {/* Right Column: Kept totally empty so the robot shows perfectly */}
      <div className="hidden md:block h-1" />
    </div>

    {/* Get Started button */}
    <button
      ref={ctaRef}
      onClick={() => scrollToSection("#about")}
      className="absolute bottom-8 right-8 z-20 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity pointer-events-auto"
    >
      Get Started
    </button>
  </section>
);
};

export default HeroSection;