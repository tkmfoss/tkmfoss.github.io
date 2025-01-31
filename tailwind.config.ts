import type { Config } from "tailwindcss";
import TypographyPlugin from "@tailwindcss/typography";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                primary: {
                    50: "#ecf6ed",
                    100: "#d9edda",
                    200: "#b3dbb6",
                    300: "#8cca91",
                    400: "#66b86d",
                    500: "#40a648",
                    600: "#33853a",
                    700: "#26642b",
                    800: "#1a421d",
                    900: "#0d210e",
                },
            },
        },
    },
    plugins: [TypographyPlugin],
};
export default config;
