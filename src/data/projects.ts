export interface Project {
  id: number;
  title: string;
  category: "residential" | "commercial" | "infrastructure" | "industrial";
  location: string;
  duration: string;
  team: string;
  description: string;
  image: string;
  status: "Completed" | "In Progress";
  year: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Modern Residential Building",
    category: "residential",
    location: "Rugunga, Kigali",
    duration: "1 month",
    team: "4 professionals",
    description: "A good example of modern residential architecture with sustainable features.",
    image: "/lovable-uploads/59b24c72-68de-48bb-9de5-abd2d2593f1e.png",
    status: "Completed",
    year: "2024",
  },
  {
    id: 2,
    title: "Luxury Residential Villa",
    category: "residential",
    location: "Nyamirambo, Kigali",
    duration: "12 months",
    team: "15 professionals",
    description: "Elegant residential villa with contemporary architecture and premium finishes.",
    image: "/lovable-uploads/bf0e536e-14c3-46ca-9d08-47cbbfbc8c30.png",
    status: "Completed",
    year: "2023",
  },
  {
    id: 3,
    title: "Residential Apartment",
    category: "residential",
    location: "Busanza, Kanombe",
    duration: "6 months",
    team: "10 professionals",
    description: "A modern residential apartment building with eco-friendly design.",
    image: "/lovable-uploads/c772e55d-3af3-4676-a65c-bd582b0deb6b.png",
    status: "In Progress",
    year: "2026",
  },
];
