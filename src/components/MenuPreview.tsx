import { Link } from "react-router-dom";
import { Coffee, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/translations";

const MenuPreview = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { language } = useLanguage();

  const menuCards = [
    {
      key: "breakfast",
      titleKey: "menu.menuPartBreakfast",
      subtitleKey: "menu.menuPartBreakfastSubtitle",
      Icon: Coffee,
      to: "/menu",
    },
    {
      key: "speisen",
      titleKey: "menu.menuPartSpeisen",
      subtitleKey: "menu.menuPartSpeisenSubtitle",
      Icon: UtensilsCrossed,
      to: "/menu",
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

        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
          {menuCards.map((card, index) => {
            const Icon = card.Icon;
            return (
            <div
              key={card.key}
              className={`animate-fade-up ${isVisible ? `visible stagger-${index + 1}` : ''}`}
            >
              <Link to={card.to}>
                <Card className="p-6 sm:p-8 hover:shadow-lg transition-all duration-200 hover:border-primary/50 bg-card border-border h-full flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-left group cursor-pointer">
                  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-1">
                      {t(language, card.titleKey)}
                    </h3>
                    <p className="text-muted-foreground font-sans text-sm">
                      {t(language, card.subtitleKey)}
                    </p>
                  </div>
                </Card>
              </Link>
            </div>
            );
          })}
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
