export const formatDateDisplay = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  day: "2-digit",
}).format;
