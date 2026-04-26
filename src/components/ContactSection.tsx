import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GithubLogo,
  LinkedinLogo,
  PaperPlaneTilt,
  WhatsappLogo,
  EnvelopeSimple,
  Phone,
  MapPin,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: EnvelopeSimple,
    label: "Email",
    value: "arunchala2003@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=arunchala2003@gmail.com",
  },
  { icon: Phone, label: "Phone", value: "+91 7695948634", href: "tel:+917695948634" },
  { icon: MapPin, label: "Location", value: "Salem, Tamil Nadu", href: "#" },
];

const socials = [
  { icon: GithubLogo, label: "GH", href: "https://github.com" },
  { icon: LinkedinLogo, label: "LI", href: "https://www.linkedin.com/in/arunachala-eshwar-v-871255337" },
  { icon: WhatsappLogo, label: "WA", href: "https://wa.me/917695948634" },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-title", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0,
        y: 40,
        filter: "blur(8px)",
        duration: 1,
      });

      gsap.from(".contact-subtitle", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
      });

      gsap.from(".contact-input", {
        scrollTrigger: { trigger: formRef.current, start: "top 85%" },
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });

      gsap.from(".connect-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        x: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Send email via mailto
    const mailSubject = encodeURIComponent(`Contact from ${name}`);
    const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    window.open(`mailto:arunchala2003@gmail.com?subject=${mailSubject}&body=${mailBody}`, "_blank");

    // Send WhatsApp message
    const waText = encodeURIComponent(`New Contact Message\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
    window.open(`https://wa.me/917695948634?text=${waText}`, "_blank");

    setSent(true);
    gsap.from(".sent-msg", { opacity: 0, y: 20, duration: 0.5 });
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-spacing relative"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h2 className="contact-title text-3xl md:text-5xl font-bold font-display text-center mb-4">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <p className="contact-subtitle text-muted-foreground text-center max-w-xl mx-auto mb-16">
          Ready to bring your ideas to life? Let's collaborate and create something amazing together.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <div className="contact-input">
                <label className="text-sm font-medium text-primary mb-2 block">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glass-input w-full"
                />
              </div>

              <div className="contact-input">
                <label className="text-sm font-medium text-primary mb-2 block">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input w-full"
                />
              </div>

              <div className="contact-input">
                <label className="text-sm font-medium text-primary mb-2 block">Message</label>
                <textarea
                  placeholder="Tell me about your project..."
                  rows={6}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="glass-input w-full resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold text-primary-foreground flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))",
                }}
              >
                <PaperPlaneTilt size={20} weight="light" />
                Send Message
              </button>

              {sent && (
                <p className="sent-msg text-primary text-sm">
                  ✓ Message sent successfully!
                </p>
              )}
            </form>
          </div>

          {/* Right: Let's Connect card */}
          <div className="lg:col-span-2">
            <div className="connect-card glass-card p-8 h-full flex flex-col">
              <h3 className="text-xl font-bold font-display gradient-text mb-8">
                Let's Connect
              </h3>

              <div className="flex flex-col gap-6 flex-1">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 rounded-lg bg-secondary group-hover:bg-primary/20 transition-colors duration-300">
                      <item.icon
                        size={22}
                        weight="fill"
                        className="text-primary"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-foreground text-sm font-medium">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Follow me on
                </p>
                <div className="flex gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                      title={social.label}
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
