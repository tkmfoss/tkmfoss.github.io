"use client";

import Image from "next/image";
import { Header } from "@/components/Header";
import { MEMBERS_DATA, Member } from "@/data/people";

export default function Page() {
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
            <p>Members who organizes and works behind the events.</p>
          </div>
        </div>

        <div>
          <section className="grid grid-cols-3 lg:grid-cols-4 gap-8">
            {MEMBERS_DATA.map((member, i) => {
              return <MemberCard key={`member-${i}`} member={member} />;
            })}
          </section>
        </div>
      </div>
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Image
        src={member.photo}
        alt={`${member.name}'s photo`}
        width={200}
        height={200}
        className="rounded-md aspect-square object-cover"
      />
      <div className="text-center">
        <div>{member.name}</div>
        <div className="text-sm text-neutral-400">{member.caption}</div>
      </div>
    </div>
  );
}
