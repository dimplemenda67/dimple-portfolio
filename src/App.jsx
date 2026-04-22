import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0E0E14",
  surface: "#16161F",
  card: "#1C1C28",
  border: "#2A2A3A",
  borderHover: "#3A3A50",
  text: "#F0F0FA",
  muted: "#6B6B88",
  subtle: "#9090AA",
  red: "#FF4060",
  blue: "#4D9FFF",
  green: "#34D399",
  purple: "#A78BFA",
};

const skills = [
  { name: "Angular (2–18)",        level: 98, color: "#FF4060", cat: "Frontend" },
  { name: "TypeScript",            level: 95, color: "#4D9FFF", cat: "Frontend" },
  { name: "RxJS",                  level: 92, color: "#F472B6", cat: "Frontend" },
  { name: "NgRx",                  level: 88, color: "#A78BFA", cat: "Frontend" },
  { name: "Signals & Standalone",  level: 82, color: "#FF4060", cat: "Frontend" },
  { name: "JavaScript ES6+",       level: 90, color: "#FBBF24", cat: "Frontend" },
  { name: "HTML5 / CSS3 / SCSS",   level: 93, color: "#4D9FFF", cat: "Frontend" },
  { name: "GitHub Copilot",        level: 85, color: "#34D399", cat: "AI Tools" },
  { name: "Microsoft Copilot",     level: 80, color: "#4D9FFF", cat: "AI Tools" },
  { name: "Claude AI / ChatGPT",   level: 85, color: "#A78BFA", cat: "AI Tools" },
  { name: "REST APIs",             level: 90, color: "#34D399", cat: "Architecture" },
  { name: "CI/CD (Jenkins/GitLab)",level: 78, color: "#FB923C", cat: "DevOps" },
  { name: "Web Accessibility",     level: 85, color: "#34D399", cat: "Frontend" },
];

const experiences = [
  {
    company: "CitiusTech Healthcare Technologies",
    role: "Technical Lead 2",
    period: "Nov 2025 – Apr 2026",
    accent: "#FF4060",
    domain: "Healthcare",
    highlights: [
      "Led frontend for real-time patient data & device dosage platform",
      "Built Angular 18 POC with Signals and Standalone Components",
      "Leveraged GitHub Copilot & Microsoft Copilot to accelerate delivery",
      "Delivered features across cross-functional Agile clinical teams",
    ],
  },
  {
    company: "Oracle Financial Services Software",
    role: "Software Developer 2",
    period: "Oct 2021 – Oct 2025",
    accent: "#4D9FFF",
    domain: "Fintech",
    highlights: [
      "Engineered OFSAA — enterprise banking compliance platform",
      "Implemented NgRx + RxJS reducing component-level logic significantly",
      "Drove 30% reduction in defect leakage via VPAT/JAWS accessibility",
      "Led and mentored a team of 4–5 frontend engineers",
      "Used Oracle Cloud Assist, Claude AI & ChatGPT in daily workflow",
    ],
  },
  {
    company: "GlobalLogic India",
    role: "Senior Software Developer",
    period: "Oct 2017 – Oct 2021",
    accent: "#34D399",
    domain: "Healthcare",
    highlights: [
      "Built clinical web app for real-time patient vitals monitoring",
      "Reduced feature delivery time by 15% via reusable Angular components",
      "Achieved 25% fewer bugs through structured client collaboration",
      "Cut manual testing effort by 20% via Postman API automation",
    ],
  },
];

const projects = [
  {
    title: "Angular 18 Signals POC",
    desc: "Exploring Signals, computed(), and effect() — eliminates BehaviorSubject boilerplate for cleaner, more readable reactive patterns.",
    tags: ["Angular 18", "Signals", "TypeScript", "Standalone Components"],
    accent: "#FF4060",
    link: "https://github.com/dimplemenda67",
    status: "Live on GitHub",
  },
  {
    title: "OFSAA Banking Analytics UI",
    desc: "Enterprise regulatory reporting frontend for global financial institutions. NgRx state, RTL/LTR localization, VPAT/JAWS compliance.",
    tags: ["Angular", "NgRx", "RxJS", "Accessibility", "Fintech"],
    accent: "#4D9FFF",
    link: null,
    status: "Professional Project",
  },
  {
    title: "Clinical Workflow Platform",
    desc: "Real-time patient data and device-driven dosage systems for healthcare clinicians with Angular Material UI.",
    tags: ["Angular 15+", "REST APIs", "Angular Material", "Healthcare"],
    accent: "#34D399",
    link: null,
    status: "Professional Project",
  },
  {
    title: "Angular Component Library",
    desc: "Reusable documented Angular UI library with Lilac theming, RTL/LTR localization, and built-in accessibility — adopted team-wide at Oracle.",
    tags: ["Angular", "SCSS", "Design System", "RTL/LTR", "Theming"],
    accent: "#A78BFA",
    link: null,
    status: "Professional Project",
  },
];

function useInView(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return v;
}

function useResponsive() {
  const [size, setSize] = useState({ width: typeof window !== 'undefined' ? window.innerWidth : 1024, isMobile: false, isTablet: false });
  useEffect(() => {
    const fn = () => {
      const w = window.innerWidth;
      setSize({ width: w, isMobile: w < 768, isTablet: w < 1024 });
    };
    window.addEventListener('resize', fn);
    fn();
    return () => window.removeEventListener('resize', fn);
  }, []);
  return size;
}

function SkillBar({ level, color, delay = 0 }) {
  const [w, setW] = useState(0);
  const ref = useRef();
  const inView = useInView(ref);
  useEffect(() => { if (inView) setTimeout(() => setW(level), delay); }, [inView]);
  return (
    <div ref={ref} style={{ height: 3, background: "#2A2A3A", borderRadius: 2, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${w}%`, background: color, borderRadius: 2, transition: "width 1s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 6px ${color}55` }} />
    </div>
  );
}

function Chip({ label, accent }) {
  return (
    <span style={{
      background: accent + "18", color: accent, border: `1px solid ${accent}35`,
      borderRadius: 4, padding: "3px 10px", fontSize: 11, fontWeight: 600,
      fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.3
    }}>{label}</span>
  );
}

function SectionHead({ line, eyebrow, title }) {
  const { isMobile } = useResponsive();
  return (
    <div style={{ marginBottom: isMobile ? 32 : 44 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div style={{ width: 26, height: 3, background: line, borderRadius: 2 }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? 9 : 10, color: C.muted, letterSpacing: 2.5, textTransform: "uppercase" }}>{eyebrow}</span>
      </div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: isMobile ? 24 : 32, color: C.text, margin: 0 }}>{title}</h2>
    </div>
  );
}

const NAV = ["About", "Skills", "Experience", "Projects", "Contact"];
const CATS = ["All", "Frontend", "AI Tools", "Architecture", "DevOps"];

export default function Portfolio() {
  const { isMobile, isTablet, width } = useResponsive();
  const [cat, setCat] = useState("All");
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState("about");
  const filtered = cat === "All" ? skills : skills.filter(s => s.cat === cat);

  const copy = () => {
    navigator.clipboard.writeText("dimplemenda67@gmail.com");
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const fn = () => {
      NAV.forEach(n => {
        const el = document.getElementById(n.toLowerCase());
        if (el && el.offsetTop <= window.scrollY + 80) setActive(n.toLowerCase());
      });
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const W = { 
    maxWidth: 1080, 
    margin: "0 auto", 
    padding: isMobile ? "0 16px" : isTablet ? "0 28px" : "0 44px" 
  };

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Outfit', sans-serif", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />

      {/* subtle grid bg */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(${C.border}22 1px, transparent 1px), linear-gradient(90deg, ${C.border}22 1px, transparent 1px)`,
        backgroundSize: "48px 48px"
      }} />
      {/* red glow top-right */}
      <div style={{ position: "fixed", top: -160, right: -160, width: 480, height: 480, borderRadius: "50%", background: `radial-gradient(circle, ${C.red}18 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
      {/* blue glow bottom-left */}
      <div style={{ position: "fixed", bottom: -160, left: -160, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.blue}12 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(14,14,20,0.88)", backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ ...W, display: "flex", justifyContent: "space-between", alignItems: "center", height: isMobile ? 52 : 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: isMobile ? 28 : 32, height: isMobile ? 28 : 32, borderRadius: 8, background: C.red,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: isMobile ? 11 : 13, color: "white", letterSpacing: 0.5
            }}>DM</div>
            {!isMobile && <span style={{ fontWeight: 700, fontSize: 15, color: C.text }}>Dimple Menda</span>}
          </div>
          <div style={{ display: "flex", gap: isMobile ? 0 : 32, alignItems: "center" }}>
            {!isMobile && NAV.map(n => (
              <a key={n} href={`#${n.toLowerCase()}`} style={{
                color: active === n.toLowerCase() ? C.red : C.muted,
                fontSize: 13, textDecoration: "none", fontWeight: 500,
                borderBottom: `2px solid ${active === n.toLowerCase() ? C.red : "transparent"}`,
                paddingBottom: 2, transition: "color 0.2s"
              }}>{n}</a>
            ))}
            <a href="mailto:dimplemenda67@gmail.com" style={{
              background: C.red, color: "white", borderRadius: 6,
              padding: isMobile ? "6px 14px" : "7px 18px", fontSize: isMobile ? 12 : 13, fontWeight: 600, textDecoration: "none"
            }}>Hire Me</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="about" style={{ paddingTop: 60, position: "relative", zIndex: 1 }}>
        <div style={{ ...W, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 380px", gap: isMobile ? 32 : 64, alignItems: "center", padding: isMobile ? "64px 16px 48px" : "80px 44px 72px" }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 20, padding: "5px 14px", marginBottom: 30
            }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.green }} />
              <span style={{ fontSize: 11, color: C.subtle, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5 }}>Available for new opportunities</span>
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: isMobile ? 32 : 56, lineHeight: 1.06, margin: "0 0 4px", color: C.text }}>
              Dimple<br /><span style={{ color: C.red }}>Menda</span>
            </h1>

            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: C.muted, letterSpacing: 2.5, margin: "18px 0 22px", textTransform: "uppercase" }}>
              Senior Frontend Engineer · Technical Lead
            </p>

            <p style={{ color: C.subtle, fontSize: isMobile ? 13 : 15, lineHeight: 1.85, maxWidth: 490, marginBottom: 30 }}>
              8+ years engineering enterprise-grade web applications across healthcare and fintech. Deep expertise in{" "}
              <span style={{ color: C.text, fontWeight: 600 }}>Angular (2–18)</span>,{" "}
              <span style={{ color: C.text, fontWeight: 600 }}>RxJS</span>, and{" "}
              <span style={{ color: C.text, fontWeight: 600 }}>NgRx</span> — with a hands-on AI-augmented development workflow.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 34 }}>
              {["Angular 18", "Signals", "NgRx", "RxJS", "TypeScript", "AI Tools", "Healthcare", "Fintech"].map(t => (
                <Chip key={t} label={t} accent={C.red} />
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: isMobile ? "wrap" : "nowrap" }}>
              <a href="#contact" style={{ background: C.red, color: "white", borderRadius: 8, padding: "12px 28px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Get in Touch</a>
              <a href="#projects" style={{ background: "transparent", color: C.text, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 28px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>View Projects</a>
            </div>
          </div>

          {/* Profile card */}
          <div style={{ background: C.surface, borderRadius: 18, border: `1px solid ${C.border}`, overflow: "hidden", width: isMobile ? "100%" : "380px" }}>
            <div style={{ height: 4, background: `linear-gradient(90deg, ${C.red}, ${C.blue}, ${C.green})` }} />
            <div style={{ padding: isMobile ? "20px 20px" : "28px 26px" }}>
              {/* Avatar row */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.card}, #2A2A3A)`,
                  border: `2px solid ${C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Playfair Display', serif", fontWeight: 700,
                  fontSize: 22, color: C.text, flexShrink: 0
                }}>DM</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 3 }}>Dimple Menda</div>
                  <div style={{ fontSize: 11, color: C.muted, fontFamily: "'JetBrains Mono', monospace" }}>Technical Lead 2</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />
                    <span style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>Immediately Available</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 22 }}>
                {[{ v: "8+", l: "Years" }, { v: "3", l: "Companies" }, { v: "2", l: "Domains" }].map(s => (
                  <div key={s.l} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, color: C.red }}>{s.v}</div>
                    <div style={{ fontSize: 9, color: C.muted, marginTop: 2, fontFamily: "'JetBrains Mono', monospace" }}>{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Core stack */}
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 18, marginBottom: 18 }}>
                <div style={{ fontSize: 10, color: C.muted, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5, marginBottom: 12, textTransform: "uppercase" }}>Core Stack</div>
                {[
                  { label: "Angular (2–18)", color: C.red },
                  { label: "RxJS + NgRx", color: C.purple },
                  { label: "TypeScript", color: C.blue },
                  { label: "AI Dev Tools", color: C.green },
                ].map(({ label, color }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9 }}>
                    <div style={{ width: 3, height: 13, background: color, borderRadius: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: C.subtle, fontWeight: 500 }}>{label}</span>
                  </div>
                ))}
              </div>

              {/* Domain chips */}
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1, background: `${C.red}12`, border: `1px solid ${C.red}30`, borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: C.red, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>HEALTHCARE</div>
                  <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>Global Logic · CitiusTech</div>
                </div>
                <div style={{ flex: 1, background: `${C.blue}12`, border: `1px solid ${C.blue}30`, borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: C.blue, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>FINTECH</div>
                  <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>Oracle OFSAA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, position: "relative", zIndex: 1 }}>
        <div style={{ ...W, padding: isMobile ? "48px 16px" : "68px 44px" }}>
          <SectionHead line={C.red} eyebrow="Technical Skills" title="What I work with" />

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                background: cat === c ? C.red : "transparent",
                color: cat === c ? "white" : C.muted,
                border: `1px solid ${cat === c ? C.red : C.border}`,
                borderRadius: 6, padding: "6px 16px", fontSize: isMobile ? 10 : 11, fontWeight: 600,
                cursor: "pointer", fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: 0.3, transition: "all 0.18s"
              }}>{c}</button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
            {filtered.map((s, i) => (
              <div key={s.name} style={{
                background: C.card, border: `1px solid ${C.border}`, borderRadius: 10,
                padding: "15px 18px", transition: "border-color 0.2s, box-shadow 0.2s", cursor: "default"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.boxShadow = `0 0 16px ${s.color}18`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{s.name}</span>
                  <span style={{ fontSize: 11, color: s.color, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{s.level}%</span>
                </div>
                <SkillBar level={s.level} color={s.color} delay={i * 55} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ ...W, padding: isMobile ? "48px 16px" : "68px 44px" }}>
          <SectionHead line={C.blue} eyebrow="Experience" title="Where I've worked" />
          <div style={{ position: "relative" }}>
            {!isMobile && <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 1, background: C.border }} />}
            {experiences.map((exp, i) => (
              <div key={i} style={{ display: "flex", gap: 28, marginBottom: 20, flexDirection: isMobile ? "column" : "row" }}>
                {!isMobile && <div style={{ flexShrink: 0, width: 40, paddingTop: 24 }}>
                  <div style={{ width: 11, height: 11, borderRadius: "50%", background: exp.accent, border: `2px solid ${C.bg}`, boxShadow: `0 0 0 2px ${exp.accent}`, marginLeft: 14 }} />
                </div>}
                <div style={{
                  flex: 1, background: C.surface, border: `1px solid ${C.border}`,
                  borderRadius: 12, padding: isMobile ? "16px" : "22px 26px", transition: "border-color 0.2s, box-shadow 0.2s", cursor: "default"
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = exp.accent + "60"; e.currentTarget.style.boxShadow = `0 4px 20px ${exp.accent}10`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 3 }}>{exp.role}</div>
                      <div style={{ fontSize: 13, color: exp.accent, fontWeight: 600 }}>{exp.company}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <Chip label={exp.domain} accent={exp.accent} />
                      <span style={{ fontSize: 11, color: C.muted, fontFamily: "'JetBrains Mono', monospace" }}>{exp.period}</span>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "8px" : "5px 20px" }}>
                    {exp.highlights.map((h, j) => (
                      <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: exp.accent, marginTop: 7, flexShrink: 0 }} />
                        <span style={{ fontSize: 12.5, color: C.subtle, lineHeight: 1.65 }}>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, position: "relative", zIndex: 1 }}>
        <div style={{ ...W, padding: isMobile ? "48px 16px" : "68px 44px" }}>
          <SectionHead line={C.green} eyebrow="Projects" title="Selected work" />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 18 }}>
            {projects.map((p, i) => (
              <div key={i} style={{
                background: C.card, border: `1px solid ${C.border}`, borderRadius: 12,
                padding: "26px", position: "relative", overflow: "hidden",
                transition: "border-color 0.2s, box-shadow 0.2s", cursor: "default"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = p.accent + "55"; e.currentTarget.style.boxShadow = `0 4px 24px ${p.accent}14`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: p.accent, borderRadius: "12px 0 0 12px" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: C.text, margin: 0 }}>{p.title}</h3>
                  <Chip label={p.status} accent={p.accent} />
                </div>
                <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.75, marginBottom: 16 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: p.link ? 14 : 0 }}>
                  {p.tags.map(t => <Chip key={t} label={t} accent={p.accent} />)}
                </div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" style={{ color: p.accent, fontSize: 12, fontWeight: 700, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace" }}>
                    View on GitHub →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ ...W, padding: isMobile ? "48px 16px" : "68px 44px" }}>
          <SectionHead line={C.purple} eyebrow="Contact" title="Let's connect" />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 24 : 40, alignItems: "start" }}>
            <div>
              <p style={{ color: C.subtle, fontSize: isMobile ? 13 : 15, lineHeight: 1.85, marginBottom: 32 }}>
                Immediately available and open to Senior Frontend Engineer, Technical Lead, and Frontend Architect roles — ideally at product companies where I can drive architecture and mentor teams.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Email",    val: "dimplemenda67@gmail.com",      href: "mailto:dimplemenda67@gmail.com" },
                  { label: "LinkedIn", val: "linkedin.com/in/dimple-menda", href: "https://linkedin.com/in/dimple-menda" },
                  { label: "GitHub",   val: "github.com/dimplemenda67",     href: "https://github.com/dimplemenda67" },
                  { label: "Location", val: "Pune, Maharashtra, India",     href: null },
                ].map(({ label, val, href }) => (
                  <div key={label} style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: isMobile ? "wrap" : "nowrap" }}>
                    <span style={{ width: isMobile ? "100%" : 76, fontSize: isMobile ? 9 : 10, color: C.muted, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5, textTransform: "uppercase", flexShrink: 0 }}>{label}</span>
                    {href
                      ? <a href={href} target="_blank" rel="noreferrer" style={{ color: C.text, fontSize: isMobile ? 12 : 13.5, fontWeight: 500, textDecoration: "none", borderBottom: `1px solid ${C.border}` }}>{val}</a>
                      : <span style={{ color: C.subtle, fontSize: isMobile ? 12 : 13.5 }}>{val}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: isMobile ? "20px" : "32px", overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.red}, ${C.purple})` }} />
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: isMobile ? 18 : 24, color: C.text, margin: "0 0 10px", lineHeight: 1.25 }}>
                Ready to <span style={{ color: C.red }}>contribute</span> from day one.
              </h3>
              <p style={{ color: C.muted, fontSize: isMobile ? 12 : 13, lineHeight: 1.8, marginBottom: 22 }}>
                With 8+ years of Angular expertise, a proven track record across enterprise products, and immediate availability — I can hit the ground running.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 26 }}>
                {[
                  "Immediate joiner",
                  "Healthcare & Fintech domain expertise",
                  "Team lead & mentoring experience",
                  "AI-augmented development workflow",
                ].map(item => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.red, flexShrink: 0 }} />
                    <span style={{ fontSize: isMobile ? 12 : 13, color: C.subtle }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, flexDirection: isMobile ? "column" : "row" }}>
                <button onClick={copy} style={{
                  flex: 1, background: C.red, color: "white", border: "none",
                  borderRadius: 8, padding: "12px 0", fontSize: isMobile ? 12 : 13, fontWeight: 700,
                  cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "opacity 0.2s"
                }}>{copied ? "Copied!" : "Copy Email"}</button>
                <a href="https://linkedin.com/in/dimple-menda" target="_blank" rel="noreferrer" style={{
                  flex: 1, background: "transparent", color: C.text,
                  border: `1px solid ${C.border}`, borderRadius: 8,
                  padding: "12px 0", fontSize: isMobile ? 12 : 13, fontWeight: 600,
                  textDecoration: "none", textAlign: "center"
                }}>LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: C.surface, borderTop: `1px solid ${C.border}`,
        padding: isMobile ? "16px 12px" : "22px 44px", display: "flex", justifyContent: isMobile ? "center" : "space-between",
        alignItems: "center", fontSize: isMobile ? 9 : 11, fontFamily: "'JetBrains Mono', monospace",
        color: C.muted, position: "relative", zIndex: 1, flexDirection: isMobile ? "column" : "row", gap: isMobile ? 8 : 0, textAlign: isMobile ? "center" : "left"
      }}>
        <span>© 2026 Dimple Menda</span>
        <span style={{ color: C.border }}>Built with React · Pune, India</span>
        <a href="mailto:dimplemenda67@gmail.com" style={{ color: C.red, textDecoration: "none" }}>dimplemenda67@gmail.com</a>
      </footer>

      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #FF4060; border-radius: 3px; }
        ::-webkit-scrollbar-track { background: #0E0E14; }
        a { transition: opacity 0.2s; }
      `}</style>
    </div>
  );
}
