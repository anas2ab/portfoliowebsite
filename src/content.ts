export type Project = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  summary: string;
  outcome: string;
  context: string;
  stack: string[];
  details: string[];
  link?: string;
  visual: "modernize" | "events" | "trading" | "business" | "archive";
};

export const links = {
  email: "mailto:anasahmadbutt@gmail.com",
  github: "https://github.com/anas2ab",
  resume: `${import.meta.env.BASE_URL}Anas_Butt_Resume.pdf`,
};

export const commands = [
  { label: "work", hint: "Selected engineering work", target: "#work" },
  { label: "projects", hint: "Products and experiments", target: "#projects" },
  { label: "stack", hint: "System capabilities", target: "#stack" },
  { label: "timeline", hint: "Career progression", target: "#timeline" },
  { label: "contact", hint: "Start a conversation", target: "#contact" },
  { label: "resume", hint: "Open PDF resume", target: links.resume, external: true },
  { label: "github", hint: "Browse public repositories", target: links.github, external: true },
];

export const impacts = [
  {
    code: "PERF-021",
    status: "RESOLVED",
    metric: "3–7 min → ~10 sec",
    title: "Removed a critical processing bottleneck",
    detail: "Migrated workloads to OpenShift and eliminated deployment and runtime friction across a multi-application workflow.",
  },
  {
    code: "MOD-821",
    status: "SHIPPED",
    metric: "Java 8 → 21",
    title: "Modernized core enterprise applications",
    detail: "Led the runtime upgrade and architectural redesign while protecting integrations and production continuity.",
  },
  {
    code: "EVT-1000",
    status: "STABLE",
    metric: "1000s / day",
    title: "Scaled real-time document events",
    detail: "Built resilient Kafka processing with retries, idempotency, monitoring, and containerized deployments.",
  },
  {
    code: "REL-000",
    status: "VERIFIED",
    metric: "0 critical defects",
    title: "Owned production-grade releases",
    detail: "Managed delivery from development through production with stronger CI/CD, testing, and operational checks.",
  },
];

export const projects: Project[] = [
  {
    id: "modernization",
    index: "01",
    eyebrow: "Enterprise systems",
    title: "Modernization without the rewrite.",
    summary: "A deliberate move from aging Java foundations to a faster, cloud-ready multi-application workflow.",
    outcome: "Processing reduced to ~10 seconds",
    context: "Private enterprise work, presented with proprietary details removed.",
    stack: ["Java 21", "Spring Boot", "OpenShift", "AWS", "REST"],
    details: [
      "Led a Java 8 to Java 21 modernization across core applications.",
      "Redesigned system boundaries to support coordinated multi-application workflows.",
      "Moved workloads to OpenShift and addressed deployment and runtime bottlenecks.",
      "Built an AWS-hosted Spring Boot API to automate data collection.",
    ],
    visual: "modernize",
  },
  {
    id: "esign",
    index: "02",
    eyebrow: "Event-driven platform",
    title: "Documents moving reliably at scale.",
    summary: "Secure microservices and resilient event processing for an enterprise eSign platform.",
    outcome: "Thousands of daily real-time events",
    context: "Reliability patterns from production systems, shown without client data.",
    stack: ["Spring Boot", "Kafka", "Docker", "Kubernetes", "CI/CD"],
    details: [
      "Built and maintained secure, scalable microservices.",
      "Introduced retries and idempotency to reduce event-processing failures.",
      "Strengthened monitoring and delivery pipelines for safer releases.",
      "Owned release cycles across DEV, SIT, and PROD.",
    ],
    visual: "events",
  },
  {
    id: "trading-journal",
    index: "03",
    eyebrow: "Personal product",
    title: "A private trading journal built for decisions.",
    summary: "A local-first workspace for logging options trades and finding patterns without broker integrations.",
    outcome: "Analytics without surrendering data",
    context: "A current personal product built around real trading workflows.",
    stack: ["JavaScript", "Node.js", "Local-first", "Data viz"],
    details: [
      "Tracks P&L, win rate, equity curves, drawdown, and review queues.",
      "Supports options playbooks, rule scoring, and multi-leg strategies.",
      "Uses file-backed persistence with localStorage fallback.",
      "Includes JSON and CSV import/export with backup rotation.",
    ],
    link: "https://github.com/anas2ab/trading-journal",
    visual: "trading",
  },
  {
    id: "ym-events",
    index: "04",
    eyebrow: "Business + product",
    title: "Software serving a real event business.",
    summary: "A fast, search-focused website that turns regional demand into qualified photo-booth leads.",
    outcome: "Built, operated, and improved in-house",
    context: "The overlap between engineering decisions and business outcomes.",
    stack: ["HTML", "CSS", "JavaScript", "SEO", "Media"],
    details: [
      "Built location-specific landing pages for Ontario markets.",
      "Created an editorial content engine around customer search intent.",
      "Optimized responsive image and video assets for performance.",
      "Owns the full loop from product changes to customer impact.",
    ],
    link: "https://github.com/anas2ab/ymeventvendors",
    visual: "business",
  },
  {
    id: "kijiji-bot",
    index: "05",
    eyebrow: "From the archive",
    title: "Automating the hunt for undervalued listings.",
    summary: "An early Python experiment that scraped, filtered, scheduled, and surfaced marketplace opportunities.",
    outcome: "A useful problem turned into software",
    context: "An early signal of a long-running instinct: automate repetitive work.",
    stack: ["Python", "Flask", "Beautiful Soup", "APScheduler"],
    details: [
      "Scraped and filtered listings based on configurable conditions.",
      "Scheduled recurring searches every fifteen minutes.",
      "Added email reminders and a lightweight web interface.",
      "Deployed with an App Engine configuration.",
    ],
    link: "https://github.com/anas2ab/kijiji-bot",
    visual: "archive",
  },
];

export const timeline = [
  { years: "2025 — NOW", role: "Senior Software Engineer", place: "Sun Life", note: "Architecture, modernization, performance, and technical leadership." },
  { years: "2023 — 2025", role: "Software Engineer", place: "Sun Life", note: "Event-driven systems, platform resilience, and release ownership." },
  { years: "2022 — 2023", role: "Associate Software Engineer", place: "Sun Life", note: "Full-stack delivery, production debugging, and code quality." },
  { years: "2021 — 2022", role: "QA Analyst", place: "Tata Consultancy Services", note: "Quality systems and business-critical workflow validation." },
  { years: "2020 — 2021", role: "Support / Developer", place: "Flynn Group", note: "Applications support, investigation, and practical software delivery." },
];

export const capabilities = [
  { label: "BUILD", items: ["Java", "JavaScript", "Python", "Spring Boot"] },
  { label: "CONNECT", items: ["REST APIs", "Apache Kafka", "MySQL", "MongoDB"] },
  { label: "OPERATE", items: ["Docker", "Kubernetes", "OpenShift", "AWS"] },
  { label: "DELIVER", items: ["Jenkins", "CI/CD", "Observability", "Mentorship"] },
];
