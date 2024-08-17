import Image from "next/image";
import FOSSCellIcon from "../public/logo.png";
import {
  FaWhatsapp,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaRegEnvelope,
} from "react-icons/fa6";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-2 border-t-[#151515] p-8 max-w-screen-2xl mx-auto w-full space-y-6">
      <div className="flex flex-col space-y-6 sm:flex-row sm:justify-between sm:w-full sm:place-items-center">
        <div className="flex gap-x-6 place-items-center">
          <Image src={FOSSCellIcon} alt="TKMCE FOSSCell Logo" width={50} />
          <div>
            <div className="font-bold text-xl">FOSSCell TKMCE</div>
            <div className="text-sm">
              Free and Open-Source Software Community
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Link href={"https://github.com"}>
            <FaGithub
              title="Link to FOSSCell TKMCE's GitHub account"
              className="text-neutral-400 hover:text-primary-700 cursor-pointer"
              size={20}
            />
          </Link>
          <FaRegEnvelope
            title="E-mail address of FOSSCell TKMCE"
            className="text-neutral-400 hover:text-primary-700 cursor-pointer"
            size={20}
          />
          <FaInstagram
            title="Link to FOSSCell TKMCE's Instagram"
            className="text-neutral-400 hover:text-primary-700 cursor-pointer"
            size={20}
          />
          <FaWhatsapp
            title="Link to FOSSCell TKMCE's WhatsApp channel"
            className="text-neutral-400 hover:text-primary-700 cursor-pointer"
            size={20}
          />
          <FaXTwitter
            title="Link to FOSSCell TKMCE's Twitter page"
            className="text-neutral-400 hover:text-primary-700 cursor-pointer"
            size={20}
          />
        </div>
      </div>

      <div className="text-sm text-neutral-400">
        &copy; 2024 FOSSCell TKMCE. All rights reserved.
      </div>
    </footer>
  );
}
