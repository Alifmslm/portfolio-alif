export type ProjectType = "UI/UX Designer" | "Fullstack Developer" | "Frontend Developer" | "Backend Developer";
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
  avatar: "https://picsum.photos/seed/johndoe-avatar/192/192",
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
      "Designed digital wedding invitations that blend personal stories with elegant, shareable moments.",
  },
  {
    id: "project-two",
    title: "Designing a catalogue of everyday rituals for a home goods studio",
    cover: "https://picsum.photos/seed/project-two/960/540",
    company: "Company B",
    type: "UI/UX Designer",
    status: "Exploration",
    description:
      "An ongoing exploration of patterns, textures and objects that anchor our daily routines.",
  },
  {
    id: "project-three",
    title: "The art of turning a weekend hack into a production-grade platform",
    cover: "https://picsum.photos/seed/project-three/960/540",
    company: "Company C",
    type: "Fullstack Developer",
    status: "Shipped",
    description:
      "Took a scrappy prototype to a reliable, well-tested service used by thousands.",
  },
];
