import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import profileImg from '../../../public/Images/Mans.png'

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-4 z-50 mx-auto flex max-w-[1200px] items-center justify-between "
    >
      <div
        className="flex items-center justify-center gap-4 rounded-full mt-[1px]
                  bg-white/40 backdrop-blur-xl backdrop-saturate-150 border border-white/60
                  shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]"
      >
        <img
          src={profileImg}
          alt="Mujahid Karokhel"
          className="h-14 w-14 p-[0.4rem] rounded-full object-cover"
        />
        <div className="flex items-center gap-12 px-7 pr-10 text-md font-medium text-gray-800">
          <a href="#about" className="transition-colors hover:text-orange-500">About</a>
          <a href="#projects" className="transition-colors hover:text-orange-500">All Projects</a>
          <a href="#contact" className="transition-colors hover:text-orange-500">Contact</a>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <motion.a
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          href="#contact"
          className="rounded-full px-6 py-4 text-md font-medium text-gray-900
                     bg-white/40 backdrop-blur-xl backdrop-saturate-150
                     border border-white/60
                     shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]"
        >
          Book a 30 min call
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          href="wwww.mjkarokhel@gmail.com"
          aria-label="Email me"
          className="flex h-14 w-14 items-center justify-center rounded-full text-orange-500
                     bg-white/40 backdrop-blur-xl backdrop-saturate-150
                     border border-none
                     shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]
                     transition-colors hover:bg-orange-500 hover:border-orange-500 hover:text-white"
        >
          <Mail size={24} />
        </motion.a>
      </div>
    </motion.nav>
  )
}