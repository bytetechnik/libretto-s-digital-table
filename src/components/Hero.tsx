import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-hero-zoom"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Multi-layered overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/45 to-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
      </div>

      {/* Decorative frame elements */}
      <div className="absolute inset-8 border border-primary-foreground/20 pointer-events-none animate-fade-in" />
      <div className="absolute top-12 left-12 w-24 h-24 border-t-2 border-l-2 border-primary-foreground/40 animate-fade-in stagger-2" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-b-2 border-r-2 border-primary-foreground/40 animate-fade-in stagger-2" />

      {/* Main content - Asymmetric editorial layout */}
      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Main typography */}
          <div className="text-left space-y-6">
            {/* Decorative element */}
            <div className="flex items-center gap-4 animate-fade-in">
              <div className="h-px w-16 bg-primary-foreground/60" />
              <p className="font-sans text-xs tracking-[0.4em] text-primary-foreground/90 uppercase">
                Established 2007
              </p>
            </div>

            {/* Main heading */}
            <div className="animate-fade-in stagger-2">
              <h1 className="font-serif text-7xl md:text-9xl font-light text-primary-foreground leading-none mb-4">
                Libretto
              </h1>
              <div className="h-1 w-32 bg-primary-foreground/60 animate-fade-in stagger-3" />
            </div>

            <p className="font-serif text-2xl md:text-4xl italic text-primary-foreground/95 animate-fade-in stagger-4">
              Cafe · Restaurant · Tagesbar
            </p>
          </div>

          {/* Right side - Description and CTA */}
          <div className="text-left md:text-right space-y-8 animate-fade-in stagger-5">
            <p className="font-sans text-base md:text-lg text-primary-foreground/90 leading-relaxed max-w-md md:ml-auto">
              Im Libretto beginnt der Tag mit Genuss — und das schon seit 2007. 
              Erleben Sie authentische Küche in gemütlicher Atmosphäre.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
              <Button
                asChild
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-sans tracking-wider border-2 border-primary-foreground transition-all duration-300 hover:scale-105"
              >
                <a href="#about">MEHR ERFAHREN</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary font-sans tracking-wider transition-all duration-300 hover:scale-105"
              >
                <a
                  href="https://www.opentable.de/restref/client/?rid=445905"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TISCH RESERVIEREN
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in stagger-6">
        <p className="font-sans text-xs tracking-[0.3em] text-primary-foreground/70 uppercase">Scroll</p>
        <ChevronDown className="w-6 h-6 text-primary-foreground/70 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
