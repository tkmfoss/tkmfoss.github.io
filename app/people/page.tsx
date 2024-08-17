"use client";

import Image from "next/image";
import { Header } from "@/components/Header";
import { ALUMNI_DATA, Alumni, MEMBERS_DATA, Member } from "@/data/people";
import { useState } from "react";
import clsx from "clsx";

const SECTIONS = ["members", "alumni"] as const;
type Section = (typeof SECTIONS)[number];

export default function Page() {
  const [activeSection, setActiveSection] = useState<Section>("members");

  return (
    <div>
      <Header
        navbarLinks={[
          { label: "Home", url: "/" },
          { label: "Events", url: "/events" },
          { label: "Our People", url: "/people", active: true },
        ]}
      />
      <div className="w-full max-w-screen-2xl mx-auto p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:place-items-center md:justify-between gap-8">
          <div className="space-y-2 text-base">
            <h1 className="font-bold text-3xl">Our people</h1>
            <p>Short description could go here.</p>
          </div>

          <div className="grid grid-rows-1 grid-flow-col text-center select-none first:rounded-l-md last:rounded-r-md">
            {SECTIONS.map((type) => {
              return (
                <div
                  key={type}
                  onClick={() => setActiveSection(type)}
                  className={clsx(
                    "border-2 py-2 px-4 cursor-pointer",
                    "transition-all duration-300 ease-in-out",
                    "first:rounded-l-md last:rounded-r-md",
                    {
                      "border-primary-600 bg-primary-900":
                        activeSection === type,
                      "border-primary-900": activeSection !== type,
                    },
                  )}
                >
                  {type}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          {activeSection === "members" && (
            <section className="grid grid-cols-3 lg:grid-cols-4 gap-8">
              {MEMBERS_DATA.map((member, i) => {
                return <MemberCard key={`member-${i}`} member={member} />;
              })}
            </section>
          )}

          {activeSection === "alumni" && (
            <section className="grid grid-cols-3 lg:grid-cols-4 gap-8">
              {ALUMNI_DATA.map((alumni, i) => {
                return <AlumniCard key={`alumni-${i}`} alumni={alumni} />;
              })}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center place-items-center">
      <Image
        src={member.photo}
        alt={`${member.name}'s photo`}
        width={200}
        height={200}
        className="rounded-md aspect-square object-cover"
      />
      <div className="text-center">
        <div>{member.name}</div>
        <div className="text-sm text-neutral-400">{member.type}</div>
      </div>
    </div>
  );
}

function AlumniCard({ alumni }: { alumni: Alumni }) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center place-items-center">
      <Image
        src={alumni.photo}
        alt={`${alumni.name}'s photo`}
        width={200}
        height={200}
        className="rounded-md aspect-square object-cover"
      />
      <div className="text-center">
        <div>{alumni.name}</div>
        <div className="text-sm text-neutral-400">{alumni.year}</div>
      </div>
    </div>
  );
}
