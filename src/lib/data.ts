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
