import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GithubLogo, LinkedinLogo, Envelope } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-content", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
        y: 60,
        opacity: 0,
        filter: "blur(5px)",
        duration: 0.8,
        ease: "power2.out",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative py-12 border-t border-border">
      {/* Background particles */}
      <div className="floating-orb w-32 h-32 bottom-0 left-1/4 bg-primary" />
      <div className="floating-orb w-24 h-24 top-0 right-1/3 bg-neon-cyan" />

      <div className="footer-content relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xl font-bold font-display gradient-text">
            AEV.
          </span>
          <span className="text-sm text-muted-foreground">
            © 2026 All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-4">
          {["Home", "About", "Projects", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector(`#${link.toLowerCase() === "home" ? "hero" : link.toLowerCase()}`)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <GithubLogo size={22} weight="light" />
          </a>
          <a href="https://www.linkedin.com/in/arunachala-eshwar-v-871255337" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <LinkedinLogo size={22} weight="light" />
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=arunchala2003@gmail.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Envelope size={22} weight="light" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
