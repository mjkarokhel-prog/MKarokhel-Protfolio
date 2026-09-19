import { useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis"; // npm i gsap lenis

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: Props) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // KEY FIX: whenever ScrollTrigger recalculates (e.g. a pinned section
    // adds scroll room via its spacer), tell Lenis to re-measure the page
    // too. Without this, Lenis caps scrolling at the height it saw on
    // first load — before any pins existed — so pinned/scrubbed sections
    // stop short partway through instead of reaching 100%.
    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return <>{children}</>;
}