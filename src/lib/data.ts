export type ProjectType = "Design" | "Web Dev";
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
  avatar: string;
  socials: SocialLink[];
}

export const profile: Profile = {
  name: "John Doe",
  tagline: "Full-Stack Developer",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. I build clean, functional web experiences.",
  avatar: "https://picsum.photos/seed/johndoe-avatar/192/192",
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Dribbble", href: "#" },
    { label: "Email", href: "mailto:hello@example.com" },
  ],
};

export const projects: Project[] = [
  {
    id: "project-one",
    title: "Project One",
    cover: "https://picsum.photos/seed/project-one/960/540",
    company: "Company A",
    type: "Web Dev",
    status: "Shipped",
  },
  {
    id: "project-two",
    title: "Project Two",
    cover: "https://picsum.photos/seed/project-two/960/540",
    company: "Company B",
    type: "Design",
    status: "Exploration",
  },
  {
    id: "project-three",
    title: "Project Three",
    cover: "https://picsum.photos/seed/project-three/960/540",
    company: "Company C",
    type: "Web Dev",
    status: "Shipped",
  },
];
