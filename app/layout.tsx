import type { Metadata } from "next";

import "./globals.css";
import clsx from "clsx";
import { Footer } from "@/components/Footer";
import { commit_mono, victor_mono } from "./fonts";
import ScrollFix from "@/components/ScrollFix";

export const metadata: Metadata = {
  title: "FOSSCell TKMCE",
  description:
    "FOSSCell TKMCE - The FOSS Club of Thangal Kunju Musaliar College of Engineering",
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
          victor_mono.className,
          "bg-[#101010] text-white h-screen scroll-smooth",
        )}
      >
        <div className="flex min-h-full flex-col mt-24">
          <div className="flex-1">
            <div className="flex flex-col mx-auto text-base">{children}</div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
