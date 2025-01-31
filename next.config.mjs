import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

    // GitHub pages deployment configuration:
    output: "export",
    basePath: "/",
    images: {
        unoptimized: true,
    },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
