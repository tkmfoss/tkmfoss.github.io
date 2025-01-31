import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
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

const EVENTS_DIR = join("data", "events");
const PUBLIC_DIR = join("public");
const EVENTS_PUBLIC_DIR = join(PUBLIC_DIR, "events");

export const events = generateEvents(EVENTS_DIR);
export const ALL_EVENTS: Event[] = Object.values(events)
    .flat()
    .toSorted((a, b) => (a.date < b.date ? 1 : -1));
export const CAROUSEL_LENGTH = 8;
export const CAROUSEL_EVENTS = ALL_EVENTS.slice(0, CAROUSEL_LENGTH);

console.log("found", ALL_EVENTS.length, "events");

function generateEvents(dir: string) {
    const events: Record<string, Event[]> = {};

    const years = readdirSync(dir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .filter((name) => !isNaN(Number(name)) && /^[1-9]\d{3,}$/.test(name));

    for (const year of years) {
        const path = join(dir, year);

        events[year] = readdirSync(path, { withFileTypes: true })
            .filter((entry) => entry.isFile())
            .map((entry) => entry.name)
            .filter((name) => extname(name) === ".mdx")
            .map<Event | null>((filename) => {
                const contentFile = join(dir, year, filename);
                const rawContent = readFileSync(contentFile, "utf-8");

                const { metadata, content } = parseMarkdown(rawContent);
                const fields = new Set(Object.keys(metadata));

                if (fields.difference(allMetafields).size !== 0) {
                    console.warn(
                        "Excessive unexpected metadata found in",
                        contentFile,
                    );
                }
                if (
                    fields.difference(requiredMetaFields).size === fields.size
                ) {
                    const missing = requiredMetaFields.difference(
                        fields.intersection(requiredMetaFields),
                    );
                    const missingStr = Array.from(missing).join(",");
                    throw new Error(
                        `Missing required fields in metadata: ${missingStr} in file ${contentFile}`,
                    );
                }
                if (
                    metadata.title == null ||
                    metadata.title.trim().length < 0
                ) {
                    throw new Error("Invalid title in " + contentFile);
                }
                const date = new Date(metadata.date);
                if (!isValidDate(date)) {
                    throw new Error("Event needs a valid date " + contentFile);
                }
                if (Number(year) !== date.getFullYear()) {
                    console.warn(
                        "EVENT WARN: The specified date year doesn't match the year directory.",
                    );
                }

                const coverPath = join(EVENTS_PUBLIC_DIR, year, metadata.cover);
                if (
                    metadata.cover != null &&
                    metadata.cover.trim().length > 0
                ) {
                    try {
                        const stats = statSync(coverPath);
                        if (!stats.isFile()) throw new Error();
                    } catch (error) {
                        throw new Error(
                            "Specified cover image is invalid." + contentFile,
                        );
                    }
                } else {
                    throw new Error("Cover image is required.");
                }

                const xslug = filename.slice(0, -extname(filename).length);

                return {
                    slug: slugify(xslug, { lower: true }),
                    contentFile: filename,
                    year: year,

                    title: metadata.title,
                    date: date,
                    coverImage: "/" + relative(PUBLIC_DIR, coverPath),
                    description: metadata.description,

                    content: content,
                } satisfies Event;
            })
            .filter((event) => event != null)
            .toSorted((a, b) => (a.date < b.date ? 1 : -1));
    }

    return events;
}

function isValidDate(date: Date) {
    return date instanceof Date && !isNaN(date.valueOf());
}

// github.com/vercel/next.js/blob/82026906a66e7a51b35d142497bc6db55771ac51/examples/mdx-remote/lib/utils.ts
function parseMarkdown(fileContent: string) {
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
    const content = fileContent.replace(frontmatterRegex, "").trim();
    const match = frontmatterRegex.exec(fileContent);
    const frontMatterBlock = match![1];
    const frontMatterLines = frontMatterBlock.trim().split("\n");
    const metadata: Partial<Metadata> = {};

    frontMatterLines.forEach((line) => {
        const [key, ...valueArr] = line.split(": ");
        let value = valueArr.join(": ").trim();
        value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
        metadata[key.trim() as keyof Metadata] = value;
    });

    return { metadata: metadata as Metadata, content: content };
}
