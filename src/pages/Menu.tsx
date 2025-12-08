import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/translations";
import { Search, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [randomDish, setRandomDish] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { language } = useLanguage();

  // Menu structure with translation keys and prices
  const menuStructure = [
    {
      sectionKey: "breakfast",
      itemKeys: [
        { key: "stoltze", price: "6.9" },
        { key: "goethe", price: "13.5" },
        { key: "julesVerne", price: "12.9" },
        { key: "shakespeare", price: "14.9" },
        { key: "shakshuka", price: "13.5" },
        { key: "fitness", price: "15.9" },
        { key: "ilDolceFarNiente", price: "1 Pers. 17.5 / 2 Pers. 32.5" },
        { key: "royale", price: "1 Pers. 18.5 / 2 Pers. 33.5" },
        { key: "signatureLibretto", price: "1 Pers. 19.5 / 2 Pers. 37.5" },
        { key: "hausgemachtesGranola", price: "11" },
        { key: "porridgeVegan", price: "10" },
        { key: "bircherMuesli", price: "10" },
        { key: "pancakes", price: "9.9" },
        { key: "gravedLachs", price: "9.5" },
        { key: "kaeseVariation", price: "7.5" },
        { key: "portionFrischkaese", price: "3" },
        { key: "portionButter", price: "1.5" },
        { key: "ingwerShot", price: "4" },
        { key: "zweiEier", price: "6.5" },
        { key: "ruehreiNatur", price: "7.5" },
        { key: "ruehreiBacon", price: "9" },
        { key: "ruehreiZwiebeln", price: "11" },
        { key: "spiegeleiNatur", price: "7.5" },
        { key: "spiegeleiBacon", price: "9" },
        { key: "spiegeleiWuerste", price: "11" },
        { key: "omeletteBombay", price: "15" },
        { key: "omeletteBauernart", price: "14" },
        { key: "omelettePariser", price: "14" },
        { key: "omeletteMediterran", price: "13" },
        { key: "zweiBrötchen", price: "6.5" },
        { key: "zweiBrioche", price: "9.5" },
        { key: "avocadoStulle", price: "14.9" },
        { key: "avocadoStulleLachs", price: "17.9" },
        { key: "hummusStulle", price: "14.9" },
        { key: "capreseStulle", price: "13.9" },
      ],
    },
    {
      sectionKey: "brunch",
      itemKeys: [
        { key: "mimosa", price: "8" },
        { key: "bellini", price: "9" },
        { key: "espressoMartini", price: "11" },
        { key: "eggsBenedict", price: "Mit Farmerschinken 13.9 / Mit Graved Lachs 15.9 / Mit krossem Bacon 13.9 / Mit Guacamole + 2" },
        { key: "croqueMadame", price: "14.9" },
        { key: "croissantDeluxe", price: "13 / Mit Farmerschinken 14.9 / Mit krossem Bacon 14.9 / Mit Parmaschinken 15.9" },
      ],
    },
    {
      sectionKey: "lunch",
      itemKeys: [
        { key: "tomatencremesuppe", price: "8" },
        { key: "ilPiccoloSpuntino", price: "7.9" },
        { key: "roestbrot", price: "14.9" },
        { key: "tagliere", price: "11.5 (P.P)" },
        { key: "classicCaesar", price: "16.9" },
        { key: "ziegenkaese", price: "16.9" },
        { key: "gartensalat", price: "15.9" },
        { key: "mediterranerSalat", price: "15.9" },
        { key: "bellaNonna", price: "15.9" },
        { key: "gemischteSalat", price: "9.9" },
      ],
    },
    {
      sectionKey: "drinks",
      itemKeys: [
        { key: "aperolSpritz", price: "8.5" },
        { key: "hugo", price: "8.5" },
        { key: "negroni", price: "10.5" },
        { key: "hauswein", price: "ab 5.5" },
      ],
    },
  ];

  // Generate menu sections with translations
  const menuSections = useMemo(() => {
    return menuStructure.map((section) => {
      const sectionTitle = t(language, `menu.sections.${section.sectionKey}.title`);
      const sectionSubtitle = section.sectionKey === "lunch" 
        ? t(language, `menu.sections.${section.sectionKey}.subtitle`)
        : undefined;
      
      const items = section.itemKeys.map((item) => {
        const itemName = t(language, `menu.sections.${section.sectionKey}.items.${item.key}.name`);
        const itemDescription = t(language, `menu.sections.${section.sectionKey}.items.${item.key}.description`);
        return {
          name: itemName,
          description: itemDescription,
          price: item.price,
        };
      });

      return {
        sectionKey: section.sectionKey,
        title: sectionTitle,
        subtitle: sectionSubtitle,
        items,
      };
    });
  }, [language]);

  // Get all unique categories with their keys
  const categories = useMemo(() => {
    return [
      { key: "all", label: t(language, "menu.allCategories") },
      ...menuSections.map(section => ({
        key: section.sectionKey,
        label: section.title,
      }))
    ];
  }, [menuSections, language]);

  // Filter menu items based on search and category
  const filteredSections = useMemo(() => {
    return menuSections
      .map(section => ({
        ...section,
        items: section.items.filter(item => {
          const matchesSearch = 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = 
            selectedCategory === "all" || section.sectionKey === selectedCategory;
          return matchesSearch && matchesCategory;
        })
      }))
      .filter(section => section.items.length > 0);
  }, [searchTerm, selectedCategory, menuSections]);

  // Get random dish
  const getRandomDish = () => {
    const allItems = menuSections.flatMap(section => 
      section.items.map(item => ({ ...item, category: section.title }))
    );
    const randomIndex = Math.floor(Math.random() * allItems.length);
    setRandomDish(allItems[randomIndex]);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in">
          <h1 className="font-serif text-6xl md:text-7xl font-light mb-6">{t(language, "menu.title")}</h1>
          <div className="w-24 h-0.5 bg-primary-foreground mx-auto mb-8" />
          <p className="font-sans text-lg leading-relaxed max-w-2xl mx-auto">
            {t(language, "menu.subtitle")}
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-secondary/20 border-b border-border">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col gap-4 items-stretch">
            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t(language, "menu.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>

            {/* Random Dish Button */}
            <Button
              onClick={getRandomDish}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-sans tracking-wide group w-full md:w-auto md:self-center"
            >
              <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              {t(language, "menu.surprise")}
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.key)}
                className="font-sans text-xs sm:text-sm px-3 py-2"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Sections */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-16">
          {filteredSections.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                {t(language, "menu.noResults")}
              </p>
            </div>
          ) : (
            filteredSections.map((section, sectionIndex) => {
            const SectionWrapper = () => {
              const { ref, isVisible } = useScrollAnimation(0.1);
              
              return (
                <div ref={ref} key={section.title}>
                  <h2 className={`font-serif text-4xl md:text-5xl text-foreground mb-4 text-center animate-fade-up ${isVisible ? 'visible' : ''}`}>
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className={`font-sans text-sm md:text-base text-muted-foreground mb-8 text-center italic animate-fade-up ${isVisible ? 'visible' : ''}`}>
                      {section.subtitle}
                    </p>
                  )}
                  {!section.subtitle && <div className="mb-8" />}
                  <div className="space-y-6">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={item.name}
                        className={`animate-slide-in ${isVisible ? 'visible' : ''}`}
                        style={{ animationDelay: `${itemIndex * 0.05}s` }}
                      >
                        <Card className="p-4 sm:p-6 bg-card hover:shadow-md transition-shadow">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
                            <div className="flex-1">
                              <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-foreground mb-2">
                                {item.name}
                              </h3>
                              {item.description && (
                                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            <div className="font-sans font-medium text-foreground text-left sm:text-right sm:min-w-[120px] md:min-w-[160px]">
                              {item.price.includes("/") ? (
                                <div className="space-y-1">
                                  {item.price.split(" / ").map((priceOption, idx) => {
                                    // Check if price option contains a price number (like "13.9")
                                    const fullPriceMatch = priceOption.match(/(\d+\.?\d*)$/);
                                    // Check if it's an addition (like "+ 2")
                                    const additionMatch = priceOption.match(/\+ (\d+\.?\d*)$/);
                                    
                                    if (fullPriceMatch) {
                                      const priceValue = fullPriceMatch[1];
                                      const priceText = priceOption.replace(/\d+\.?\d*$/, "").trim();
                                      return (
                                        <div key={idx} className="text-sm">
                                          {priceText && <span className="text-muted-foreground">{priceText} </span>}
                                          <span>€{priceValue}</span>
                                        </div>
                                      );
                                    } else if (additionMatch) {
                                      const additionValue = additionMatch[1];
                                      const priceText = priceOption.replace(/\+\s*\d+\.?\d*$/, "").trim();
                                      return (
                                        <div key={idx} className="text-sm">
                                          {priceText && <span className="text-muted-foreground">{priceText} </span>}
                                          <span className="text-muted-foreground">+ €{additionValue}</span>
                                        </div>
                                      );
                                    }
                                    return (
                                      <div key={idx} className="text-sm">
                                        {priceOption}
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <span>€{item.price}</span>
                              )}
                            </div>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              );
            };
            
            return <SectionWrapper key={sectionIndex} />;
          })
          )}
        </div>
      </section>

      {/* Random Dish Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-accent" />
              {t(language, "menu.randomDishTitle")}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              {t(language, "menu.randomDishDescription")}
            </DialogDescription>
          </DialogHeader>
          {randomDish && (
            <div className="space-y-4 pt-4">
              <div className="text-xs uppercase tracking-wider text-accent font-semibold">
                {t(language, "menu.randomDishCategory")}
              </div>
              <h3 className="font-serif text-2xl text-foreground">
                {randomDish.name}
              </h3>
              {randomDish.description && (
                <p className="text-muted-foreground leading-relaxed">
                  {randomDish.description}
                </p>
              )}
              <div className="pt-4 border-t border-border">
                <div className="font-sans font-semibold text-2xl text-foreground">
                  €{randomDish.price}
                </div>
              </div>
              <Button
                onClick={getRandomDish}
                variant="outline"
                className="w-full mt-4"
              >
                {t(language, "menu.anotherSuggestion")}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <CTASection />

      <Footer />
    </div>
  );
};

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { language } = useLanguage();
  
  return (
    <section ref={ref} className="py-16 px-4 bg-secondary/30">
      <div className={`container mx-auto max-w-2xl text-center animate-fade-up ${isVisible ? 'visible' : ''}`}>
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
          {t(language, "menu.reserveTitle")}
        </h2>
        <p className="font-sans text-muted-foreground mb-8">
          {t(language, "menu.reserveDescription")}
        </p>
        <Button
          asChild
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-accent font-sans tracking-wide"
        >
          <a
            href="https://www.opentable.de/restref/client/?rid=445905"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t(language, "menu.reserveButton")}
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Menu;
