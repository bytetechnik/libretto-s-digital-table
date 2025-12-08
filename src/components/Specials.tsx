import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/translations";
import wochenkarteImage from "@/assets/wochenkarte.jpeg";

const Specials = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { language } = useLanguage();

  return (
    <section ref={ref} id="specials" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className={`text-center mb-16 animate-fade-up ${isVisible ? 'visible' : ''}`}>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-foreground mb-6">
            {t(language, "specials.title")}
          </h2>
          <div className="w-24 h-0.5 bg-primary mx-auto mb-8" />
        </div>

        <div className={`animate-fade-up ${isVisible ? 'visible stagger-2' : ''}`}>
          <Card className="overflow-hidden shadow-2xl border-2 border-border hover:shadow-3xl transition-shadow duration-300">
            <div className="relative">
              <img 
                src={wochenkarteImage} 
                alt="Wochenkarte" 
                className="w-full h-auto object-cover"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Specials;
