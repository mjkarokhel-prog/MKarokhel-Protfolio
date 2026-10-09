import { useEffect, useRef, useState } from "react";
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
    github: "#",
    live: "#",
  },

  {
    name: "PayNest",
    year: "2024",
    gradient: "linear-gradient(180deg,#f3f3f0 0%,#f4b28a 55%,#e8541f 100%)",
    bg: "#e7e6e2",
    github: "#",
    live: "#",
  },

  {
    name: "Shopper",
    year: "2026",
    gradient: "linear-gradient(160deg,#dcecff 0%,#5d91f5 45%,#1551b8 100%)",
    bg: "#d8d7d3",

    github: "https://github.com/mjkarokhel-prog/Shopper-eCommerce-Project",

    live: "https://shopper-e-commerce-project-khaki.vercel.app/",
  },

  {
    name: "Khost Super Market",
    year: "2026",
    gradient: "linear-gradient(160deg,#dcecff 0%,#5d91f5 45%,#1551b8 100%)",
    bg: "#c9c7c1",
    github: "https://github.com/mjkarokhel-prog/Khost-Super-Market.git",
    live: "https://khost-super-market.vercel.app/",
  },
];

type Project = (typeof PROJECTS)[number];

export default function ProjectsShowcase() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const pillRef = useRef<HTMLSpanElement | null>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  /*
   * ----------------------------------------
   * TITLE ANIMATION
   * ----------------------------------------
   */

  useEffect(() => {
    if (!titleRef.current || !pillRef.current) return;

    let split: SplitText | undefined;

    const ctx = gsap.context(() => {
      gsap.set(pillRef.current, {
        opacity: 0,
        y: -8,
      });

      split = new SplitText(titleRef.current!, {
        type: "chars",
      });

      gsap.set(split.chars, {
        opacity: 0,
        y: 8,
      });

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
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.016,
        },
        "-=0.2",
      );
    });

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  /*
   * ----------------------------------------
   * BODY SCROLL LOCK WHEN MODAL IS OPEN
   * ----------------------------------------
   */

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  /*
   * ----------------------------------------
   * ESCAPE KEY
   * ----------------------------------------
   */

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /*
   * ----------------------------------------
   * OPEN PROJECT
   * ----------------------------------------
   */

  const openProject = (project: Project) => {
    setSelectedProject(project);
  };

  /*
   * ----------------------------------------
   * CLOSE PROJECT
   * ----------------------------------------
   */

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <>
      {/* =====================================================
          PROJECTS SECTION
      ====================================================== */}

      <section className="max-w-[1250px] mx-auto px-6 pb-20 font-sans text-[#26241f]">
        {/* ================= HEADER ================= */}

        <div className="text-center mb-10">
          <span
            ref={pillRef}
            className="
              inline-block
              mb-6
              px-[27px]
              py-2
              rounded-full
              bg-white
              text-[15px]
              font-semibold
              shadow-[0_1px_2px_rgba(0,0,0,0.06)]
            "
          >
            Projects
          </span>

          <h2
            ref={titleRef}
            className="
              text-[63px]
              leading-[1.3]
              font-semibold
              tracking-[-0.02em]
            "
          >
            <span className="block">Designed, Built,</span>

            <span className="block">&amp; Shipped</span>
          </h2>
        </div>

        {/* =====================================================
            PROJECT GRID
        ====================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <button
              key={project.name}
              type="button"
              onClick={() => openProject(project)}
              className="
                group
                relative
                block
                w-full
                h-[560px]
                rounded-[20px]
                overflow-hidden
                text-left
                cursor-pointer
                outline-none
                focus-visible:ring-2
                focus-visible:ring-[#26241f]
                focus-visible:ring-offset-4
              "
              style={{
                backgroundColor: project.bg,
              }}
            >
              {/* ==========================================
                  DARK HOVER OVERLAY
              =========================================== */}

              <div
                className="
                  absolute
                  inset-0
                  z-10
                  bg-black/0
                  group-hover:bg-black/[0.07]
                  transition-all
                  duration-700
                  pointer-events-none
                "
              />

              {/* ==========================================
                  PROJECT VISUAL
              =========================================== */}

              {project.gradient && (
                <div
                  className="
                    absolute
                    inset-0
                    m-auto
                    w-[62%]
                    h-[85%]
                    rounded-[26px]

                    transition-all
                    duration-[800ms]
                    ease-[cubic-bezier(.22,1,.36,1)]

                    group-hover:w-[68%]
                    group-hover:h-[90%]
                    group-hover:-translate-y-4
                    group-hover:scale-[1.03]

                    group-hover:shadow-[0_35px_70px_-20px_rgba(0,0,0,0.45)]
                  "
                  style={{
                    background: project.gradient,
                  }}
                >
                  {/* Internal shine */}
                  <div
                    className="
                      absolute
                      inset-0
                      rounded-[26px]
                      bg-gradient-to-br
                      from-white/25
                      via-transparent
                      to-black/10
                      opacity-60
                      group-hover:opacity-100
                      transition-opacity
                      duration-700
                    "
                  />

                  {/* Shopper label */}
                  {project.name === "Shopper" && (
                    <div
                      className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        text-white
                        text-[34px]
                        font-bold
                        tracking-[-0.04em]
                        drop-shadow-[0_5px_15px_rgba(0,0,0,0.2)]
                        transition-transform
                        duration-700
                        group-hover:scale-110
                      "
                    >
                      Shopper
                    </div>
                  )}
                </div>
              )}

              {/* ==========================================
                  EDUNOVA SPECIAL VISUAL
              =========================================== */}

              {project.name === "EduNova" && (
                <div className="absolute inset-0 flex items-end justify-center pb-11">
                  <div
                    className="
                      w-[260px]
                      h-[465px]
                      bg-[#8f8d87]
                      rounded-[26px]
                      shadow-[0_20px_30px_-10px_rgba(0,0,0,0.3)]

                      flex
                      items-start
                      justify-center
                      pt-8

                      transition-all
                      duration-[800ms]
                      ease-[cubic-bezier(.22,1,.36,1)]

                      group-hover:scale-[1.06]
                      group-hover:-translate-y-5
                      group-hover:shadow-[0_40px_70px_-15px_rgba(0,0,0,0.45)]
                    "
                  >
                    <span
                      className="
                        text-white
                        text-[34px]
                        font-extrabold
                        tracking-tight
                        transition-transform
                        duration-700
                        group-hover:scale-110
                      "
                    >
                      ST10
                    </span>
                  </div>
                </div>
              )}

              {/* ==========================================
                  ARROW BUTTON
              =========================================== */}

              <div
                className="
                  absolute
                  top-5
                  right-5
                  z-30

                  w-14
                  h-14
                  rounded-full
                  bg-white

                  flex
                  items-center
                  justify-center

                  opacity-0
                  scale-50
                  rotate-[-45deg]

                  group-hover:opacity-100
                  group-hover:scale-100
                  group-hover:rotate-0

                  transition-all
                  duration-500

                  shadow-[0_8px_30px_rgba(0,0,0,0.15)]
                "
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="#26241f"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* ==========================================
                  PROJECT INFO
              =========================================== */}

              <div
                className="
                  absolute
                  left-4
                  bottom-4
                  z-30

                  flex
                  items-center
                  gap-3

                  px-6
                  py-3

                  rounded-full

                  bg-white

                  text-[13px]
                  font-medium
                  text-[#3a3833]

                  shadow-[0_2px_6px_rgba(0,0,0,0.08)]

                  transition-all
                  duration-500

                  group-hover:-translate-y-2
                  group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)]
                "
              >
                <span>{project.name}</span>

                <span className="text-[#c6c3bb]">/</span>

                <span className="text-[#8c887f]">{project.year}</span>
              </div>
            </button>
          ))}
        </div>

        {/* =====================================================
            DESCRIPTION
        ====================================================== */}

        <div className="text-center mt-14">
          <p
            className="
              text-[20px]
              leading-[1.6]
              text-[#31302e]
              mb-6
            "
          >
            Selected projects that reflect my approach to design,
            <br />
            development, and execution.
          </p>

          <button
            type="button"
            className="
              inline-flex
              items-center
              gap-2

              px-10
              py-5

              rounded-full

              bg-white

              text-[15px]
              font-semibold
              text-[#26241f]

              shadow-[0_1px_3px_rgba(0,0,0,0.08)]

              hover:-translate-y-1
              hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]

              transition-all
              duration-300
            "
          >
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

      {/* =====================================================
          PROJECT MODAL
      ====================================================== */}

      {selectedProject && (
        <div
          className="
            fixed
            inset-0
            z-[9999]

            flex
            items-center
            justify-center

            p-5

            bg-black/50
            backdrop-blur-md

            animate-[fadeIn_.3s_ease-out]
          "
          onClick={closeProject}
        >
          {/* ================================================
              MODAL
          ================================================= */}

          <div
            className="
              relative
              w-full
              max-w-[650px]

              rounded-[32px]

              bg-[#f5f4f0]

              p-6
              sm:p-8
              md:p-10

              shadow-[0_40px_100px_rgba(0,0,0,0.3)]

              animate-[modalIn_.5s_cubic-bezier(.22,1,.36,1)]
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* ============================================
                CLOSE BUTTON
            ============================================= */}

            <button
              type="button"
              aria-label="Close project"
              onClick={closeProject}
              className="
                absolute
                top-5
                right-5

                w-11
                h-11

                rounded-full

                bg-white

                flex
                items-center
                justify-center

                text-[#26241f]

                shadow-[0_2px_8px_rgba(0,0,0,0.08)]

                hover:scale-110
                hover:rotate-90

                transition-all
                duration-300
              "
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* ============================================
                PROJECT LABEL
            ============================================= */}

            <div className="pr-14">
              <span
                className="
                  inline-flex
                  px-4
                  py-2

                  rounded-full

                  bg-white

                  text-[12px]
                  font-semibold
                  text-[#77736c]
                "
              >
                Project / {selectedProject.year}
              </span>

              <h3
                className="
                  mt-5

                  text-[42px]
                  sm:text-[48px]

                  leading-none

                  font-semibold

                  tracking-[-0.045em]
                "
              >
                {selectedProject.name}
              </h3>

              <p
                className="
                  mt-4

                  text-[16px]
                  sm:text-[17px]

                  leading-[1.6]

                  text-[#6b6861]
                "
              >
                Explore the project live or inspect the source code behind the
                implementation.
              </p>
            </div>

            {/* ============================================
                PROJECT PREVIEW
            ============================================= */}

            <div
              className="
                relative

                h-[190px]
                sm:h-[220px]

                rounded-[24px]

                overflow-hidden

                mt-8
                mb-8

                shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]
              "
              style={{
                background:
                  selectedProject.gradient ||
                  "linear-gradient(135deg,#999,#777)",
              }}
            >
              {/* Shine */}
              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-br
                  from-white/30
                  via-transparent
                  to-black/10
                "
              />

              <div
                className="
                  absolute
                  inset-0

                  flex
                  items-center
                  justify-center
                "
              >
                <span
                  className="
                    text-white

                    text-[36px]
                    sm:text-[44px]

                    font-bold

                    tracking-[-0.04em]

                    drop-shadow-[0_8px_20px_rgba(0,0,0,0.2)]
                  "
                >
                  {selectedProject.name}
                </span>
              </div>
            </div>

            {/* ============================================
                ACTION BUTTONS
            ============================================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* GITHUB */}

              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group

                  flex
                  items-center
                  justify-center
                  gap-3

                  h-16

                  rounded-full

                  bg-[#26241f]

                  text-white

                  font-semibold

                  hover:-translate-y-1

                  hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)]

                  transition-all
                  duration-300
                "
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.69 10.67.56.1.77-.24.77-.54v-1.9c-3.13.68-3.79-1.32-3.79-1.32-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.71 2.62 1.22 3.26.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.74 10.74 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.04.76 2.1v3.1c0 .3.2.65.78.54a11.26 11.26 0 0 0 7.68-10.67C23.25 5.48 18.27.5 12 .5Z" />
                </svg>

                <span>View Code</span>
              </a>

              {/* LIVE WEBSITE */}

              <a
                href={selectedProject.live}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group

                  flex
                  items-center
                  justify-center
                  gap-3

                  h-16

                  rounded-full

                  bg-white

                  text-[#26241f]

                  font-semibold

                  border
                  border-black/5

                  hover:-translate-y-1

                  hover:shadow-[0_15px_35px_rgba(0,0,0,0.1)]

                  transition-all
                  duration-300
                "
              >
                <span>Live Website</span>

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="#e8542a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
