'use client';

import { Github, Linkedin, Twitter } from "lucide-react";
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
              <a
                href="https://github.com/EmperorOfCoding"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={t('socialGithub')}
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/victor-martins-9095092b5/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={t('socialLinkedin')}
              >
                <Linkedin className="w-5 h-5" />
              </a>
          </div>
          <p className="text-sm text-muted-foreground font-mono">
            {t('tagline')}
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Victor Martins. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
