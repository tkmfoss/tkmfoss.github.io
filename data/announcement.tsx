// Exporting a non-null announcement would prep a banner above the header,
// with the details specified in the announcment.

import Link from "next/link";
import { ReactNode } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

type Announcement = ReactNode | null;

export const announcement: Announcement = (
  <div className="flex place-items-center gap-2 mx-auto">
    <div className="font-bold cursor-pointer hover:underline">
      <Link href={"/events/2025/season-of-commits"}>Season of Commits is happening now!</Link>
    </div>
    <FaExternalLinkAlt className="ml-2" />
  </div>
);
