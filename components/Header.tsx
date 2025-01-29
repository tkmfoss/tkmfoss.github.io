"use client";

import Image from "next/image";
import FOSSCellIcon from "../public/images/fosscell-logo.png";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useScrollspy } from "../hooks/scrollspy";
import { FaArrowRight, FaBars } from "react-icons/fa6";
import Link from "next/link";
import { announcement } from "@/data/announcement";

const OFFSET = (announcement != null ? 32 : 24) * 4;

type WithLabel<T> = { label: string } & T;

interface HeaderProps {
  navbarLinks?: WithLabel<{
    active?: boolean;
    prefetch?: boolean;
    url: string;
  }>[];
  navbarSections?: WithLabel<{ id: string }>[];
}

export function Header(props: HeaderProps) {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const toggleExpandedMenu = () => setIsMenuExpanded((current) => !current);

  const [elements, setElements] = useState<Element[]>([]);

  useEffect(() => {
    const elements = props.navbarSections?.map((section) => {
      const element = document.getElementById(section.id);
      if (element == null)
        throw new Error("Couldn't find element with ID for scrollspy.");
      return element;
    });
    if (elements) setElements(elements);
  }, [props.navbarSections]);

  function scrollTo(id: string) {
    return () => {
      setIsMenuExpanded(false);
      const navbar = document.getElementById("navbar")?.getBoundingClientRect();
      const element = document.getElementById(id)?.getBoundingClientRect();
      // The whole point of having this kind of scrolling is to scroll to the section from
      // the navbar. So, it's okay to return if there's no navbar.
      if (!navbar || !element) return;
      window.scrollBy({
        behavior: "smooth",
        top: element?.y - navbar.height,
        left: element?.x,
      });
    };
  }

  const [currentActiveIndex] = useScrollspy(elements, { offset: OFFSET + 10 });

  // Prevent the scrolling ability of the actual document.
  useEffect(() => {
    document.body.style.overflow = isMenuExpanded ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuExpanded]);

  return (
    <header
      className={clsx(
        "top-0 fixed w-full h-full z-[1]",
        "bg-[#101010] bg-opacity-30 backdrop-filter backdrop-blur-lg",
        "overflow-hidden transition-[max-height] duration-300 ease-in-out",
        {
          "max-h-24": !isMenuExpanded && announcement == null,
          "max-h-32": !isMenuExpanded && announcement != null,
          "max-h-screen": isMenuExpanded,
        },
      )}
    >
      {announcement != null && (
        <div className="flex w-full bg-blue-500 justify-items-center items-center p-2 text-sm">
          {announcement}
        </div>
      )}
      <nav
        id="navbar"
        className="w-full p-7 flex place-items-center justify-between"
      >
        <Link href="/">
          <div className="flex place-items-center cursor-pointer">
            <Image src={FOSSCellIcon} height={40} alt="TKMCE FOSSCell Logo" />
            <div className="font-bold text-2xl mx-8">FOSS Cell</div>
          </div>
        </Link>

        <div className="hidden lg:flex space-x-4">
          {props.navbarLinks != null &&
            props.navbarLinks.length > 0 &&
            props.navbarLinks.map((link, i) => {
              return (
                <Link
                  key={i}
                  href={link.url}
                  prefetch={link.prefetch ?? true}
                  className={clsx(
                    "p-2 rounded",
                    "group inline-flex gap-2 place-items-center",
                    "hover:text-primary-400",
                    "transition-all duration-300 ease-in-out",
                    { "bg-primary-600": link.active },
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
        </div>

        <div
          onClick={toggleExpandedMenu}
          className="block lg:hidden cursor-pointer"
        >
          <FaBars size={24} />
        </div>
      </nav>
      <div className="block lg:hidden p-8 space-y-8 w-fit">
        {props.navbarSections != null && props.navbarSections.length > 0 && (
          <div className="space-y-4">
            <div className="uppercase text-sm text-neutral-400">
              In this page
            </div>
            <div className="space-y-2 text-2xl">
              {props.navbarSections.map((section, i) => {
                return (
                  <div
                    key={section.id}
                    onClick={scrollTo(section.id)}
                    className={clsx(
                      "hover:text-primary-400 cursor-pointer",
                      "transition-all duration-300 ease-in-out",
                      {
                        "font-bold text-primary-300": i === currentActiveIndex,
                      },
                    )}
                  >
                    {section.label}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {props.navbarLinks != null && props.navbarLinks.length > 0 && (
          <div className="space-y-4">
            <div className="uppercase text-sm text-neutral-400">Links</div>
            <div className="space-y-2 text-2xl flex flex-col">
              {props.navbarLinks.map((links, i) => {
                if (links.active) return;
                return (
                  <Link
                    key={i}
                    href={links.url}
                    prefetch={links.prefetch ?? true}
                    className="group inline-flex gap-2 place-items-center hover:text-primary-400 transition-all duration-300 ease-in-out"
                  >
                    {links.label}{" "}
                    <FaArrowRight
                      size={16}
                      className="group-hover:translate-x-2 transition-all duration-300 ease-in-out"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
