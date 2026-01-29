import { AboutSection } from "@/components/about-section";
import { BentoGridWrapper } from "@/components/bento-grid-wrapper";
import { Comets } from "@/components/comets";
import { ContactSection } from "@/components/contact-section";
import { ExperienceSection } from "@/components/experience-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Meteors } from "@/components/meteors";
import { Navigation } from "@/components/navigation";
import { ProjectsSection } from "@/components/projects-section";
import { Starfield } from "@/components/starfield";

export default async function Home() {
  return (
    <BentoGridWrapper>
      <Starfield />
      <Comets />
      <Meteors />
      <Navigation />
      <main className="min-h-screen flex flex-col">
        <HeroSection />

        {/* Bento Grid Layout */}
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-16 sm:pb-20">
          <div className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-auto">

            {/* About Card - Full width on mobile, spans 2 rows on desktop */}
            <div id="about" className="bento-card md:col-span-2 lg:col-span-1 lg:row-span-2 p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[500px] sm:max-h-[600px] scroll-mt-20 sm:scroll-mt-24">
              <AboutSection />
            </div>

            {/* Projects Card - Full width on mobile, horizontal on desktop */}
            <div id="projects" className="bento-card lg:col-span-2 p-4 sm:p-6 md:p-8 scroll-mt-20 sm:scroll-mt-24">
              <ProjectsSection />
            </div>

            {/* Experience Card */}
            <div id="experience" className="bento-card lg:col-span-2 p-4 sm:p-6 md:p-8 scroll-mt-20 sm:scroll-mt-24">
              <ExperienceSection />
            </div>

            {/* Contact Card - Full Width */}
            <div id="contact" className="bento-card md:col-span-2 lg:col-span-3 p-4 sm:p-6 md:p-8 scroll-mt-20 sm:scroll-mt-24">
              <ContactSection />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </BentoGridWrapper>
  );
}
