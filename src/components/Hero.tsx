import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Star, Coffee, UtensilsCrossed } from "lucide-react";
import heroImage from "@/assets/hero-image.jpeg";


const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      // Only apply parallax when hero is in view (first 100vh)
      const heroHeight = window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollY(Math.min(currentScroll, heroHeight));
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Parallax transform based on scroll (subtle effect)
  const parallaxTransform = `translateY(${scrollY * 0.3}px)`;
  const contentTransform = `translateY(${scrollY * 0.15}px)`;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-hero-zoom transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `url(${heroImage})`,
          transform: parallaxTransform,
          willChange: "transform",
        }}
      >
        {/* Enhanced Multi-layered overlay with animated gradients - slightly lighter for brighter image */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/25 to-primary/55 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(18, 46, 32, 0.2) 0%, rgba(18, 46, 32, 0.45) 50%, rgba(18, 46, 32, 0.55) 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-gradient-shift" />
      </div>


      {/* Decorative frame elements */}
      <div className="absolute inset-8 border border-primary-foreground/20 pointer-events-none animate-fade-in" />
      <div className="absolute top-12 left-12 w-24 h-24 border-t-2 border-l-2 border-primary-foreground/40 animate-fade-in stagger-2" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-b-2 border-r-2 border-primary-foreground/40 animate-fade-in stagger-2" />

      {/* Main content - Asymmetric editorial layout with Parallax */}
      <div 
        className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full transition-transform duration-300 ease-out"
        style={{ transform: contentTransform }}
      >
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

          {/* Right side - CTA */}
          <div className="text-left md:text-right space-y-8 animate-fade-in stagger-5">
            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
              <Button
                asChild
                size="lg"
                className="group relative bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-sans tracking-wider border-2 border-primary-foreground transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <a href="#about" className="relative z-10">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-foreground/0 via-primary-foreground/20 to-primary-foreground/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  MEHR ERFAHREN
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group relative border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary font-sans tracking-wider transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <a
                  href="https://www.opentable.de/restref/client/?rid=445905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10"
                >
                  <span className="absolute inset-0 bg-primary-foreground translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                  <span className="relative z-10">TISCH RESERVIEREN</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in stagger-6 z-20">
        <p className="font-sans text-xs tracking-[0.3em] text-primary-foreground/70 uppercase mb-2">
          Scroll
        </p>
        <div className="relative">
          <div className="absolute inset-0 bg-primary-foreground/20 rounded-full blur-md animate-pulse" />
          <ChevronDown className="relative w-6 h-6 text-primary-foreground/70 animate-bounce" />
        </div>
        <div className="w-px h-12 bg-gradient-to-b from-primary-foreground/50 to-transparent mt-2" />
      </div>
    </section>
  );
};

export default Hero;
