import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

const STEPS = [
  {
    num: "01",
    title: "Understand the Brief",
    text: "Every solid build starts with clarity. I dig into the requirements and user needs to shape a strong technical foundation.",
  },
  {
    num: "02",
    title: "Build the Interface",
    text: "I combine clean code, structure, and thoughtful UI to build interfaces that feel smooth and look sharp.",
  },
  {
    num: "03",
    title: "Test & Refine",
    text: "Through testing, debugging, and iteration, I make sure everything works flawlessly across devices — not just in the editor.",
  },
  {
    num: "04",
    title: "Ship & Maintain",
    text: "I take projects from first commit to deployment, helping build scalable, maintainable code and a consistent experience across products.",
  },
];

export default function ProcessSteps() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const badgeRef = useRef<(HTMLSpanElement | null)[]>([]);
  const numRef = useRef<(HTMLSpanElement | null)[]>([]);
  const titleWrapRef = useRef<(HTMLSpanElement | null)[]>([]);
  const bodyRef = useRef<(HTMLParagraphElement | null)[]>([]);

  // section title — SplitText char-cascade used across the site
  useEffect(() => {
    if (!titleRef.current) return;

    let split: SplitText | undefined;

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

  // stacking cards + per-card badge/text activation
  useEffect(() => {
    const cards = cardsRef.current.filter((c): c is HTMLDivElement => !!c);
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const wrapEl = titleWrapRef.current[i];
        const badgeEl = badgeRef.current[i];
        const numEl = numRef.current[i];
        const bodyEl = bodyRef.current[i];
        if (!wrapEl || !badgeEl || !numEl || !bodyEl) return;

        // measure the title's true natural width BEFORE collapsing it,
        // so we know exactly how wide to grow it back to later
        const naturalWidth = wrapEl.scrollWidth;

        // rest state, same for all four cards: pill hugs tightly around
        // just the number, gray background, and the body text is muted
        gsap.set(wrapEl, { width: 0, overflow: "hidden" });
        gsap.set(badgeEl, { backgroundColor: "#eeece7" });
        gsap.set(numEl, { color: "#9c9992" });
        gsap.set(bodyEl, { color: "#b0aeab" });

        if (i !== cards.length - 1) {
          // pin every card except the last, from the moment its top hits
          // the top of the viewport, until the LAST card's top reaches
          // the top of the viewport. pinSpacing:false means no extra
          // scroll space is reserved, so the next card scrolls straight
          // up and lands on top of it.
          ScrollTrigger.create({
            trigger: card,
            start: "top top+=100",
            endTrigger: cards[cards.length - 1],
            end: "top top+=100",
            pin: true,
            pinSpacing: false,
          });

          // smooth settle: as the next card arrives and pins on top,
          // this one eases back slightly
          gsap.to(card, {
            scale: 0.97,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top top+=100",
              end: "top top+=40",
              scrub: 0.6,
            },
          });
        }

        // badge + text activation: a short, quick reveal that finishes
        // clearly BEFORE this card actually locks into its pinned
        // position (start earlier, end well ahead of the "top top+=100"
        // pin-engage point) — so by the time each card stacks, its badge
        // and text are already fully switched over, not still animating.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top top+=150",
              scrub: 0.35,
            },
          })
          .to(wrapEl, { width: naturalWidth, ease: "power1.inOut" }, 0)
          .to(badgeEl, { backgroundColor: "#e8542a", ease: "power1.inOut" }, 0)
          .to(numEl, { color: "#ffffff", ease: "power1.inOut" }, 0)
          .to(bodyEl, { color: "#1a2942", ease: "power1.inOut" }, 0);
      });

      // measurements above (especially the badge width collapse) change
      // layout height, and web fonts loading late shift text width/wrap
      // too — either one makes ScrollTrigger's calculated pin positions
      // wrong if we only refresh once, immediately. Re-measure after the
      // layout truly settles, and again once fonts/everything is loaded,
      // so each card pins at the correct scroll position instead of
      // firing late (which looks like "nothing happens until I scroll
      // past everything, then they suddenly stack").
      requestAnimationFrame(() => {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });

      const refreshOnReady = () => ScrollTrigger.refresh();
      window.addEventListener("load", refreshOnReady);
      document.fonts?.ready?.then(refreshOnReady);

      return () => {
        window.removeEventListener("load", refreshOnReady);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="max-w-[760px] mx-auto px-6 pt-24 pb-16 font-sans text-[#26241f]">
      <div className="text-center mb-16">
        <span
          ref={pillRef}
          className="inline-block mb-6 px-[18px] py-2 rounded-full bg-white text-[13px] font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
        >
          Process
        </span>
        <h2
          ref={titleRef}
          className="text-[63px] leading-[1.15] font-semibold tracking-[-0.02em]"
        >
          <span className="block">How things get</span>
          <span className="block">built together</span>
        </h2>
      </div>

      <div className="relative">
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            ref={(el) => { cardsRef.current[i] = el; }}
            style={{ zIndex: i + 1 }}
            className="relative bg-white rounded-[20px] px-8 pt-8 pb-9 shadow-[0_20px_40px_-12px_rgba(30,25,15,0.10)] mb-6"
          >
            <span
              ref={(el) => { badgeRef.current[i] = el; }}
              className="inline-flex items-center rounded-full pl-5 pr-5 py-2.5 mb-6 text-[14px] font-bold whitespace-nowrap"
            >
              <span ref={(el) => { numRef.current[i] = el; }}>{step.num}</span>
              <span
                ref={(el) => { titleWrapRef.current[i] = el; }}
                className="inline-block whitespace-nowrap text-white"
              >
                {" "}— {step.title}
              </span>
            </span>

            <p
              ref={(el) => { bodyRef.current[i] = el; }}
              className="text-[19px] leading-[1.65]"
            >
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}