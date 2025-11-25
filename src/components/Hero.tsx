import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/40" />
      </div>

      <div className="relative z-10 text-center text-primary-foreground px-4 max-w-4xl mx-auto">
        <p className="font-sans text-sm tracking-[0.3em] mb-4 opacity-90 animate-fade-in">
          EST 2007
        </p>
        <h1 className="font-serif text-6xl md:text-8xl font-light mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Libretto
        </h1>
        <p className="font-serif text-2xl md:text-3xl italic mb-8 opacity-90 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          Cafe Restaurant Tagesbar
        </p>
        <p className="font-sans text-sm md:text-base tracking-wide max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: "0.6s" }}>
          Im Libretto beginnt der Tag mit Genuss — und das schon seit 2007.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <Button
            asChild
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-secondary font-sans tracking-wide"
          >
            <a href="#about">MEHR ERFAHREN</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-sans tracking-wide"
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
    </section>
  );
};

export default Hero;
