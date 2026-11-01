export const links = {
  email: "mailto:anasahmadbutt@gmail.com",
  github: "https://github.com/anas2ab",
  resume: `${import.meta.env.BASE_URL}Anas_Butt_Resume.pdf`,
  linkedin: "https://www.linkedin.com/in/anas-butt/",
};

export type Role = { title: string; years: string; points: string[] };

export type Product = {
  headline: string;
  summary: string;
  site: string;
  siteLabel: string;
  screenshot: { file: string; alt: string; width: number; height: number };
};

export type Work = {
  id: string;
  group: string;
  name: string;
  kind: string;
  roles?: Role[];
  product?: Product;
};

export const work: Work[] = [
  {
    id: "sun-life",
    group: "Currently @",
    name: "Sun Life",
    kind: "Backend engineering, since 2022",
    roles: [
      {
        title: "Senior Software Engineer",
        years: "2025–now",
        points: [
          "Led the move from Java 8 to Java 25 across multiple enterprise applications.",
          "Cut a processing job from 3–7 minutes to about 10 seconds by moving it to OpenShift.",
          "Built a Spring Boot API on AWS that replaced manual data collection.",
        ],
      },
      {
        title: "Software Engineer",
        years: "2023–2025",
        points: [
          "Scaled Kafka processing for an eSign platform to thousands of document events a day.",
          "Added the retries, idempotency, and monitoring that made failures rarer.",
          "Owned releases from DEV through SIT to PROD, with zero critical defects.",
        ],
      },
    ],
  },
  {
    id: "house-fax",
    group: "Building",
    name: "House Fax",
    kind: "Home maintenance, live",
    product: {
      headline: "Carfax for houses.",
      summary: "One record of a home’s repairs, receipts, warranties, photos, and upkeep schedules, ready to share with a buyer, agent, or insurer.",
      site: "https://myhousefax.ca",
      siteLabel: "Visit myhousefax.ca",
      screenshot: {
        file: "projects/house-fax.webp",
        alt: "The House Fax homepage, headlined Carfax for Houses, built for everyday upkeep",
        width: 1600,
        height: 1161,
      },
    },
  },
  {
    id: "open-court",
    group: "Building",
    name: "Find an Open Court",
    kind: "Tennis and pickleball, live",
    product: {
      headline: "Less driving to full courts.",
      summary: "Free outdoor tennis and pickleball courts near you, in English and French. Availability reports are next, and they expire after 60 minutes, because a missing report isn’t an open court.",
      site: "https://findanopencourt.ca",
      siteLabel: "Visit findanopencourt.ca",
      screenshot: {
        file: "projects/find-an-open-court.webp",
        alt: "Find an Open Court search screen, with location search, tennis and pickleball filters, and open, occupied, and not reported states",
        width: 1600,
        height: 1200,
      },
    },
  },
];
