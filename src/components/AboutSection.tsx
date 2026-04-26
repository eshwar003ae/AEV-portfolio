import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Brain,
  ChartBar,
  FilePy,
  Database,
  Coffee,
  GitBranch,
} from "@phosphor-icons/react";
import profileImg from "@/assets/profile.jpg";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { icon: Brain, label: "AI & ML" },
  { icon: ChartBar, label: "DS & DA" },
  { icon: FilePy, label: "Python" },
  { icon: Database, label: "SQL" },
  { icon: Coffee, label: "Java" },
  { icon: GitBranch, label: "Git" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        filter: "blur(8px)",
        duration: 1,
      });

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        x: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".skill-icon", {
        scrollTrigger: {
          trigger: iconsRef.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-spacing relative"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Profile image */}
        <div ref={imageRef} className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full opacity-60 group-hover:opacity-100 blur-lg transition-all duration-500" style={{ background: "var(--gradient-button)" }} />
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-border group-hover:scale-105 group-hover:rotate-2 transition-all duration-500">
              <img
                src={profileImg}
                alt="Milad - Web Developer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bio + skills */}
        <div ref={textRef} className="flex flex-col gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold font-display gradient-text mb-4">
              About Me
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed text-justify">
              As an aspiring Artifical Intelligence & Data Science professional, I specialize in transforming complex datasets into actionable insights and building intelligent systems. With a robust technical foundation in Python, Core Java, and SQL, I bridge the gap between machine learning research and scalable web development. I am passionate about developing AI models that solve real-world challenges and am constantly exploring emerging technologies to push the boundaries of data-driven innovation.
            </p>
            {/* <p className="text-muted-foreground text-lg leading-relaxed mt-4 text-justify">
              With a solid foundation in core Java and SQL, along with experience in web development also, I bring a versatile approach to building efficient and scalable solutions. I am constantly exploring new technologies, improving my skills, and pushing the boundaries of what's possible with data and AI.
            </p> */}
          </div>

          {/* Skill icons */}
          <div ref={iconsRef} className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.label}
                className="skill-icon glass-card flex flex-col items-center gap-2 p-4 hover:scale-110 transition-transform duration-300 group"
              >
                <skill.icon
                  size={32}
                  weight="light"
                  className="text-primary group-hover:text-neon-cyan transition-colors duration-300"
                />
                <span className="text-xs text-muted-foreground">
                  {skill.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
