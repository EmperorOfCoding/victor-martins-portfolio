'use client';

import { useTranslations } from 'next-intl';
import { Timeline, TimelineItem } from './ui/timeline';
import { Briefcase, GraduationCap } from 'lucide-react';

const experienceData = [
  {
    company: "AOOP (NTT DATA Company)",
    role: "Consultor Técnico Junior",
    period: "07/2025 — Atual",
    description: [
      "Automação de pedidos de EPI e implementação de fluxo NRS com integração OneTrust para Azul Linhas Aéreas.",
      "Criação de base de Squads e área de faturamento, com reconhecimento direto do cliente.",
    ],
    technologies: ["JavaScript", "Flow Designer", "REST API", "Azure DevOps"],
  },
  {
    company: "AOOP (NTT DATA Company)",
    role: "Consultor Técnico Trainee",
    period: "09/2024 — 06/2025",
    description: [
      "Desenvolvimento com JavaScript e Flow Designer, integrações REST utilizando Postman.",
      "Atuação direta com o cliente e uso de Azure DevOps para gestão de tarefas.",
    ],
    technologies: ["JavaScript", "REST API", "Postman", "Azure DevOps"],
  },
  {
    company: "Projetos Acadêmicos",
    role: "Desenvolvedor Full Stack",
    period: "2023 — 2024",
    description: [
      "Desenvolvimento de projetos acadêmicos e pessoais para consolidar conhecimentos em Full Stack.",
      "Foco em aprendizado contínuo e aplicação prática de conceitos de engenharia de software.",
    ],
    technologies: ["Node.js", "React", "Java", "Python", "MySQL"],
  },
];

const educationData = [
  {
    institution: "FIAP",
    degree: "Engenharia de Software",
    period: "2024 — 2027 (Previsão)",
    description: "4º semestre em andamento. Foco em práticas modernas de desenvolvimento, arquitetura e inovação.",
  },
  {
    institution: "UFBA",
    degree: "Iniciação em Programação (C++)",
    period: "2023",
    description: "Base sólida em programação C++, algoritmos e lógica de programação.",
  },
];

export function JourneyTimeline() {
  const t = useTranslations('journey');
  const expT = useTranslations('experience');
  const eduT = useTranslations('education');

  // Combine experience and education into timeline items
  const timelineItems: TimelineItem[] = [
    // Experience items
    ...experienceData.map((exp, index) => ({
      date: expT(`company${index + 1}.period`),
      title: expT(`company${index + 1}.role`),
      subtitle: `@ ${exp.company}`,
      description: [
        expT(`company${index + 1}.desc1`),
        expT(`company${index + 1}.desc2`),
      ],
      technologies: exp.technologies,
      icon: <Briefcase className="w-4 h-4" />,
    })),
    // Education items
    ...educationData.map((edu, index) => ({
      date: eduT(`institution${index + 1}.period`),
      title: eduT(`institution${index + 1}.name`),
      subtitle: eduT(`institution${index + 1}.degree`),
      description: eduT(`institution${index + 1}.description`),
      icon: <GraduationCap className="w-4 h-4" />,
    })),
  ];

  return (
    <section className="w-full py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        {/* Timeline */}
        <Timeline items={timelineItems} className="max-w-6xl mx-auto" />
      </div>
    </section>
  );
}
