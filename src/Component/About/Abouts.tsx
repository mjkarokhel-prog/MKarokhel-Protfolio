import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const CARDS = [
  {
    tag: "What I do",
    dotColor: "bg-[#e8542a]",
    tagColor: "text-[#e8542a]",
    content: (
      <p className="text-[20px] leading-[1.55] text-[#26241f]">
        I build clean, responsive interfaces and turn designs into working websites using modern frontend tools.
      </p>
    ),
  },
  {
    tag: "Background",
    dotColor: "bg-[#e8542a]",
    tagColor: "text-[#e8542a]",
    content: (
      <p className="text-[20px] leading-[1.55] text-[#26241f]">
        I recently completed the Frontend Development track at Upskill Bootcamp, focusing on HTML, CSS, JavaScript, and React fundamentals.
      </p>
    ),
  },
  {
    tag: "My approach",
    dotColor: "bg-[#e8542a]",
    tagColor: "text-[#e8542a]",
    content: (
      <p className="text-[20px] leading-[1.55] text-[#26241f]">
        "I believe in writing clean, readable code and paying close attention to detail. I'm early in my journey, and I treat every project as a chance to learn."
      </p>
    ),
  },
  {
    tag: "Career",
    dotColor: "bg-[#c9c6bd] w-3 h-3",
    tagColor: "text-[#26241f] text-lg",
    content: (
      <div className="mt-1.5">
        {[
          ["Building personal projects", "2025 — Now"],
          ["Frontend Development, Upskill Bootcamp", "2025 — 2026"],
          ["Self-taught HTML/CSS/JS basics", "2025 — Now"],
        ].map(([role, years], i) => (
          <div
            key={role}
            className={`flex items-center justify-between py-[13px] text-[20px] ${
              i !== 0 ? "border-t border-[#f5f4f2]" : ""
            }`}
          >
            <span className="text-[#26241f]">{role}</span>
            <span className="font-semibold text-[#8c887f]">{years}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function AboutMeStack() {
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const pillRef = useRef(null);

  // title — same SplitText char-cascade used on Contact/Skills/Process/Projects
  useEffect(() => {
    if (!titleRef.current) return;

    let split;

    const ctx = gsap.context(() => {
      gsap.set(pillRef.current, { opacity: 0, y: -8 });

      split = new SplitText(titleRef.current, { type: "chars" });
      gsap.set(split.chars, { opacity: 0, y: 8 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: titleRef.current, start: "top 85%", once: true },
      });

      tl.to(pillRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "sine.out" }).to(
        split.chars,
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.016 },
        "-=0.2"
      );
    });

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const cards = cardsRef.current;
    // give every card the same sticky offset so each new one lands flush
    // on top of the last, fully covering it
    cards.forEach((card) => {
      if (card) card.style.top = "100px";
    });

    // NOTE: no Lenis instance here — scroll smoothing is handled once,
    // globally, by <SmoothScrollProvider> wrapping the whole app in App.tsx.

    const ctx = gsap.context(() => {
      // subtle settle-in on each card as the next one arrives, so the stack
      // doesn't feel like a hard cut — purely scroll-driven, no fixed duration
      cards.forEach((card, i) => {
        if (!card || i === cards.length - 1) return;
        gsap.fromTo(
          card,
          { scale: 1 },
          {
            scale: 0.98,
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top+=100",
              scrub: 1.1, // small lag = smoother feel, still tied to scroll
            },
          }
        );
      });

      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="max-w-[680px] mx-auto px-6 pt-24 font-sans text-[#26241f]">
      <span
        ref={pillRef}
        className="block w-fit mx-auto mb-7 px-[18px] py-2 rounded-full bg-white text-[13px] font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
      >
        About me
      </span>

      <h1
        ref={titleRef}
        className="text-center text-[60px] leading-[1.12] font-semibold tracking-[-0.02em] mb-20"
      >
        Mindset, methods,
        <br />
        &amp; experience
      </h1>

      <div className="relative">
        {CARDS.map((card, i) => (
          <div
            key={card.tag}
            ref={(el) => (cardsRef.current[i] = el)}
            style={{ zIndex: i + 1, marginBottom: "10px" }}
            className="sticky bg-white rounded-[20px] px-7 pt-[26px] pb-[30px] "
          >
            <div className="flex items-center gap-3 text-[16px] font-semibold mb-3.5">
              <span className={`w-[7px] h-[7px] rounded-full ${card.dotColor}`} />
              <span className={card.tagColor}>{card.tag}</span>
            </div>
            {card.content}
          </div>
        ))}
      </div>

      <div className="h-[38vh]" />
    </section>
  );
}