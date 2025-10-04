import React, { useMemo, useRef, useState } from "react";
import TiltCard from "./components/TiltCard";
import ShineButton from "./components/ShineButton";
import Spotlight from "./components/Spotlight";
import usePrefersReducedMotion from "./hooks/usePrefersReducedMotion";
import useInViewStagger from "./hooks/useInViewStagger";

const TOKENS = {
  bg: "#0b0f0e",
  panel: "#121816",
  line: "#1a2320",
  text: "#e6efe9",
  sub: "#a9c3b8",
  sage300: "#88b8a1",
  sage200: "#aecfbf",
  sage400: "#72a193",
};

const SIGNATURE_URL = "/ringoshiro.png";

const NAV = [
  { id: "work", title: "Work" },
  { id: "about", title: "About" },
  { id: "stack", title: "Stack" },
  { id: "contact", title: "Contact" },
];

const RECENT_FOCUS_IMG = "/work/recent-focus.jpg";
const RECENT_FOCUS_ALT = "PETIR after a training session";

const CASES = [
  {
    id: "petir-chairman",
    title: "Chairman of PETIR Cyber Security",
    summary: "Organized meetups & training; strengthened CTF practice culture at BINUS.",
    tags: ["Leadership", "CTF", "Community"],
    link: "https://www.linkedin.com/in/vito-tantra-putra",
    image: "/work/petir.jpg",
    imageAlt: "PETIR Cyber Security meetup"
  },
  {
    id: "ctf-writeups",
    title: "CTF Write-ups",
    summary: "In-depth CTF write-ups spanning cryptography, forensics, reverse engineering, OSINT, and other attack methodologies.",
    tags: ["Cryptography", "OSINT", "Forensics", "Reverse Engineering", "Miscellaneous"],
    link: "https://ringoshiro.gitbook.io/ctf-write-ups",
    image: "/work/ctf.png",
    imageAlt: "Terminal and code during a CTF"
  },
];

export default function App(){
  const [cmdOpen, setCmdOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [year] = useState(new Date().getFullYear());
  const prefers = usePrefersReducedMotion();

  const revealRef = useRef(null);
  useInViewStagger(revealRef);

  const cmdItems = useMemo(()=>{
    const pages = NAV.map(n=>({ type:'section', id:n.id, title:n.title }));
    const works = CASES.map(c=>({ type:'case', id:c.id, title:c.title }));
    const all = [...pages, ...works];
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter(x=> x.title.toLowerCase().includes(q));
  },[query]);

  function goTo(id){
    setCmdOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
  }

  return (
    <div className="min-h-screen text-[var(--text)]" style={{
      background: `radial-gradient(900px 600px at 10% -10%, ${TOKENS.line} 0%, transparent 60%), radial-gradient(900px 600px at 100% 0%, ${TOKENS.panel} 0%, transparent 60%), ${TOKENS.bg}`,
      color: TOKENS.text
    }}>
      <style>{`
        :root{ --bg:${TOKENS.bg}; --panel:${TOKENS.panel}; --line:${TOKENS.line}; --text:${TOKENS.text}; --sub:${TOKENS.sub}; --sage200:${TOKENS.sage200}; --sage300:${TOKENS.sage300}; --sage400:${TOKENS.sage400}; }
        .ring-sage{ filter: drop-shadow(0 20px 60px rgba(136,184,161,.25)); }
        .card{ background: var(--panel); border: 1px solid rgba(255,255,255,.05); box-shadow: 0 10px 30px rgba(0,0,0,.35) }
        .chip{ background: rgba(136,184,161,.12); border: 1px solid rgba(136,184,161,.25); color: var(--sage200) }
        .focus-ring:focus{ outline: 2px solid var(--sage300); outline-offset: 2px }
        .prose-muted{ color: var(--sub) }
      `}</style>

      <Spotlight />

      {/* NAV */}
      <header className="sticky top-0 z-30 border-b border-[var(--line)]/60 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Ringoshiroku"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open ringoshiro on GitHub"
              className="group flex items-center gap-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sage300)]"
            >
              <LogoMark />
              <strong className="tracking-wide transition-colors group-hover:text-[var(--sage200)]">
                ringoshiro
              </strong>
            </a>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--sub)]">
            {NAV.map(n=> (
              <a key={n.id} href={`#${n.id}`} className="hover:text-[var(--sage200)] link-underline">{n.title}</a>
            ))}
          </nav>
          <ShineButton className="btn-ghost" onClick={()=>setCmdOpen(true)}>
            🍎 · Quick Nav
          </ShineButton>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 grid place-items-center">
          <SageRing />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="reveal-child" ref={revealRef}>
            <p className="uppercase tracking-[0.2em] text-xs text-[var(--sage200)]/90">
              일어나라
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
              Vito Tantra Putra
            </h1>
            <h1 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight leading-tight">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage:`linear-gradient(90deg, ${TOKENS.sage300}, ${TOKENS.sage200})` }}
              >
                ringoshiro
              </span>
            </h1>

            <p className="mt-4 prose-muted max-w-prose">
              Chairman of PETIR Cyber Security | CTF Player at PETIR | Cyber Security Student at BINUS University
            </p>
            <p className="mt-4 prose-muted max-w-prose">
              I organize CTF practices weekly, write approachable writeups, and keep on learning to stay sharp.
            </p>
            <div className="mt-6 flex gap-3">
              {/* GitHub */}
              <ShineButton
                className="btn-ghost group"
                as="a"
                href="https://github.com/Ringoshiroku"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open GitHub profile"
              >
                <span className="inline-flex items-center gap-2">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 text-[var(--sage200)] transition-colors group-hover:text-current"
                  >
                    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.11.79-.25.79-.56v-2.1c-3.22.7-3.9-1.4-3.9-1.4-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.74 1.26 3.41.96.11-.75.41-1.26.75-1.55-2.57-.29-5.28-1.28-5.28-5.69 0-1.26.45-2.28 1.2-3.08-.12-.3-.52-1.52.11-3.16 0 0 .98-.31 3.2 1.18a10.9 10.9 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.64.23 2.86.11 3.16.75.8 1.2 1.82 1.2 3.08 0 4.42-2.71 5.39-5.29 5.67.42.36.8 1.06.8 2.14v3.17c0 .31.2.68.8.56A11.5 11.5 0 0 0 12 .5Z"/>
                  </svg>
                  GitHub
                </span>
              </ShineButton>

              {/* LinkedIn */}
              <ShineButton
                className="btn-ghost group"
                as="a"
                href="https://www.linkedin.com/in/vito-tantra-putra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open LinkedIn profile"
              >
                <span className="inline-flex items-center gap-2">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 text-[var(--sage200)] transition-colors group-hover:text-current"
                  >
                    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5Zm.75 6.25H2.75V21h3V9.75Zm5.25 0H8.98V21h3v-5.9c0-1.56.3-3.08 2.24-3.08 1.9 0 1.93 1.77 1.93 3.18V21h3v-6.46c0-3.19-.69-5.66-4.44-5.66-1.8 0-3.01.99-3.5 1.92h-.04v-1.55Z"/>
                  </svg>
                  LinkedIn
                </span>
              </ShineButton>
            </div>

            <ul className="mt-8 flex flex-wrap gap-3">
              {"Reverse Engineering, Forensics, Web Exploitation, Python".split(', ').map(s=> (
                <li key={s} className="card rounded-xl px-4 py-3 text-sm text-[var(--sage200)] ring-1 ring-[rgba(136,184,161,0.28)]">{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <TiltCard className="card rounded-2xl p-6 card-glow" intensity={8}>
              <div className="aspect-[4/3] rounded-xl border border-[var(--line)] bg-[#0b0f0e] relative overflow-hidden">
                <img
                  src={RECENT_FOCUS_IMG}
                  alt={RECENT_FOCUS_ALT}
                  className="absolute inset-0 h-full w-full object-cover opacity-100"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--bg)] via-[#0e1412]/45 to-transparent" />
                <div className="absolute inset-0 pointer-events-none backdrop-blur-[0.3px]" />
              </div>
              <div className="mt-4">
                <p className="text-xs prose-muted">Recent focus</p>
                <h3 className="text-lg font-semibold">PETIR Training → Faster CTF Solves</h3>
                <p className="prose-muted text-sm">
                  Clear practice plans, discussions, writeups, upsolving problems, and learning relevant CTF topics.
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* WORK RAIL */}
      <section id="work" className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle title="Works" subtitle="Experiences and Notes" />
        <div className="mt-6 relative">
          {USE_INFINITE_RAIL ? (
            <InfiniteRail
              items={CASES}
              renderItem={(c) => <CaseCard {...c} />}
            />
          ) : (
            <div className="rail grid grid-flow-col auto-cols-[minmax(280px,1fr)] gap-4 overflow-x-auto pb-4 px-6">
              {CASES.map(c => (
                <div key={c.id} className="min-w-[280px]">
                  <CaseCard {...c} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle title="About" subtitle="Principles & ways of working" />
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <Principle
            title="Learn by doing"
            body="Hands-on practices and CTFs make concepts stick, then I document the path so others can repeat it."
          />
          <Principle
            title="Share the knowledge"
            body="Writeups turn one-off wins into repeatable playbooks for the team."
          />
          <Principle
            title="Strong fundamentals"
            body="Strong fundamentals in come first — a principle I apply in CTFs and in leading PETIR Cyber Security’s training and practices."
          />
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="border-y border-[var(--line)]/60 bg-[var(--panel)]/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle title="Stack" subtitle="Tools I use repeatedly" />
          <div className="mt-6 grid md:grid-cols-4 gap-4">
            {['Python','Linux','Burp Suite','Wireshark','GitHub Actions','Docker','Git','Ghidra','Ida'].map(x=> (
              <div key={x} className="card rounded-xl px-4 py-3 text-sm text-[var(--sage200)]">
                {x}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
        <TiltCard className="card rounded-2xl p-8 grid md:grid-cols-[1fr_auto] gap-6 items-center card-glow" intensity={4}>
          <div>
            <h3 className="text-2xl font-bold">Let’s collaborate</h3>
            <p className="prose-muted">Share your ideas and goals — I’ll help translate them into clear strategies and actionable plans.</p>
          </div>
          <div className="flex gap-3">
            <ShineButton className="btn-ghost" as="a" href="mailto:vito.putra@binus.ac.id">Email me</ShineButton>
            <ShineButton className="btn-ghost" as="a" href="https://id.linkedin.com/in/vito-tantra-putra" target="_blank" rel="noreferrer">LinkedIn</ShineButton>
          </div>
        </TiltCard>
      </section>

      <footer className="text-center text-sm text-[var(--sub)] py-10 border-t border-[var(--line)]/60">© {year} | Vito Tantra Putra | Made with 🍎 by ringoshiro</footer>

      {/* Command Palette */}
      {cmdOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setCmdOpen(false)} />
          <div className="relative w-[min(680px,92vw)] card rounded-2xl p-3">
            <input autoFocus value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search sections or case studies…"
                   className="w-full rounded-md border border-[var(--line)] bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--sage300)]" />
            <ul className="mt-2 max-h-[50vh] overflow-auto divide-y divide-[var(--line)]/60">
              {cmdItems.map(item => (
                <li key={item.type+item.id}>
                  <button onClick={()=> goTo(item.type === 'section' ? item.id : 'work')} className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-md">
                    <span className="text-[var(--sage200)] mr-2">{item.type === 'section' ? 'Section' : 'Case'}</span>
                    {item.title}
                  </button>
                </li>
              ))}
              {!cmdItems.length && <li className="px-3 py-2 text-sm prose-muted">No results</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function LogoMark(){
  const src = SIGNATURE_URL?.trim();
  return (
    <div className="ring-sage relative inline-grid place-items-center h-9">
      {src ? (
        <img src={src} alt="ringoshiro signature" className="h-9 w-auto object-contain" />
      ) : (
        <>
          <svg viewBox="0 0 200 200" className="absolute h-full w-full">
            <defs>
              <radialGradient id="g" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#88b8a1"/>
                <stop offset="100%" stopColor="#1a2320"/>
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="44" fill="url(#g)" />
          </svg>
          <span className="relative text-xs font-bold">VT</span>
        </>
      )}
    </div>
  );
}

function SageRing(){
  return (
    <svg className="ring-sage" viewBox="0 0 800 800" width="100%" height="100%">
      <defs>
        <radialGradient id="ring" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#88b8a1" stopOpacity=".35"/>
          <stop offset="60%" stopColor="#88b8a1" stopOpacity=".05"/>
          <stop offset="100%" stopColor="#88b8a1" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="400" cy="400" r="260" fill="url(#ring)" />
    </svg>
  );
}

function PreviewTiles(){
  const tiles = new Array(6).fill(0).map((_,i)=> i);
  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      {tiles.map(i=> (
        <div key={i} className="rounded-md border border-[var(--line)]/70 h-16 bg-black/30" style={{
          backgroundImage: i%2? `linear-gradient(145deg, rgba(136,184,161,.14), transparent)` : 'none'
        }} />
      ))}
    </div>
  );
}

function SectionTitle({ title, subtitle }){
  return (
    <div className="flex items-baseline justify-between gap-4 flex-wrap">
      <div>
        <h2 className="text-2xl font-extrabold">{title}</h2>
        <p className="prose-muted text-sm">{subtitle}</p>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-[var(--line)] to-transparent"/>
    </div>
  );
}

function Principle({ title, body }){
  return (
    <article className="card rounded-2xl p-5 ring-1 ring-[rgba(136,184,161,0.28)]">
      <h3 className="font-semibold text-[var(--sage200)]">{title}</h3>
      <p className="prose-muted mt-1 text-sm">{body}</p>
    </article>
  );
}

function CaseCard({ id, title, summary, tags, link, image, imageAlt }){
  return (
    <TiltCard className="card rounded-2xl overflow-hidden group card-glow" intensity={6}>
      {/* IMAGE + OVERLAYS */}
      <div className="aspect-[4/3] relative overflow-hidden rounded-none">
        <img
          src={image}
          alt={imageAlt || title}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
        />

        {/* Dark gradient from the bottom (normal blend) */}
        <div className="absolute inset-0 pointer-events-none
                        bg-gradient-to-t from-[var(--bg)] via-[#0e1412]/28 to-transparent
                        transition-opacity duration-300
                        group-hover:from-[var(--bg)]/85 group-hover:via-[#0e1412]/40" />

        {/* Optional soft sage vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(60% 70% at 70% 30%, rgba(136,184,161,.12), transparent 60%)" }}
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[var(--text)]">{title}</h3>
        <p className="prose-muted text-sm mt-1">{summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map(t => (
            <span key={t} className="chip text-[11px] px-2.5 py-1 rounded-full">{t}</span>
          ))}
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-[var(--sage200)] hover:opacity-90 link-underline"
        >
          Read more <span aria-hidden>→</span>
        </a>
      </div>
    </TiltCard>
  );
}