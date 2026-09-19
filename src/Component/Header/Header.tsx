import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, GraduationCap } from 'lucide-react'
import profileImg from '../../../public/Images/Mans.png'

const thumbnails = ['Landing Page', 'Add project', 'Add project', 'Add project']
// Duplicated for a seamless right-to-left loop
const marqueeItems = [...thumbnails, ...thumbnails]

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-name', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
      })
        .from(
          '.hero-photo',
          { scale: 0.6, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' },
          '-=0.6',
        )
        .from('.hero-badge', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
        .from('.hero-text', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
        .from(
          '.hero-cta',
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
          '-=0.3',
        )
        .from(
          '.hero-thumb',
          { y: 40, opacity: 0, duration: 0.6, stagger: 0.1 },
          '-=0.2',
        )
    }, headerRef)

    return () => ctx.revert()
  }, [])

  return (
    <header ref={headerRef} className="bg-[#F3F2EF] px-8 pb-20 pt-14">
      <div className="flex flex-col gap-6 mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 items-center gap-60 md:grid-cols-2">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-6xl font-bold leading-[1.05] text-gray-900 lg:text-7xl">
              Mujahid
            </h1>
            <img
              src={profileImg}
              alt="Mujahid Karokhel"
              className="hero-photo h-16 w-16 rounded-2xl border-4 border-white object-cover shadow-md sm:h-20 sm:w-20"
            />
            <div className="flex items-end gap-4">
              <h1 className="hero-name -mt-2 text-6xl font-bold leading-[0.9] text-gray-900 lg:text-[5.7rem]">
                Karokhel
              </h1>
            </div>
          </div>

          <div>
            <div className="hero-badge mb-3 inline-flex items-center justify-start gap-2 rounded-full bg-white px-4 py-2 text-sm text-gray-700 shadow-sm">
              <GraduationCap size={16} className="text-orange-500" />
              <span className="font-medium">Upskill Bootcamp Graduate</span>
            </div>

            <p className="hero-text mb-2 max-w-[49ch] text-lg text-gray-600">
              Frontend developer who just finished training and is ready to build
              real projects with HTML,
              CSS, JavaScript, and React.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="hero-cta flex items-center gap-5 rounded-full bg-[#FF5A2A] px-7 py-4 text-md font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Start a Project
                <ArrowRight size={22} />
              </a>
              <a
                href="#projects"
                className="flex items-center hero-cta rounded-[38px] bg-white px-8 text-md font-semibold text-gray-900 transition-transform hover:-translate-y-0.5"
              >
                See Projects
              </a>
            </div>
          </div>
        </div>

        {/* Flowing project preview marquee */}
        <div className="group relative mt-16 overflow-hidden">
          <div className="flex w-max animate-[marquee_16s_linear_infinite] gap-5 group-hover:[animation-play-state:paused]">
            {marqueeItems.map((label, i) => (
              <div
                key={`${label}-${i}`}
                className={`hero-thumb flex aspect-square w-[17rem] h-[22rem] shrink-0 items-center justify-center rounded-2xl text-xs ${
                  label === 'Landing Page'
                    ? 'bg-gray-300 text-gray-600'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}