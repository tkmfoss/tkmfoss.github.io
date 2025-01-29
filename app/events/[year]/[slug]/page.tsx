import { Header } from "@/components/Header";
import { EVENTS } from "@/data/events";
import { formatDateDisplay } from "@/lib/utilities";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

function Template(props: PropsWithChildren) {
  return (
    <div>
      <Header
        navbarLinks={[
          { label: "Home", url: "/" },
          { label: "Events", url: "/events", active: true },
          { label: "Our People", url: "/people" },
        ]}
      />
      <div className="w-full max-w-screen-2xl mx-auto p-8 space-y-8">{props.children}</div>
    </div>
  );
}

// {event != null && (
//   <div>
//     <section className="space-y-4 flex flex-col items-center text-center">
//       <Image
//         src={event.image}
//         alt="event image"
//         width={0}
//         height={0}
//         sizes="100vw"
//         className="w-full max-h-96 object-cover"
//       />
//       <div>{formatDateDisplay(event.date)}</div>
//       <h1 className="font-black text-3xl max-w-screen-md">{event.title}</h1>
//       <p>{event.short_description}</p>
//     </section>
//     <section className="leading-relaxed mt-6 text-justify text-pretty space-y-6">
//       <p>{event.actual_content}</p>
//     </section>
//   </div>
// )}

interface Params {
  year: string;
  slug: string;
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug, year } = await params;

  const event = EVENTS.filter((event) => event.slug === slug).find(
    (event) => event.date.getFullYear().toString() === year,
  );

  if (event == null) {
    return (
      <Template>
        <div className="space-y-4">
          <div className="font-bold text-2xl">404 :&lparr;</div>
          <div>Couldn&lsquo;t find the event that you were looking for.</div>
          <div>
            Check out other{" "}
            <Link href={"/events"} className="font-bold text-primary-200 hover:text-primary-500">
              events &rarr;
            </Link>
          </div>
        </div>
      </Template>
    );
  }

  const { default: Post } = await import("@/data/events/2024/beyond-code/content.mdx");
  return <Post />;
}

export function generateStaticParams(): Params[] {
  return EVENTS.map((event) => ({
    year: event.date.getFullYear().toString(),
    slug: event.slug,
  }));
}

export const dynamicParams = false;
