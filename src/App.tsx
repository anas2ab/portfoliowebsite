import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { capabilities, impacts, links, projects, timeline, type Project } from "./content";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function Header() {
  return (
    <header className="site-header">
      <a className="monogram" href="#top" aria-label="AB. Anas Butt, home">AB<span>.</span></a>
      <nav aria-label="Main navigation">
        <a href="#about">About</a>
        <a href="#projects">Work</a>
        <a href="#timeline">Experience</a>
      </nav>
      <a className="header-contact" href={links.email}>Let’s talk <Arrow diagonal /></a>
    </header>
  );
}

function About() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <p className="about-label">A little context</p>
      <div className="about-copy">
        <h2 id="about-title">I build backend software, and I care about what happens after it ships.</h2>
        <p>I’m a senior software engineer at Sun Life, mostly working with Java, Spring Boot, Kafka, and the infrastructure around them. I like modernization work, production debugging, and turning slow or fragile processes into dependable ones.</p>
        <p>Outside the day job, I’m building a local-first trading journal and helping run a Toronto photo booth business. Both keep me close to the practical side of software: real constraints, real users, and no room for theatre.</p>
      </div>
      <aside className="about-now" aria-label="Currently">
        <span>Currently</span>
        <dl>
          <div><dt>Working on</dt><dd>Java modernization</dd></div>
          <div><dt>Building</dt><dd>A trading journal</dd></div>
          <div><dt>Based in</dt><dd>Toronto, Canada</dd></div>
        </dl>
      </aside>
    </section>
  );
}

function SocialRail() {
  return (
    <aside className="social-rail" aria-label="Profile links">
      <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
      <a href={links.resume} target="_blank" rel="noreferrer" aria-label="Résumé">CV</a>
      <span aria-hidden="true" />
    </aside>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 800], [0, 90]);
  const contentY = useTransform(scrollY, [0, 700], [0, -50]);
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <motion.div className="hero-portrait" style={{ y: imageY }}>
        <img src={`${import.meta.env.BASE_URL}anas-butt-portrait.jpg`} alt="Anas Butt" />
        <div className="portrait-shade" />
      </motion.div>
      <motion.div className="hero-content" style={{ y: contentY }}>
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .15 }}>
          Hi! <span className="wave" aria-hidden="true">✌🏼</span>
        </motion.p>
        <motion.p className="hero-name-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .19 }}>my name is</motion.p>
        <motion.h1 id="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .22 }}>
          Anas Butt<span>.</span>
        </motion.h1>
        <motion.div className="hero-statement" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .34 }}>
          <p className="hero-tagline">I turn complex systems into dependable software.</p>
          <p className="hero-introduction">I’m a senior software engineer from Toronto working across backend systems, modernization, and platform reliability.</p>
          <div className="hero-actions">
            <a href="#work" className="text-link">Explore the work <Arrow /></a>
            <a href={links.resume} target="_blank" rel="noreferrer" className="quiet-action">Read my résumé <Arrow diagonal /></a>
          </div>
        </motion.div>
      </motion.div>
      <div className="hero-status">Available for thoughtful conversations</div>
      <div className="scroll-note">Selected work <span>↓</span></div>
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

function ImpactLog() {
  return (
    <section className="impact-section" id="work">
      <SectionIntro index="01" label="At work" title="A few things I’ve made better." body="Not every win is glamorous. Sometimes the best work is shaving minutes off a process people use every day." />
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
      <SectionIntro index="02" label="Selected work" title="Built for actual use." body="Enterprise systems, personal tools, and a small business website. Different contexts; the same preference for useful, maintainable software." />
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
      <SectionIntro index="03" label="Toolkit" title="What I work with." body="The stack changes with the problem. These are the tools I’ve spent enough time with to know where they help—and where they bite." />
      <div className="capability-grid">
        {capabilities.map((group) => <div key={group.label}><span>{group.label}</span>{group.items.map(item => <p key={item}>{item}</p>)}</div>)}
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="timeline-section" id="timeline">
      <SectionIntro index="04" label="Experience" title="I learned the system from the outside in." body="Support, QA, delivery, platform work, modernization. Each step taught me more about how software behaves once people depend on it." />
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
      <p className="eyebrow">Get in touch / 05</p>
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  return (
    <>
      <Header />
      <SocialRail />
      <main>
        <Hero />
        <About />
        <ImpactLog />
        <Projects openProject={setSelectedProject} />
        <Capabilities />
        <Timeline />
      </main>
      <Contact />
      <ProjectModal project={selectedProject} close={() => setSelectedProject(null)} />
    </>
  );
}
