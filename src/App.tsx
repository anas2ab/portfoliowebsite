import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { capabilities, commands, impacts, links, projects, timeline, type Project } from "./content";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function Header({ openCommand }: { openCommand: () => void }) {
  return (
    <header className="site-header">
      <a className="monogram" href="#top" aria-label="AB. Anas Butt, home">AB<span>.</span></a>
      <nav aria-label="Main navigation">
        <a href="#work">Impact</a>
        <a href="#projects">Projects</a>
        <a href="#timeline">Journey</a>
      </nav>
      <button className="command-trigger" onClick={openCommand}>
        <span>Command</span><kbd>⌘ K</kbd>
      </button>
    </header>
  );
}

function BootScreen() {
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), reduced ? 150 : 1500);
    return () => window.clearTimeout(timer);
  }, [reduced]);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="boot" exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .45 }}>
          <div className="boot-mark">AB<span>.</span></div>
          <div className="boot-log">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }}>LOADING PORTFOLIO</motion.span>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .8, delay: .35 }} className="boot-line" />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>READY / TORONTO</motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hero({ openCommand }: { openCommand: () => void }) {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 800], [0, 90]);
  const contentY = useTransform(scrollY, [0, 700], [0, -50]);
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="track-ribbon" aria-hidden="true" />
      <div className="hero-confetti" aria-hidden="true" />
      <motion.div className="hero-portrait" style={{ y: imageY }}>
        <img src={`${import.meta.env.BASE_URL}anas-butt-portrait.jpg`} alt="Anas Butt" />
        <div className="portrait-shade" />
      </motion.div>
      <div className="hero-grid" aria-hidden="true" />
      <motion.div className="hero-content" style={{ y: contentY }}>
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          Senior Software Engineer / Toronto
        </motion.p>
        <motion.h1 id="hero-title" initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: 1.55 }}>
          Anas Butt<span>.</span>
        </motion.h1>
        <motion.div className="hero-statement" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: 1.72 }}>
          <p>I work on the kind of backend systems where speed matters, but boring reliability matters more.</p>
          <div className="hero-actions">
            <a href="#work" className="text-link">Explore the work <Arrow /></a>
            <button onClick={openCommand} className="quiet-action">or press <kbd>⌘ K</kbd></button>
          </div>
        </motion.div>
      </motion.div>
      <div className="hero-status" aria-label="Systems online">
        <span className="start-light" /><span className="start-light" /><span className="start-light" /> SYSTEMS ONLINE
      </div>
      <div className="scroll-note">SCROLL TO INSPECT <span>↓</span></div>
    </section>
  );
}

function SectionIntro({ index, label, title, body }: { index: string; label: string; title: string; body: string }) {
  return (
    <motion.header className="section-intro" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .35 }} transition={{ duration: .6 }}>
      <div className="section-kicker"><span>{index}</span>{label}</div>
      <h2>{title}</h2>
      <p>{body}</p>
    </motion.header>
  );
}

function SystemMap() {
  const reduce = useReducedMotion();
  return (
    <section className="system-section" id="stack" aria-labelledby="system-title">
      <div className="system-copy">
        <p className="eyebrow">Operating model</p>
        <h2 id="system-title">I like the messy middle.</h2>
        <p>The useful work usually sits between a vague business ask and a production system that has to survive real traffic, old constraints, and future changes.</p>
      </div>
      <div className="system-map">
        <svg viewBox="0 0 900 580" role="img" aria-labelledby="system-map-title">
          <title id="system-map-title">System diagram connecting intent, Java and Spring services, Kafka events, AWS APIs, Kubernetes, observability, and results</title>
          <defs>
            <filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <g className="map-lines">
            <motion.path d="M120 290H275" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1 }} />
            <motion.path d="M395 290H510" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: .2 }} />
            <motion.path d="M630 290H780" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: .4 }} />
            <motion.path d="M335 230V120H600V230" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.1, delay: .45 }} />
            <motion.path d="M570 350V470H335V350" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.1, delay: .6 }} />
          </g>
          {!reduce && <g className="map-pulses" filter="url(#glow)">
            <circle r="4"><animateMotion dur="3s" repeatCount="indefinite" path="M120 290H780" /></circle>
            <circle r="4"><animateMotion dur="4s" repeatCount="indefinite" path="M335 290V120H600V290" /></circle>
          </g>}
          <g className="map-node"><rect x="30" y="245" width="90" height="90" rx="45"/><text x="75" y="285">01</text><text x="75" y="307">INTENT</text></g>
          <g className="map-node featured"><rect x="275" y="230" width="120" height="120" rx="8"/><text x="335" y="280">JAVA</text><text x="335" y="304">SPRING</text></g>
          <g className="map-node"><rect x="510" y="230" width="120" height="120" rx="60"/><text x="570" y="284">KAFKA</text><text x="570" y="306">EVENTS</text></g>
          <g className="map-node"><rect x="780" y="245" width="90" height="90" rx="4"/><text x="825" y="285">04</text><text x="825" y="307">RESULT</text></g>
          <g className="map-node small"><rect x="530" y="75" width="140" height="60" rx="3"/><text x="600" y="110">AWS / APIs</text></g>
          <g className="map-node small"><rect x="265" y="445" width="140" height="60" rx="3"/><text x="335" y="480">KUBERNETES</text></g>
          <g className="map-node small"><rect x="500" y="445" width="140" height="60" rx="3"/><text x="570" y="480">OBSERVABILITY</text></g>
        </svg>
      </div>
    </section>
  );
}

function ImpactLog() {
  return (
    <section className="impact-section" id="work">
      <SectionIntro index="01" label="Impact log" title="A few things I have made better." body="Not every win is glamorous. Sometimes the best work is shaving minutes off a process people use every day." />
      <div className="impact-table">
        <div className="impact-head"><span>Record</span><span>Outcome</span><span>Signal</span></div>
        {impacts.map((impact, i) => (
          <motion.article className="impact-row" key={impact.code} initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}>
            <div className="impact-code"><span>{impact.code}</span><small>{impact.status}</small></div>
            <div className="impact-copy"><h3>{impact.title}</h3><p>{impact.detail}</p></div>
            <strong>{impact.metric}</strong>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ProjectVisual({ type }: { type: Project["visual"] }) {
  if (type === "trading") return (
    <div className="visual screenshot-visual trading-screenshot">
      <img src={`${import.meta.env.BASE_URL}trading_journal.png`} alt="Trading Journal dashboard showing balance, profit and loss, open positions, win rate, equity chart, and review queue" />
      <span className="screenshot-label">LOCAL-FIRST PRODUCT / DASHBOARD</span>
    </div>
  );
  if (type === "business") return (
    <div className="visual screenshot-visual business-screenshot">
      <img src={`${import.meta.env.BASE_URL}ym_eventvendors.png`} alt="YM Event Vendors homepage advertising premier photo booth rentals across Toronto and surrounding areas" />
      <span className="screenshot-label">CUSTOMER-FACING BUSINESS / HOMEPAGE</span>
    </div>
  );
  if (type === "archive") return (
    <div className="visual archive-ui">
      <div className="scan-line" />
      <p>$ python scheduler.py</p><p className="dim">[08:15:00] scanning listings...</p>
      <p>[08:15:03] 247 listings checked</p><p className="green">[MATCH] price below threshold</p>
      <p className="dim">email notification dispatched</p><div className="cursor" />
    </div>
  );
  return (
    <div className={`visual architecture-ui ${type}`}>
      <div className="arch-node main">{type === "modernize" ? "JAVA 21" : "EVENT"}</div>
      <div className="arch-node one">{type === "modernize" ? "API" : "RETRY"}</div>
      <div className="arch-node two">{type === "modernize" ? "AWS" : "KAFKA"}</div>
      <div className="arch-node three">{type === "modernize" ? "OPENSHIFT" : "IDEMPOTENCY"}</div>
      <svg viewBox="0 0 600 400" aria-hidden="true"><path d="M300 200 120 100M300 200 480 90M300 200 470 310"/></svg>
    </div>
  );
}

function Projects({ openProject }: { openProject: (project: Project) => void }) {
  return (
    <section className="projects-section" id="projects">
      <SectionIntro index="02" label="Selected systems" title="Some work from the desk." body="A mix of enterprise systems, side projects, and small business work. Different contexts, same habit: make it useful and keep it maintainable." />
      <div className="project-list">
        {projects.map((project, i) => (
          <motion.article className="project-row" key={project.id} initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .65, delay: i * .04 }}>
            <div className="project-meta"><span>{project.index}</span><p>{project.eyebrow}</p></div>
            <button className="project-open" onClick={() => openProject(project)} aria-label={`Read case study: ${project.title}`}>
              <div className="project-copy"><h3>{project.title}</h3><p>{project.summary}</p><strong>{project.outcome}</strong></div>
              <ProjectVisual type={project.visual} />
              <span className="project-arrow"><Arrow diagonal /></span>
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="capabilities">
      <SectionIntro index="03" label="Capabilities" title="Tools I reach for often." body="The exact stack changes by problem. These are the tools and patterns I have spent enough time with to know where they help, and where they bite." />
      <div className="capability-grid">
        {capabilities.map((group) => <div key={group.label}><span>{group.label}</span>{group.items.map(item => <p key={item}>{item}</p>)}</div>)}
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="timeline-section" id="timeline">
      <SectionIntro index="04" label="Trajectory" title="A practical path into engineering." body="Support, QA, delivery, platform work, modernization. Each step made me better at seeing how software behaves once real people depend on it." />
      <div className="timeline">
        {timeline.map((item, i) => (
          <motion.div className="timeline-row" key={item.years} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * .08 }}>
            <span className="timeline-year">{item.years}</span>
            <span className="timeline-dot" />
            <div><h3>{item.role}</h3><strong>{item.place}</strong><p>{item.note}</p></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer className="contact" id="contact">
      <p className="eyebrow">Open channel / 05</p>
      <h2>Want to build something<br /><em>that holds up?</em></h2>
      <a className="email-link" href={links.email}>anasahmadbutt@gmail.com <Arrow diagonal /></a>
      <div className="footer-links">
        <span>TORONTO, CANADA</span>
        <a href={links.github} target="_blank" rel="noreferrer">GITHUB <Arrow diagonal /></a>
        <a href={links.resume} target="_blank" rel="noreferrer">RESUME <Arrow diagonal /></a>
        <a href="#top">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}

function CommandPalette({ open, close }: { open: boolean; close: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const filtered = useMemo(() => commands.filter(c => `${c.label} ${c.hint}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const dismiss = () => {
    setQuery("");
    close();
  };
  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);
  const go = (command: typeof commands[number]) => {
    if (command.external) window.open(command.target, "_blank", "noopener,noreferrer");
    else document.querySelector(command.target)?.scrollIntoView({ behavior: "smooth" });
    dismiss();
  };
  return (
    <AnimatePresence>
      {open && <motion.div className="palette-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={dismiss}>
        <motion.div className="palette" role="dialog" aria-modal="true" aria-label="Command menu" initial={{ opacity: 0, scale: .96, y: -15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .98 }} onMouseDown={e => e.stopPropagation()}>
          <div className="palette-input"><span>›</span><input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Where do you want to go?" onKeyDown={e => { if (e.key === "Escape") dismiss(); if (e.key === "Enter" && filtered[0]) go(filtered[0]); }} /></div>
          <div className="palette-results">
            {filtered.map((command, i) => <button key={command.label} onClick={() => go(command)}><span><b>{command.label}</b>{command.hint}</span><small>{i === 0 ? "↵" : "→"}</small></button>)}
            {!filtered.length && <p className="empty-result">No matching command.</p>}
          </div>
          <div className="palette-foot"><span>ESC TO CLOSE</span><span>ENTER TO SELECT</span></div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  );
}

function ProjectModal({ project, close }: { project: Project | null; close: () => void }) {
  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", handler);
    return () => { document.body.classList.remove("modal-open"); window.removeEventListener("keydown", handler); };
  }, [project, close]);
  return (
    <AnimatePresence>
      {project && <motion.div className="case-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.article className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-title" layoutId={`project-${project.id}`} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 240 }}>
          <button className="case-close" onClick={close} aria-label="Close case study">CLOSE <span>×</span></button>
          <div className="case-number">{project.index} / 05</div>
          <p className="eyebrow">{project.eyebrow}</p>
          <h2 id="case-title">{project.title}</h2>
          <p className="case-lead">{project.summary}</p>
          <ProjectVisual type={project.visual} />
          <div className="case-detail">
            <div><span>OUTCOME</span><strong>{project.outcome}</strong></div>
            <div><span>CONTEXT</span><p>{project.context}</p></div>
          </div>
          <div className="case-lower">
            <div className="case-stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div>
            <ol>{project.details.map(item => <li key={item}>{item}</li>)}</ol>
          </div>
          {project.link && <a className="case-link" href={project.link} target="_blank" rel="noreferrer">VIEW REPOSITORY <Arrow diagonal /></a>}
        </motion.article>
      </motion.div>}
    </AnimatePresence>
  );
}

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPaletteOpen(v => !v); }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  return (
    <>
      <BootScreen />
      <Header openCommand={() => setPaletteOpen(true)} />
      <main>
        <Hero openCommand={() => setPaletteOpen(true)} />
        <SystemMap />
        <ImpactLog />
        <Projects openProject={setSelectedProject} />
        <Capabilities />
        <Timeline />
      </main>
      <Contact />
      <CommandPalette open={paletteOpen} close={() => setPaletteOpen(false)} />
      <ProjectModal project={selectedProject} close={() => setSelectedProject(null)} />
    </>
  );
}
