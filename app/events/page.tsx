import { Header } from "@/components/Header";
import { ALL_EVENTS } from "@/lib/events";
import { formatDateDisplay } from "@/lib/utilities";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
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
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-5">
                    <section className="lg:w-1/3 space-y-2 lg:text-right">
                        <h1 className="font-bold text-3xl">Events</h1>
                        <p>
                            You can find and read all about events organized and conducted by us in
                            the past here.
                        </p>
                    </section>

                    <section className="grid grid-cols-1 gap-8 lg:border-l-2 lg:border-neutral-800 lg:px-5 lg:w-2/3">
                        {ALL_EVENTS.length > 0 ? (
                            ALL_EVENTS.map((event, i) => {
                                return (
                                    <div
                                        key={`event-${i}`}
                                        className="group border-2 border-neutral-800 bg-neutral-900 hover:border-primary-500 hover:bg-neutral-800 transition-all duration-200 ease-in-out w-full rounded-md"
                                    >
                                        <Link
                                            href={`events/${event.year}/${event.slug}`}
                                            className="flex flex-col md:flex-row w-full"
                                        >
                                            <Image
                                                src={event.coverImage}
                                                alt="Event's cover image"
                                                width={512}
                                                height={512}
                                                className="h-80 w-full md:w-80 object-cover rounded group-hover:grayscale transition-all duration-200 ease-in-out"
                                            />
                                            <div className="p-6  space-y-2">
                                                <div className="text-sm">
                                                    {formatDateDisplay(event.date)}
                                                </div>
                                                <div className="font-bold text-2xl">
                                                    {event.title}
                                                </div>
                                                <div>{event.description}</div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })
                        ) : (
                            <>COMING SOON!</>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
