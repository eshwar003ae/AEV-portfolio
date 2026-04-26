import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Link as LinkIcon, FileText, X } from "@phosphor-icons/react";
import projectLoan from "@/assets/project-loan.jpg";
import projectEDA from "@/assets/project Auto-EDA-Chart.jpg";
import SmartIOT from "@/assets/Smart parking.jpg";
import projectspammail from "@/assets/project spam.jpg"
import cropiot from "@/assets/project crop.jpg";
import tommyai from "@/assets/tommy.jpg";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  desc: string;
  tech: string[];
  image: string;
  link?: string;
  hasReadme?: boolean;
}

const projects: Project[] = [
  {
    title: "🏦 Loan Eligibility Checker",
    desc: "A Flask web app that determines loan eligibility using rule-based logic and ML.",
    tech: ["Python", "Flask", "scikit-learn"],
    image: projectLoan,
    link: "https://loan-eligibility-checker-xqnp.onrender.com",
    hasReadme: true,
  },
  {
    title: "📊 Auto-EDA-Chart",
    desc: "Automated exploratory data analysis tool that generates visualizations from datasets",
    tech: ["Python", "Flask", "Pandas", "React"],
    image: projectEDA,
    link: "https://auto-eda-chart-1.onrender.com",
    hasReadme: true,
  },
  {
    title: "🛡️ Smart Email Pro",
    desc: "A full-stack ML + NLP solution to automatically detect spam in your real-time Gmail inbox.",
    tech: ["Flask", "NLP", "JavaScript", "OAuth 2.0"],
    image: projectspammail,
    link: "https://smart-email-pro.onrender.com",
    hasReadme: true,
  },
  {
    title: "📟 IoT Smart Slot Allocation",
    desc: "An automated parking monitoring system using ESP32 and IR sensors for real-time occupancy tracking.",
    tech: ["ESP32", "IoT", "C++", "Sensors"],
    image: SmartIOT,
    hasReadme: true,
  },
  {
    title: "🌱AI - DRIVEN PLANT ELECTROPHYSIOLOGY  FOR INTELLIGENCE CROP MONITORING",
    desc: "The study of electrical signals within plants—to detect silent stress",
    tech: ["ESP32", "IOT Sensors", "C++", "Python"],
    image: cropiot,
    link: "https://arunkumar2489.github.io/PhytoPulse/",
    hasReadme: true,
  },
  {
    title: "🤖Personal PC AI Assistant",
    desc: "It is a fully-featured personal AI assistant that runs natively on your PC.",
    tech: ["Python", "Gemini API", "gTTS + pygame"],
    image: tommyai,
    link: "/tommy-ai_2.0_all.deb",
    hasReadme: true,
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState<"options" | "readme" | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".section-title-projects", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, y: 40, filter: "blur(8px)", duration: 1,
      });
      gsap.from(".project-card", {
        scrollTrigger: { trigger: scrollContainerRef.current, start: "top 80%" },
        y: 60, opacity: 0, scale: 0.95, duration: 0.7, stagger: 0.12, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleProjectClick = (project: Project) => {
    setActiveProject(project);
    if (project.hasReadme) {
      setShowModal("options");
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="section-spacing relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="section-title-projects text-3xl md:text-5xl font-bold font-display gradient-text mb-16 text-center">
          Featured Projects
        </h2>

        <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
          {projects.map((project, i) => (
            <div key={i} onClick={() => handleProjectClick(project)} className="project-card glass-card min-w-[300px] md:min-w-0 snap-center group cursor-pointer overflow-hidden glow-border flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold font-display text-foreground">{project.title}</h3>
                  <ArrowUpRight size={20} className="text-muted-foreground group-hover:text-primary transition-all duration-300" />
                </div>
                <p className="text-muted-foreground text-sm mb-4 flex-1">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OPTIONS MODAL */}
      {showModal === "options" && activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(null)}>
          <div className="glass-card p-8 max-w-sm w-full mx-4 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowModal(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X size={20} /></button>
            <h3 className="text-xl font-bold font-display text-foreground mb-6">{activeProject.title}</h3>
            
            <div className="flex flex-col gap-3">
              {activeProject.title.includes("Personal PC AI") ? (
                <a href="/tommy-ai_2.0_all.deb" download className="flex items-center gap-3 p-4 rounded-lg bg-primary/20 hover:bg-primary/30 border border-primary/50 transition-colors">
                  <LinkIcon size={24} className="text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Download .deb App</p>
                    <p className="text-xs text-muted-foreground">Install on Ubuntu Linux [cite: 67]</p>
                  </div>
                </a>
              ) : activeProject.link && (
                <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                  <LinkIcon size={24} className="text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Visit Live Site</p>
                    <p className="text-xs text-muted-foreground">Open in a new tab</p>
                  </div>
                </a>
              )}

              {activeProject.title.includes("Personal PC AI") ? (
                <a href="/tommy-ai-readme.pdf" target="_blank" className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                  <FileText size={24} className="text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">View AI Tech Report (PDF)</p>
                    <p className="text-xs text-muted-foreground">Architecture & Commands [cite: 50, 81]</p>
                  </div>
                </a>
              ) : activeProject.title.includes("PLANT ELECTROPHYSIOLOGY") ? (
                <a href="/PhytoPulse_Technical_Report.pdf" target="_blank" className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                  <FileText size={24} className="text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">View Tech Report (PDF)</p>
                    <p className="text-xs text-muted-foreground">Bio-signal analysis [cite: 5, 11]</p>
                  </div>
                </a>
              ) : activeProject.title.includes("IoT Smart Slot") ? (
                <a href="/Smart_Parking_Report.pdf" target="_blank" className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                  <FileText size={24} className="text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">View IoT Report (PDF)</p>
                    <p className="text-xs text-muted-foreground">Hardware & Pin Mapping</p>
                  </div>
                </a>
              ) : (
                <button onClick={() => setShowModal("readme")} className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-left w-full">
                  <FileText size={24} className="text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">View README</p>
                    <p className="text-xs text-muted-foreground">Read HTML documentation</p>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* README MODAL - DYNAMIC HTML CONTENT */}
      {showModal === "readme" && activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(null)}>
          <div className="glass-card p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => setShowModal("options")} className="text-sm text-primary hover:underline">← Back</button>
              <button onClick={() => setShowModal(null)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
            </div>
            
            <div className="prose prose-invert prose-sm max-w-none">
              <h1 className="text-2xl font-bold font-display text-foreground mb-4">{activeProject.title}</h1>
              <div className="mb-6 rounded-lg overflow-hidden border border-white/10">
                <img src={activeProject.image} alt={activeProject.title} className="w-full h-auto object-cover" />
              </div>

              {activeProject.title.includes("Loan") && (
                <>
                  <p className="text-muted-foreground mb-4">A Flask web application determining loan eligibility using rule-based logic and machine learning.</p>
                  <h2 className="text-lg font-bold text-foreground mt-6 mb-2">Features</h2>
                  <ul className="text-muted-foreground list-disc list-inside">
                    <li>Rule-based eligibility calculation</li>
                    <li>Machine learning model training</li>
                    <li>Real-time loan limit assessment</li>
                  </ul>
                  <h2 className="text-lg font-bold text-foreground mt-6 mb-2">Tech Stack</h2>
                  <p className="text-muted-foreground">Flask, Python, Pandas, Scikit-learn</p>
                </>
              )}

              {activeProject.title.includes("Auto-EDA") && (
                <>
                  <p className="text-muted-foreground mb-4">A tool for automated exploratory data analysis and professional visualization generation.</p>
                  <h2 className="text-lg font-bold text-foreground mt-6 mb-2">Features</h2>
                  <ul className="text-muted-foreground list-disc list-inside">
                    <li>Multi-Chart Generation</li>
                    <li>Smart Column Matching</li>
                    <li>Automated statistical summaries</li>
                  </ul>
                  <h2 className="text-lg font-bold text-foreground mt-6 mb-2">Tech Stack</h2>
                  <p className="text-muted-foreground">React, FastAPI, Pandas, Matplotlib/Seaborn</p>
                </>
              )}

              {activeProject.title.includes("Smart Email") && (
                <>
                  <p className="text-muted-foreground mb-4">A solution for automated spam detection in Gmail using NLP and Machine Learning.</p>
                  <h2 className="text-lg font-bold text-foreground mt-6 mb-2">Features</h2>
                  <ul className="text-muted-foreground list-disc list-inside">
                    <li>Real-time classification</li>
                    <li>OAuth 2.0 Integration</li>
                    <li>Confidence scoring metrics</li>
                  </ul>
                  <h2 className="text-lg font-bold text-foreground mt-6 mb-2">Tech Stack</h2>
                  <p className="text-muted-foreground">Flask, NLP, JavaScript, Scikit-learn</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;