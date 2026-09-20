export type ProjectType = "UI/UX Designer" | "Fullstack Developer" | "Frontend Developer" | "Backend Developer" | "Front-end Developer & Designer";
export type ProjectStatus = "Shipped" | "Exploration";

export interface Project {
  id: string;
  title: string;
  cover: string;
  company: string;
  type: ProjectType;
  status: ProjectStatus;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  socials: SocialLink[];
}

export const profile: Profile = {
  name: "Nice to Meet You",
  tagline: "I'm Alif, Trained as a designer and ended up shipping the code too :)",
  bio: "I move between research, prototyping, usability testing, and code, chasing how a rough idea becomes an interface people actually enjoy using \n \n from wedding invitations to satellite dashboards.\n Based in Bandung, Indonesia 🇮🇩.",
  socials: [
    { label: "Email", href: "mailto:alifmslm01@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/alifmslmabdrhmn/" },
    { label: "Dribbble", href: "https://dribbble.com/Alip654" },
    { label: "GitHub", href: "https://github.com/Alifmslm" },
  ],
};

export const projects: Project[] = [
  {
    id: "project-one",
    title: "Celebrate Your Wedding with Java's Digital Invitations",
    cover: "/projects/cover-1.webp",
    company: "Momentree",
    type: "UI/UX Designer",
    status: "Shipped",
  },
  {
    id: "project-two",
    title: "Enhancing and Redesigning the Laboratory Website Experience",
    cover: "/projects/cover-2.webp",
    company: "EISD Laboratory",
    type: "Frontend Developer",
    status: "Shipped",
  },
  {
    id: "project-three",
    title: "Customizable Dietary Restrictions for a Better Guest Experience",
    cover: "/projects/cover-3.webp",
    company: "Momentree",
    type: "UI/UX Designer",
    status: "Shipped",
  },
  {
    id: "project-four",
    title: "Community-Based Fitness Tracker with Gamification",
    cover: "/projects/cover-4.webp",
    company: "Motion Laboratory",
    type: "UI/UX Designer",
    status: "Exploration",
  },
];

export interface ExperienceMetric {
  value: string;
  label: string;
}

export interface ExperienceImage {
  src: string;
  alt: string;
  caption: string;
}

export interface ExperienceCaseStudy {
  label: string;
  projectId: string;
  url: string;
}

export interface Experience {
  id: string;
  period: string;
  company: string;
  role: string;
  shortDescription: string;
  images: ExperienceImage[];
  metrics: ExperienceMetric[];
  highlights: string[];
  caseStudies: ExperienceCaseStudy[];
}

export const experiences: Experience[] = [
  {
    id: "eisd-laboratory",
    period: "Dec 2025 – Present",
    company: "EISD Laboratory",
    role: "Research Staff",
    shortDescription:
      "Audited and redesigned the EISD Laboratory website end-to-end. Shipped the redesign myself through Next.js and Tailwind CSS front-end development.",
    images: [
      {
        src: "/experience/eisd-laboratory/carousel-1.webp",
        alt: "Redesigned EISD Laboratory homepage",
        caption:
          "Redesigned homepage with improved visual hierarchy and navigation.",
      },
      {
        src: "/experience/eisd-laboratory/carousel-2.webp",
        alt: "New Event Detail page for EISD Laboratory",
        caption:
          "New Event Detail page filling a missing information architecture gap.",
      },
    ],
    metrics: [
      { value: "5+", label: "Usability issues fixed" },
      { value: "10+", label: "Users validated redesign" },
    ],
    highlights: [
      "Conducted a full UX audit on the lab's website",
      "Redesigned site structure, hierarchy, and usability",
      "Designed and built a new Event Detail page",
      "Implemented the redesign in Next.js and Tailwind CSS",
    ],
    caseStudies: [
      {
        label: "Rebuilding the EISD Laboratory Website from the Ground Up",
        projectId: "project-two",
        url: "/projects/project-two",
      },
    ],
  },
  {
    id: "motion-laboratory",
    period: "Nov 2024 – Jun 2025",
    company: "Motion Laboratory",
    role: "UI/UX Design Mentee",
    shortDescription:
      "Led a 3-designer team through a 9-day design sprint for a community fitness tracker. Turned a market gap into a validated, gamified prototype.",
    images: [
      {
        src: "/experience/motion-laboratory/carousel-1.webp",
        alt: "Fitness tracker app onboarding flow",
        caption: "Onboarding flow for setting personalized fitness goals.",
      },
      {
        src: "/experience/motion-laboratory/carousel-2.webp",
        alt: "Fitness tracker gamification screens",
        caption: "Community and gamification features from the final prototype.",
      },
    ],
    metrics: [
      { value: "9-day", label: "Design sprint" },
      { value: "98.48%", label: "Usability test success rate" },
    ],
    highlights: [
      "Initiated and led the sprint end-to-end",
      "Identified a gap in personalized fitness tracking",
      "Combined personal goals, community, and gamification",
      "Delivered a validated prototype in 9 days",
    ],
    caseStudies: [
      {
        label: "Community-Based Fitness Tracker with Gamification",
        projectId: "project-four",
        url: "/projects/project-four",
      },
    ],
  },
  {
    id: "momentree",
    period: "Nov 2023 – Sep 2024",
    company: "Momentree",
    role: "UI/UX Designer Intern",
    shortDescription:
      "Designed a Javanese-themed digital wedding invitation from research to execution. Translated cultural insight into a modern, responsive experience.",
    images: [
      {
        src: "/experience/momentree/carousel-1.webp",
        alt: "Javanese wedding invitation moodboard",
        caption: "Moodboard synthesized from 20+ traditional wedding invitations.",
      },
      {
        src: "/experience/momentree/carousel-2.webp",
        alt: "Nusantara Theme digital invitation UI",
        caption: "Final responsive UI for the Nusantara Theme invitation.",
      },
    ],
    metrics: [
      { value: "20+", label: "Invitations researched" },
      { value: "43K–110K", label: "Potential annual users" },
    ],
    highlights: [
      "Researched 20+ traditional Indonesian wedding invitations",
      "Built a moodboard for culturally authentic design",
      "Delivered a fully responsive UI/UX",
      "Reached an underserved cultural market segment",
    ],
    caseStudies: [
      {
        label: "Celebrate Your Wedding with Java's Digital Invitations",
        projectId: "project-one",
        url: "/projects/project-one",
      },
      {
        label: "Customizable Dietary Restrictions for a Better Guest Experience",
        projectId: "project-three",
        url: "/projects/project-three",
      },
    ],
  },
  {
    id: "pt-telkom-satelit-indonesia",
    period: "Jul 2023 – Dec 2024",
    company: "Telkomsat",
    role: "UI/UX Designer Intern",
    shortDescription:
      "Designed Starspace's marketing site and internal deployment dashboard. Delivered a full design system to streamline developer handoff.",
    images: [
      {
        src: "/experience/pt-telkom-satelit-indonesia/carousel-1.webp",
        alt: "Starspace marketing website design",
        caption: "Marketing site covering the full customer acquisition flow.",
      },
      {
        src: "/experience/pt-telkom-satelit-indonesia/carousel-2.webp",
        alt: "Starspace deployment monitoring dashboard",
        caption: "Real-time dashboard for tracking Starspace deployments.",
      },
    ],
    metrics: [
      { value: "50+", label: "Responsive screens delivered" },
      { value: "Full", label: "Design system & docs shipped" },
    ],
    highlights: [
      "Designed the end-to-end marketing website",
      "Designed the order, install, and monitoring dashboard",
      "Produced a complete design system and documentation",
      "Established a clear design-to-development workflow",
    ],
    caseStudies: [],
  },
];
