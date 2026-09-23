import React, { useState } from 'react';
import { GitBranch, Star, GitFork, Code2, ArrowUpRight, Copy, Check } from 'lucide-react';
import { FOSS_PROJECTS } from '../data/projects';

export const Projects: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12 font-mono">
      {/* Header */}
      <div className="border-2 border-[#2b2c31] bg-[#101115] p-4 sm:p-8 lg:p-10 shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#00ff66]">
          <span>// OPEN SOURCE ECOSYSTEM</span>
          <span>&bull;</span>
          <span>TKMFOSS REPOSITORIES</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight font-sans leading-tight">
          Software & Repositories
        </h1>
        <p className="text-neutral-300 text-xs sm:text-sm lg:text-base font-sans max-w-2xl leading-relaxed">
          Explore codebases authored and maintained by TKMCE students. All projects are public, reproducible,
          and licensed under permissive or copyleft licenses.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {FOSS_PROJECTS.map((project) => {
          const cloneCmd = `git clone ${project.url}.git`;
          return (
            <div
              key={project.id}
              className="brutal-card p-4 sm:p-6 flex flex-col justify-between space-y-4 sm:space-y-5"
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#232429] text-xs">
                  <span className="text-[#00ff66] font-bold flex items-center gap-1.5 truncate pr-2">
                    <GitBranch size={14} className="shrink-0" />
                    <span className="truncate">{project.repoName}</span>
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="px-1.5 py-0.5 bg-[#17181c] border border-[#27272a] text-[9px] sm:text-[10px] text-neutral-300">
                      {project.license}
                    </span>
                    <span className="px-1.5 py-0.5 bg-[#122416] border border-[#00ff66]/40 text-[9px] sm:text-[10px] text-[#00ff66]">
                      [{project.status}]
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-sans">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {project.tags.map((t, idx) => (
                    <span key={idx} className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 bg-[#18191e] border border-[#27272a] text-neutral-300">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CLI Clone Box */}
              <div className="space-y-3 pt-3 border-t border-[#232429]">
                <div className="bg-[#090a0d] border border-[#27272a] p-2 sm:p-2.5 flex items-center justify-between gap-2 text-xs text-neutral-300">
                  <span className="truncate font-mono text-[10px] sm:text-[11px] text-[#00f0ff] min-w-0">{cloneCmd}</span>
                  <button
                    onClick={() => handleCopy(project.id, cloneCmd)}
                    className="p-1 hover:text-white transition-colors text-neutral-400 shrink-0 cursor-pointer"
                    title="Copy clone command"
                  >
                    {copiedId === project.id ? <Check size={14} className="text-[#00ff66]" /> : <Copy size={14} />}
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-white font-bold">
                      <Code2 size={12} className="text-[#00ff66]" />
                      <span>{project.language}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-[#f59e0b]" />
                      <span>{project.stars}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={12} className="text-neutral-400" />
                      <span>{project.forks}</span>
                    </span>
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#00ff66] hover:underline flex items-center gap-1 font-bold text-xs"
                  >
                    <span>GITHUB</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contribution Guide */}
      <div className="border-2 border-[#2b2c31] bg-[#111216] p-4 sm:p-8 lg:p-10 shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] space-y-4 sm:space-y-6">
        <div className="text-[10px] sm:text-xs text-[#00f0ff] uppercase">// WORKFLOW STANDARD</div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white uppercase font-sans">
          How to Contribute to TKM FOSS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs font-mono pt-2">
          <div className="p-3.5 sm:p-4 bg-[#16171d] border border-[#27272a] space-y-1.5 sm:space-y-2">
            <div className="text-[#00ff66] font-bold text-xs">STEP 01</div>
            <div className="text-white font-bold text-xs sm:text-sm">FORK REPOSITORY</div>
            <p className="text-neutral-400 font-sans text-xs">Fork the project to your personal GitHub namespace and clone locally.</p>
          </div>
          <div className="p-3.5 sm:p-4 bg-[#16171d] border border-[#27272a] space-y-1.5 sm:space-y-2">
            <div className="text-[#00ff66] font-bold text-xs">STEP 02</div>
            <div className="text-white font-bold text-xs sm:text-sm">BRANCH & CODE</div>
            <p className="text-neutral-400 font-sans text-xs">Create a feature branch: `git checkout -b feat/your-feature`.</p>
          </div>
          <div className="p-3.5 sm:p-4 bg-[#16171d] border border-[#27272a] space-y-1.5 sm:space-y-2">
            <div className="text-[#00ff66] font-bold text-xs">STEP 03</div>
            <div className="text-white font-bold text-xs sm:text-sm">SIGN-OFF COMMITS</div>
            <p className="text-neutral-400 font-sans text-xs">Sign commits with `git commit -s` adhering to the Developer Certificate of Origin.</p>
          </div>
          <div className="p-3.5 sm:p-4 bg-[#16171d] border border-[#27272a] space-y-1.5 sm:space-y-2">
            <div className="text-[#00ff66] font-bold text-xs">STEP 04</div>
            <div className="text-white font-bold text-xs sm:text-sm">SUBMIT PR</div>
            <p className="text-neutral-400 font-sans text-xs">Submit a clean PR for collaborative peer review by student maintainers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
