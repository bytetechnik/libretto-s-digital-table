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

  const menuSections = [
    {
      title: "FRÜHSTÜCK",
      items: [
        {
          name: "STOLTZE",
          description: "1 Brötchen, Butter, Konfitüre, gekochtes Ei",
          price: "6.9",
        },
        {
          name: "GOETHE",
          description:
            "1 Brötchen, 1 Vollkornbrötchen, Butter, Konfitüre, Farmerschinken, Salami, Pastrami, Gouda, 2 Eier im Glas mit Schnittlauch",
          price: "13.5",
        },
        {
          name: "JULES VERNE",
          description:
            "Baguette, Sauerteigroissant, Butter, Konfitüre, Trauben, französischer Käse, gekochtes Ei",
          price: "12.9",
        },
        {
          name: "SHAKESPEARE",
          description:
            "Toastbrot, Butter, zwei Spiegeleier, knuspriger Bacon, Nürnberger Rostbratwürste, Baked Beans, gegrillte Tomate & Champignons, Heinz Ketchup, frisch gepresster Orangensaft",
          price: "14.9",
        },
        {
          name: "SHAKSHUKA",
          description:
            "Heiße Schmorpfanne aus der orientalischen Küche mit Tomaten, Zwiebeln, Kreuzkümmel, Paprika, zwei pochierten Eiern, Sesam, Petersilie, Schafskäse & warmem Focaccia Brot",
          price: "13.5",
        },
        {
          name: "FITNESS",
          description:
            "2 Vollkornbrötchen, Blütenhonig, Frischkäse, Hummus, Gouda, Pastrami, Granola Müsli, gekochtes Ei, frisch gepresster Orangensaft",
          price: "15.9",
        },
        {
          name: "IL DOLCE FAR NIENTE",
          description:
            "Frischkäse, Pesto, Tomate, Burrata, Manchego, Oliven, Parmaschinken, Salami, Pastrami, Grissini, gekochtes Ei, warmes Focaccia Brot",
          price: "1 Pers. 17.5 / 2 Pers. 32.5",
        },
        {
          name: "ROYALE",
          description:
            "Frischkäse, Graved Lachs, Tomaten- & Gurkenscheiben, rote Zwiebeln, Kapern, Olivenöl & Maldonsalz, gegrilltes Brioche-Brötchen, Glas Prosecco",
          price: "1 Pers. 18.5 / 2 Pers. 33.5",
        },
        {
          name: "SIGNATURE LIBRETTO",
          description:
            "Frischkäse, Hummus, Butter, Konfitüre, Graved Lachs, Farmerschinken, Pastrami, Gouda, Salami, Brotkorb (Brötchen, Vollkornbrötchen, Croissant), Rühreier, Granola Müsli, Glas Prosecco oder frisch gepresster Orangensaft",
          price: "1 Pers. 19.5 / 2 Pers. 37.5",
        },
        {
          name: "HAUSGEMACHTES GRANOLA",
          description:
            "Joghurt, frisches Obst, Blütenhonig, Chiasamen, Kokosflocken, Granola (Knuspermüsli)",
          price: "11",
        },
        {
          name: "LAUWARMES PORRIDGE VEGAN",
          description:
            "Haferflocken, Hafermilch, frische Beeren, Kokosflocken, Kakaonibs, Agavensirup",
          price: "10",
        },
        {
          name: "BIRCHER-MÜSLI NACH ORIGINALREZEPT",
          description:
            "Frische Beeren, Apfel, Nüsse, Kokosflocken, Chiasamen, Kakaonibs",
          price: "10",
        },
        {
          name: "PANCAKES ODER FRENCH TOAST",
          description: "Mit frischen Beeren, wahlweise mit Nutella oder Konfitüre",
          price: "9.9",
        },
        {
          name: "GRAVED LACHS MIT MEERRETTICH",
          description: "",
          price: "9.5",
        },
        {
          name: "KÄSEVARIATION ODER WURSTVARIATION",
          description: "",
          price: "7.5",
        },
        {
          name: "PORTION FRISCHKÄSE, HUMMUS ODER GUACAMOLE",
          description: "",
          price: "3",
        },
        {
          name: "PORTION BUTTER, KONFITÜRE, BLÜTENHONIG ODER NUTELLA",
          description: "",
          price: "1.5",
        },
        {
          name: "INGWER SHOT",
          description: "",
          price: "4",
        },
        {
          name: "2 EIER IM GLAS MIT SCHNITTLAUCH",
          description: "",
          price: "6.5",
        },
        {
          name: "RÜHREI AUS DREI EIERN - NATUR",
          description: "Mit Schnittlauch",
          price: "7.5",
        },
        {
          name: "RÜHREI AUS DREI EIERN - MIT BACON ODER FARMERSCHINKEN",
          description: "Mit Schnittlauch",
          price: "9",
        },
        {
          name: "RÜHREI AUS DREI EIERN - MIT ZWIEBELN, SALAMI, TOMATEN, BERGKÄSE",
          description: "Mit Schnittlauch",
          price: "11",
        },
        {
          name: "SPIEGELEI AUS DREI EIERN - NATUR",
          description: "Mit Schnittlauch",
          price: "7.5",
        },
        {
          name: "SPIEGELEI AUS DREI EIERN - MIT BACON",
          description: "Mit Schnittlauch",
          price: "9",
        },
        {
          name: "SPIEGELEI AUS DREI EIERN - MIT NÜRNBERGER ROSTBRATWÜRSTEN",
          description: "Champignons, Tomaten & Schnittlauch",
          price: "11",
        },
        {
          name: "OMELETTE BOMBAY",
          description: "Aus drei Eiern. Frisches Gemüse, Ingwer, Koriander, Kurkuma, Zwiebeln, Minzjoghurt",
          price: "15",
        },
        {
          name: "OMELETTE BAUERNART",
          description: "Aus drei Eiern. Kartoffeln, Speck, Farmerschinken, Champignons, Zwiebeln, Bergkäse, Schnittlauch",
          price: "14",
        },
        {
          name: "OMELETTE PARISER ART",
          description: "Aus drei Eiern. Comté Käse, Kartoffeln, Speck, Kirschtomaten, Petersilie",
          price: "14",
        },
        {
          name: "OMELETTE MEDITERRAN",
          description: "Aus drei Eiern. Schafskäse, Tomaten, Oliven, Zwiebeln, Peperoni, Petersilie",
          price: "13",
        },
        {
          name: "ZWEI HALBE BELEGTE BRÖTCHEN",
          description: "Wahlweise mit Salami, Farmerschinken, Pastrami, Brie oder Gouda",
          price: "6.5",
        },
        {
          name: "ZWEI GERÖSTETE BRIOCHE-HÄLFTEN",
          description: "Mit Graved Lachs, Frischkäse, roten Zwiebeln & Kapern",
          price: "9.5",
        },
        {
          name: "AVOCADO STULLE",
          description: "Weizensauerteigbrot, Guacamole, Tomate, Rührei, Kresse, Maldonsalz",
          price: "14.9",
        },
        {
          name: "AVOCADO STULLE MIT GRAVED LACHS",
          description: "Weizensauerteigbrot, Guacamole, Tomate, Rührei, Kresse, Maldonsalz, Graved Lachs",
          price: "17.9",
        },
        {
          name: "HUMMUS STULLE",
          description: "Weizensauerteigbrot, Hummus, Kichererbsen, Kirschtomaten, Schafskäse, Piment d'Espelette, Kresse",
          price: "14.9",
        },
        {
          name: "CAPRESE STULLE",
          description: "Weizensauerteigbrot, Mozzarella, Pesto, Tomate, Rucola, Balsamico",
          price: "13.9",
        },
      ],
    },
    {
      title: "BRUNCH DELIGHTS",
      items: [
        {
          name: "MIMOSA",
          description: "Carpe Noctem Prosecco, Orangensaft",
          price: "8",
        },
        {
          name: "BELLINI",
          description: "Carpe Noctem Prosecco, Pfirsichpüree, frisch gepresste Zitrone",
          price: "9",
        },
        {
          name: "ESPRESSO MARTINI",
          description: "42 Below Vodka, Kaffeelikör, Espresso, Simple Sirup",
          price: "11",
        },
        {
          name: "EGGS BENEDICT, DER KLASSIKER!",
          description: "Zwei pochierte Eier auf geröstetem Brioche vom Grill, mit Tomate & Sauce Hollandaise",
          price: "Mit Farmerschinken 13.9 / Mit Graved Lachs 15.9 / Mit krossem Bacon 13.9 / Mit Guacamole + 2",
        },
        {
          name: "CROQUE MADAME",
          description: "Toast mit zartem Schinken, Original Maille Dijon Senf, Crème Fraîche & Spiegelei, überbacken mit Gruyère & Emmentaler. Serviert mit einem kleinen Beilagensalat",
          price: "14.9",
        },
        {
          name: "CROISSANT DELUXE",
          description: "Das perfekte Zusammenspiel aus kross geröstetem Sauerteig-Croissant, Guacamole, einem pochierten Ei, Rucola & Sauce Hollandaise. Verfeinert mit geriebenem Comté Käse",
          price: "13 / Mit Farmerschinken 14.9 / Mit krossem Bacon 14.9 / Mit Parmaschinken 15.9",
        },
      ],
    },
    {
      title: "LUNCH & EARLY DINNER",
      subtitle: "Herzhaft & Frisch. Mediterrane Klassiker, hausgemachte Lieblingsgerichte & kreative Kompositionen für den kleinen oder großen Hunger. Ideal zum Teilen, Genießen & Verweilen",
      items: [
        {
          name: "TOMATENCREMESUPPE",
          description: "Aus San Marzano Tomaten, fein abgeschmeckt mit Basilikumöl",
          price: "8",
        },
        {
          name: "IL PICCOLO SPUNTINO",
          description: "Warme Focaccia mit 3 Dips: Frischkäse, Artischockencreme, Pesto",
          price: "7.9",
        },
        {
          name: "RÖSTBROT \"ITALIAN STYLE\"",
          description: "Geröstetes Brot mit Pesto, marinierten Tomaten, Pinienkernen, altem Balsamico, Kresse & gezupfter Burrata",
          price: "14.9",
        },
        {
          name: "TAGLIERE - DAS HOLZBRETT (AB 2 PERSONEN)",
          description: "Eine sorgfältig zusammengestellte Auswahl italienischer Spezialitäten: Feiner Aufschnitt, Burrata, Frischkäse, Pesto, Artischockencreme, Oliven & warmem Focaccia Brot",
          price: "11.5 (P.P)",
        },
        {
          name: "CLASSIC CAESAR",
          description: "Blattsalat, Kirschtomaten, Radieschen, Hähnchenbrust im Pankomantel, Bacon-Chips, Croutons, Parmigiano & Caesar-Dressing. Alle Salate werden mit warmem Focaccia Brot serviert.",
          price: "16.9",
        },
        {
          name: "ZIEGENKÄSE & FREUNDE",
          description: "Gratinierter Ziegenkäse auf Blattsalat mit Radieschen, Kirschtomaten, Gurken, karamelisierten Walnüssen, Trauben & Dijon-Vinaigrette. Alle Salate werden mit warmem Focaccia Brot serviert.",
          price: "16.9",
        },
        {
          name: "GARTENSALAT",
          description: "Bunter Blattsalat mit Schafskäse, Kalamata Oliven, Peperoni, Kirschtomaten, Gurken, Radieschen, roten Zwiebeln & Dijon-Vinaigrette. Alle Salate werden mit warmem Focaccia Brot serviert.",
          price: "15.9",
        },
        {
          name: "MEDITERRANER SALAT VEGAN",
          description: "Blattsalat mit hausgemachten Falafeln, Hummus, Kirschtomaten, Gurken, eingelegten Zwiebeln & Dijon-Vinaigrette. Alle Salate werden mit warmem Focaccia Brot serviert.",
          price: "15.9",
        },
        {
          name: "BELLA NONNA",
          description: "Mediterraner Salat mit Kirschtomaten, Gurken, Radieschen, roten Zwiebeln, feinen Bohnen, Parmaschinken, Parmigiano & Dijon-Vinaigrette. Alle Salate werden mit warmem Focaccia Brot serviert.",
          price: "15.9",
        },
        {
          name: "GEMISCHTE SALAT BOWL",
          description: "Blattsalat mit Kirschtomaten, Radieschen, Gurken, Zwiebeln & Dijon-Vinaigrette. Alle Salate werden mit warmem Focaccia Brot serviert.",
          price: "9.9",
        },
      ],
    },
    {
      title: "KAFFEE & GETRÄNKE",
      items: [
        {
          name: "Aperol Spritz",
          description: "Der klassische italienische Aperitif",
          price: "8.5",
        },
        {
          name: "Hugo",
          description: "Prosecco, Holunderblütensirup, Minze, Limette",
          price: "8.5",
        },
        {
          name: "Negroni",
          description: "Gin, Campari, Wermut",
          price: "10.5",
        },
        {
          name: "Hauswein",
          description: "Erlesene Weine von lokalen und italienischen Weingütern",
          price: "ab 5.5",
        },
      ],
    },
  ];

  // Get all unique categories
  const categories = ["all", ...menuSections.map(section => section.title)];

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
            selectedCategory === "all" || section.title === selectedCategory;
          return matchesSearch && matchesCategory;
        })
      }))
      .filter(section => section.items.length > 0);
  }, [searchTerm, selectedCategory]);

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
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="font-sans text-xs sm:text-sm px-3 py-2"
              >
                {category === "all" ? t(language, "menu.allCategories") : category}
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
              {language === "de" ? "Wie wäre es damit?" : "How about this?"}
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
                {language === "de" ? "Noch eine Empfehlung" : "Another suggestion"}
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
          {language === "de" ? "Reservieren Sie Ihren Tisch" : "Reserve Your Table"}
        </h2>
        <p className="font-sans text-muted-foreground mb-8">
          {language === "de" ? "Sichern Sie sich Ihren Platz für ein unvergessliches kulinarisches Erlebnis" : "Secure your spot for an unforgettable culinary experience"}
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
            {language === "de" ? "JETZT RESERVIEREN" : "RESERVE NOW"}
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Menu;
