export interface FosEvent {
  id: string;
  title: string;
  year: number;
  date: string;
  description: string;
  category: 'WORKSHOP' | 'HACKATHON' | 'COMMUNITY' | 'TALK';
  coverImage: string;
  highlights: string[];
  status: 'COMPLETED' | 'UPCOMING';
  location: string;
}

export const FOSS_EVENTS: FosEvent[] = [
  {
    id: 'season-of-commits-2025',
    title: 'Season of Commits',
    year: 2025,
    date: '2025-01-13',
    description: 'A month-long initiative focused on mentoring TKMCE students into active open-source contributors with real-world pull requests.',
    category: 'HACKATHON',
    coverImage: '/events/2025/season-of-commits-poster.jpg',
    highlights: ['Git / GitHub Mentorship', 'Real repo PR sprints', 'FOSS Swag & Certificates'],
    status: 'COMPLETED',
    location: 'TKMCE Campus / GitHub'
  },
  {
    id: 'devops-workshop-2025',
    title: 'DevOps & Cloud Native Tooling',
    year: 2025,
    date: '2025-02-15',
    description: 'Hands-on deep dive into Docker containers, automated CI/CD pipelines, reproducible builds, and Linux systems administration.',
    category: 'WORKSHOP',
    coverImage: '/events/2025/devops-workshop-poster.jpg',
    highlights: ['Containerization with Docker', 'GitHub Actions CI/CD', 'Self-hosting FOSS services'],
    status: 'COMPLETED',
    location: 'APJ Abdul Kalam Computer Centre, TKMCE'
  },
  {
    id: 'santa-foss-sketch-2024',
    title: 'Santa FOSS Sketch',
    year: 2024,
    date: '2024-12-25',
    description: 'Festive community creative coding sprint using Inkscape, Blender, and open-source generative art frameworks.',
    category: 'COMMUNITY',
    coverImage: '/events/2024/santa-foss-sketch-poster.jpg',
    highlights: ['Inkscape Vector Graphics', 'Creative Commons Art', 'Generative Python Sketches'],
    status: 'COMPLETED',
    location: 'Online / Discord'
  },
  {
    id: 'hacktoberfest-2024',
    title: 'Hacktoberfest TKMCE',
    year: 2024,
    date: '2024-10-18',
    description: 'Annual global celebration of Free and Open Source software. First-time contributors onboarded to upstream repositories.',
    category: 'HACKATHON',
    coverImage: '/events/2024/hacktoberfest-poster.jpg',
    highlights: ['First PR walkthroughs', 'Open source ethics', 'Maintainer talks'],
    status: 'COMPLETED',
    location: 'Mechanical Seminar Hall, TKMCE'
  },
  {
    id: 'sip-2024',
    title: 'Student Induction Program (SIP)',
    year: 2024,
    date: '2024-11-05',
    description: 'Welcoming the incoming freshmen to the world of GNU/Linux, terminal productivity, and software freedom.',
    category: 'COMMUNITY',
    coverImage: '/events/2024/sip-poster.jpg',
    highlights: ['Why FOSS matters', 'Terminal 101', 'Dual boot clinic'],
    status: 'COMPLETED',
    location: 'Main Auditorium, TKMCE'
  },
  {
    id: 'github-guide-2024',
    title: 'GitHub Guide 101',
    year: 2024,
    date: '2024-09-20',
    description: 'Comprehensive practical session on Git version control, branching models, resolving merge conflicts, and remote teamwork.',
    category: 'WORKSHOP',
    coverImage: '/events/2024/github-guide-poster.jpg',
    highlights: ['CLI Git Mastery', 'Merge conflict resolution', 'Interactive PR reviews'],
    status: 'COMPLETED',
    location: 'CS Lab 2, TKMCE'
  },
  {
    id: 'beyond-code-2024',
    title: 'Beyond Code',
    year: 2024,
    date: '2024-08-10',
    description: 'Exploring non-code contributions in Free Software: documentation, technical writing, UI/UX, localization, and community advocacy.',
    category: 'TALK',
    coverImage: '/events/2024/beyond-code-poster.jpg',
    highlights: ['Technical documentation', 'Open source licensing', 'Accessibility in FOSS'],
    status: 'COMPLETED',
    location: 'Civil Seminar Hall, TKMCE'
  },
  {
    id: 'orientation-2024',
    title: 'FOSS Cell Orientation 2024',
    year: 2024,
    date: '2024-07-28',
    description: 'The foundation talk outlining the vision, past projects, upcoming roadmap, and cultural ethos of FOSS Cell TKMCE.',
    category: 'TALK',
    coverImage: '/events/2024/orientation-poster.jpg',
    highlights: ['Free Software philosophy', 'Roadmap for 2024-25', 'Open Q&A'],
    status: 'COMPLETED',
    location: 'Main Auditorium, TKMCE'
  }
];
