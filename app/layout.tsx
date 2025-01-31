import type { Metadata } from "next";

import "./globals.css";
import clsx from "clsx";
import { Footer } from "@/components/Footer";
import { mainFont } from "./fonts";
import ScrollFix from "@/components/ScrollFix";
import { announcement } from "@/data/announcement";

export const metadata: Metadata = {
    title: "FOSS Cell TKMCE",
    description: "FOSS Cell TKMCE - The FOSS Club of Thangal Kunju Musaliar College of Engineering",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ScrollFix />
            <body
                className={clsx(
                    mainFont.className,
                    "bg-[#101010] text-white h-screen scroll-smooth",
                )}
            >
                <div
                    className={clsx("flex flex-col", {
                        "min-h-[calc(100%-6rem)] mt-[6rem]": announcement == null,
                        "min-h-[calc(100%-8rem)] mt-[8rem]": announcement != null,
                    })}
                >
                    <div className="flex-1">
                        <div className="flex flex-col mx-auto text-base">{children}</div>
                    </div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
