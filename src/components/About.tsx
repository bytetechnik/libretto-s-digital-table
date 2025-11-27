import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/translations";

const About = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { language } = useLanguage();

  return (
    <section ref={ref} id="about" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className={`text-center mb-16 animate-fade-up ${isVisible ? 'visible' : ''}`}>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-foreground mb-6">
            {t(language, "about.title")}
          </h2>
          <div className="w-24 h-0.5 bg-primary mx-auto mb-8" />
        </div>

        <div className="space-y-8 text-foreground/90 font-sans leading-relaxed">
          <p className={`text-center text-lg animate-fade-up ${isVisible ? 'visible stagger-1' : ''}`}>
            {t(language, "about.p1")}
          </p>

          <p className={`animate-fade-up ${isVisible ? 'visible stagger-2' : ''}`}>
            {t(language, "about.p2")}
          </p>

          <p className={`animate-fade-up ${isVisible ? 'visible stagger-3' : ''}`}>
            {t(language, "about.p3")}
          </p>

          <p className={`animate-fade-up ${isVisible ? 'visible stagger-4' : ''}`}>
            {t(language, "about.p4")}
          </p>

          <p className={`animate-fade-up ${isVisible ? 'visible stagger-5' : ''}`}>
            {t(language, "about.p5")}
          </p>

          <p className={`text-center text-xl font-medium italic mt-12 animate-fade-up ${isVisible ? 'visible stagger-6' : ''}`}>
            {t(language, "about.p6")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
