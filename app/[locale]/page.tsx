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
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('hero');

  return (
    <BentoGridWrapper>
      <Starfield />
      <Comets />
      <Meteors />
      <Navigation />
      <main className="min-h-screen flex flex-col">
        <HeroSection />

        {/* Bento Grid Layout */}
        <div className="container mx-auto px-6 py-12 pb-20">
          <div className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
            {/* Hero Card - Large (2x2 on desktop) */}
            <div className="bento-card lg:col-span-2 lg:row-span-2 p-8 md:p-12">
              <div className="space-y-6">
                <p className="text-primary font-mono text-sm tracking-wider">{t('greeting')}</p>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                  <span className="text-balance">{t('name')}</span>
                </h1>
                <h2 className="text-2xl md:text-4xl font-bold text-muted-foreground">
                  <span className="text-balance">{t('tagline')}</span>
                </h2>
                <p className="text-muted-foreground max-w-xl text-base md:text-lg leading-relaxed">
                  {t('description')}
                </p>
              </div>
            </div>

            {/* About Card - Vertical (1x2 on desktop) */}
            <div id="about" className="bento-card lg:row-span-2 p-6 md:p-8 overflow-y-auto max-h-[600px] scroll-mt-24">
              <AboutSection />
            </div>

            {/* Projects Card - Horizontal (2x1 on desktop) */}
            <div id="projects" className="bento-card lg:col-span-2 p-6 md:p-8 scroll-mt-24">
              <ProjectsSection />
            </div>

            {/* Experience Card - Small (1x1 on desktop) */}
            <div id="experience" className="bento-card p-6 md:p-8 scroll-mt-24">
              <ExperienceSection />
            </div>

            {/* Contact Card - Full Width (3x1) */}
            <div id="contact" className="bento-card lg:col-span-3 p-6 md:p-8 scroll-mt-24">
              <ContactSection />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </BentoGridWrapper>
  );
}
