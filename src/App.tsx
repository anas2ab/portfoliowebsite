import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { capabilities, impacts, links, projects, timeline, type Project } from "./content";

const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`;

const easeOut = [.16, 1, .3, 1] as const;

const stagger = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, amount: .15 },
  variants: { show: { transition: { staggerChildren: .07 } } },
};
const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: .7, ease: easeOut } },
};
const settle = {
  hidden: { opacity: 0, scale: .97 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.1, ease: easeOut } },
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

const navItems = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top">Anas Butt</a>
      <nav aria-label="Main navigation">
        {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </nav>
    </header>
  );
}

const newJobSeconds = 10;
const oldJobFastest = 180;
const oldJobSlowest = 420;

function clock(seconds: number) {
  const whole = Math.max(0, Math.floor(seconds));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

function raceMessage(run: number, elapsed: number) {
  if (run === 0) return "Same job, before and after, each at real speed.";
  if (elapsed >= oldJobSlowest) return "The old job has finally finished.";
  if (elapsed >= oldJobFastest) return `The new job finished ${clock(elapsed - newJobSeconds)} ago. The old one could take until 7:00.`;
  if (elapsed >= newJobSeconds) return `The new job is done. The old one needs at least ${clock(oldJobFastest - elapsed)} more.`;
  return "Same job, before and after, each at real speed.";
}

function JobRace() {
  // Starts on arrival so the page's one idea is already running; reduced motion waits for a press.
  const [run, setRun] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1);
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (run === 0) return;
    const start = performance.now();
    const timer = window.setInterval(() => {
      const seconds = (performance.now() - start) / 1000;
      setElapsed(Math.min(seconds, oldJobSlowest));
      if (seconds >= oldJobSlowest) window.clearInterval(timer);
    }, 100);
    return () => window.clearInterval(timer);
  }, [run]);
  const idle = run === 0;
  const newDone = elapsed >= newJobSeconds;
  const oldDone = elapsed >= oldJobSlowest;
  const oldFill = idle ? 1 : elapsed / oldJobSlowest;
  const newFill = idle ? newJobSeconds / oldJobSlowest : Math.min(elapsed / newJobSeconds, 1);
  const announcement = idle ? "" : oldDone ? "The old job has finished." : newDone ? "The new job finished in about 10 seconds. The old job is still running." : "";
  return (
    <div className="race" data-ui>
      <div className="race-head">
        <h2>One job I made faster</h2>
        <button className="race-run" onClick={() => { setElapsed(0); setRun((value) => value + 1); }}>
          {idle ? "Run both" : "Run again"}
        </button>
      </div>
      <p className="race-clock" aria-hidden="true">{idle ? "~10 sec" : clock(elapsed)}</p>
      <div className="race-job">
        <div className="race-label"><span>Before</span><span>{oldDone ? "Done at 7:00" : "3–7 min"}</span></div>
        <div className="race-track">
          <i className="race-fill" style={{ transform: `scaleX(${oldFill})` }} />
          <i className="race-mark" style={{ left: `${oldJobFastest / oldJobSlowest * 100}%` }} />
        </div>
      </div>
      <div className="race-job">
        <div className="race-label"><span>After</span><span>{!idle && newDone ? "Done at 0:10" : "~10 sec"}</span></div>
        <div className="race-track">
          <i className={!idle && newDone ? "race-fill race-fill-done" : "race-fill"} style={{ transform: `scaleX(${newFill})` }} />
        </div>
      </div>
      <p className="race-message" aria-hidden="true">{raceMessage(run, elapsed)}</p>
      <span className="visually-hidden" role="status">{announcement}</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-text">
        <img className="hero-portrait" src={asset("anas-butt-illustrated.webp")} alt="Illustrated portrait of Anas Butt" width="1200" height="800" fetchPriority="high" />
        <h1 id="hero-title">
          <span className="line"><span>Anas Butt, senior</span></span>{" "}
          <span className="line"><span>software engineer</span></span>
        </h1>
        <div className="hero-follow">
          <p>I turn complex systems into dependable software, mostly backend work at Sun Life in Toronto.</p>
          <div className="hero-actions">
            <a className="button-link" href="#work">See the work <Arrow /></a>
            <a className="text-link" href={links.resume} target="_blank" rel="noreferrer">Read my résumé <Arrow diagonal /></a>
          </div>
        </div>
      </div>
      <div className="hero-instrument">
        <JobRace />
      </div>
    </section>
  );
}

function Results() {
  return (
    <section className="page-grid results" id="results" aria-labelledby="results-title">
      <m.div className="column" {...stagger}>
        <m.h2 id="results-title" variants={rise}>A few things I’ve made better</m.h2>
        <dl className="figures">
          {impacts.map((impact) => (
            <m.div key={impact.figure} variants={rise}>
              <dt>{impact.figure}</dt>
              <dd>{impact.detail}</dd>
            </m.div>
          ))}
        </dl>
      </m.div>
      <m.figure className="side results-picture" {...stagger}>
        <m.div className="results-frame" variants={settle}>
          <img src={asset("card-punch-1940.webp")} alt="A clerk in about 1940 punching census data into cards by hand at a desk" width="1100" height="867" loading="lazy" decoding="async" />
        </m.div>
        <figcaption>Data collection by hand, about 1940. Some of my work has been replacing its modern equivalent with an API.</figcaption>
      </m.figure>
    </section>
  );
}

function ModernizeDiagram() {
  return (
    <svg className="diagram" viewBox="0 0 600 343" role="img" aria-label="Processing time, drawn to scale: three to seven minutes before, about ten seconds after. Java 8 to Java 25.">
      <text className="diagram-title" x="40" y="58">Processing time, to scale</text>
      <text className="diagram-label" x="40" y="112">Before</text>
      <text className="diagram-value" x="560" y="112" textAnchor="end">3–7 min</text>
      <rect className="bar-range" x="40" y="126" width="520" height="30" />
      <rect className="bar-before" x="40" y="126" width="223" height="30" />
      <text className="diagram-label" x="40" y="208">After</text>
      <text className="diagram-value" x="560" y="208" textAnchor="end">~10 sec</text>
      <rect className="bar-track" x="40" y="222" width="520" height="30" />
      <rect className="bar-after" x="40" y="222" width="12" height="30" />
      <text className="diagram-label" x="40" y="302">Java 8 → Java 25, moved to OpenShift</text>
    </svg>
  );
}

function EventsDiagram() {
  const steps = [
    { x: 40, label: "Event" },
    { x: 176, label: "Kafka" },
    { x: 312, label: "Service" },
    { x: 448, label: "Done" },
  ];
  return (
    <svg className="diagram" viewBox="0 0 600 343" role="img" aria-label="A document event flows through Kafka to an idempotent service and finishes; failures retry back through Kafka, with monitoring across every step.">
      <text className="diagram-title" x="40" y="58">Document event flow</text>
      {steps.map((step, i) => (
        <g key={step.label}>
          <rect className={i === 2 ? "node node-accent" : "node"} x={step.x} y="92" width="112" height="60" />
          <text className={i === 2 ? "node-label node-label-accent" : "node-label"} x={step.x + 56} y="129" textAnchor="middle">{step.label}</text>
          {i < 3 && <path className="edge" d={`M${step.x + 114} 122H${step.x + 134}`} />}
        </g>
      ))}
      <path className="edge edge-retry" d="M368 154V208H232V154" />
      <path className="edge-head" d="M224 166 232 152 240 166z" />
      <text className="diagram-label" x="300" y="240" textAnchor="middle">retry on failure, safely</text>
      <text className="diagram-label" x="40" y="302">Idempotent, and monitored end to end</text>
    </svg>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.visual === "modernize") return <div className="visual"><ModernizeDiagram /></div>;
  if (project.visual === "events") return <div className="visual"><EventsDiagram /></div>;
  if (project.visual === "archive") return (
    <div className="visual archive-ui">
      <pre><code>{"$ python scheduler.py\n[08:15:00] scanning listings...\n[08:15:03] listings checked\n[MATCH] price below threshold\nemail notification dispatched"}</code></pre>
    </div>
  );
  const shot = project.screenshot!;
  return (
    <div className="visual screenshot-visual">
      <img src={asset(shot.file)} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" decoding="async" />
    </div>
  );
}

function Work({ openProject }: { openProject: (project: Project) => void }) {
  const [active, setActive] = useState(projects[2]);
  return (
    <section className="page-grid work" id="work" aria-labelledby="work-title">
      <m.div className="column" {...stagger}>
        <m.h2 id="work-title" variants={rise}>Built for actual use</m.h2>
        <m.p className="section-lead" variants={rise}>Enterprise systems, personal tools, and a small business website. Different contexts, the same preference for useful, maintainable software.</m.p>
        <ul className="ledger">
          {projects.map((project) => (
            <m.li key={project.id} variants={rise}>
              <div className="ledger-picture"><ProjectVisual project={project} /></div>
              <button
                className="ledger-row"
                aria-haspopup="dialog"
                data-active={active.id === project.id || undefined}
                onMouseEnter={() => setActive(project)}
                onFocus={() => setActive(project)}
                onClick={() => openProject(project)}
              >
                <span className="ledger-name">{project.name}</span>
                <span className="ledger-kind">{project.eyebrow}</span>
                <span className="ledger-status">{project.status}</span>
              </button>
              <p className="ledger-summary">{project.summary}</p>
            </m.li>
          ))}
        </ul>
      </m.div>
      <div className="side work-preview">
        <div className="work-preview-inner">
          <ProjectVisual key={active.id} project={active} />
          <h3>{active.title}</h3>
          <p>{active.summary}</p>
          <button className="text-link" onClick={() => openProject(active)} aria-haspopup="dialog">Read about {active.name} <Arrow /></button>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="page-grid about" id="about" aria-labelledby="about-title">
      <m.div className="column" {...stagger}>
        <m.h2 id="about-title" variants={rise}>What happens after it ships</m.h2>
        <m.p variants={rise}>I build backend software, and I care about how it behaves once people depend on it.</m.p>
        <m.p variants={rise}>I’m a senior software engineer at Sun Life, mostly working with Java, Spring Boot, Kafka, and the infrastructure around them. I like modernization work, production debugging, and <mark>turning slow or fragile processes into dependable ones.</mark></m.p>
        <m.p variants={rise}>Outside the day job, I’m building House Fax, Find an Open Court, and a local-first trading journal, and helping run a Toronto photo booth business. They keep me close to the practical side of software: real constraints, real users, and no room for theatre.</m.p>
        <m.p className="signature" variants={rise}>Anas Butt</m.p>
      </m.div>
      <m.dl className="side about-now" {...stagger}>
        <m.div variants={rise}><dt>Working on</dt><dd>Java modernization</dd></m.div>
        <m.div variants={rise}><dt>Building</dt><dd>Find an Open Court</dd></m.div>
        <m.div variants={rise}><dt>Based in</dt><dd>Toronto, Canada</dd></m.div>
        <m.div variants={rise}><dt>Studied at</dt><dd>York University, BSc Computer Science</dd></m.div>
      </m.dl>
    </section>
  );
}

function Experience() {
  return (
    <section className="page-grid experience" id="experience" aria-labelledby="experience-title">
      <m.div className="column" {...stagger}>
        <m.h2 id="experience-title" variants={rise}>I learned the system from the outside in</m.h2>
        <ol className="rows">
          {timeline.map((item) => (
            <m.li key={item.role} variants={rise}>
              <div className="rows-top">
                <h3>{item.role}</h3>
                <span>{item.years}</span>
              </div>
              <p><strong>{item.place}.</strong> {item.note}</p>
            </m.li>
          ))}
        </ol>
      </m.div>
      <m.div className="side toolkit" {...stagger}>
        <m.h2 variants={rise}>What I work with</m.h2>
        <m.p className="section-lead" variants={rise}>The stack changes with the problem. These are the tools I’ve spent enough time with to know where they help, and where they bite.</m.p>
        <div className="toolkit-groups">
          {capabilities.map((group) => (
            <m.div key={group.label} variants={rise}>
              <h3>{group.label}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </m.div>
          ))}
        </div>
      </m.div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    await navigator.clipboard.writeText(links.emailAddress);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <m.h2 id="contact-title" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, ease: easeOut }}>Want to build something that holds up?</m.h2>
      <img className="contact-portrait" src={asset("anas-butt-illustrated.webp")} alt="" width="1200" height="800" loading="lazy" decoding="async" />
      <div className="contact-links">
        <p className="contact-question">Email is the best way to reach me.</p>
        <div className="contact-email">
          <a href={links.email}>{links.emailAddress}</a>
          <button className="copy-email" onClick={copyEmail}>{copied ? "Copied" : "Copy"}<span className="visually-hidden"> email address</span></button>
          <span className="visually-hidden" role="status">{copied ? "Email address copied" : ""}</span>
        </div>
        <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
        <p className="contact-city">Toronto, Canada</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>Anas Butt, software engineer</span>
      <div>
        <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={links.resume} target="_blank" rel="noreferrer">Résumé</a>
      </div>
      <span className="footer-credit">Card punch photo: <a href="https://commons.wikimedia.org/wiki/File:Card_puncher_-_NARA_-_513295.jpg" target="_blank" rel="noreferrer">NARA</a>, public domain</span>
    </footer>
  );
}

function ProjectModal({ project, close }: { project: Project | null; close: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const isOpen = project !== null;
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    modalRef.current?.querySelector("button")?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", handler);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handler);
      opener?.focus();
    };
  }, [isOpen, close]);
  return (
    <AnimatePresence>
      {project && <m.div className="case-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => e.target === e.currentTarget && close()}>
        <m.div ref={modalRef} className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-title" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: .5, ease: easeOut }}>
          <button className="case-close" onClick={close} aria-label={`Close ${project.name}`}>Close <span aria-hidden="true">×</span></button>
          <h2 id="case-title">{project.title}</h2>
          <p className="case-lead">{project.name}, {project.eyebrow.toLowerCase()}. {project.summary}</p>
          <ProjectVisual project={project} />
          <div className="case-detail">
            <div><h3>Outcome</h3><p>{project.outcome}</p></div>
            <div><h3>Context</h3><p>{project.context}</p></div>
          </div>
          <div className="case-lower">
            <div><h3>Stack</h3><ul className="case-stack">{project.stack.map(item => <li key={item}>{item}</li>)}</ul></div>
            <div><h3>What I did</h3><ul className="case-points">{project.details.map(item => <li key={item}>{item}</li>)}</ul></div>
          </div>
          <div className="case-links">
            {project.site && <a className="text-link" href={project.site} target="_blank" rel="noreferrer">Visit website <Arrow diagonal /></a>}
            {project.link && <a className="text-link" href={project.link} target="_blank" rel="noreferrer">View repository <Arrow diagonal /></a>}
          </div>
        </m.div>
      </m.div>}
    </AnimatePresence>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a className="skip-link" href="#results">Skip to content</a>
        <Header />
        <main>
          <Hero />
          <Results />
          <Work openProject={setSelectedProject} />
          <About />
          <Experience />
          <Contact />
        </main>
        <Footer />
        <ProjectModal project={selectedProject} close={closeProject} />
      </MotionConfig>
    </LazyMotion>
  );
}
