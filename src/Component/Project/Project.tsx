import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PROJECTS = [
  {
    name: "Connecto",
    year: "2023",
    gradient: "linear-gradient(180deg,#b9d98f 0%,#3fae8a 45%,#1b3a52 100%)",
    bg: "#d8d7d3",
  },
  {
    name: "PayNest",
    year: "2024",
    gradient: "linear-gradient(180deg,#f3f3f0 0%,#f4b28a 55%,#e8541f 100%)",
    bg: "#e7e6e2",
  },
  {
    name: "Shopora",
    year: "2014",
    gradient: "linear-gradient(160deg,#cfe08a 0%,#4fae8a 50%,#1e3f57 100%)",
    bg: "#d8d7d3",
  },
  {
    name: "EduNova",
    year: "2026",
    gradient: null,
    bg: "#c9c7c1",
  },
];

export default function ProjectsShowcase() {
  const titleRef = useRef(null);
  const pillRef = useRef(null);

  useEffect(() => {
    if (!titleRef.current) return;

    let split: SplitText | undefined;

    const ctx = gsap.context(() => {
      gsap.set(pillRef.current, { opacity: 0, y: -8 });

      split = new SplitText(titleRef.current, { type: "chars" });
      gsap.set(split.chars, { opacity: 0, y: 8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.to(pillRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "sine.out",
      }).to(
        split.chars,
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.016 },
        "-=0.2",
      );
    });

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section className="max-w-[1250px] mx-auto px-6 pb-20 font-sans text-[#26241f]">
      <div className="text-center mb-10">
        <span
          ref={pillRef}
          className="inline-block mb-6 px-[27px] py-2 rounded-full bg-white text-[15px] font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
        >
          Projects
        </span>

        <h2
          ref={titleRef}
          className="text-[63px] leading-[1.3] font-semibold tracking-[-0.02em]"
        >
          <span className="block">Designed, Built,</span>
          <span className="block">&amp; Shipped</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {PROJECTS.map((p) => (
          <div
            key={p.name}
            className="relative rounded-[20px] overflow-hidden h-[560px]"
            style={{ backgroundColor: p.bg }}
          >
            {p.gradient && (
              <div
                className="absolute inset-0 m-auto w-[62%] h-[85%] rounded-[26px]"
                style={{ background: p.gradient }}
              />
            )}

            {p.name === "EduNova" && (
              <div className="absolute inset-0 flex items-end justify-center pb-11">
                <div className="w-[260px] h-[465px] bg-[#8f8d87] rounded-[26px] shadow-[0_20px_30px_-10px_rgba(0,0,0,0.3)] flex items-start justify-center pt-8">
                  <span className="text-white text-[34px] font-extrabold tracking-tight">
                    ST10
                  </span>
                </div>
              </div>
            )}

            <div className="absolute left-4 bottom-4 flex items-center gap-3 px-6 py-3 rounded-full bg-white text-[13px] font-medium text-[#3a3833] shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
              <span>{p.name}</span>
              <span className="text-[#c6c3bb]">/</span>
              <span className="text-[#8c887f]">{p.year}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-14">
        <p className="text-[20px] leading-[1.6] text-[#31302e] mb-6">
          Selected projects that reflect my approach to design,
          <br />
          development, and execution.
        </p>

        <button className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white text-[15px] font-semibold text-[#26241f] shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-shadow">
          View All Projects
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="#e8542a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
