"use client";

import { useUISounds } from "@/components/sound-provider";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/contexts/expandable-context";
import { ArrowDown, FileDown, Github, Linkedin, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const { expandProjects } = useProjects();
  const { playClick } = useUISounds();

  // Resume file based on locale
  const resumeFile = locale === 'en' 
    ? '/documents/Curriculo_Victor_Martins_EN.pdf'
    : '/documents/Curriculo_Victor_Martins_v4_pt_br.pdf';

  return (
    <section className="min-h-[100dvh] flex items-center justify-center pt-16 sm:pt-20 pb-8 sm:pb-12 px-4 sm:px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">

          {/* Text Content - Left Column */}
          <div className="order-2 lg:order-1 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left">
            {/* Greeting */}
            <p className="text-primary font-mono text-xs sm:text-sm md:text-base tracking-widest uppercase animate-fade-in">
              {t('greeting')}
            </p>

            {/* Name - Responsive typography */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground animate-fade-in animation-delay-100 leading-[1.1]">
              <span className="text-balance bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
                {t('name')}
              </span>
            </h1>

            {/* Tagline */}
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-muted-foreground animate-fade-in animation-delay-200">
              <span className="text-balance">{t('tagline')}</span>
            </h2>

            {/* Description */}
            <p className="text-muted-foreground max-w-xl text-sm sm:text-base md:text-lg leading-relaxed animate-fade-in animation-delay-300 mx-auto lg:mx-0">
              {t('description')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4 animate-fade-in animation-delay-400">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all cursor-pointer"
                onClick={expandProjects}
              >
                {t('cta')}
              </Button>

              {/* Resume Download Button */}
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold transition-all"
                asChild
              >
                <a href={resumeFile} download>
                  <FileDown className="w-4 h-4 mr-2" />
                  {t('downloadResume')}
                </a>
              </Button>

              {/* Social Links */}
              <div className="flex items-center gap-1 sm:gap-2">
                <a
                  href="https://github.com/EmperorOfCoding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-300"
                  aria-label={t('socialGithub')}
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/victor-martins-9095092b5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-300"
                  aria-label={t('socialLinkedin')}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:victorameno@hotmail.com"
                  className="p-2.5 sm:p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-300"
                  aria-label={t('socialEmail')}
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Image Content - Right Column */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in animation-delay-200">
            <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg">

              {/* Background Decorative Elements - Hidden on very small screens */}
              {/* Blob 1 - Primary color */}
              <div className="hidden sm:block absolute -top-6 -right-6 sm:-top-10 sm:-right-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary/20 sm:bg-primary/30 rounded-full blur-3xl animate-blob" />

              {/* Blob 2 - Accent color */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 w-40 sm:w-64 h-40 sm:h-64 bg-accent/15 sm:bg-accent/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />

              {/* Blob 3 - Mixed (only on larger screens) */}
              <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />

              {/* Mobile simplified glow */}
              <div className="sm:hidden absolute inset-0 bg-primary/10 rounded-3xl blur-2xl" />

              {/* Glassmorphism Card Behind Image */}
              <div className="absolute inset-2 sm:inset-4 md:inset-6 bg-card/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-primary/10" />

              {/* Decorative Grid Pattern - Hidden on mobile */}
              <div className="hidden sm:block absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: 'radial-gradient(circle, var(--primary) 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }} />
              </div>

              {/* Main Image Container */}
              <div className="relative z-10 animate-float-slow">
                <div className="relative aspect-[3/4] w-full max-h-[45vh] sm:max-h-[50vh] lg:max-h-[65vh] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border-2 border-primary/20 shadow-2xl shadow-primary/20">
                  {/* Gradient Overlay on Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none" />

                  {/* Inner Glow Border */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 z-20 pointer-events-none" />

                  <Image
                    src="/images/profile-hero.jpg"
                    alt="Victor Martins - Software Engineer"
                    fill
                    className="object-cover object-[50%_15%]"
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 384px, (max-width: 1024px) 448px, 512px"
                  />
                </div>

                {/* Floating Badge - Status */}
                <div className="absolute bottom-2 right-2 sm:-bottom-3 sm:-right-3 md:bottom-4 md:right-4 z-20">
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-card/80 backdrop-blur-md rounded-full border border-primary/30 shadow-lg">
                    <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] sm:text-xs font-medium text-foreground whitespace-nowrap">{t('availableForWork')}</span>
                  </div>
                </div>

                {/* Floating Tech Badge - Top Left (hidden on mobile) */}
                <div className="absolute top-2 left-2 sm:-top-2 sm:-left-2 md:top-4 md:left-4 z-20 hidden sm:block">
                  <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-primary/10 backdrop-blur-md rounded-full border border-primary/30">
                    <span className="text-[10px] sm:text-xs font-mono text-primary">{t('developerBadge')}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile and tablet */}
        <div className="hidden lg:flex justify-center mt-8 xl:mt-12 animate-fade-in animation-delay-400">
          <button
            onClick={() => {
              playClick();
              document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group cursor-pointer"
            aria-label={t('scroll')}
          >
            <span className="text-xs font-mono tracking-wider uppercase">{t('scroll')}</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
