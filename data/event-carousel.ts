interface EventSlide {
  event_id: string;
  title: string;
  date: Date;
  short_description: string;
  image: string;
  actual_content: string;
}

export const EVENTS: EventSlide[] = [
  {
    date: new Date("2024-09-11"),
    title: "Student Induction Programme 2024",
    image: "/images/events/2024/sip/cover.jpg",
    event_id: "1",
    short_description:
      "Glimpses of Student Induction Program 2024 at TKM College of Engineering, Kollam.",
    actual_content: "",
  },
  {
    date: new Date("2024-10-08"),
    title: "Hacktoberfest 2024",
    image: "/images/events/2024/hacktoberfest/cover.jpg",
    event_id: "2",
    short_description: "Open Source is about collaborating; not competing.",
    actual_content: "",
  },
  {
    date: new Date("2024-10-18"),
    title: "FOSSCell Orientation",
    image: "/images/events/2024/orientation/cover.jpg",
    event_id: "3",
    short_description:
      "Kickstart your journey into the world of Free and Open Source Software (FOSS) with FOSS Cell TKMCE.",
    actual_content: "",
  },
  {
    title: "Guide to GitHub",
    date: new Date("2024-10-21"),
    image: "/images/events/2024/github-guide/cover.jpg",
    event_id: "4",
    short_description:
      "Unlock the Power of GitHub – Your Gateway to Hacktoberfest with FOSS Cell TKMCE!",
    actual_content: "",
  },
  {
    title: "Santa FOSS Sketch Book",
    image: "/images/events/2024/santa-foss-sketch/cover.jpg",
    date: new Date("2024-12-20"),
    event_id: "5",
    short_description:
      "Unleash your creativity and craft designs that beautifully blend festive cheer with FOSS principles.",
    actual_content: "",
  },
  {
    title: "Beyond Code",
    image: "/images/events/2024/beyond-code/cover.jpg",
    date: new Date("2024-12-31"),
    event_id: "6",
    short_description: "Mastering Development Discipline Workshop",
    actual_content: "",
  },
  {
    title: "Season of Commits",
    image: "/images/events/2025/season-of-commits/cover.jpg",
    date: new Date("2025-01-13"),
    event_id: "6",
    short_description: "Unleashing Open-Source Excellence",
    actual_content: "",
  },

  {
    title: "DevOps Workshop",
    image: "/images/events/2025/devops-workshop/cover.jpg",
    date: new Date("2025-01-25"),
    event_id: "6",
    short_description:
      "DevOps Essentials Workshop: In Collaboration with CareStack.",
    actual_content: "",
  },
].sort((a, b) => (a.date < b.date ? 1 : -1));
