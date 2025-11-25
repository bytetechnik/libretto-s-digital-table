import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Specials = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} id="specials" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className={`text-center mb-16 animate-fade-up ${isVisible ? 'visible' : ''}`}>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-foreground mb-6">
            Tages-Specials
          </h2>
          <div className="w-24 h-0.5 bg-primary mx-auto mb-8" />
        </div>

        <div className={`animate-fade-up ${isVisible ? 'visible stagger-2' : ''}`}>
          <Card className="p-8 md:p-12 bg-primary text-primary-foreground">
            <div className="text-center space-y-4">
              <p className="font-sans text-sm tracking-[0.2em] opacity-90">HEUTE</p>
              <h3 className="font-serif text-3xl md:text-4xl mb-6">
                Hausgemachte Tagessuppe
              </h3>
              <p className="font-sans leading-relaxed max-w-2xl mx-auto">
                Fragen Sie unser Team nach den aktuellen Specials und saisonalen Empfehlungen.
                Wir bereiten täglich frische Gerichte mit den besten regionalen und italienischen
                Zutaten zu.
              </p>
            </div>
          </Card>
        </div>

        <p className={`text-center text-muted-foreground font-sans text-sm mt-8 italic animate-fade-up ${isVisible ? 'visible stagger-3' : ''}`}>
          * Die Specials wechseln täglich und werden vom Küchenchef persönlich ausgewählt
        </p>
      </div>
    </section>
  );
};

export default Specials;
