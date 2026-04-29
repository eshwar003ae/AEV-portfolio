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
      {/* Spline 3D Scene - FORCED TO THE RIGHT */}
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2 z-0 pointer-events-none md:pointer-events-auto">
        <iframe
          src="https://my.spline.design/nexbotrobotcharacterconcept-tyNIBF7MjZdZ8aBkToQGOZuw/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
          title="3D Hero"
        />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-background z-10" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
        {/* Left Column: Your Text Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-8">
          <h1
            ref={headlineRef}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-display leading-tight gradient-text"
          >
            Hi, I'm Arunachala Eshwar Vetrivel
          </h1>
          
          <p className="text-muted-foreground text-xl md:text-2xl max-w-lg">
            I'm an Artifical Intelligence & Data Science student specializing in Machine Learning, 
            Data Analytics, and building intelligent systems[cite: 4, 13].
          </p>

          {/* New Button Group for Hire Me & Resume */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 pointer-events-auto">
            <button 
              onClick={() => scrollToSection("#contact")}
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all flex items-center gap-2"
            >
              Hire Me
            </button>
            
            <a 
              href="/AEV-portfolio/AEV_Resume_.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3 rounded-full border border-primary text-foreground font-bold hover:bg-primary/10 transition-all"
            >
              <FileText size={20} className="text-primary" />
              Resume
            </a>
          </div>
        </div>

        <div className="hidden md:block h-1" />
      </div>

      {/* Bottom Right Scroll Button */}
      <button
        onClick={() => scrollToSection("#about")}
        className="absolute bottom-8 right-8 z-20 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium pointer-events-auto"
      >
        Scroll to Explore <ArrowRight size={20} />
      </button>
    </section>
  );
};

export default HeroSection;