import React, { useState, useEffect } from 'react';
import { Terminal, Users, CheckCircle2, Lock, History, ChevronDown, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { subscribeLiveExecom, getCachedExecom } from '../services/dataService';
import type { ExecomGroups } from '../services/dataService';

export const Execom: React.FC = () => {
  const [showArchive, setShowArchive] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [execomData, setExecomData] = useState<ExecomGroups>(getCachedExecom());

  useEffect(() => {
    const unsub = subscribeLiveExecom((data) => {
      setExecomData(data);
    });
    return () => unsub();
  }, []);

  const pipelineSteps = [
    { name: 'general_assembly_charter.sh', status: 'PASS', time: '0.04s' },
    { name: 'nomination_audit_and_scrutiny', status: 'PASS', time: '0.12s' },
    { name: 'role_allocation_matrix.bin', status: execomData.current.length > 0 ? 'PASS' : 'RUNNING', time: execomData.current.length > 0 ? '0.08s' : 'ACTIVE' },
    { name: 'gpg_signature_verification', status: execomData.current.length > 0 ? 'PASS' : 'PENDING', time: execomData.current.length > 0 ? '0.02s' : 'QUEUED' },
    { name: 'official_announcement_dispatch', status: execomData.current.length > 0 ? 'PASS' : 'PENDING', time: execomData.current.length > 0 ? 'DONE' : 'QUEUED' }
  ];

  const pendingRoles = [
    { title: 'CHAIRPERSON', id: 'ROLE_01', hash: 'sha256:e3b0c44298fc1c149afbf4c8996fb924' },
    { title: 'TECHNICAL HEAD', id: 'ROLE_02', hash: 'sha256:88d4266fd4e6338d13b845fcf289579d' },
    { title: 'PROGRAM COMMITTEE HEAD', id: 'ROLE_03', hash: 'sha256:5994471abb01112afcc18159f6cc74b4' },
    { title: 'WEB & PLATFORM HEAD', id: 'ROLE_04', hash: 'sha256:ca978112ca1bbdcafac231b39a23dc4d' },
    { title: 'DESIGN & MEDIA LEAD', id: 'ROLE_05', hash: 'sha256:3f79bb7b435b05321651daefd374cd6b' },
    { title: 'OUTREACH & RELATIONS', id: 'ROLE_06', hash: 'sha256:fb8e20fc2e4c3f248c60c39bd652f3c1' },
    { title: 'DOCUMENTATION LEAD', id: 'ROLE_07', hash: 'sha256:b10a8db164e0754105b7a99be72e3fe5' },
    { title: 'FACULTY COORDINATOR', id: 'ROLE_00', hash: 'FACULTY_ADVISOR // TKMCE CSE' }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
    }
  };

  const hasCurrentTeam = execomData.current.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12 font-mono">
      {/* Page Header Card */}
      <div className="border-2 border-[#2b2c31] bg-[#101115] p-4 sm:p-8 lg:p-10 shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] space-y-4 sm:space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 sm:pb-4 border-b border-[#232429] text-[10px] sm:text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 ${hasCurrentTeam ? 'bg-[#00ff66]' : 'bg-[#f59e0b]'} inline-block ${hasCurrentTeam ? '' : 'animate-ping'}`}></span>
            <span className={hasCurrentTeam ? 'text-[#00ff66] font-bold' : 'text-[#f59e0b] font-bold'}>
              {hasCurrentTeam ? 'TRANSMISSION: LIVE EXECOM ROSTER' : 'TRANSMISSION: COMPILING 2026-2027'}
            </span>
          </div>
          <div>STATUS: {hasCurrentTeam ? 'RATIFIED & DEPLOYED' : 'PENDING RATIFICATION'}</div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1c22] border border-[#3b3d4a] text-[#00ff66] text-[10px] sm:text-xs font-bold">
            <Users size={12} />
            <span>[{hasCurrentTeam ? 'ACTIVE COHORT' : 'COMING SOON // CLASSIFIED'}]</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight font-sans leading-tight">
            Executive Committee {hasCurrentTeam ? (execomData.current[0]?.tenure || '2025-2026') : '2026-2027'}
          </h1>

          <p className="text-neutral-300 text-xs sm:text-sm lg:text-base font-sans max-w-2xl leading-relaxed">
            {hasCurrentTeam
              ? 'Meet the student engineers and organizers driving open-source advocacy, technical workshops, and platform initiatives at TKM College of Engineering.'
              : 'The annual executive body transition of FOSS Cell TKMCE is currently undergoing constitutional review, GPG key exchange, and general body confirmation. The official roster will be unveiled here shortly.'}
          </p>
        </div>

        {!hasCurrentTeam && (
          /* ASCII Progress Bar when pending */
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-[11px] sm:text-xs text-neutral-400">
              <span>PIPELINE PROGRESS: COMPILE_ROSTER_STAGE</span>
              <span className="text-[#00ff66] font-bold">78%</span>
            </div>
            <div className="h-3.5 sm:h-4 w-full bg-[#0a0a0d] border border-[#3f3f46] p-0.5 flex">
              <div className="h-full bg-gradient-to-r from-[#00ff66] to-[#00f0ff] w-[78%]"></div>
            </div>
            <div className="text-[10px] sm:text-[11px] text-neutral-500 text-right overflow-x-auto whitespace-nowrap">
              [======================&gt;........] 78/100 BLOCKS VERIFIED
            </div>
          </div>
        )}
      </div>

      {/* If current execom is published, render the live team cards! */}
      {hasCurrentTeam ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[#2b2c31] pb-3">
            <div className="text-xs text-[#00ff66]">// ACTIVE LEADERSHIP SQUAD</div>
            <div className="text-xs text-neutral-400">{execomData.current.length} RATIFIED OFFICERS</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {execomData.current.map((member, idx) => (
              <div
                key={member.id || idx}
                className="brutal-card p-4 sm:p-5 flex flex-col justify-between space-y-4 group hover:border-[#00ff66] transition-all"
              >
                <div className="space-y-3">
                  <div className="relative aspect-square bg-[#14151a] border border-[#27272a] overflow-hidden">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500">
                        <Users size={32} />
                        <span className="text-[10px] mt-2">NO_IMAGE</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/90 border border-white/20 text-[9px] text-[#00ff66]">
                      #{String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-sans group-hover:text-[#00ff66] transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-xs text-[#00ff66] font-bold mt-0.5">{member.role}</div>
                    {member.department && (
                      <div className="text-[11px] text-neutral-400 mt-1 truncate">{member.department}</div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#232429] flex items-center justify-between">
                  <span className="text-[10px] text-neutral-500">{member.tenure || 'ACTIVE'}</span>
                  <div className="flex items-center gap-2">
                    {member.github && (
                      <a
                        href={member.github.startsWith('http') ? member.github : `https://github.com/${member.github}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-neutral-400 hover:text-white"
                        title="GitHub"
                      >
                        <GithubIcon size={14} />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin.startsWith('http') ? member.linkedin : `https://linkedin.com/in/${member.linkedin}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 text-neutral-400 hover:text-[#00f0ff]"
                        title="LinkedIn"
                      >
                        <LinkedinIcon size={14} />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="p-1 text-neutral-400 hover:text-[#f59e0b]"
                        title="Email"
                      >
                        <Mail size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Build Pipeline Console when no current members are ratified */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          <div className="lg:col-span-6 space-y-6">
            <div className="border-2 border-[#2b2c31] bg-[#0c0d10] p-4 sm:p-6 shadow-[4px_4px_0px_#000000] sm:shadow-[5px_5px_0px_#000000] space-y-4">
              <div className="flex items-center justify-between border-b border-[#23242a] pb-3 text-xs text-neutral-400">
                <span className="text-white font-bold flex items-center gap-2">
                  <Terminal size={14} className="text-[#00ff66]" />
                  <span>build_pipeline.yml</span>
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#00ff66]">[ACTIVE]</span>
              </div>

              <div className="space-y-2 text-xs">
                {pipelineSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-2 sm:p-2.5 bg-[#14151a] border border-[#222329] flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="text-neutral-500 font-mono shrink-0">0{idx + 1}</span>
                      <span className="text-neutral-200 truncate">{step.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-neutral-500">{step.time}</span>
                      <span
                        className={`px-1.5 py-0.5 text-[9px] font-bold ${
                          step.status === 'PASS'
                            ? 'bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/40'
                            : step.status === 'RUNNING'
                            ? 'bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/40 animate-pulse'
                            : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
                        }`}
                      >
                        {step.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Notification */}
            <div className="border-2 border-[#2b2c31] bg-[#0c0d10] p-4 sm:p-6 shadow-[4px_4px_0px_#000000] space-y-3">
              <div className="text-xs text-[#00f0ff] font-bold">// NOTIFY PROTOCOL:</div>
              <p className="text-xs text-neutral-300 font-sans">
                Receive the GPG-signed public announcement when the new roster is verified.
              </p>
              {subscribed ? (
                <div className="p-3 bg-[#112415] border border-[#00ff66] text-[#00ff66] text-xs flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>ACK: Email subscribed to dispatch queue.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="user@tkmce.ac.in"
                    className="flex-1 bg-[#14151a] border border-[#2b2c31] px-3 py-1.5 text-xs text-white outline-none focus:border-[#00ff66]"
                  />
                  <button type="submit" className="brutal-btn-primary text-xs py-1.5 px-4 font-bold shrink-0">
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#23242a] pb-2 text-xs text-neutral-400">
              <span className="text-white font-bold">// PENDING ROLE ALLOCATIONS</span>
              <span className="text-[#f59e0b]">[LOCKED]</span>
            </div>

            <div className="space-y-2">
              {pendingRoles.map((role) => (
                <div
                  key={role.id}
                  className="p-2.5 sm:p-3 bg-[#0d0e12] border border-[#222329] flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-white font-bold text-xs truncate">{role.title}</div>
                    <div className="text-[10px] text-neutral-500 font-mono truncate">{role.hash}</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#1b1509] border border-[#f59e0b]/40 text-[10px] text-[#f59e0b] shrink-0">
                    <Lock size={10} />
                    <span>LOCKED</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Historical Archive Toggle */}
      <div className="pt-6 border-t-2 border-[#27272a] space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="text-[11px] sm:text-xs text-neutral-400">// HISTORICAL DATA LOGS</div>
            <h2 className="text-lg sm:text-2xl font-bold text-white uppercase font-sans">
              Executive Committee Archive
            </h2>
          </div>

          <button
            onClick={() => setShowArchive(!showArchive)}
            className="brutal-btn w-full sm:w-auto text-xs py-2 px-4 bg-[#18191e] border-[#3f3f46] text-neutral-200 hover:text-black flex items-center justify-center gap-2 cursor-pointer"
          >
            <History size={14} />
            <span>{showArchive ? 'HIDE ARCHIVE' : `VIEW ARCHIVED ROSTER (${execomData.past.length})`}</span>
            <ChevronDown size={14} className={`transform transition-transform ${showArchive ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showArchive && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 pt-2 sm:pt-4 animate-fadeIn">
            {execomData.past.map((member, idx) => (
              <div
                key={member.id || idx}
                className="brutal-card p-3 space-y-2 text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#1f2026] border border-[#3f3f46] overflow-hidden">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale contrast-125"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-500">
                      <Users size={20} />
                    </div>
                  )}
                </div>

                <div className="space-y-0.5 w-full">
                  <div className="font-bold text-white text-[11px] sm:text-xs truncate w-full" title={member.name}>
                    {member.name}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-[#00ff66] truncate w-full">
                    {member.role}
                  </div>
                  {member.tenure && (
                    <div className="text-[8px] text-neutral-500">{member.tenure}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
