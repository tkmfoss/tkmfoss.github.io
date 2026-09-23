export interface FossProject {
  id: string;
  name: string;
  repoName: string;
  description: string;
  language: string;
  license: string;
  stars: number;
  forks: number;
  url: string;
  status: 'ACTIVE' | 'MAINTAINED' | 'INCUBATING';
  tags: string[];
}

export const FOSS_PROJECTS: FossProject[] = [
  {
    id: 'tkmfoss-web',
    name: 'tkmfoss.github.io',
    repoName: 'tkmfoss/tkmfoss.github.io',
    description: 'The official web presence of FOSS Cell TKMCE. Designed with minimalist brutalism, static performance, and zero telemetry.',
    language: 'TypeScript',
    license: 'GPL-3.0',
    stars: 28,
    forks: 14,
    url: 'https://github.com/tkmfoss/tkmfoss.github.io',
    status: 'ACTIVE',
    tags: ['Web', 'React', 'Vite', 'FLOSS']
  },
  {
    id: 'foss-bot',
    name: 'foss-cell-bot',
    repoName: 'tkmfoss/foss-cell-bot',
    description: 'Automated community operations daemon for Discord/Telegram, dispatching event reminders and git commit notifications.',
    language: 'Python',
    license: 'MIT',
    stars: 19,
    forks: 7,
    url: 'https://github.com/tkmfoss',
    status: 'ACTIVE',
    tags: ['Automation', 'Python', 'Asyncio', 'CLI']
  },
  {
    id: 'awesome-tkmce',
    name: 'awesome-tkmce-foss',
    repoName: 'tkmfoss/awesome-tkmce',
    description: 'Curated list of open-source utilities, syllabus notes, Linux dotfiles, and research repositories built by TKM students.',
    language: 'Markdown',
    license: 'CC-BY-SA-4.0',
    stars: 42,
    forks: 23,
    url: 'https://github.com/tkmfoss',
    status: 'ACTIVE',
    tags: ['Curated', 'Docs', 'Community', 'Resources']
  },
  {
    id: 'linux-workstation-setup',
    name: 'workstation-bootstrap',
    repoName: 'tkmfoss/workstation-bootstrap',
    description: 'Shell scripts for bootstraping Arch, Debian, and Fedora systems with development compilers, tools, and FOSS alternatives.',
    language: 'Shell',
    license: 'GPL-3.0',
    stars: 31,
    forks: 11,
    url: 'https://github.com/tkmfoss',
    status: 'MAINTAINED',
    tags: ['Shell', 'Linux', 'Dotfiles', 'SysAdmin']
  }
];
