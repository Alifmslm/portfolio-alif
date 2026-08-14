export type ProjectType = "UI/UX Designer" | "Fullstack Developer" | "Frontend Developer" | "Backend Developer" | "Front-end Developer & Designer";
export type ProjectStatus = "Shipped" | "Exploration";

export interface Project {
  id: string;
  title: string;
  cover: string;
  company: string;
  type: ProjectType;
  status: ProjectStatus;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  avatar: string;
  socials: SocialLink[];
}

export const profile: Profile = {
  name: "Nice to Meet You",
  tagline: "I'm Alif, Trained as a designer and ended up shipping the code too :)",
  bio: "I move between research, prototyping, usability testing, and code, chasing how a rough idea becomes an interface people actually enjoy using \n \n from wedding invitations to satellite dashboards.\n Based in Bandung, Indonesia 🇮🇩.",
  avatar: "/avatar_profile.webp",
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
    description:
      "A Javanese-themed digital wedding invitation, turning cultural research into a fully responsive, animated experience.",
  },
  {
    id: "project-two",
    title: "EISD Website Redesign: Enhancing and Redesigning the Laboratory Website Experience",
    cover: "/projects/cover-2.webp",
    company: "EISD Laboratory",
    type: "Front-end Developer & Designer",
    status: "Shipped",
    description:
      "UX audit and full redesign of the lab's website, including a new Event Detail page, built end-to-end with Next.js and Tailwind CSS.",
  },
  {
    id: "project-three",
    title: "Dietary Restriction Table: Customizable Dietary Restrictions for a Better Guest Experience",
    cover: "/projects/cover-3.webp",
    company: "Momentree",
    type: "UI/UX Designer",
    status: "Shipped",
    description:
      "A dashboard feature that makes guest dietary data easier to read and filter for event hosts.",
  },
  {
    id: "project-four",
    title: "FitGoals: Community-Based Fitness Tracker with Gamification",
    cover: "/projects/cover-4.webp",
    company: "Motion Laboratory",
    type: "UI/UX Designer",
    status: "Exploration",
    description:
      "A community-based fitness app designed in a 9-day sprint, validated at a 98% usability testing success rate.",
  },
  {
    id: "project-five",
    title: "WorkWiz: Job Searching Made Easy",
    cover: "/projects/cover-5.webp",
    company: "Personal Projects",
    type: "UI/UX Designer",
    status: "Exploration",
    description:
      "A job-search app concept with personalized listings and employer matching.",
  },
];
