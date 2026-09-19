import { useMemo } from "react";

// Simple text/svg "logotypes" standing in for real client logos.
// Swap any of these for real <img src="..."> logos when you have them.
const LOGOS = [
  {
    name: "Upskill",
    node: (
      <span className="flex items-center gap-1.5 text-[30px] font-extrabold tracking-tight text-[#3a3833]">
        <span className="inline-block w-4 h-4 rounded-full bg-[#e8542a]" />
        Upskill
      </span>
    ),
  },
  {
    name: "Northline",
    node: (
      <span className="text-[30px] font-medium italic text-[#4a4841]">
        Northline
      </span>
    ),
  },
  {
    name: "Vertex",
    node: (
      <span className="flex items-center gap-1 text-[30px] font-bold text-[#3a3833]">
        <svg width="35" height="35" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2 L22 20 L2 20 Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        Vertex
      </span>
    ),
  },
  {
    name: "Marlow & Co",
    node: (
      <span
        className="text-[30px] text-[#3a3833]"
        style={{ fontFamily: "'Brush Script MT', cursive" }}
      >
        Marlow &amp; Co
      </span>
    ),
  },
  {
    name: "Halo",
    node: (
      <span className="flex items-center gap-1.5 text-[30px] font-semibold tracking-wide text-[#3a3833]">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        </svg>
        Halo
      </span>
    ),
  },
];

export default function ClientsMarquee() {
  // duplicate the list so the track can loop seamlessly at -50%
  const track = useMemo(() => [...LOGOS, ...LOGOS], []);

  return (
    <section className="relative bottom-60 right-0 left-0 w-full px-6">
      <div className="max-w-[1200px] mx-auto rounded-[999px] py-12 px-20 bg-white flex items-center overflow-hidden">
        <span className="shrink-0 pl-5 pr-16 py-8 text-[20px] font-medium text-[#3a3937] italic">
          Clients &amp; collaborators
        </span>

        <div className="relative flex-1 overflow-hidden py-8">
          {/* fade edges so logos don't clip abruptly */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="marquee-track flex items-center gap-16 w-max">
            {track.map((logo, i) => (
              <div key={`${logo.name}-${i}`} className="shrink-0 opacity-70">
                {logo.node}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation: marquee-scroll 26s linear infinite;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}