"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * When clicking a link, the view will not be scrolled to the top of the page
 * if the header is sticky. Page's current scroll position will persist to the next page.
 * This "hook" is a workaround to 'fix' that behavior.
 *
 * More information:
 * https://github.com/vercel/next.js/issues/45187#issuecomment-1639518030
 */
export default function ScrollFix() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash === "") {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return <></>;
}
