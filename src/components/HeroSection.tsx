import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FileText, ArrowRight } from "@phosphor-icons/react";

const HeroSection = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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
        y: 20,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.5"
    );

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
    /* Spline 3D Scene - UPDATED FOR MOBILE VISIBILITY */
    <div className="absolute inset-0 md:inset-y-0 md:right-0 w-full md:w-1/2 h-1/2 bottom-0 top-auto md:h-full z-0 opacity-60 md:opacity-100 pointer-events-none md:pointer-events-auto">
      <iframe
        src="https://my.spline.design/nexbotrobotcharacterconcept-tyNIBF7MjZdZ8aBkToQGOZuw/"
        frameBorder="0"
        width="100%"
        height="100%"
        className="w-full h-full"
        title="3D Hero"
      />
      /* Hide Spline watermark */
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-background z-10" />
    </div>

    /* Content Container - UPDATED FOR RESPONSIVE PADDING AND LAYOUT */
    <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-40 md:py-0 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12">
      
      /* Left Column: Your Text Content */
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-8">
        <h1
          ref={headlineRef}
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-display leading-tight gradient-text"
        >
          Hi, I'm Arunachala Eshwar Vetrivel[cite: 1]
        </h1>
        
        <p className="text-muted-foreground text-lg md:text-2xl max-w-lg">
          I'm an Artifical Intelligence & Data Science student specializing in Machine Learning, 
          Data Analytics, and building intelligent systems[cite: 1].
        </p>

        /* Button Group for Hire Me & Resume */
        <div ref={ctaRef} className="flex flex-wrap justify-center md:justify-start gap-4">
          <button 
            onClick={() => scrollToSection("#contact")}
            className="px-6 md:px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all flex items-center gap-2 text-sm md:text-base"
          >
            Hire Me
          </button>
          
          <a 
            href="/AEV-portfolio/AEV-Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 md:px-8 py-3 rounded-full border border-primary text-foreground font-bold hover:bg-primary/10 transition-all text-sm md:text-base"
          >
            <FileText size={20} className="text-primary" />
            Resume
          </a>
        </div>
      </div>

      /* Right Column Spacer - Adjusted height for mobile spacing */
      <div className="h-48 md:h-1" />
    </div>

    /* Bottom Right Scroll Button - Hidden on mobile to prevent overlapping elements */
    <button
      onClick={() => scrollToSection("#about")}
      className="hidden md:flex absolute bottom-8 right-8 z-20 items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
    >
      Scroll to Explore <ArrowRight size={20} />
    </button>
  </section>
);
};

export default HeroSection;