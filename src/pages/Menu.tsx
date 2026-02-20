import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/translations";
import { Search, Sparkles, ChevronDown, Wine } from "lucide-react";
import { useState, useMemo, useCallback, useEffect } from "react";

// All drink section keys (order matches menu structure)
const DRINK_SECTION_KEYS = [
  "erfrischungsgetraenke",
  "bierUndApfelwein",
  "schaumweinChampagner",
  "weissweine",
  "roseweine",
  "rotweine",
  "kaffee",
  "heissgetraenke",
  "teeImGlas",
  "premiumKaennchentee",
  "aperitivo",
  "aperitivoCampari",
  "cocktails",
  "malfyGin",
  "alkoholfreieDrinks",
  "maltWhiskey",
  "whiskey",
  "americanWhiskey",
  "tequila",
  "likoereDigestifs",
];

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [randomDish, setRandomDish] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrinksSheetOpen, setIsDrinksSheetOpen] = useState(false);
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  // Menu structure with translation keys and prices (new menu only)
  const menuStructure = [
    {
      sectionKey: "vorspeisen",
      itemKeys: [
        { key: "brotButter", price: "5" },
        { key: "roteBeteCarpaccio", price: "14" },
        { key: "roestbrotItalianStyle", price: "14" },
        { key: "karamellisierterZiegenkaese", price: "12" },
      ],
    },
    {
      sectionKey: "suppen",
      itemKeys: [
        { key: "cremigeKarottenIngwerSuppe", price: "10.5" },
        { key: "tomatensuppe", price: "9" },
        { key: "chefsRoteLinsensuppe", price: "10" },
      ],
    },
    {
      sectionKey: "salate",
      itemKeys: [
        { key: "caesarSalat", price: "17.5" },
        { key: "ziegenkaeseUndFreunde", price: "18.5" },
      ],
    },
    {
      sectionKey: "pasta",
      itemKeys: [
        { key: "rigatoniMezziOrtolana", price: "15" },
        { key: "paccheriPistacchioEBurrata", price: "18" },
        { key: "spaghettiGambas", price: "21" },
        { key: "beefTagliatelle", price: "19" },
        { key: "gnocchiRosso", price: "17" },
        { key: "tagliatelleKokosCurry", price: "16" },
      ],
    },
    {
      sectionKey: "klassiker",
      itemKeys: [
        { key: "boeufBourguignon", price: "24" },
        { key: "steakFrites", price: "23" },
        { key: "gemuesecurry", price: "19 / Mit Hähnchen +4" },
      ],
    },
    {
      sectionKey: "extras",
      itemKeys: [
        { key: "pommesFrites", price: "7" },
        { key: "suesskartoffelPommes", price: "7" },
        { key: "truffelPommes", price: "9" },
        { key: "grillgemuese", price: "6" },
        { key: "gemischterSalat", price: "8" },
      ],
    },
    {
      sectionKey: "suesses",
      itemKeys: [
        { key: "cremeBrulee", price: "10" },
        { key: "kaiserschmarren", price: "15" },
        { key: "schokoSouffle", price: "12" },
        { key: "apfelstrudel", price: "10" },
        { key: "meringueCheesecake", price: "11" },
      ],
    },
    {
      sectionKey: "erfrischungsgetraenke",
      itemKeys: [
        { key: "taunusquelleNaturelle", price: "3.8 | 7.8" },
        { key: "taunusquelleMedium", price: "3.8 | 7.8" },
        { key: "infusedWater", price: "8" },
        { key: "softdrinks", price: "3.9 | 5.2" },
        { key: "saefteRapps", price: "4.9 | 5.9" },
        { key: "thomasHenry", price: "4" },
        { key: "hausgemachteLimonade", price: "6.9" },
        { key: "kalteZitrone", price: "6.5" },
      ],
    },
    {
      sectionKey: "bierUndApfelwein",
      itemKeys: [
        { key: "bitburgerPils", price: "4 | 5" },
        { key: "bitburgerPilsAlkoholfrei", price: "4" },
        { key: "benediktinerWeissbier", price: "6" },
        { key: "benediktinerWeissbierAlkoholfrei", price: "6" },
        { key: "benediktinerDunkel", price: "6" },
        { key: "benediktinerHelles", price: "6" },
        { key: "benediktinerHellesAlkoholfrei", price: "6" },
        { key: "birraMoretti", price: "5" },
        { key: "apfelweinRapps", price: "3 | 5" },
        { key: "bembelApfelweinColaCidre", price: "4" },
        { key: "bembelApfelweinPfirsichCidre", price: "4" },
      ],
    },
    {
      sectionKey: "schaumweinChampagner",
      itemKeys: [
        { key: "carpeNoctemProseccoBrut", price: "7.5 | 35" },
        { key: "carpeNoctemProseccoRose", price: "7.5 | 35" },
        { key: "chandonGardenSpritz", price: "38" },
        { key: "perrierJouetGrandBrut", price: "99" },
        { key: "perrierJouetBlasonRose", price: "120" },
        { key: "ruinartBrut", price: "125" },
        { key: "ruinartRose", price: "125" },
        { key: "moetChandonIceImperialRose", price: "125" },
      ],
    },
    {
      sectionKey: "weissweine",
      itemKeys: [
        { key: "sauvignonBlancSteitz", price: "9 | 31" },
        { key: "blancDeNoirSteitz", price: "9 | 31" },
        { key: "gelberMuskatellerGoehring", price: "9 | 31" },
        { key: "grauburgunderGoehring", price: "9 | 31" },
        { key: "rieslingGutsweinFendel", price: "9 | 31" },
        { key: "luganaSanBenedettoZenato", price: "9 | 31" },
        { key: "studioBlancPittPerrin", price: "29" },
        { key: "fratiLuganaCadeiFrati", price: "49 | 79" },
      ],
    },
    {
      sectionKey: "roseweine",
      itemKeys: [
        { key: "cuveeRoseGoehring", price: "9 | 31" },
        { key: "minutyMRose", price: "39 | 89" },
        { key: "miravalCotesDeProvenceRose", price: "55 | 99" },
        { key: "whisperingAngel", price: "55" },
        { key: "alieRoseFrescobaldi", price: "10 | 35" },
      ],
    },
    {
      sectionKey: "rotweine",
      itemKeys: [
        { key: "rot1SpaetburgunderSteitz", price: "9.5 | 32" },
        { key: "appassimentoRossoVeneto", price: "9.5 | 32" },
        { key: "montepulcianoAbruzzoNovantuno", price: "9.5 | 32" },
        { key: "primitivoIMuri", price: "9.5 | 32" },
      ],
    },
    {
      sectionKey: "kaffee",
      itemKeys: [
        { key: "cafeCreme", price: "3.8 | 4.9" },
        { key: "kaennchenCafeCreme", price: "6.5" },
        { key: "espressoDoppio", price: "3 | 4.7" },
        { key: "espressoMacchiatoDoppio", price: "3.2 | 4.9" },
        { key: "americano", price: "3.8" },
        { key: "latteMacchiato", price: "5" },
        { key: "cappuccino", price: "3.9 | 5.5" },
        { key: "grandCafeAuLait", price: "5" },
        { key: "flatWhite", price: "4.9" },
        { key: "cortado", price: "4.5" },
        { key: "icedAmericano", price: "5" },
        { key: "icedLatte", price: "5.5" },
        { key: "affogato", price: "5.5" },
      ],
    },
    {
      sectionKey: "heissgetraenke",
      itemKeys: [
        { key: "chaiLatte", price: "5.5" },
        { key: "pumpkinSpiceLatte", price: "5.5" },
        { key: "heisseSchokolade", price: "5" },
      ],
    },
    {
      sectionKey: "teeImGlas",
      itemKeys: [
        { key: "englishCeylon", price: "4.5" },
        { key: "spicyBlackChai", price: "4.5" },
        { key: "sonneAsienSencha", price: "4.5" },
        { key: "kraeutergarten", price: "4.5" },
        { key: "kamillenblueten", price: "4.5" },
        { key: "pfefferminze", price: "4.5" },
        { key: "rooibosVanille", price: "4.5" },
        { key: "sommerbeeren", price: "4.5" },
        { key: "ingwerMinzeZitrone", price: "5.5" },
        { key: "nanaTee", price: "5" },
      ],
    },
    {
      sectionKey: "premiumKaennchentee",
      itemKeys: [
        { key: "darjeelingSchnorr", price: "7" },
        { key: "assamSchnorr", price: "7" },
        { key: "earlGreySchnorr", price: "7" },
        { key: "buddhasGeheimnis", price: "7" },
        { key: "paiMuTan", price: "7" },
        { key: "japanSencha", price: "7" },
        { key: "morgentau", price: "7" },
        { key: "gelberPfirsich", price: "7" },
      ],
    },
    {
      sectionKey: "kleinigkeiten",
      itemKeys: [
        { key: "charcuteriePlatteZwei", price: "20" },
        { key: "burrataTomate", price: "13" },
        { key: "brotButterKleinigkeiten", price: "5" },
        { key: "pommesFritesKleinigkeiten", price: "7" },
      ],
    },
    {
      sectionKey: "aperitivo",
      itemKeys: [
        { key: "aperolSpritz", price: "9.5" },
        { key: "stGermainSpritz", price: "11" },
        { key: "sartiSpritz", price: "9.5" },
        { key: "lilletBerry", price: "9.5" },
        { key: "roseTonic", price: "9.5" },
      ],
    },
    {
      sectionKey: "aperitivoCampari",
      itemKeys: [
        { key: "negroniCampari", price: "12" },
        { key: "campariSpritz", price: "9.5" },
        { key: "amalfiCampari", price: "9.5" },
        { key: "bicicletta", price: "10" },
      ],
    },
    {
      sectionKey: "cocktails",
      itemKeys: [
        { key: "espressoMartini", price: "12" },
        { key: "pinkPaloma", price: "14" },
        { key: "rubySour", price: "12" },
        { key: "cosmopolitan", price: "11" },
        { key: "whiskeySour", price: "11" },
        { key: "moscowMule", price: "11" },
      ],
    },
    {
      sectionKey: "malfyGin",
      itemKeys: [
        { key: "malfyOriginaleTonic", price: "12" },
        { key: "malfyRosaGinTonic", price: "12" },
        { key: "malfyLimone", price: "12" },
        { key: "malfyAranciaGinTonica", price: "12" },
      ],
    },
    {
      sectionKey: "alkoholfreieDrinks",
      itemKeys: [
        { key: "noAperoSpritz", price: "9.5" },
        { key: "shirleyTemple", price: "8" },
        { key: "noGinTonic", price: "10" },
        { key: "crodinoSpritz", price: "8.5" },
        { key: "virginMojito", price: "9.5" },
      ],
    },
    {
      sectionKey: "maltWhiskey",
      itemKeys: [
        { key: "glenfiddich15Solera", price: "10" },
        { key: "singleton12", price: "8" },
      ],
    },
    {
      sectionKey: "whiskey",
      itemKeys: [
        { key: "johnnieWalkerBlackLabel", price: "8" },
        { key: "chivasRegal12", price: "1" },
      ],
    },
    {
      sectionKey: "americanWhiskey",
      itemKeys: [
        { key: "makersMarkBourbon", price: "7" },
        { key: "bulleitBourbon", price: "8" },
        { key: "wildTurkeyBourbon", price: "8" },
      ],
    },
    {
      sectionKey: "tequila",
      itemKeys: [
        { key: "patronSilver", price: "8" },
        { key: "donJulioReposado", price: "10" },
        { key: "claseAzulReposado", price: "2" },
      ],
    },
    {
      sectionKey: "likoereDigestifs",
      itemKeys: [
        { key: "baileys", price: "6" },
        { key: "averna", price: "6" },
        { key: "ramazzotti", price: "6" },
        { key: "limoncello", price: "6" },
        { key: "campari", price: "6" },
        { key: "sambuca", price: "6" },
        { key: "grandMarnier", price: "6" },
        { key: "frangelico", price: "6" },
        { key: "williamsBirne", price: "6" },
      ],
    },
  ];

  // Generate menu sections with translations
  const menuSections = useMemo(() => {
    return menuStructure.map((section) => {
      const sectionTitle = t(language, `menu.sections.${section.sectionKey}.title`);
const sectionSubtitle = (section.sectionKey === "suppen" || section.sectionKey === "salate" || section.sectionKey === "kaffee" || section.sectionKey === "teeImGlas" || section.sectionKey === "premiumKaennchentee" || section.sectionKey === "likoereDigestifs")
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

  // Categories: All, food sections only, then single "Drinks" entry (drink sub-sections in dropdown)
  const categories = useMemo(() => {
    const foodSections = menuSections.filter(
      (s) => !DRINK_SECTION_KEYS.includes(s.sectionKey)
    );
    return [
      { key: "all", label: t(language, "menu.allCategories") },
      ...foodSections.map((section) => ({
        key: section.sectionKey,
        label: section.title,
      })),
      { key: "drinks", label: t(language, "menu.drinksCategory"), isDrinks: true },
    ];
  }, [menuSections, language]);

  // Drink sections for the dropdown (same order as in menu)
  const drinkSections = useMemo(
    () =>
      menuSections.filter((s) => DRINK_SECTION_KEYS.includes(s.sectionKey)),
    [menuSections]
  );

  const scrollToSection = useCallback((sectionKey: string) => {
    const el = document.getElementById(`section-${sectionKey}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // When a specific category is selected (not "all" or "drinks"), scroll to that section after content has rendered
  useEffect(() => {
    if (
      selectedCategory &&
      selectedCategory !== "all" &&
      selectedCategory !== "drinks"
    ) {
      const id = `section-${selectedCategory}`;
      const scroll = () => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      const t = requestAnimationFrame(() => {
        requestAnimationFrame(scroll);
      });
      return () => cancelAnimationFrame(t);
    }
  }, [selectedCategory]);

  const handleSelectDrinkSection = useCallback(
    (sectionKey: string) => {
      setSelectedCategory(sectionKey);
      scrollToSection(sectionKey);
      setIsDrinksSheetOpen(false);
    },
    [scrollToSection]
  );

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
          <div className="mt-10 pt-8 border-t border-primary-foreground/20 max-w-2xl mx-auto space-y-3">
            {t(language, "menu.intro").split("\n").map((line, i) => (
              <p key={i} className="font-sans text-sm md:text-base leading-relaxed opacity-95">
                {line}
              </p>
            ))}
          </div>
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
            {categories.map((category) => {
              const isDrinksDropdown = "isDrinks" in category && category.isDrinks;
              const isDrinksSelected =
                selectedCategory === "drinks" ||
                DRINK_SECTION_KEYS.includes(selectedCategory);

              if (isDrinksDropdown) {
                const drinksTrigger = (
                  <Button
                    variant={isDrinksSelected ? "default" : "outline"}
                    className="font-sans text-xs sm:text-sm px-3 py-2 min-h-[44px] sm:min-h-0 touch-manipulation"
                    onClick={isMobile ? () => setIsDrinksSheetOpen(true) : undefined}
                  >
                    {category.label}
                    <ChevronDown className={`ml-1 h-4 w-4 opacity-70 ${isMobile ? "shrink-0" : ""}`} aria-hidden />
                  </Button>
                );

                if (isMobile) {
                  return (
                    <span key="drinks">
                      {drinksTrigger}
                      <Sheet open={isDrinksSheetOpen} onOpenChange={setIsDrinksSheetOpen}>
                        <SheetContent side="bottom" className="rounded-t-2xl pb-8 max-h-[85vh] flex flex-col">
                          <SheetHeader className="text-left space-y-1 pb-4 border-b border-border">
                            <SheetTitle className="font-serif text-xl flex items-center gap-2">
                              <Wine className="h-5 w-5 text-muted-foreground" />
                              {category.label}
                            </SheetTitle>
                            <SheetDescription className="text-sm">
                              {t(language, "menu.drinksSelectHint")}
                            </SheetDescription>
                          </SheetHeader>
                          <nav
                            className="flex-1 overflow-y-auto py-4 -mx-2 px-2"
                            aria-label={t(language, "menu.drinksCategory")}
                          >
                            <ul className="space-y-0.5">
                              {drinkSections.map((section) => (
                                <li key={section.sectionKey}>
                                  <button
                                    type="button"
                                    onClick={() => handleSelectDrinkSection(section.sectionKey)}
                                    className="w-full text-left font-sans text-base py-3.5 px-4 rounded-lg hover:bg-accent hover:text-accent-foreground active:bg-accent/80 transition-colors min-h-[48px] flex items-center touch-manipulation"
                                  >
                                    {section.title}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </nav>
                        </SheetContent>
                      </Sheet>
                    </span>
                  );
                }

                return (
                  <DropdownMenu key="drinks">
                    <DropdownMenuTrigger asChild>{drinksTrigger}</DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="center"
                      side="bottom"
                      sideOffset={8}
                      className="min-w-[min(280px,calc(100vw-2rem))] max-h-[min(70vh,400px)] overflow-y-auto p-1.5 rounded-xl shadow-lg"
                    >
                      {drinkSections.map((section) => (
                        <DropdownMenuItem
                          key={section.sectionKey}
                          onClick={() => handleSelectDrinkSection(section.sectionKey)}
                          className="py-2.5 px-3 text-sm rounded-md cursor-pointer font-sans focus:bg-accent"
                        >
                          {section.title}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.key)}
                  className="font-sans text-xs sm:text-sm px-3 py-2"
                >
                  {category.label}
                </Button>
              );
            })}
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
                <div ref={ref} id={`section-${section.sectionKey}`} key={section.title} className="scroll-mt-28">
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

      {/* Menu disclaimer */}
      <section className="py-10 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <p className="font-sans text-sm text-muted-foreground text-center leading-relaxed max-w-2xl mx-auto">
            {t(language, "menu.disclaimer")}
          </p>
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
                {t(language, "menu.randomDishCategory")}: {randomDish.category}
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
