import { Header } from "@/components/Header";
import { EVENTS } from "@/data/event-carousel";
import { formatDateDisplay } from "@/lib/utilities";
import Image from "next/image";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  const event = EVENTS.find((event) => {
    return event.event_id === params.id;
  });

  return (
    <div>
      <Header
        navbarLinks={[
          { label: "Home", url: "/" },
          { label: "Events", url: "/events", active: true },
          { label: "Our People", url: "/people" },
        ]}
      />
      <div className="w-full max-w-screen-2xl mx-auto p-8 space-y-8">
        {event == null && (
          <div className="space-y-4">
            <div className="font-bold text-2xl">404 :(</div>
            <div>Couldn&lsquo;t find the event that you were looking for.</div>
            <div>
              Check out other{" "}
              <Link
                href={"/events"}
                className="font-bold text-primary-200 hover:text-primary-500"
              >
                events &rarr;
              </Link>
            </div>
          </div>
        )}

        {event != null && (
          <div>
            <section className="space-y-4 flex flex-col items-center text-center">
              <Image
                src={event.image}
                alt="event image"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full max-h-96 object-cover"
              />
              <div>{formatDateDisplay(event.date)}</div>
              <h1 className="font-black text-3xl max-w-screen-md">
                {event.title}
              </h1>
              <p>{event.short_description}</p>
            </section>
            <section className="leading-relaxed mt-6 text-justify text-pretty space-y-6">
              <p>{event.actual_content}</p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                gravida nunc consequat vestibulum pretium. Nulla scelerisque
                turpis vitae tellus semper, non volutpat nisl dictum. In
                venenatis in massa vitae tempor. Nullam libero velit, semper et
                mauris eu, consectetur dignissim turpis. Nunc vulputate leo dui,
                sed suscipit dolor congue at. Vestibulum eu eros eget lacus
                tristique rhoncus. Phasellus semper nec velit a vulputate. Nulla
                venenatis sed purus quis lacinia. In hac habitasse platea
                dictumst. Phasellus mauris velit, interdum non iaculis sed,
                finibus et arcu. Mauris at turpis dapibus, euismod risus ac,
                pulvinar odio. Phasellus sagittis in justo non semper.
              </p>

              <p>
                Nulla facilisi. Integer consequat purus nec nulla facilisis
                gravida. Morbi elit lorem, ultricies eget dui at, commodo
                posuere ipsum. Sed placerat ac orci et finibus. Etiam convallis
                dapibus tortor ac placerat. Mauris est nulla, ultrices ut
                consequat sit amet, vehicula aliquet lorem. Sed at finibus orci,
                nec interdum libero. Nunc sollicitudin sit amet felis sed
                tempor. Aenean tincidunt dolor condimentum nulla lobortis
                luctus. Integer condimentum pharetra est non tincidunt. Orci
                varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Sed non eros ultricies, pharetra nunc
                at, porta neque. Suspendisse gravida dolor sit amet quam dictum
                tempus. Sed vulputate scelerisque risus eget faucibus.
              </p>

              <p>
                Quisque et augue erat. Nullam sollicitudin, velit quis pharetra
                porta, tortor massa placerat nibh, quis egestas nisl felis
                pellentesque erat. Vestibulum sed sem et metus molestie mattis
                sit amet in augue. Donec arcu leo, condimentum vel orci ut,
                consectetur sollicitudin erat. Aliquam at gravida mi. Proin
                metus augue, euismod sed ullamcorper in, cursus non velit. Morbi
                a ante neque. Donec porttitor odio ut venenatis sagittis. Cras
                dignissim facilisis arcu, ac laoreet orci malesuada ut. Proin
                dignissim porta interdum. Quisque at sapien faucibus, viverra
                enim eget, eleifend urna.
              </p>

              <p>
                Phasellus porttitor mollis ultrices. Vestibulum accumsan enim
                ligula, non mattis ante vulputate non. Pellentesque facilisis
                arcu eu commodo egestas. Aenean scelerisque sed tortor sed
                tincidunt. Phasellus dignissim neque quis eros blandit, id
                aliquam nibh consequat. Nullam vitae turpis ligula. Vivamus a
                urna ut dui efficitur aliquet id eu dolor.
              </p>

              <p>
                Praesent quis vulputate arcu, id volutpat turpis. Nunc vulputate
                fringilla felis a vestibulum. Maecenas massa urna, auctor sit
                amet pharetra quis, vehicula at lectus. Nunc at justo varius,
                pulvinar dolor eu, sodales ex. Ut gravida tortor at blandit
                molestie. Donec tortor ligula, finibus id ullamcorper tempus,
                porttitor quis nibh. Praesent quis libero scelerisque, auctor
                eros ut, ullamcorper tellus. In hac habitasse platea dictumst.
                Donec id tempus risus.
              </p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
