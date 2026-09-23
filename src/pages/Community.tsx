import React, { useState } from 'react';
import { Mail, MapPin, ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';
import { GithubIcon, DiscordIcon, InstagramIcon, LinkedinIcon } from '../components/Icons';

export const Community: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', department: '', email: '', message: '' });

  const channels = [
    {
      name: 'Discord Community Server',
      desc: 'Active chat, dev discussions, live voice rooms, and event voice stages.',
      link: 'https://discord.gg/uXrWyWqvWx',
      badge: 'REALTIME CHAT',
      icon: DiscordIcon,
      color: '#00f0ff'
    },
    {
      name: 'GitHub Organization',
      desc: 'Explore repositories, fork code, submit PRs, and review peer commits.',
      link: 'https://github.com/tkmfoss',
      badge: 'CODE HOSTING',
      icon: GithubIcon,
      color: '#00ff66'
    },
    {
      name: 'Instagram Dispatch',
      desc: 'Visual announcements, event teasers, and community highlights.',
      link: 'https://instagram.com/tkmcefosscell',
      badge: 'UPDATES',
      icon: InstagramIcon,
      color: '#ff5599'
    },
    {
      name: 'LinkedIn Network',
      desc: 'Alumni connections, industry talks, and open-source career updates.',
      link: 'https://www.linkedin.com/company/foss-tkmce',
      badge: 'CAREERS',
      icon: LinkedinIcon,
      color: '#00a0dc'
    }
  ];

  const faqs = [
    {
      q: 'Do I need to be a Computer Science student to join?',
      a: 'Absolutely not. FOSS Cell is open to all engineering departments—Mechanical, Civil, Electrical, Electronics, Chemical, Architecture, and Computer Science. Software freedom affects all human disciplines.'
    },
    {
      q: 'I am a beginner and do not use Linux yet. Can I still participate?',
      a: 'Yes! We host dedicated dual-boot clinics and introductory Linux terminal sessions at the start of every academic year to help everyone get set up comfortably.'
    },
    {
      q: 'Are there membership fees or paid certifications?',
      a: 'Zero. FOSS Cell is 100% free software in spirit and practice. All workshops, code reviews, and mentorship sessions are community-driven and free of charge.'
    },
    {
      q: 'Where do we meet on campus?',
      a: 'We hold offline workshops, coding sprints, and hackathons primarily at the APJ Abdul Kalam Computer Centre and Department Seminar Halls at TKMCE.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email) {
      setSent(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 sm:space-y-14 font-mono">
      {/* Header */}
      <div className="border-2 border-[#2b2c31] bg-[#101115] p-4 sm:p-8 lg:p-10 shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#00ff66]">
          <span>// CONNECT & CONTRIBUTE</span>
          <span>&bull;</span>
          <span>TKM COLLEGE OF ENGINEERING</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight font-sans leading-tight">
          Join the FOSS Community
        </h1>
        <p className="text-neutral-300 text-xs sm:text-sm lg:text-base font-sans max-w-2xl leading-relaxed">
          No sign-up barriers, no corporate proprietary forms. Step into our communication channels, 
          attend weekly hack meets, and write code that belongs to everyone.
        </p>
      </div>

      {/* Primary Community Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {channels.map((chan, idx) => {
          const Icon = chan.icon;
          return (
            <a
              key={idx}
              href={chan.link}
              target="_blank"
              rel="noreferrer"
              className="brutal-card p-4 sm:p-6 flex flex-col justify-between space-y-4 group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#232429] text-xs">
                  <span className="flex items-center gap-2 text-white font-bold">
                    <Icon size={16} style={{ color: chan.color }} />
                    <span className="text-xs sm:text-sm">{chan.name}</span>
                  </span>
                  <span className="px-1.5 sm:px-2 py-0.5 bg-[#17181c] border border-[#27272a] text-[9px] sm:text-[10px]" style={{ color: chan.color }}>
                    [{chan.badge}]
                  </span>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                  {chan.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#232429] text-xs text-neutral-400">
                <span className="text-[10px] sm:text-[11px] truncate max-w-[180px] sm:max-w-[240px]">{chan.link}</span>
                <span className="text-[#00ff66] font-bold group-hover:underline flex items-center gap-1 shrink-0 text-xs">
                  <span>ENTER</span>
                  <ArrowUpRight size={12} />
                </span>
              </div>
            </a>
          );
        })}
      </div>

      {/* Direct Transmission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          <div className="border-2 border-[#2b2c31] bg-[#101115] p-4 sm:p-6 shadow-[4px_4px_0px_#000000] sm:shadow-[5px_5px_0px_#000000] space-y-4">
            <div className="text-white font-bold text-sm sm:text-base uppercase">// PHYSICAL LOCATION</div>
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#00ff66] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-bold">TKM College of Engineering</div>
                  <div className="text-neutral-400 text-xs">Karicode, Kollam - 691005, Kerala, India</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 pt-2 border-t border-[#1f2025]">
                <Mail size={16} className="text-[#00f0ff] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-bold">Direct Email</div>
                  <a href="mailto:fosscelltkmce@gmail.com" className="text-neutral-400 hover:text-white underline text-xs">
                    fosscelltkmce@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7">
          <div className="border-2 border-[#2b2c31] bg-[#101115] p-4 sm:p-8 shadow-[4px_4px_0px_#000000] sm:shadow-[5px_5px_0px_#000000] space-y-4">
            <div className="flex items-center justify-between border-b border-[#23242a] pb-3 text-xs text-neutral-400">
              <span className="text-white font-bold">// SEND DISPATCH PACKET</span>
              <span className="text-[10px] sm:text-xs">DIRECT_TRANSMISSION</span>
            </div>

            {sent ? (
              <div className="p-4 sm:p-6 bg-[#112417] border border-[#00ff66] text-[#00ff66] space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 size={18} className="shrink-0" />
                  <span>PACKET TRANSMITTED SUCCESSFULLY</span>
                </div>
                <p className="text-neutral-300">
                  Thank you, {form.name}. A representative from FOSS Cell TKMCE will respond via {form.email}.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', department: '', email: '', message: '' }); }}
                  className="brutal-btn text-xs py-1.5 px-3 mt-2 cursor-pointer"
                >
                  SEND ANOTHER PACKET
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <label className="text-neutral-400 text-[10px] sm:text-[11px] uppercase">Your Name:</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ada Lovelace"
                      className="w-full bg-[#090a0d] border border-[#3f3f46] px-3 py-2 text-white outline-none focus:border-[#00ff66] text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-neutral-400 text-[10px] sm:text-[11px] uppercase">Email Address:</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ada@tkmce.ac.in"
                      className="w-full bg-[#090a0d] border border-[#3f3f46] px-3 py-2 text-white outline-none focus:border-[#00ff66] text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 text-[10px] sm:text-[11px] uppercase">Branch & Year (Optional):</label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    placeholder="CSE / S4 or ME / S2"
                    className="w-full bg-[#090a0d] border border-[#3f3f46] px-3 py-2 text-white outline-none focus:border-[#00ff66] text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 text-[10px] sm:text-[11px] uppercase">Inquiry or Message:</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what you'd like to build, learn, or propose..."
                    className="w-full bg-[#090a0d] border border-[#3f3f46] px-3 py-2 text-white outline-none focus:border-[#00ff66] text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="brutal-btn-primary w-full py-2.5 sm:py-3 font-bold flex items-center justify-center gap-2 cursor-pointer text-xs"
                >
                  <Send size={14} />
                  <span>TRANSMIT DISPATCH PACKET</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Inquiries */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between border-b-2 border-[#27272a] pb-3">
          <div className="text-base sm:text-lg font-bold text-white uppercase font-sans">
            Frequently Asked Questions
          </div>
          <span className="text-[10px] sm:text-xs text-neutral-400">// FAQ_DATABASE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="brutal-card p-4 sm:p-6 space-y-2">
              <div className="text-white font-bold text-xs sm:text-sm font-sans flex items-start gap-2">
                <span className="text-[#00ff66] font-mono text-xs mt-0.5">[{idx + 1}]</span>
                <span>{faq.q}</span>
              </div>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
