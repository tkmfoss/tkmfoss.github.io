export interface SoftwareFreedom {
  number: number;
  label: string;
  tagline: string;
  summary: string;
  detailed: string;
  shellCmd: string;
}

export const FOUR_FREEDOMS: SoftwareFreedom[] = [
  {
    number: 0,
    label: "FREEDOM_0",
    tagline: "RUN FOR ANY PURPOSE",
    summary: "The freedom to run the program as you wish, for any purpose, without restriction or arbitrary commercial gates.",
    detailed: "Users have the unconditional right to execute the software on any computer system, in any jurisdiction, for educational, private, commercial, or humanitarian purposes.",
    shellCmd: "$ chmod +x ./binary && ./binary --exec --unrestricted"
  },
  {
    number: 1,
    label: "FREEDOM_1",
    tagline: "STUDY AND MODIFY",
    summary: "The freedom to study how the program works, and change it so it computes exactly as you wish.",
    detailed: "Source code accessibility is an absolute precondition. You are never trapped in a black-box system where arbitrary telemetries or anti-features control your device.",
    shellCmd: "$ git clone https://src.org/app.git && vim src/core.c"
  },
  {
    number: 2,
    label: "FREEDOM_2",
    tagline: "REDISTRIBUTE COPIES",
    summary: "The freedom to redistribute exact copies so you can help your neighbors, peers, and fellow engineers.",
    detailed: "Sharing knowledge is an ethical imperative. You have the right to distribute copies freely, whether at zero cost or with added support value.",
    shellCmd: "$ cp -r /usr/local/pkg ~/shared-usb/ && scp -r pkg peer@lan:/"
  },
  {
    number: 3,
    label: "FREEDOM_3",
    tagline: "DISTRIBUTE MODIFICATIONS",
    summary: "The freedom to distribute copies of your modified versions to the entire community.",
    detailed: "When you fix a bug, enhance security, or add a feature, you have the right to release your modifications so the entire human collective benefits.",
    shellCmd: "$ git checkout -b fix-memory-leak && git push origin v2.0-floss"
  }
];
