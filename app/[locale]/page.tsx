import { AboutSectionVisual } from "@/components/about-section-visual";
import { BentoGridWrapper } from "@/components/bento-grid-wrapper";
import { Comets } from "@/components/comets";
import { ContactSectionCompact } from "@/components/contact-section-compact";
import { ExpandedProjectsModal } from "@/components/expanded-projects-modal";
import { FloatingPlanet } from "@/components/floating-planet";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { JourneyTimeline } from "@/components/journey-timeline";
import { Meteors } from "@/components/meteors";
import { Navigation } from "@/components/navigation";
import { ProjectsSectionVisual } from "@/components/projects-section-visual";
import { Starfield } from "@/components/starfield";
import { TechStackCard } from "@/components/tech-stack-card";
import { BentoCard } from "@/components/ui/bento-card";

export default async function Home() {
  return (
    <BentoGridWrapper>
      <Starfield />
      <Comets />
      <Meteors />
      <FloatingPlanet />
      <Navigation />
      
      <main className="min-h-screen flex flex-col">
        {/* SECTION 1: Hero */}
        <HeroSection />

        {/* SECTION 2: Visual Grid (Glass Magazine Style) */}
        <section className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            
            {/* Projects - Crown Jewel: Full width or 2x2 */}
            <div id="projects" className="lg:col-span-2 lg:row-span-2">
              <BentoCard className="h-full">
                <ProjectsSectionVisual />
              </BentoCard>
            </div>

            {/* About Me - Visual/Concise */}
            <div id="about" className="lg:col-span-1 lg:row-span-2">
              <BentoCard className="h-full">
                <AboutSectionVisual />
              </BentoCard>
            </div>

            {/* Tech Stack - Dynamic Icons */}
            <div id="tech" className="lg:col-span-1">
              <BentoCard className="h-full">
                <TechStackCard />
              </BentoCard>
            </div>

            {/* Contact - Compact Widget */}
            <div id="contact" className="lg:col-span-1">
              <BentoCard className="h-full">
                <ContactSectionCompact />
              </BentoCard>
            </div>
          </div>
        </section>

        {/* SECTION 3: The Chronology (Timeline) */}
        <JourneyTimeline />
        
        {/* Expanded Modals */}
        <ExpandedProjectsModal />
      </main>

      <Footer />
    </BentoGridWrapper>
  );
}
