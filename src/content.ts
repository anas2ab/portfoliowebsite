export type Project = {
  id: string;
  name: string;
  status: string;
  eyebrow: string;
  title: string;
  summary: string;
  outcome: string;
  context: string;
  stack: string[];
  details: string[];
  link?: string;
  site?: string;
  visual: "modernize" | "events" | "archive" | "screenshot";
  screenshot?: { file: string; alt: string; width: number; height: number };
};

export const links = {
  emailAddress: "anasahmadbutt@gmail.com",
  email: "mailto:anasahmadbutt@gmail.com",
  github: "https://github.com/anas2ab",
  resume: `${import.meta.env.BASE_URL}Anas_Butt_Resume.pdf`,
  linkedin: "https://www.linkedin.com/in/anas-butt/",
};

export const impacts = [
  { figure: "~10 sec", detail: "A routine job that took 3–7 minutes, after moving it to OpenShift and clearing what made it drag." },
  { figure: "Java 25", detail: "Older apps brought up from Java 8 without breaking the integrations other teams relied on." },
  { figure: "1000s", detail: "Document events a day through Kafka, where retries, idempotency, and monitoring were the difference between noise and trust." },
  { figure: "0", detail: "Critical defects across the releases I owned from DEV through SIT to PROD." },
  { figure: "500+", detail: "SonarQube issues resolved, because the small fixes are what the next person inherits." },
];

export const projects: Project[] = [
  {
    id: "modernization",
    name: "Java modernization",
    status: "Private",
    eyebrow: "Enterprise systems",
    title: "Modernizing without pretending the old system did not exist.",
    summary: "A Java modernization effort where the hard part was not just the version bump. It was keeping the surrounding workflow intact.",
    outcome: "Processing reduced to ~10 seconds",
    context: "Private enterprise work, with company-specific details removed.",
    stack: ["Java 25", "Spring Boot", "OpenShift", "AWS", "React"],
    details: [
      "Led the move from Java 8 to Java 25 across multiple enterprise applications.",
      "Redesigned shared architecture that had grown around several applications at once.",
      "Moved workloads to OpenShift and fixed deployment issues that were slowing the team down.",
      "Built a Spring Boot API on AWS to automate data collection that had become too manual.",
      "Cut React bundle size and page load times with lazy loading and code-splitting.",
    ],
    visual: "modernize",
  },
  {
    id: "esign",
    name: "eSign event platform",
    status: "Private",
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
    id: "housefax",
    name: "House Fax",
    status: "Live",
    eyebrow: "Home maintenance product",
    title: "A clear maintenance history for every home.",
    summary: "House Fax brings repairs, receipts, warranties, photos, schedules, and property health into one organized record.",
    outcome: "Home upkeep made trackable and shareable",
    context: "A full product built around the recurring work of owning and maintaining a home.",
    stack: ["Web application", "Responsive UI", "PDF reports", "File uploads", "AI-assisted insights"],
    details: [
      "Keeps maintenance records, costs, vendors, notes, and attachments connected to the home.",
      "Tracks routine schedules, overdue work, warranties, and upcoming service.",
      "Builds photo timelines and shareable home-history reports for owners, buyers, agents, or insurers.",
      "Surfaces property health scores, cost trends, and AI-assisted maintenance predictions.",
    ],
    site: "https://myhousefax.ca",
    visual: "screenshot",
    screenshot: {
      file: "projects/house-fax.webp",
      alt: "House Fax demo home record showing an A-minus property health score and maintenance details",
      width: 1370,
      height: 780,
    },
  },
  {
    id: "courtpulse",
    name: "Find an Open Court",
    status: "Live",
    eyebrow: "Tennis and pickleball courts",
    title: "Less driving to courts that turn out to be full.",
    summary: "An app for finding free outdoor tennis and pickleball courts nearby, with availability reported by the people playing there.",
    outcome: "Live, with crowdsourced reporting on the way",
    context: "Started as CourtPulse. A public product still in progress: search is live, and availability reporting is the next piece.",
    stack: ["Dart", "Geolocation", "English + French"],
    details: [
      "Searches by city, park, address, or postal code, or from your current location within a set radius.",
      "Filters across tennis and pickleball.",
      "Designed around open, occupied, and not reported states, because a missing report is not an open court.",
      "Expires reports after 60 minutes so stale availability falls back to unknown.",
    ],
    site: "https://findanopencourt.ca",
    visual: "screenshot",
    screenshot: {
      file: "projects/find-an-open-court.webp",
      alt: "Find an Open Court search screen with location search and tennis and pickleball filters",
      width: 1400,
      height: 800,
    },
  },
  {
    id: "trading-journal",
    name: "Trading journal",
    status: "Code",
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
    visual: "screenshot",
    screenshot: {
      file: "projects/trading-journal.webp",
      alt: "Trading Journal dashboard showing balance, profit and loss, open positions, win rate, equity chart, and review queue",
      width: 1600,
      height: 780,
    },
  },
  {
    id: "ym-events",
    name: "YM Event Vendors",
    status: "Live",
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
    visual: "screenshot",
    screenshot: {
      file: "projects/ym-event-vendors.webp",
      alt: "YM Event Vendors homepage advertising premier photo booth rentals across Toronto and surrounding areas",
      width: 1600,
      height: 776,
    },
  },
  {
    id: "kijiji-bot",
    name: "Kijiji bot",
    status: "Archive",
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
  { years: "2025–now", role: "Senior Software Engineer", place: "Sun Life", note: "Modernization, performance, architecture." },
  { years: "2023–2025", role: "Software Engineer", place: "Sun Life", note: "Kafka systems, platform reliability, releases." },
  { years: "2022–2023", role: "Associate Software Engineer", place: "Sun Life", note: "Feature work and production debugging." },
  { years: "2021–2022", role: "QA Analyst", place: "Tata Consultancy Services", note: "Learned how software fails in ordinary ways." },
  { years: "2020–2021", role: "Junior Applications Support / Developer", place: "Flynn Group", note: "Application support and investigations." },
];

export const capabilities = [
  { label: "Build", items: ["Java", "Spring Boot", "JavaScript", "React", "Python"] },
  { label: "Connect", items: ["REST APIs", "Apache Kafka", "MySQL", "MongoDB", "Redis"] },
  { label: "Operate", items: ["Docker", "Kubernetes", "OpenShift", "AWS"] },
  { label: "Deliver", items: ["Jenkins", "CI/CD", "Observability", "Mentorship"] },
];
