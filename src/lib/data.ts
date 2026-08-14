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
    { label: "Email", href: "mailto:hello@example.com" },
    { label: "LinkedIn", href: "#" },
    { label: "Dribbble", href: "#" },
    { label: "GitHub", href: "#" },
  ],
};

export const projects: Project[] = [
  {
    id: "project-one",
    title: "Celebrate Your Wedding with Java's Digital Invitations",
    cover: "https://picsum.photos/seed/project-one/960/540",
    company: "Momentree",
    type: "UI/UX Designer",
    status: "Shipped",
    description:
      "A Javanese-themed digital wedding invitation, turning cultural research into a fully responsive, animated experience.",
  },
  {
    id: "project-two",
    title: "Dietary Restriction Table: Customizable Dietary Restrictions for a Better Guest Experience",
    cover: "https://picsum.photos/seed/project-two/960/540",
    company: "Momentree",
    type: "UI/UX Designer",
    status: "Shipped",
    description:
      "A dashboard feature that makes guest dietary data easier to read and filter for event hosts.",
  },
  {
    id: "project-three",
    title: "EISD Website Redesign: Enhancing and Redesigning the Laboratory Website Experience",
    cover: "https://picsum.photos/seed/project-three/960/540",
    company: "EISD Laboratory",
    type: "Front-end Developer & Designer",
    status: "Shipped",
    description:
      "UX audit and full redesign of the lab's website, including a new Event Detail page, built end-to-end with Next.js and Tailwind CSS.",
  },
  {
    id: "project-four",
    title: "FitGoals: Community-Based Fitness Tracker with Gamification",
    cover: "https://picsum.photos/seed/project-three/960/540",
    company: "EISD Laboratory",
    type: "Front-end Developer & Designer",
    status: "Shipped",
    description:
      "A community-based fitness app designed in a 9-day sprint, validated at a 98% usability testing success rate.",
  },
];
