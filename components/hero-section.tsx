"use client";

import { Button } from "@/components/ui/button";
import { useProjects } from "@/contexts/projects-context";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function HeroSection() {
  const t = useTranslations('hero');
  const { expandProjects } = useProjects();

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 space-y-6">
            <p className="text-primary font-mono text-sm tracking-wider animate-fade-in">
              {t('greeting')}
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground animate-fade-in animation-delay-100">
              <span className="text-balance">{t('name')}</span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-muted-foreground animate-fade-in animation-delay-200">
              <span className="text-balance">{t('tagline')}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed animate-fade-in animation-delay-300">
              {t('description')}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4 animate-fade-in animation-delay-400">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={expandProjects}
              >
                {t('cta')}
              </Button>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/EmperorOfCoding"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={t('socialGithub')}
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/victor-martins-9095092b5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={t('socialLinkedin')}
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="mailto:victorameno@hotmail.com"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={t('socialEmail')}
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative animate-fade-in animation-delay-200">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-2xl" />
              
              {/* Orbital ring */}
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_20s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(100,200,255,0.8)]" />
              </div>
              
              {/* Image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/30 shadow-[0_0_40px_rgba(100,200,255,0.3)]">
                <Image
                  src="/images/victor-profile.png"
                  alt="Victor Martins - Software Engineer"
                  fill
                  className="object-cover object-[50%_15%]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
