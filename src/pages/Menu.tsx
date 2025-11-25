import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Menu = () => {
  const menuSections = [
    {
      title: "Frühstück & Brunch",
      items: [
        {
          name: "Il Dolce Far Niente",
          description:
            "Frischkäse, Pesto, Tomate, Burrata, Manchego, Oliven, Parmaschinken, Salami, Pastrami, Grissini, gekochtes Ei, warmes Focaccia Brot",
          price: "1 Pers. 17.5 / 2 Pers. 32.5",
        },
        {
          name: "Royale",
          description:
            "Frischkäse, Graved Lachs, Tomaten- & Gurkenscheiben, rote Zwiebeln, Kapern, Olivenöl & Maldonsalz, gegrilltes Brioche-Brötchen, Glas Prosecco",
          price: "1 Pers. 18.5 / 2 Pers. 35.5",
        },
        {
          name: "English Breakfast",
          description:
            "Toastbrot, Butter, zwei Spiegeleier, knuspriger Bacon, Nürnberger Rostbratwürste, Baked Beans, gegrillte Tomate & Champignons, Heinz Ketchup, frisch gepresster Orangensaft",
          price: "14.9",
        },
        {
          name: "Shakshuka",
          description:
            "Heiße Schmorpfanne aus der orientalischen Küche mit Tomaten, Zwiebeln, Kreuzkümmel, Paprika, zwei pochierten Eiern, Sesam, Petersilie, Schafskäse & warmem Focaccia Brot",
          price: "13.5",
        },
      ],
    },
    {
      title: "Lunch & Early Dinner",
      items: [
        {
          name: "Caesar Salad",
          description:
            "Römersalat, geröstetes Brot, Parmigiano Reggiano, Caesar Dressing, wahlweise mit gegrilltem Hähnchen oder Garnelen",
          price: "ab 12.5",
        },
        {
          name: "Pasta del Giorno",
          description: "Täglich wechselnde Pasta-Kreation mit frischen, saisonalen Zutaten",
          price: "ab 13.9",
        },
        {
          name: "Risotto",
          description:
            "Cremiger Risotto mit Trüffel, Parmesan und gerösteten Pinienkernen",
          price: "15.5",
        },
      ],
    },
    {
      title: "Süßes",
      items: [
        {
          name: "Belgische Waffeln",
          description: "Mit frischen Beeren, Sahne und Ahornsirup",
          price: "9.5",
        },
        {
          name: "Kaiserschmarrn",
          description: "Traditioneller österreichischer Kaiserschmarrn mit Zwetschgenröster",
          price: "11.5",
        },
        {
          name: "Hausgemachter Apfelstrudel",
          description: "Warm serviert mit Vanillesauce",
          price: "8.5",
        },
        {
          name: "Kuchen der Woche",
          description: "Wechselnde Auswahl von renommierten Konditoreien",
          price: "ab 5.5",
        },
      ],
    },
    {
      title: "Drinks & Aperitivo",
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center animate-fade-in">
          <h1 className="font-serif text-6xl md:text-7xl font-light mb-6">Unsere Karte</h1>
          <div className="w-24 h-0.5 bg-primary-foreground mx-auto mb-8" />
          <p className="font-sans text-lg leading-relaxed max-w-2xl mx-auto">
            Von traditionellem Frühstück bis zum stilvollen Aperitivo – genießen Sie unsere
            vielfältige Auswahl mit höchster Qualität
          </p>
        </div>
      </section>

      {/* Menu Sections */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-16">
          {menuSections.map((section, sectionIndex) => {
            const SectionWrapper = () => {
              const { ref, isVisible } = useScrollAnimation(0.1);
              
              return (
                <div ref={ref} key={section.title}>
                  <h2 className={`font-serif text-4xl md:text-5xl text-foreground mb-8 text-center animate-fade-up ${isVisible ? 'visible' : ''}`}>
                    {section.title}
                  </h2>
                  <div className="space-y-6">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={item.name}
                        className={`animate-slide-in ${isVisible ? 'visible' : ''}`}
                        style={{ animationDelay: `${itemIndex * 0.05}s` }}
                      >
                        <Card className="p-6 bg-card hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2">
                                {item.name}
                              </h3>
                              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                            <div className="font-sans font-medium text-foreground whitespace-nowrap">
                              €{item.price}
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
          })}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      <Footer />
    </div>
  );
};

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  
  return (
    <section ref={ref} className="py-16 px-4 bg-secondary/30">
      <div className={`container mx-auto max-w-2xl text-center animate-fade-up ${isVisible ? 'visible' : ''}`}>
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
          Reservieren Sie Ihren Tisch
        </h2>
        <p className="font-sans text-muted-foreground mb-8">
          Sichern Sie sich Ihren Platz für ein unvergessliches kulinarisches Erlebnis
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
            JETZT RESERVIEREN
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Menu;
