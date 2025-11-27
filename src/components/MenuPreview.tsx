import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/translations";

const MenuPreview = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { language } = useLanguage();

  const categories = [
    {
      title: t(language, "menuPreview.categories.breakfast.title"),
      description: t(language, "menuPreview.categories.breakfast.description"),
    },
    {
      title: t(language, "menuPreview.categories.lunch.title"),
      description: t(language, "menuPreview.categories.lunch.description"),
    },
    {
      title: t(language, "menuPreview.categories.sweet.title"),
      description: t(language, "menuPreview.categories.sweet.description"),
    },
    {
      title: t(language, "menuPreview.categories.drinks.title"),
      description: t(language, "menuPreview.categories.drinks.description"),
    },
  ];

  return (
    <section ref={ref} className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 animate-fade-up ${isVisible ? 'visible' : ''}`}>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-foreground mb-6">
            {t(language, "menuPreview.title")}
          </h2>
          <div className="w-24 h-0.5 bg-primary mx-auto mb-8" />
          <p className="text-muted-foreground font-sans max-w-2xl mx-auto">
            {t(language, "menuPreview.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className={`animate-fade-up ${isVisible ? `visible stagger-${index + 1}` : ''}`}
            >
              <Card className="p-8 hover:shadow-lg transition-shadow bg-card border-border h-full">
                <h3 className="font-serif text-2xl text-foreground mb-3">{category.title}</h3>
                <p className="text-muted-foreground font-sans text-sm">{category.description}</p>
              </Card>
            </div>
          ))}
        </div>

        <div className={`text-center space-y-4 animate-fade-up ${isVisible ? 'visible stagger-5' : ''}`}>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-accent font-sans tracking-wide"
          >
            <Link to="/menu">{t(language, "menuPreview.viewMenu")}</Link>
          </Button>
          <div>
            <Button
              asChild
              variant="link"
              className="text-primary hover:text-accent font-sans tracking-wide"
            >
              <a href="#specials">{t(language, "menuPreview.viewSpecials")}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;
