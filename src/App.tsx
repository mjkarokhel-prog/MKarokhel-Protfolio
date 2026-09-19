import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./Component/Navbar/Navbar";
import Header from "./Component/Header/Header";
import AboutMeStack from "./Component/About/Abouts";
import ClientsMarquee from "./Component/Companies/Companies";
import ProjectsShowcase from "./Component/Project/Project";
import StatsCounter from "./Component/Expirence/Expirence";
import ProcessSteps from "./Component/Process/Process";
import SmoothScrollProvider from "./Component/SmoothScroll/SmoothScrollProvider";
import SkillsSection from "./Component/Skills/Skills";
import ContactSection from "./Component/Contact/Contact";
import Footer from "./Component/Footer/Footer";
function App() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[#F3F2EF] pt-3">
        <Navbar />
        <div className="pt-20">
          <Header />
        </div>
        <AboutMeStack />
        <ClientsMarquee />
        <ProjectsShowcase />
        <StatsCounter />
        <ProcessSteps />
        <SkillsSection />
        <ContactSection />
        <Analytics />
        <SpeedInsights />
      </div>
      <Footer />
    </SmoothScrollProvider>
  );
}

export default App;
