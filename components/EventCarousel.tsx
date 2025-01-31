"use client";

import useEmblaCarousel from "embla-carousel-react";
import EmblaAutoplayPlugin from "embla-carousel-autoplay";
import { formatDateDisplay } from "@/lib/utilities";
import Link from "next/link";
import { Event } from "@/lib/types";

export function EventCarousel(props: { events: Event[] }) {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        EmblaAutoplayPlugin({
            delay: 5 * 1000,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
        }),
    ]);

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                {props.events.map((event, i) => {
                    const formattedDate = formatDateDisplay(event.date);
                    return (
                        <div
                            key={`slide-${i}`}
                            className="group embla__slide h-80 bg-center bg-no-repeat bg-cover rounded-md select-none border-2 hover:border-primary-500 transition-colors duration-200 hover:shadow-inner"
                            style={{ backgroundImage: `url("${event.coverImage}")` }}
                        >
                            <Link href={`/events/${event.year}/${event.slug}`}>
                                <div className="flex flex-col justify-between w-full h-full p-8 bg-black/60 group-hover:bg-black/45 transition-all duration-200">
                                    <div>
                                        <div className="font-bold">{formattedDate}</div>
                                        <div className="font-black text-2xl">{event.title}</div>
                                        <div className="text-base">{event.description}</div>
                                    </div>
                                    <div>read more</div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
