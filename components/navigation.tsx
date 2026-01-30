"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { useUISounds } from "./sound-provider";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMuted, toggleMute, playClick } = useUISounds();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleMute = () => {
    toggleMute();
    // Play click after unmuting to give feedback
    if (isMuted) {
      setTimeout(() => playClick(), 50);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : ""
      )}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#"
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              playClick();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {"<VictorMartins />"}
          </a>
          <div className="flex items-center gap-4">
            <button
              onClick={handleToggleMute}
              className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10 cursor-pointer"
              aria-label={isMuted ? "Enable sounds" : "Mute sounds"}
              title={isMuted ? "Enable sounds" : "Mute sounds"}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
