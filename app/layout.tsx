import type { Metadata } from "next";
import { Reddit_Mono } from "next/font/google";
import "./globals.css";

const primaryFont = Reddit_Mono({ subsets: ["latin"] });

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
      <body className={primaryFont.className}>
        <main className="flex flex-col max-w-screen-lg mx-auto text-base">
          {children}
        </main>
      </body>
    </html>
  );
}
