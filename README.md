# FOSS Cell Website

This repository contains the source code for the main website of FOSS Cell TKMCE.
The production build is deployed here: <https://fosscell-tkmce.vercel.app>.

We welcome contributions from everyone!
Whether it's bug fixes, improvements, or suggestions, feel free to get involved.
And it also doesn't matter if you are a part of the club or not!

## For Contributors and Collaborators

#### Some general notes regarding the contributions:

- First point: you can contribute.
- All types of contributions are welcome including criticisms. However, it will be reviewed thoroughly before considering / merging.
- Sign your commits to improve traceability and ensure the integrity of contributions.
- If you're a collaborator or a member of the organization, don't fork, make branches instead.
- Commit messages should be descriptive and concise. While we don't strictly follow conventional commits, please keep the message clear for future reference.
- Discuss important stuff before doing something critical or stupid.
- Don't try to push to `main` branch unless you are the owner/manager of the repository.
- Add actual and proper comments if you're doing something hacky or wacky.

#### Quick overview regarding the technical side of the repository:

- The website is built using Next.js version 15 and is written in TypeScript.
- Static contents are generated from MDX files residing in `data` directory.
- Code formatting is done via the NPM script `format` which invokes prettier.
- Linting is done by Next.js through eslint. No additional configuration/modification added yet.
- [PNPM](https://pnpm.io) is used as the package manager and has no intention of changing it for the forseeable future.
- References and credits are given and must be given for the snippets that's not yours. Explanations must be given in most cases and references must be linked if it's a public website.
- The only reason MDX is used is because of the native support it has in Next.js. Learn more: <https://nextjs.org/docs/app/building-your-application/configuring/mdx>.
- As of February 2025, the website is fully static.
- Since this repository lies under an organization and since organizations can't deploy to Vercel unless you have upgraded your account, the website is currently deployed to Vercel by [@dcdunkan](https://github.com/dcdunkan), maintainer of the repository, under **Free billing**, through a [fork](https://github.com/dcdunkan/tkmfoss-website).

#### About the static contents of the website:

- All static data content, except for assets like images, should reside in the `/data` directory.
- The content of the events (and maybe blogs, in the future) are written in [MDX](https://mdxjs.com), which is just a fancy variant of Markdown with some extended capabilities that aren't put to use in the context of this website.
- Images are categorized inside the `/public` directory. Where `/public/images` is for the images used as actual assets for the whole website, and other named directories such as `/public/events`, `/public/people` are for that specific type of content.
- People data can be found inside `/data/people.ts`.
- Header announcement bar can be hidden by setting `announcement` to `null` inside `/data/announcement.tsx`, or can be modified into literally anything by editing that.
- No alumni data is added yet.
- Events data is split yearwise for easier management and of course, for same slugs for the same events conducted in the coming years.

Finally, try to make everything perfect & better.

## Building the Website Locally

Make sure you have Node.js (v22) and PNPM installed.

Once you have cloned the repository and go into it, run `pnpm install` to install the dependencies.

You can now run

```
pnpm run dev
```

to view the website locally in your browser.

## Formatting & Linting

- To ensure you have done everything correctly, run `pnpm run check` before committing / pushing. This checks the formatting and does the linting.
- Or to lint, `pnpm run lint`.
- To format the whole thing, `pnpm run format`.
