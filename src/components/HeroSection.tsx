import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FileText, ArrowRight } from "@phosphor-icons/react";
// Import your robot screenshot here
import robotHeroImg from "@/assets/robot-hero.png"; 

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
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
    >
      {/* MOBILE DISPLAY: Show static image on mobile screens (hidden on desktop) */}
      <div className="absolute inset-0 block md:hidden z-0 opacity-40 pointer-events-none">
        <img 
          src={robotHeroImg} 
          alt="AI Robot Background" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* PC DISPLAY: Show interactive 3D Spline iframe on desktop (hidden on mobile) */}
      <div className="hidden md:block absolute top-0 bottom-0 right-0 left-1/2 w-1/2 h-full z-0 pointer-events-auto">
        <iframe
          src="https://my.spline.design/nexbotrobotcharacterconcept-tyNIBF7MjZdZ8aBkToQGOZuw/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
          title="3D Hero"
        />
        {/* Cover Spline Watermark safely */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-background z-10" />
      </div>

      {/* Main Content Layout Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-0 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
        {/* Left Side: Professional Bio Text & Buttons */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-8 max-w-xl">
          <h1
            ref={headlineRef}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-display leading-tight gradient-text"
          >
            Hi, I'm Arunachala Eshwar Vetrivel
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl font-normal">
            I'm an Artificial Intelligence & Data Science student specializing in Machine Learning, 
            Data Analytics, and building intelligent systems.
          </p>

          {/* Core Call to Action Buttons */}
          <div ref={ctaRef} className="flex flex-wrap justify-center md:justify-start gap-4 w-full">
            <button 
              onClick={() => scrollToSection("#contact")}
              className="px-6 md:px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all flex items-center gap-2 text-sm md:text-base cursor-pointer"
            >
              Contact Me
            </button>
            
            <a 
              href="/AEV-portfolio/AEV_Ats_free_resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 md:px-8 py-3 rounded-full border border-primary text-foreground font-bold hover:bg-primary/10 transition-all text-sm md:text-base"
            >
              <FileText size={20} className="text-primary" />
              Resume
            </a>
          </div>
        </div>

        {/* Right Side: Spacer block so desktop text doesn't slide under the main robot body */}
        <div className="hidden md:block h-1" />
      </div>

      {/* Persistent Page Navigator Arrow */}
      <button
        onClick={() => scrollToSection("#about")}
        className="hidden md:flex absolute bottom-8 right-8 z-20 items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium cursor-pointer"
      >
        Scroll to Explore <ArrowRight size={20} />
      </button>
    </section>
  );
};

export default HeroSection;