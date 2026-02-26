import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Star, Coffee, UtensilsCrossed } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/translations";
import heroImage from "@/assets/hero-image.png";
import logoGreen from "@/assets/logo-green.png";


const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      // Only apply parallax when hero is in view (first 100vh)
      const heroHeight = window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollY(Math.min(currentScroll, heroHeight));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Parallax transform based on scroll (subtle effect)
  const parallaxTransform = `translateY(${scrollY * 0.3}px)`;
  const contentTransform = `translateY(${scrollY * 0.15}px)`;

  return (
    <section className="relative min-h-[100dvh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />
      {/* Greenish overlay - brand vibe over image */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-primary/35 to-primary/60 pointer-events-none" aria-hidden />

      {/* Classic frame: thin border with L-shapes inside */}
      <div className="absolute inset-4 sm:inset-6 md:inset-10 pointer-events-none z-10 border border-white/35" aria-hidden />
      <div className="absolute top-7 left-7 sm:top-9 sm:left-9 md:top-14 md:left-14 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 pointer-events-none z-10 border-t border-l border-white/40" aria-hidden />
      <div className="absolute bottom-7 right-7 sm:bottom-9 sm:right-9 md:bottom-14 md:right-14 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 pointer-events-none z-10 border-b border-r border-white/40" aria-hidden />

      {/* Main content - centered on mobile/tablet, editorial on desktop */}
      <div 
        className="relative z-10 px-4 sm:px-6 md:px-12 py-8 max-w-7xl mx-auto w-full flex flex-col items-center md:items-stretch justify-center transition-transform duration-300 ease-out"
        style={{ transform: contentTransform }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center w-full max-w-2xl md:max-w-none lg:max-w-none">
          {/* Logo - visible on all screen sizes, positioned further left on desktop */}
          <div className="flex justify-center md:justify-start order-1 md:-ml-10 lg:-ml-16">
            <div className="animate-fade-in stagger-2">
              <img 
                src={logoGreen} 
                alt="Libretto Logo" 
                className="max-w-full h-auto max-h-24 sm:max-h-28 md:max-h-32 lg:max-h-36 w-auto animate-fade-in"
              />
            </div>
          </div>

          {/* Description and CTA - visible on all breakpoints */}
          <div className="text-center md:text-right space-y-5 md:space-y-8 animate-fade-in stagger-5 order-2 flex flex-col items-center md:items-end w-full">
            <p className="font-sans text-sm sm:text-base md:text-lg text-white/95 leading-relaxed max-w-md">
              {t(language, "hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto md:justify-end max-w-sm sm:max-w-none">
              <Button
                asChild
                size="lg"
                className="group relative bg-primary-foreground/95 text-primary hover:bg-primary-foreground font-sans tracking-wider border border-primary-foreground/80 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <a href="#about" className="relative z-10">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  {t(language, "hero.cta")}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group relative border border-white/70 bg-transparent text-white/95 hover:bg-primary-foreground hover:text-primary font-sans tracking-wider transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <a
                  href="https://www.opentable.de/restref/client/?rid=445905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10"
                >
                  <span className="absolute inset-0 bg-primary-foreground translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                  <span className="relative z-10">{t(language, "nav.reserve")}</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - arrow a little up, thin motion line below */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 pointer-events-none">
        <ChevronDown className="w-5 h-5 text-white/70 animate-bounce shrink-0" aria-hidden />
        <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent animate-pulse" aria-hidden />
      </div>
    </section>
  );
};

export default Hero;
