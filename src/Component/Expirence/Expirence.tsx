import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 100, suffix: "%", label: "Client Satisfaction Rate" },
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 4, suffix: "X", label: "Client Growth" },
  { value: 7, suffix: "+", label: "Years of Experience" },
];

export default function StatsCounter() {
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = STATS[i].value;
        const suffix = STATS[i].suffix;
        const counter = { val: 0 };

        gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.floor(counter.val) + suffix;
          },
          onComplete: () => {
            el.textContent = target + suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-[1200px] mx-auto px-6 py-12 font-sans"
    >
      <div className="grid grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-white rounded-[28px] px-8 pt-14 pb-12 flex flex-col items-center"
          >
            <span
              ref={(el) => {
                numberRefs.current[i] = el;
              }}
              className="text-[60px] leading-none font-bold text-[#e8542a] mb-4"
            >
              0{stat.suffix}
            </span>
            <span className="text-[17px] text-[#292825]">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
