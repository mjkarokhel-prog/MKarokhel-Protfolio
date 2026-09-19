import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { ArrowRight, MessageCircle } from "lucide-react";
import profileImg from "../../../public/Images/Mans.png";
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const SOCIALS = [
  { label: "Facebook", badge: "f", bg: "#1877f2", fg: "#ffffff", href: "https://facebook.com/" },
  { label: "WhatsApp", icon: MessageCircle, bg: "#25d366", fg: "#ffffff", href: "https://wa.me/" },
  { label: "GitHub", badge: "Gh", bg: "#171515", fg: "#ffffff", href: "https://github.com/" },
  { label: "X", badge: "X", bg: "#000000", fg: "#ffffff", href: "https://x.com/" },
];

const LINKS = ["All Projects", "Contact", "About", "404"];

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const newsletterTextRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headings = sectionRef.current?.querySelectorAll(".footer-heading");
      const rows = sectionRef.current?.querySelectorAll(".footer-row");

      gsap.set([headings ?? [], rows ?? []], { y: 18, opacity: 0 });
      gsap.set(bottomBarRef.current, { y: 14, opacity: 0 });
      gsap.set(newsletterTextRef.current, { text: "" });
      gsap.set(cursorRef.current, { opacity: 1 });

      const blink = gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      });

      tl.to(headings ?? [], { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 })
        .to(
          rows ?? [],
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.05 },
          "-=0.35"
        )
        .to(bottomBarRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.2")
        .to(
          newsletterTextRef.current,
          {
            duration: 0.7,
            text: "Newsletter",
            ease: "none",
            onComplete: () => {
              blink.kill();
              gsap.to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.4 });
            },
          },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const hoverIn = (e: React.MouseEvent<HTMLElement>) => {
    const badge = e.currentTarget.querySelector(".badge") as HTMLElement | null;
    gsap.to(e.currentTarget, { y: -3, duration: 0.25, ease: "power2.out" });
    if (badge) gsap.to(badge, { scale: 1.15, rotate: 8, duration: 0.3, ease: "back.out(2)" });
  };

  const hoverOut = (e: React.MouseEvent<HTMLElement>) => {
    const badge = e.currentTarget.querySelector(".badge") as HTMLElement | null;
    gsap.to(e.currentTarget, { y: 0, duration: 0.25, ease: "power2.out" });
    if (badge) gsap.to(badge, { scale: 1, rotate: 0, duration: 0.3, ease: "power2.out" });
  };

  const linkHoverIn = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { x: 6, color: "#e8542a", duration: 0.25, ease: "power2.out" });
  };
  const linkHoverOut = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { x: 0, color: "#26241f", duration: 0.25, ease: "power2.out" });
  };

  return (
    <footer className="bg-[#fafaf7] px-6 pt-24 pb-10 font-sans text-[#26241f]">
      <div ref={sectionRef} className="max-w-[1100px] mx-auto">
        <div className="flex justify-between mb-16">
          {/* Socials */}
          <div className="flex gap-5 ">
            <div className="flex flex-col">
            <h3 className="footer-heading text-[18px] font-bold mb-5">Socials</h3>
            <div className="max-w-[300px] px-2 py-2 pr-4 rounded-[20px] footer-row flex gap-3 bg-white">
              <img
                src={profileImg}
                alt="Mujahid Karokhel"
                className="w-[135px] h-[175px] rounded-[16px] object-cover shrink-0"
              />
              <div className="flex flex-col gap-1.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                    className="flex items-center gap-2.5 bg-[#f7f7f7] border border-[#dfddd9] rounded-full pl-1.5 pr-4 py-1.5 text-[14px] font-medium  w-fit"
                  >
                    <span
                      className="badge w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0"
                      style={{ backgroundColor: s.bg, color: s.fg }}
                    >
                      {s.icon ? <s.icon size={14} /> : s.badge}
                    </span>
                    {s.label}
                  </a>
                ))}
              </div>
              </div>
            </div>
          

          {/* Links */}
          <div>
            <h3 className="footer-heading text-[18px] font-bold mb-5">Links</h3>
            <div className="footer-row bg-white rounded-[18px] px-5 py-5 flex flex-col gap-5 w-fit min-w-[140px]">
              {LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  onMouseEnter={linkHoverIn}
                  onMouseLeave={linkHoverOut}
                  className="text-[15px] font-medium text-[#26241f]"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          </div>

          {/* Newsletter */}
          <div className="max-w-[800px]">
            <h3 className="footer-heading text-[19px] font-bold mb-5">
              <span ref={newsletterTextRef} />
              <span ref={cursorRef} className="inline-block w-[2px] h-[16px] bg-[#26241f] ml-0.5 align-middle" />
            </h3>
            <p className="footer-row text-[18px] leading-[1.6] text-[#8c887f] mb-4 max-w-[350px]">
              Subscribe to get early access to special offers, project updates, and new work.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="footer-row flex items-center gap-3"
            >
              <input
                type="email"
                placeholder="Mujahid@brand.com"
                className="flex-1 h-[52px] w-[290px] rounded-xl bg-[#f3f3f2] border  border-[#e7e6e2]  px-5 text-[16px] font-medium text-[#26241f] placeholder:text-[#a19d94] outline-none transition-all duration-200 focus:bg-white focus:border-[#e8542a] focus:shadow-[0_0_0_4px_rgba(232,84,42,0.12)]"
              />
              <button
                type="submit"
                onMouseEnter={(e) =>
                  gsap.to(e.currentTarget, { rotate: 45, scale: 1.08, duration: 0.25, ease: "back.out(2)" })
                }
                onMouseLeave={(e) =>
                  gsap.to(e.currentTarget, { rotate: 0, scale: 1, duration: 0.25, ease: "power2.out" })
                }
                className="w-[52px] h-[52px] rounded-full bg-white flex items-center justify-center shrink-0 shadow-[0_2px_6px_rgba(0,0,0,0.06)]"
              >
                <ArrowRight size={18} className="text-[#e8542a]" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          ref={bottomBarRef}
          className="bg-white rounded-[18px] px-6 py-4 flex items-center justify-between text-[16px] text-[#8c887f]"
        >
          <div className="flex items-center gap-6">
            <a href="#" onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut} className="text-[#26241f]">
              Privacy Policy
            </a>
            <a href="#" onMouseEnter={linkHoverIn} onMouseLeave={linkHoverOut} className="text-[#26241f]">
              Terms of Service
            </a>
          </div>
          <span className="text-[14px]">&copy; {new Date().getFullYear()} Mujahid Karokhel</span>
        </div>
      </div>
    </footer>
  );
}