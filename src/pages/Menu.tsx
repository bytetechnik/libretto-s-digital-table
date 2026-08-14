import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PdfMenuViewer from "@/components/PdfMenuViewer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/translations";
import { Coffee, UtensilsCrossed } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import brunchPdf from "@/assets/Menu/DRUCKBEREIT_LIBRETTO_BRUNCH_2026.pdf";
import foodPdf from "@/assets/Menu/LIBRETTO SPEISEKARTE NEU 2026 (10).pdf";
import drinksPdf from "@/assets/Menu/DRUCKBEREIT_LIBRETTO_GETRAENKE_2026.pdf";

const scrollToMenuPdfs = () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.getElementById("menu-pdf-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
};

const Menu = () => {
  const [searchParams] = useSearchParams();
  const [menuPart, setMenuPart] = useState<"breakfast" | "speisen">(
    searchParams.get("part") === "speisen" ? "speisen" : "breakfast"
  );
  const [activeSpeisenSection, setActiveSpeisenSection] = useState<"food" | "drinks">("food");
  const { language } = useLanguage();

  const selectMenuPart = (part: "breakfast" | "speisen") => {
    setMenuPart(part);
    if (part === "speisen") {
      setActiveSpeisenSection("food");
    }
    scrollToMenuPdfs();
  };

  const scrollToSpeisenSection = (section: "food" | "drinks") => {
    setActiveSpeisenSection(section);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById(section === "food" ? "menu-pdf-food" : "menu-pdf-drinks")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />

      <section className="pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14 md:pb-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-4 md:mb-6">
            {t(language, "menu.title")}
          </h1>
          <div className="w-24 h-0.5 bg-primary-foreground mx-auto mb-6 md:mb-8" />
          <p className="font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto px-0">
            {t(language, "menu.subtitle")}
          </p>
          <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-primary-foreground/20 max-w-2xl mx-auto space-y-2 md:space-y-3">
            {t(language, menuPart === "breakfast" ? "menu.introBreakfast" : "menu.intro")
              .split("\n")
              .map((line, i) => (
                <p key={i} className="font-sans text-sm md:text-base leading-relaxed opacity-95">
                  {line}
                </p>
              ))}
          </div>
        </div>
      </section>

      <section className="pt-4 sm:pt-6 pb-6 sm:pb-8 px-4 border-b border-border bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
            <Card
              role="button"
              tabIndex={0}
              onClick={() => selectMenuPart("breakfast")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  selectMenuPart("breakfast");
                }
              }}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                menuPart === "breakfast"
                  ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left min-h-[72px] sm:min-h-0">
                <div
                  className={`flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                    menuPart === "breakfast" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Coffee className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-base sm:text-lg font-medium text-foreground">
                    {t(language, "menu.menuPartBreakfast")}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5">
                    {t(language, "menu.menuPartBreakfastSubtitle")}
                  </p>
                </div>
              </div>
            </Card>
            <Card
              role="button"
              tabIndex={0}
              onClick={() => selectMenuPart("speisen")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  selectMenuPart("speisen");
                }
              }}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                menuPart === "speisen"
                  ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left min-h-[72px] sm:min-h-0">
                <div
                  className={`flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                    menuPart === "speisen" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <UtensilsCrossed className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-base sm:text-lg font-medium text-foreground">
                    {t(language, "menu.menuPartSpeisen")}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5">
                    {t(language, "menu.menuPartSpeisenSubtitle")}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {menuPart === "speisen" && (
        <section className="py-5 sm:py-6 md:py-8 px-4 bg-secondary/20 border-b border-border sticky top-[72px] z-20">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={activeSpeisenSection === "food" ? "default" : "outline"}
                className="font-sans text-xs sm:text-sm px-3 py-2 min-h-[44px] sm:min-h-0 touch-manipulation"
                onClick={() => scrollToSpeisenSection("food")}
              >
                {t(language, "menu.menuPartFood")}
              </Button>
              <Button
                variant={activeSpeisenSection === "drinks" ? "default" : "outline"}
                className="font-sans text-xs sm:text-sm px-3 py-2 min-h-[44px] sm:min-h-0 touch-manipulation"
                onClick={() => scrollToSpeisenSection("drinks")}
              >
                {t(language, "menu.menuPartDrinks")}
              </Button>
            </div>
          </div>
        </section>
      )}

      <section id="menu-pdf-section" className="py-10 sm:py-12 md:py-16 px-4 scroll-mt-24 sm:scroll-mt-28">
        <div className="container mx-auto max-w-4xl space-y-10 sm:space-y-14">
          {menuPart === "breakfast" ? (
            <PdfMenuViewer
              file={brunchPdf}
              title={t(language, "menu.menuPartBreakfast")}
            />
          ) : (
            <>
              <div id="menu-pdf-food" className="space-y-4 sm:space-y-6 scroll-mt-40 sm:scroll-mt-44">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground text-center">
                  {t(language, "menu.menuPartFood")}
                </h2>
                <PdfMenuViewer
                  file={foodPdf}
                  title={t(language, "menu.menuPartFood")}
                />
              </div>
              <div id="menu-pdf-drinks" className="space-y-4 sm:space-y-6 scroll-mt-40 sm:scroll-mt-44">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground text-center">
                  {t(language, "menu.menuPartDrinks")}
                </h2>
                <PdfMenuViewer
                  file={drinksPdf}
                  title={t(language, "menu.menuPartDrinks")}
                />
              </div>
            </>
          )}
        </div>
      </section>

      <section className="py-8 sm:py-10 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <p className="font-sans text-xs sm:text-sm text-muted-foreground text-center leading-relaxed max-w-2xl mx-auto px-1">
            {t(language, "menu.disclaimer")}
          </p>
        </div>
      </section>

      <CTASection />

      <Footer />
    </div>
  );
};

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { language } = useLanguage();

  return (
    <section ref={ref} className="py-10 sm:py-12 md:py-16 px-4 bg-secondary/30">
      <div className={`container mx-auto max-w-2xl text-center animate-fade-up ${isVisible ? "visible" : ""}`}>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 sm:mb-6">
          {t(language, "menu.reserveTitle")}
        </h2>
        <p className="font-sans text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 px-2">
          {t(language, "menu.reserveDescription")}
        </p>
        <Button
          asChild
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-accent font-sans tracking-wide min-h-[48px] touch-manipulation w-full sm:w-auto"
        >
          <a href="https://www.opentable.de/restref/client/?rid=445905" target="_blank" rel="noopener noreferrer">
            {t(language, "menu.reserveButton")}
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Menu;
