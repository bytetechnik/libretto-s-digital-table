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
import { Search, Sparkles, ChevronDown, Wine, Coffee, UtensilsCrossed } from "lucide-react";
import { useState, useMemo, useCallback, useEffect } from "react";

type SuggestionItem = { name: string; description?: string; price: string; category: string };

// All drink section keys (order matches menu structure)
const DRINK_SECTION_KEYS = [
  "erfrischungsgetraenke",
  "frischGepresste",
  "smoothies",
  "bierUndApfelwein",
  "schaumweinChampagner",
  "champagner",
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

// Get current hour in German time (Europe/Berlin)
const getGermanHour = (): number => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("de-DE", { timeZone: "Europe/Berlin", hour: "numeric", hour12: false });
  return parseInt(formatter.format(now), 10);
};

// Breakfast & Brunch menu (only)
const BREAKFAST_MENU_STRUCTURE = [
  {
    sectionKey: "herzhaftesFruehstueck",
    itemKeys: [
      { key: "leMax", price: "15" },
      { key: "avocadoUndEi", price: "16" },
      { key: "uovaInPurgatorio", price: "13" },
      { key: "briocheLox", price: "14" },
      { key: "croqueMadame", price: "15" },
      { key: "eggsBenedict", price: "16" },
      { key: "steakAndEggs", price: "19" },
    ],
  },
  {
    sectionKey: "bowlsMuesli",
    itemKeys: [
      { key: "acaiBowl", price: "13" },
      { key: "granolaMuesli", price: "11" },
      { key: "apfelZimtPorridge", price: "10" },
    ],
  },
  {
    sectionKey: "eierspeisenOmelettes",
    itemKeys: [
      { key: "ruehreiSpiegelei", price: "7.5 | 9.5 | 10" },
      { key: "zweiEierImGlas", price: "6.5" },
      { key: "mumbaiMorningOmelette", price: "15" },
      { key: "bauernOmelette", price: "14" },
      { key: "sophiaLorenOmelette", price: "14" },
    ],
  },
  {
    sectionKey: "fruehstueckSuesses",
    itemKeys: [
      { key: "pancakesCallebaut", price: "11" },
      { key: "klassischeWaffeln", price: "8" },
      { key: "frenchToast", price: "12" },
    ],
  },
  {
    sectionKey: "fruehstueckSets",
    itemKeys: [
      { key: "julesVerne", price: "13" },
      { key: "goethe", price: "14" },
      { key: "fitness", price: "16" },
      { key: "signatureEtagere", price: "40" },
      { key: "shakespeare", price: "15" },
      { key: "stoltze", price: "6.5" },
      { key: "levante", price: "16" },
      { key: "extras", price: "—" },
      { key: "zweiHalbeBelegteBroetchen", price: "6.5" },
    ],
  },
  {
    sectionKey: "kaffee",
    itemKeys: [
      { key: "cafeCreme", price: "3.8 | 4.9" },
      { key: "kaennchenCafeCreme", price: "6.5" },
      { key: "espressoDoppio", price: "3 | 4.7" },
      { key: "espressoMacchiatoDoppio", price: "3.2 | 4.9" },
      { key: "macchiato", price: "3.8" },
      { key: "americano", price: "3.8" },
      { key: "latteMacchiato", price: "5" },
      { key: "cappuccino", price: "3.9 | 5.5" },
      { key: "grandCafeAuLait", price: "5" },
      { key: "flatWhite", price: "4.9" },
      { key: "cortado", price: "4.5" },
      { key: "icedAmericano", price: "5" },
      { key: "icedLatte", price: "5.5" },
    ],
  },
  {
    sectionKey: "brunchDrinks",
    itemKeys: [
      { key: "mimosa", price: "8" },
      { key: "ginBellini", price: "10" },
      { key: "espressoMartiniBrunch", price: "12" },
      { key: "mimosaTable", price: "49" },
    ],
  },
  {
    sectionKey: "champagner",
    itemKeys: [
      { key: "perrierJouetGrandBrut", price: "99" },
      { key: "perrierJouetBlasonRose", price: "120" },
      { key: "ruinartBrut", price: "125" },
      { key: "ruinartRose", price: "155" },
      { key: "moetChandonIceImperialRose", price: "125" },
    ],
  },
  {
    sectionKey: "schaumweinChampagner",
    itemKeys: [
      { key: "carpeNoctemProseccoBrut", price: "7.5 | 35" },
      { key: "carpeNoctemProseccoRose", price: "7.5 | 35" },
      { key: "chandonGardenSpritz", price: "38" },
    ],
  },
  {
    sectionKey: "smoothies",
    itemKeys: [
      { key: "purpleAcai", price: "7.5" },
      { key: "palmGarden", price: "7.5" },
      { key: "pescaDOro", price: "7.5" },
      { key: "optionalIngwer", price: "+ 0,5" },
    ],
  },
  {
    sectionKey: "frischGepresste",
    itemKeys: [
      { key: "orangensaft", price: "6.5" },
      { key: "pinkGrapefruitsaft", price: "6.5" },
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
    sectionKey: "heissgetraenke",
    itemKeys: [
      { key: "chaiLatte", price: "5.5" },
      { key: "pumpkinSpiceLatte", price: "5.5" },
      { key: "heisseSchokolade", price: "5" },
      { key: "mochachino", price: "6" },
    ],
  },
];

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [menuPart, setMenuPart] = useState<"breakfast" | "speisen">("breakfast");
  const [randomSuggestion, setRandomSuggestion] = useState<{ food: SuggestionItem; drink: SuggestionItem } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrinksSheetOpen, setIsDrinksSheetOpen] = useState(false);
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  // SPEISEN & GETRÄNKE: all food sections + drinks (no breakfast)
  const SPEISEN_GETRAENKE_MENU_STRUCTURE = [
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
      sectionKey: "frischGepresste",
      itemKeys: [
        { key: "orangensaft", price: "6.5" },
        { key: "pinkGrapefruitsaft", price: "6.5" },
      ],
    },
    {
      sectionKey: "smoothies",
      itemKeys: [
        { key: "purpleAcai", price: "7.5" },
        { key: "palmGarden", price: "7.5" },
        { key: "pescaDOro", price: "7.5" },
        { key: "optionalIngwer", price: "+ 0,5" },
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
      ],
    },
    {
      sectionKey: "champagner",
      itemKeys: [
        { key: "perrierJouetGrandBrut", price: "99" },
        { key: "perrierJouetBlasonRose", price: "120" },
        { key: "ruinartBrut", price: "125" },
        { key: "ruinartRose", price: "155" },
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
        { key: "macchiato", price: "3.8" },
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
        { key: "mochachino", price: "6" },
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

  const currentMenuStructure = menuPart === "breakfast" ? BREAKFAST_MENU_STRUCTURE : SPEISEN_GETRAENKE_MENU_STRUCTURE;

  // Combined structure (breakfast + speisen) for search: merge by sectionKey, breakfast order first then speisen-only
  const combinedMenuStructure = useMemo(() => {
    const merged = new Map<string, { sectionKey: string; itemKeys: Array<{ key: string; price: string }> }>();
    for (const section of BREAKFAST_MENU_STRUCTURE) {
      merged.set(section.sectionKey, { sectionKey: section.sectionKey, itemKeys: [...section.itemKeys] });
    }
    for (const section of SPEISEN_GETRAENKE_MENU_STRUCTURE) {
      const existing = merged.get(section.sectionKey);
      if (existing) {
        const keys = new Set(existing.itemKeys.map((i) => i.key));
        for (const item of section.itemKeys) {
          if (!keys.has(item.key)) {
            existing.itemKeys.push(item);
            keys.add(item.key);
          }
        }
      } else {
        merged.set(section.sectionKey, { sectionKey: section.sectionKey, itemKeys: [...section.itemKeys] });
      }
    }
    const result: Array<{ sectionKey: string; itemKeys: Array<{ key: string; price: string }> }> = [];
    for (const section of BREAKFAST_MENU_STRUCTURE) {
      result.push(merged.get(section.sectionKey)!);
    }
    for (const section of SPEISEN_GETRAENKE_MENU_STRUCTURE) {
      if (!result.some((s) => s.sectionKey === section.sectionKey)) {
        result.push(merged.get(section.sectionKey)!);
      }
    }
    return result;
  }, []);

  // When searching, show all food menus; when not searching, show current tab only
  const structureForDisplay = searchTerm.trim()
    ? combinedMenuStructure
    : currentMenuStructure;

  // Generate menu sections with translations
  const menuSections = useMemo(() => {
    return structureForDisplay.map((section) => {
      const sectionTitle = t(language, `menu.sections.${section.sectionKey}.title`);
const sectionSubtitle = (section.sectionKey === "suppen" || section.sectionKey === "salate" || section.sectionKey === "eierspeisenOmelettes" || section.sectionKey === "kaffee" || section.sectionKey === "teeImGlas" || section.sectionKey === "premiumKaennchentee" || section.sectionKey === "frischGepresste" || section.sectionKey === "smoothies" || section.sectionKey === "likoereDigestifs")
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
  }, [language, structureForDisplay]);

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

  // Build flat list of translated items from a menu structure (array of { sectionKey, itemKeys })
  const buildTranslatedItems = (
    structure: Array<{ sectionKey: string; itemKeys: Array<{ key: string; price: string }> }>
  ): SuggestionItem[] => {
    return structure.flatMap((section) => {
      const sectionTitle = t(language, `menu.sections.${section.sectionKey}.title`);
      return section.itemKeys.map((item) => ({
        name: t(language, `menu.sections.${section.sectionKey}.items.${item.key}.name`),
        description: t(language, `menu.sections.${section.sectionKey}.items.${item.key}.description`),
        price: item.price,
        category: sectionTitle,
      }));
    });
  };

  // Get random suggestion: 1 food + 1 drink. 06:00–12:00 German time = Breakfast & Brunch only; after 12 = both menus.
  const getRandomDish = () => {
    const hour = getGermanHour();
    const isBreakfastTime = hour >= 6 && hour < 12;

    const breakfastFoodSections = BREAKFAST_MENU_STRUCTURE.filter(
      (s) => !DRINK_SECTION_KEYS.includes(s.sectionKey)
    );
    const breakfastDrinkSections = BREAKFAST_MENU_STRUCTURE.filter((s) =>
      DRINK_SECTION_KEYS.includes(s.sectionKey)
    );
    const speisenFoodSections = SPEISEN_GETRAENKE_MENU_STRUCTURE.filter(
      (s) => !DRINK_SECTION_KEYS.includes(s.sectionKey)
    );
    const speisenDrinkSections = SPEISEN_GETRAENKE_MENU_STRUCTURE.filter((s) =>
      DRINK_SECTION_KEYS.includes(s.sectionKey)
    );

    const foodStructure = isBreakfastTime
      ? breakfastFoodSections
      : [...breakfastFoodSections, ...speisenFoodSections];
    const drinkStructure = isBreakfastTime
      ? breakfastDrinkSections
      : (() => {
          const merged = new Map<string, { sectionKey: string; itemKeys: Array<{ key: string; price: string }> }>();
          for (const section of [...breakfastDrinkSections, ...speisenDrinkSections]) {
            const existing = merged.get(section.sectionKey);
            if (existing) {
              const existingKeys = new Set(existing.itemKeys.map((i) => i.key));
              for (const item of section.itemKeys) {
                if (!existingKeys.has(item.key)) {
                  existing.itemKeys.push(item);
                  existingKeys.add(item.key);
                }
              }
            } else {
              merged.set(section.sectionKey, { sectionKey: section.sectionKey, itemKeys: [...section.itemKeys] });
            }
          }
          return Array.from(merged.values());
        })();

    const foodItems = buildTranslatedItems(foodStructure);
    const drinkItems = buildTranslatedItems(drinkStructure);
    if (foodItems.length === 0 || drinkItems.length === 0) {
      setRandomSuggestion(null);
      setIsDialogOpen(true);
      return;
    }
    const food = foodItems[Math.floor(Math.random() * foodItems.length)];
    const drink = drinkItems[Math.floor(Math.random() * drinkItems.length)];
    setRandomSuggestion({ food, drink });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />

      {/* Header */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14 md:pb-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-4 md:mb-6">{t(language, "menu.title")}</h1>
          <div className="w-24 h-0.5 bg-primary-foreground mx-auto mb-6 md:mb-8" />
          <p className="font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto px-0">
            {t(language, "menu.subtitle")}
          </p>
          <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-primary-foreground/20 max-w-2xl mx-auto space-y-2 md:space-y-3">
            {t(language, menuPart === "breakfast" ? "menu.introBreakfast" : "menu.intro").split("\n").map((line, i) => (
              <p key={i} className="font-sans text-sm md:text-base leading-relaxed opacity-95">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Menu part tabs: Breakfast & Brunch | Speisen & Getränke (card style with icons) */}
      <section className="pt-4 sm:pt-6 pb-6 sm:pb-8 px-4 border-b border-border bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
            <Card
              role="button"
              tabIndex={0}
              onClick={() => {
                setMenuPart("breakfast");
                setSelectedCategory("all");
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    document.getElementById("menu-category-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  });
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setMenuPart("breakfast");
                  setSelectedCategory("all");
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      document.getElementById("menu-category-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    });
                  });
                }
              }}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                menuPart === "breakfast"
                  ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left min-h-[72px] sm:min-h-0">
                <div className={`flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                  menuPart === "breakfast" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
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
              onClick={() => {
                setMenuPart("speisen");
                setSelectedCategory("all");
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    document.getElementById("menu-category-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  });
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setMenuPart("speisen");
                  setSelectedCategory("all");
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      document.getElementById("menu-category-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    });
                  });
                }
              }}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                menuPart === "speisen"
                  ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left min-h-[72px] sm:min-h-0">
                <div className={`flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                  menuPart === "speisen" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
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

      {/* Search and Filter Section */}
      <section id="menu-category-section" className="py-5 sm:py-6 md:py-8 px-4 bg-secondary/20 border-b border-border scroll-mt-24 sm:scroll-mt-28">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col gap-3 sm:gap-4 items-stretch">
            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder={t(language, "menu.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background min-h-[44px] sm:min-h-[40px] text-base sm:text-sm"
              />
            </div>

            {/* Random Dish Button */}
            <Button
              onClick={getRandomDish}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-sans tracking-wide group w-full md:w-auto md:self-center min-h-[48px] touch-manipulation"
            >
              <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform shrink-0" />
              {t(language, "menu.surprise")}
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mt-4 sm:mt-6 justify-center">
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
                  className="font-sans text-xs sm:text-sm px-3 py-2 min-h-[44px] sm:min-h-0 touch-manipulation"
                >
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Sections */}
      <section className="py-10 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-10 sm:space-y-12 md:space-y-16">
          {filteredSections.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <p className="text-muted-foreground text-base sm:text-lg px-4">
                {t(language, "menu.noResults")}
              </p>
            </div>
          ) : (
            filteredSections.map((section, sectionIndex) => {
            const SectionWrapper = () => {
              const { ref, isVisible } = useScrollAnimation(0.1);
              
              return (
                <div ref={ref} id={`section-${section.sectionKey}`} key={section.title} className="scroll-mt-24 sm:scroll-mt-28">
                  <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 sm:mb-4 text-center animate-fade-up ${isVisible ? 'visible' : ''}`}>
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className={`font-sans text-sm md:text-base text-muted-foreground mb-6 sm:mb-8 text-center italic animate-fade-up px-2 ${isVisible ? 'visible' : ''}`}>
                      {section.subtitle}
                    </p>
                  )}
                  {!section.subtitle && <div className="mb-6 sm:mb-8" />}
                  <div className="space-y-4 sm:space-y-6">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={item.name}
                        className={`animate-slide-in ${isVisible ? 'visible' : ''}`}
                        style={{ animationDelay: `${itemIndex * 0.05}s` }}
                      >
                        <Card className="p-4 sm:p-6 bg-card hover:shadow-md transition-shadow">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl text-foreground mb-1.5 sm:mb-2 break-words">
                                {item.name}
                              </h3>
                              {item.description && (
                                <p className="font-sans text-sm text-muted-foreground leading-relaxed break-words">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            <div className="font-sans font-medium text-foreground text-left sm:text-right sm:min-w-[100px] md:min-w-[120px] shrink-0">
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
      <section className="py-8 sm:py-10 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <p className="font-sans text-xs sm:text-sm text-muted-foreground text-center leading-relaxed max-w-2xl mx-auto px-1">
            {t(language, "menu.disclaimer")}
          </p>
        </div>
      </section>

      {/* Random Dish Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col p-4 sm:p-6">
          <DialogHeader className="shrink-0">
            <DialogTitle className="font-serif text-2xl sm:text-3xl flex items-center gap-2">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-accent shrink-0" />
              {t(language, "menu.randomDishTitle")}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              {t(language, "menu.randomDishDescription")}
            </DialogDescription>
          </DialogHeader>
          {randomSuggestion && (
            <div className="space-y-5 pt-4 overflow-y-auto min-h-0 -mx-1 px-1">
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider text-accent font-semibold">
                  {t(language, "menu.randomDishCategory")}: {randomSuggestion.food.category}
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-foreground break-words">
                  {randomSuggestion.food.name}
                </h3>
                {randomSuggestion.food.description && (
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {randomSuggestion.food.description}
                  </p>
                )}
                <div className="font-sans font-semibold text-foreground">
                  €{randomSuggestion.food.price}
                </div>
              </div>
              <div className="border-t border-border pt-4 space-y-3">
                <div className="text-xs uppercase tracking-wider text-accent font-semibold">
                  {t(language, "menu.randomDishDrink")}: {randomSuggestion.drink.category}
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-foreground break-words">
                  {randomSuggestion.drink.name}
                </h3>
                {randomSuggestion.drink.description && (
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {randomSuggestion.drink.description}
                  </p>
                )}
                <div className="font-sans font-semibold text-foreground">
                  €{randomSuggestion.drink.price}
                </div>
              </div>
              <Button
                onClick={getRandomDish}
                variant="outline"
                className="w-full mt-4 min-h-[44px] touch-manipulation shrink-0"
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
    <section ref={ref} className="py-10 sm:py-12 md:py-16 px-4 bg-secondary/30">
      <div className={`container mx-auto max-w-2xl text-center animate-fade-up ${isVisible ? 'visible' : ''}`}>
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
