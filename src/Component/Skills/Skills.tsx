import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Code2, Braces, Component, Smartphone } from "lucide-react";
gsap.registerPlugin(ScrollTrigger, SplitText);

const SERVICES = [
  {
    icon: Code2,
    title: "HTML, CSS &\nTailwind",
    text: "Building clean, semantic markup and responsive layouts with modern CSS and Tailwind.",
  },
  {
    icon: Braces,
    title: "JavaScript &\nTypeScript",
    text: "Writing clear, reliable logic to bring interfaces to life and handle real app behavior.",
  },
  {
    icon: Component,
    title: "React &\nComponents",
    text: "Building reusable, well-structured components with hooks and modern React patterns.",
  },
  {
    icon: Smartphone,
    title: "Responsive &\nCross-Device",
    text: "Making sure every project looks and works great on any screen size or device.",
  },
];

export default function SkillsSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

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

  return (
    <section className="max-w-[1250px] mx-auto px-6 pt-24 pb-20 font-sans text-[#26241f]">
      <div className="text-center mb-14">
        <span
          ref={pillRef}
          className="inline-block mb-6 px-[26px] py-2 rounded-full bg-white text-[16px] font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
        >
          Skills
        </span>

        <h2
          ref={titleRef}
          className="text-[63px] leading-[1.2] font-semibold tracking-[-0.02em]"
        >
          <span className="block">Skills that shape</span>
          <span className="block">every build</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className="flex flex-col gap-5 bg-white rounded-[20px] h-[240px] px-7 pt-8 pb-7"
            >
              <div className="flex items-center gap-5 mb-9">
                <div className="shrink-0 w-16 h-16 rounded-full bg-[#fbe6de] flex items-center justify-center">
                  <Icon size={28} className="text-[#e8542a]" />
                </div>
                <h3 className="text-[22px] leading-[1.2] font-semibold whitespace-pre-line">
                  {service.title}
                </h3>
              </div>
              <p className="text-[23px] font-normal leading-[1.3] text-[#726f69]">
                {service.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}