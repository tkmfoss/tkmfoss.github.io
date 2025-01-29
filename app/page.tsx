"use client";

import { EventCarousel } from "@/components/EventCarousel";
import Image from "next/image";
import SectionImage from "../public/images/section-placeholder.png";
import { Header } from "@/components/Header";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <Header
        navbarLinks={[
          { label: "Home", url: "/", active: true },
          { label: "Events", url: "/events" },
          { label: "Our People", url: "/people" },
        ]}
        navbarSections={[
          // { label: "Home", id: "home" },
          { label: "Latest events", id: "latest-events" },
          { label: "Who we are", id: "who-we-are" },
          { label: "What we do", id: "what-we-do" },
        ]}
      />
      <section className="w-full max-w-screen-2xl mx-auto p-8">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
          <div className="block w-full items-center lg:hidden">
            <Image
              src={"/images/HeroImage.svg"}
              alt="Hero image"
              width={0}
              height={0}
              className="w-4/5 mx-auto"
            />
          </div>

          <div className="lg:w-1/2 space-y-8">
            <div className="font-bold text-5xl lg:text-6xl">
              free software community of{" "}
              <span className="text-primary-500">tkmce</span>.
            </div>

            <p className="text-xl lg:text-3xl text-primary-100 leading-relaxed">
              FOSS Cell is a technical club that promotes and strengthens the
              Free and Open Source Software ecosystem in TKMCE.
            </p>

            <p className="text-xl lg:text-2xl text-primary-500 font-bold">
              Join us and make a difference.
            </p>
          </div>

          <div className="hidden lg:block lg:w-1/2">
            <Image
              src={"/images/HeroImage.svg"}
              alt="Hero image"
              width={0}
              height={0}
              className="w-auto mx-auto"
            />
          </div>
        </div>
      </section>

      <section id="latest-events" className="bg-[#0b0b0b] w-full p-8 space-y-8">
        <div className="relative flex items-center max-w-md mx-auto">
          <div className="flex-grow border-t border-primary-500" />
          <span className="flex-shrink mx-4 text-white text-2xl">
            latest events
          </span>
          <div className="flex-grow border-t border-primary-500" />
        </div>

        <div className="max-w-screen-2xl mx-auto">
          <EventCarousel />
        </div>

        <div className="text-center space-y-2">
          <p>stay tuned for upcoming events!</p>
          <p>
            <Link href="/events" className="underline">
              see more of our events &rarr;
            </Link>
          </p>
        </div>
      </section>

      <div className="w-full max-w-screen-2xl mx-auto p-8 space-y-6">
        <section
          id="who-we-are"
          className="flex flex-col w-full items-center lg:flex-row place-items-center gap-10"
        >
          <div className="flex justify-center items-center lg:w-1/3">
            <Image src={SectionImage} alt="image"></Image>
          </div>

          <div className="lg:w-2/3">
            <h3 className="font-bold text-3xl mb-4 text-center">who we are</h3>

            <p className="text-base text-pretty leading-relaxed">
              We are FOSS Cell TKMCE - a group of students from the{" "}
              <a className="text-primary-200 font-bold hover:text-primary-500 transition-all duration-300 cursor-pointer">
                Thangal Kunju Musaliar College of Engineering
              </a>
              , who are passionate about Free and Open-Source Software (FOSS).
              Our goal is to spread the knowledge of Free Software and raise
              awareness about the four fundamental freedoms that come bundled
              with each of these softwares. Our community is a bunch of
              enthusiastic free software evangelists and hobbyist developers who
              are committed to promoting and developing free software for the
              greater good.
            </p>
          </div>
        </section>

        <section
          id="what-we-do"
          className="flex flex-col w-full items-center lg:flex-row place-items-center gap-10"
        >
          <div className="lg:w-2/3">
            <h3 className="font-bold text-3xl mb-4 text-center">what we do</h3>

            <p className="text-base text-pretty leading-relaxed">
              Through workshops, training sessions, and software development, we
              empower individuals to explore FOSS, develop new skills, and make
              a meaningful impact. We foster collaboration, community building,
              and inclusivity, organizing events to bring together global
              experts who share their knowledge and insights.
            </p>
          </div>

          <div className="flex justify-center items-center lg:w-1/3">
            <Image src={SectionImage} alt="image"></Image>
          </div>
        </section>
      </div>
    </div>
  );
}
