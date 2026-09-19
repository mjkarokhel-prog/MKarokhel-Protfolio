import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ContactSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({ name: "", email: "", info: "" });

  useEffect(() => {
    if (!titleRef.current) return;

    let split: SplitText | undefined;

    const ctx = gsap.context(() => {
      gsap.set(pillRef.current, { opacity: 0, y: -8 });

      split = new SplitText(titleRef.current, { type: "chars" });
      gsap.set(split.chars, { opacity: 0, y: 8 });

      gsap.set(formRef.current, { opacity: 0, y: 90 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: titleRef.current, start: "top 85%", once: true },
      });

      tl.to(pillRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "sine.out" })
        .to(
          split.chars,
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.016 },
          "-=0.2"
        )
        .to(
          formRef.current,
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.3"
        );
    });

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  const handleChange = (field: "name" | "email" | "info", value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", form);
  };

  const inputClasses =
    "w-full rounded-[14px] bg-[#f0f0f0bb] border border-[#e3e1db] px-5 py-4 text-[15px] text-[#26241f] placeholder:text-[#9c9992] outline-none transition-all duration-300 ease-out focus:bg-white focus:border-[#e8542a] focus:shadow-[0_0_0_4px_rgba(232,84,42,0.12)]";

  return (
    <section className="max-w-[750px] mx-auto px-6 pt-52 pb-24 font-sans text-[#26241f]">
      <div className="text-center mb-10">
        <span
          ref={pillRef}
          className="inline-block mb-4 px-[18px] py-2 rounded-full bg-white text-[13px] font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
        >
          Contact
        </span>

        <h2
          ref={titleRef}
          className="text-[63px] leading-[1.2] pb-5 font-semibold tracking-[-0.02em]"
        >
          <span className="block">Have a project</span>
          <span className="block">in mind?</span>
        </h2>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="bg-white rounded-[24px] px-7 pt-12 pb-12 shadow-[0_18px_40px_-12px_rgba(30,25,15,0.08)]"
      >
        <div className="mb-6">
          <label className="block text-[16px] font-normal mb-2">Name</label>
          <input
            type="text"
            required
            placeholder="Mujahid Karokhel"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`${inputClasses} text-[15px] font-semibold`}
          />
        </div>

        <div className="mb-6">
          <label className="block text-[16px] font-normal mb-2">Email</label>
          <input
            type="email"
            required
            placeholder="Mujahid@brand.com"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`${inputClasses} text-[15px] font-semibold`}
          />
        </div>

        <label className="block text-[16px] font-normal mb-2">Project Information</label>
        <textarea
          placeholder="Tell us about your next project"
          rows={4}
          value={form.info}
          onChange={(e) => handleChange("info", e.target.value)}
          className={`${inputClasses} mb-6 text-[15px] font-semibold resize-y`}
        />

        <button
          type="submit"
          className="w-full rounded-full py-4 text-[15px] font-semibold text-white transition-transform duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
          style={{ background: "linear-gradient(180deg, #ff7a3d 0%, #e8451f 100%)" }}
        >
          Submit
        </button>

        <p className="text-center text-[15px] text-[#9c9992] mt-4">
          <strong className="font-normal text-[#6f6c64]">
            We will reach out to you within 24hrs
          </strong>
        </p>
      </form>
    </section>
  );
}