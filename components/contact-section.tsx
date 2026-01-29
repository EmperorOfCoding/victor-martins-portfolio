'use client';

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from 'next-intl';

export function ContactSection() {
  const t = useTranslations('contact');
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex-1">
        <p className="text-primary font-mono text-xs mb-2">04. {t('subtitle')}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t('title')}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t('description')}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/EmperorOfCoding"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 text-muted-foreground hover:text-primary transition-colors border border-primary/30 rounded-sm hover:border-primary/50"
          aria-label="GitHub Profile"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/victor-martins-9095092b5/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 text-muted-foreground hover:text-primary transition-colors border border-primary/30 rounded-sm hover:border-primary/50"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <Button
          size="lg"
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          asChild
        >
          <a href="mailto:victorameno@hotmail.com">
            <Mail className="w-4 h-4 mr-2" />
            {t('button')}
          </a>
        </Button>
      </div>
    </div>
  );
}
