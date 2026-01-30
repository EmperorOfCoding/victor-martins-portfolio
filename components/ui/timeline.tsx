'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface TimelineItem {
  date: string;
  title: string;
  subtitle?: string;
  description: string[] | ReactNode;
  icon?: ReactNode;
  technologies?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Vertical gradient line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />

      <div className="space-y-12 md:space-y-16">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              "relative flex flex-col md:flex-row gap-8",
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            )}
          >
            {/* Content Card */}
            <div className={cn(
              "flex-1 pl-12 md:pl-0",
              index % 2 === 0 ? "md:pr-12" : "md:pl-12"
            )}>
              <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md p-6 md:p-8 hover:bg-white/10 transition-all duration-300">
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-primary/10 to-accent/10" />
                
                <div className="relative z-10 space-y-4">
                  {/* Date Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
                    <span className="text-xs font-mono text-primary">{item.date}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-base md:text-lg text-primary font-medium">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="text-sm md:text-base text-muted-foreground leading-relaxed space-y-2">
                    {Array.isArray(item.description) ? (
                      <ul className="space-y-2">
                        {item.description.map((desc, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-primary mt-1 flex-shrink-0">▹</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      item.description
                    )}
                  </div>

                  {/* Technologies */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary rounded-full border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Timeline Node */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 flex items-center justify-center">
              <div className="relative z-10 w-8 h-8 rounded-full bg-primary/20 backdrop-blur-md border-2 border-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {item.icon ? (
                  <div className="text-primary">{item.icon}</div>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 w-8 h-8 rounded-full bg-primary/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Spacer for alignment */}
            <div className="hidden md:block flex-1" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
