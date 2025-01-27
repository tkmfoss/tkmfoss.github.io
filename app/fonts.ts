import localFont from "next/font/local";
import {
  /** ===== MONOSPACED ===== **/
  // random
  // Kode_Mono, // good for random usage and hacky feel
  Victor_Mono, // good for height-y text, big? title?
  // Martian_Mono, // badside: too big
  // standard ones
  // Reddit_Mono, // good, more like inconsolata, a slimy feel
  // Spline_Sans_Mono, // most liked, serify feel
  // Red_Hat_Mono, // good, with a little bit of extra width
  // blocky ones
  // Chivo_Mono, // blocky!
  // Azeret_Mono, // blocky, but less line-space giving overall feeel
} from "next/font/google";

// export const spline_sans_mono = Spline_Sans_Mono({ subsets: ["latin"] });
// export const kode_mono = Kode_Mono({ subsets: ["latin"] });
export const victor_mono = Victor_Mono({ subsets: ["latin"] });
// export const reddit_mono = Reddit_Mono({ subsets: ["latin"] });
// export const commit_mono = localFont({
//   src: [{ path: "../public/fonts/CommitMonoV143-VF.woff2" }],
// });
