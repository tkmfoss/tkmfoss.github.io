import { readdir, stat, writeFile } from "node:fs/promises";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { read } from "to-vfile";
import { matter } from "vfile-matter";
import slugify from "slugify";
import { Event } from "@/lib/types";

const REQUIRED_METADATA_FIELDS = ["title", "date", "cover"] as const;
const OPTIONAL_METADATA_FIELDS = ["description"] as const;

const requiredMetaFields = new Set(REQUIRED_METADATA_FIELDS);
const allMetafields = new Set([
  ...REQUIRED_METADATA_FIELDS,
  ...OPTIONAL_METADATA_FIELDS,
]);

type Metadata = {
  [k in (typeof REQUIRED_METADATA_FIELDS)[number]]: string;
} & {
  [k in (typeof OPTIONAL_METADATA_FIELDS)[number]]?: string;
};

const EVENTS_DIR = "./data/events";

const years = readdirSync(EVENTS_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => !isNaN(Number(name)) && /^[1-9]\d{3,}$/.test(name));

const events: Record<string, Event[]> = {};

for (const year of years) {
  const path = join(EVENTS_DIR, year);
  const slugs = readdirSync(path, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const yearEvents = slugs.map<Promise<Event | null>>(async (slug) => {
    const eventPath = join(EVENTS_DIR, year, slug);
    const entries = await readdir(eventPath, { withFileTypes: true });
    const filenames = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name);

    // Sorting it, so MDX gets the priority over MD
    const contentFiles = filenames
      .filter((name) => name.split(".")[0].toLowerCase() === "content")
      .sort((a, b) => b.localeCompare(a));

    if (contentFiles.length == 0) return null;
    if (contentFiles.length > 1) {
      console.warn(
        "EVENTGEN WARN: More than two content files found in ",
        eventPath,
      );
    }

    const contentFile = join(eventPath, contentFiles[0]);
    const file = await read(contentFile);
    matter(file);

    const metadata = file.data.matter as Metadata;
    const fields = new Set(Object.keys(metadata));

    if (fields.difference(allMetafields).size !== 0) {
      console.warn("Excessive unexpected metadata found in", contentFile);
    }
    if (fields.difference(requiredMetaFields).size === fields.size) {
      const missing = requiredMetaFields.difference(
        fields.intersection(requiredMetaFields),
      );
      const missingStr = Array.from(missing).join(",");
      throw new Error(
        `Missing required fields in metadata: ${missingStr} in file ${contentFile}`,
      );
    }
    if (metadata.title == null || metadata.title.trim().length < 0) {
      throw new Error("Invalid title in " + contentFile);
    }
    const date = new Date(metadata.date);
    if (!isValidDate(date)) {
      throw new Error("Event needs a valid date " + contentFile);
    }

    if (metadata.cover != null && metadata.cover.trim().length > 0) {
      const path = join(eventPath, metadata.cover);
      try {
        const stats = await stat(path);
        if (!stats.isFile()) throw new Error();
      } catch (error) {
        throw new Error("Specified cover image is invalid." + contentFile);
      }
    } else {
      throw new Error("Cover image is required.");
    }

    return {
      slug: slugify(slug, { lower: true }),
      directory: eventPath,
      contentFile: contentFile,
      year: year,

      title: metadata.title,
      date: date,
      coverImage: join(eventPath, metadata.cover),
      description: metadata.description,
    } satisfies Event;
  });

  const resolved = await Promise.all(yearEvents);
  events[year] = resolved
    .filter((event) => event != null)
    .toSorted((a, b) => (a.date < b.date ? 1 : -1));
}

await writeFile("./data/events.json", JSON.stringify(events, null, 4));

function isValidDate(date: Date) {
  return date instanceof Date && !isNaN(date.valueOf());
}

// const file = await compile();
