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
    date: new Date("2024-05-06"),
    title: "Event 1",
    image: "/slide-1.jpg",
    event_id: "1",
    short_description: "Short description of the event",
    actual_content: "Content",
  },
  {
    date: new Date("2024-06-07"),
    title: "Event 2",
    image: "/slide-2.jpg",
    event_id: "2",
    short_description: "Short description of the event",
    actual_content: "Content",
  },
  {
    date: new Date("2024-07-08"),
    title: "Event 3",
    image: "/slide-3.jpg",
    event_id: "3",
    short_description: "Short description of the event",
    actual_content: "Content",
  },
  {
    title: "Event 4",
    date: new Date("2024-08-09"),
    image: "/slide-4.jpg",
    event_id: "4",
    short_description: "Short description of the event",
    actual_content: "Content",
  },
  {
    title: "Event 5",
    image: "/slide-5.jpg",
    date: new Date("2024-09-10"),
    event_id: "5",
    short_description: "Short description of the event",
    actual_content: "Content",
  },
].sort((a, b) => (a.date < b.date ? 1 : -1));
