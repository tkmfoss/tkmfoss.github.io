// https://github.com/vercel/next.js/issues/45187#issuecomment-1639518030
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollFix() {
  // when clicking a link, user will not scroll to the top of the page if the header is sticky.
  // their current scroll position will persist to the next page.
  // this useEffect is a workaround to 'fix' that behavior.

  const pathname = usePathname();
  useEffect(() => {
    if (window.location.hash == "")
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return <></>;
}
