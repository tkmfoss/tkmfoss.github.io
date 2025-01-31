import Image from "next/image";
import FOSSCellIcon from "../public/images/fosscell-logo.png";
import { FaInstagram, FaGithub, FaRegEnvelope, FaLinkedin, FaDiscord } from "react-icons/fa6";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-2 border-t-[#151515] p-8 max-w-screen-2xl mx-auto w-full space-y-6">
      <div className="flex flex-col space-y-6 sm:flex-row sm:justify-between sm:w-full sm:place-items-center">
        <div className="flex gap-x-6 place-items-center">
          <Image src={FOSSCellIcon} alt="TKMCE FOSS Cell Logo" width={50} />
          <div>
            <div className="font-bold text-xl">FOSS Cell TKMCE</div>
            <div className="text-sm">Free and Open-Source Software Community</div>
          </div>
        </div>
        <div className="flex gap-4">
          <Link href="https://github.com/tkmfoss" target="_blank">
            <FaGithub
              title="Link to FOSS Cell TKMCE's GitHub organization"
              className="text-neutral-400 hover:text-primary-700 cursor-pointer"
              size={20}
            />
          </Link>
          <Link href="mailto:fosscelltkmce@gmail.com" target="_blank">
            <FaRegEnvelope
              title="E-mail address of FOSS Cell TKMCE"
              className="text-neutral-400 hover:text-primary-700 cursor-pointer"
              size={20}
            />
          </Link>
          <Link href="https://instagram.com/tkmcefosscell" target="_blank">
            <FaInstagram
              title="Link to FOSS Cell TKMCE's Instagram"
              className="text-neutral-400 hover:text-primary-700 cursor-pointer"
              size={20}
            />
          </Link>
          <Link href="https://www.linkedin.com/company/foss-tkmce" target="_blank">
            <FaLinkedin
              title="Link to FOSS Cell TKMCE's LinkedIn"
              className="text-neutral-400 hover:text-primary-700 cursor-pointer"
              size={20}
            />
          </Link>
          <Link href="https://discord.gg/uXrWyWqvWx" target="_blank">
            <FaDiscord
              title="Link to FOSS Cell TKMCE's Discord channel"
              className="text-neutral-400 hover:text-primary-700 cursor-pointer"
              size={20}
            />
          </Link>
        </div>
      </div>

      <div className="text-sm text-neutral-400">
        &copy; 2024&mdash;2025 FOSS Cell TKMCE. All rights reserved.
      </div>
    </footer>
  );
}
