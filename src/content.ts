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
  { label: "work", hint: "A few concrete wins", target: "#work" },
  { label: "projects", hint: "Systems, products, and experiments", target: "#projects" },
  { label: "stack", hint: "Tools I use day to day", target: "#stack" },
  { label: "timeline", hint: "How I got here", target: "#timeline" },
  { label: "contact", hint: "Email me", target: "#contact" },
  { label: "resume", hint: "Open PDF resume", target: links.resume, external: true },
  { label: "github", hint: "Browse public repositories", target: links.github, external: true },
];

export const impacts = [
  {
    code: "PERF-021",
    status: "RESOLVED",
    metric: "3–7 min → ~10 sec",
    title: "Turned a slow job into a quick one",
    detail: "Moved the workload to OpenShift and cleaned up the rough edges that were making a routine process drag.",
  },
  {
    code: "MOD-821",
    status: "SHIPPED",
    metric: "Java 8 → 21",
    title: "Brought older Java apps up to date",
    detail: "Upgraded core services without breaking the integrations other teams still relied on.",
  },
  {
    code: "EVT-1000",
    status: "STABLE",
    metric: "1000s / day",
    title: "Kept document events moving",
    detail: "Worked on Kafka flows where retries, idempotency, and monitoring were not nice-to-haves. They were the difference between noise and trust.",
  },
  {
    code: "REL-000",
    status: "VERIFIED",
    metric: "0 critical defects",
    title: "Shipped releases without drama",
    detail: "Helped move changes from development to production with better checks, cleaner handoffs, and fewer surprises.",
  },
];

export const projects: Project[] = [
  {
    id: "modernization",
    index: "01",
    eyebrow: "Enterprise systems",
    title: "Modernizing without pretending the old system did not exist.",
    summary: "A Java modernization effort where the hard part was not just the version bump. It was keeping the surrounding workflow intact.",
    outcome: "Processing reduced to ~10 seconds",
    context: "Private enterprise work, with company-specific details removed.",
    stack: ["Java 21", "Spring Boot", "OpenShift", "AWS", "REST"],
    details: [
      "Helped move core applications from Java 8 to Java 21.",
      "Untangled boundaries between applications that had grown around each other.",
      "Moved workloads to OpenShift and fixed deployment issues that were slowing the team down.",
      "Built a Spring Boot API on AWS to automate data collection that had become too manual.",
    ],
    visual: "modernize",
  },
  {
    id: "esign",
    index: "02",
    eyebrow: "Event-driven platform",
    title: "Keeping document workflows from getting stuck.",
    summary: "Microservices and Kafka work for an eSign platform where failed events quickly turn into real user problems.",
    outcome: "Thousands of daily real-time events",
    context: "Production reliability work, shown without client data.",
    stack: ["Spring Boot", "Kafka", "Docker", "Kubernetes", "CI/CD"],
    details: [
      "Built and maintained Spring Boot services used in document workflows.",
      "Added retries and idempotency so duplicate or failed events were easier to reason about.",
      "Improved monitoring and delivery pipelines so releases were less guesswork.",
      "Owned release cycles across DEV, SIT, and PROD environments.",
    ],
    visual: "events",
  },
  {
    id: "trading-journal",
    index: "03",
    eyebrow: "Personal product",
    title: "A trading journal I actually wanted to use.",
    summary: "A local-first tool for reviewing options trades, spotting repeated mistakes, and keeping the data on my own machine.",
    outcome: "Trade review without broker access",
    context: "A personal product shaped around my own review process.",
    stack: ["JavaScript", "Node.js", "Local-first", "Data viz"],
    details: [
      "Tracks P&L, win rate, equity curves, drawdown, and trades that need review.",
      "Supports options playbooks, rule scoring, and multi-leg strategies.",
      "Uses file-backed persistence with a localStorage fallback.",
      "Includes JSON and CSV import/export with backup rotation.",
    ],
    link: "https://github.com/anas2ab/trading-journal",
    visual: "trading",
  },
  {
    id: "ym-events",
    index: "04",
    eyebrow: "Business + product",
    title: "A website for a business I help run.",
    summary: "A practical marketing site for a photo booth business, built around local search and quick booking decisions.",
    outcome: "Built, operated, and improved in-house",
    context: "Where engineering choices meet actual customer inquiries.",
    stack: ["HTML", "CSS", "JavaScript", "SEO", "Media"],
    details: [
      "Built location-specific landing pages for Ontario markets.",
      "Created content around what customers were actually searching for.",
      "Optimized responsive image and video assets so the site stayed quick.",
      "Handled the loop from site changes to customer inquiries.",
    ],
    link: "https://github.com/anas2ab/ymeventvendors",
    visual: "business",
  },
  {
    id: "kijiji-bot",
    index: "05",
    eyebrow: "From the archive",
    title: "A small bot for a very specific annoyance.",
    summary: "An early Python project that watched marketplace listings so I did not have to keep refreshing the same searches.",
    outcome: "A repetitive habit turned into code",
    context: "Old project, same instinct: automate the boring loop.",
    stack: ["Python", "Flask", "Beautiful Soup", "APScheduler"],
    details: [
      "Scraped and filtered listings based on configurable conditions.",
      "Ran recurring searches every fifteen minutes.",
      "Sent email reminders and exposed a lightweight web interface.",
      "Deployed with an App Engine configuration.",
    ],
    link: "https://github.com/anas2ab/kijiji-bot",
    visual: "archive",
  },
];

export const timeline = [
  { years: "2025 — NOW", role: "Senior Software Engineer", place: "Sun Life", note: "Modernization, performance work, architecture discussions, and helping steer delivery." },
  { years: "2023 — 2025", role: "Software Engineer", place: "Sun Life", note: "Kafka systems, platform reliability, and releases that had to land cleanly." },
  { years: "2022 — 2023", role: "Associate Software Engineer", place: "Sun Life", note: "Feature work, production debugging, and learning how the larger system fit together." },
  { years: "2021 — 2022", role: "QA Analyst", place: "Tata Consultancy Services", note: "Testing business-critical workflows and learning how software fails in ordinary ways." },
  { years: "2020 — 2021", role: "Support / Developer", place: "Flynn Group", note: "Application support, investigations, and the kind of fixes that make you respect the details." },
];

export const capabilities = [
  { label: "BUILD", items: ["Java", "JavaScript", "Python", "Spring Boot"] },
  { label: "CONNECT", items: ["REST APIs", "Apache Kafka", "MySQL", "MongoDB"] },
  { label: "OPERATE", items: ["Docker", "Kubernetes", "OpenShift", "AWS"] },
  { label: "DELIVER", items: ["Jenkins", "CI/CD", "Observability", "Mentorship"] },
];
