import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const MenuPreview = () => {
  const categories = [
    {
      title: "Frühstück & Brunch",
      description: "Traditionelles Frühstück und moderne Brunch-Optionen",
    },
    {
      title: "Lunch & Early Dinner",
      description: "Sorgfältig ausgewählte Gerichte mit saisonalen Zutaten",
    },
    {
      title: "Süßes",
      description: "Waffeln, Kaiserschmarrn, Kuchen und Apfelstrudel",
    },
    {
      title: "Drinks & Aperitivo",
      description: "Erlesene Weine, Cocktails und kleine Snacks",
    },
  ];

  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl font-light text-foreground mb-6">
            Unsere Karte
          </h2>
          <div className="w-24 h-0.5 bg-primary mx-auto mb-8" />
          <p className="text-muted-foreground font-sans max-w-2xl mx-auto">
            Von traditionellem Frühstück bis zum stilvollen Aperitivo – entdecken Sie unsere
            vielfältige Auswahl
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {categories.map((category) => (
            <Card
              key={category.title}
              className="p-8 hover:shadow-lg transition-shadow bg-card border-border"
            >
              <h3 className="font-serif text-2xl text-foreground mb-3">{category.title}</h3>
              <p className="text-muted-foreground font-sans text-sm">{category.description}</p>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-4">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-accent font-sans tracking-wide"
          >
            <Link to="/menu">VOLLSTÄNDIGES MENÜ ANSEHEN</Link>
          </Button>
          <div>
            <Button
              asChild
              variant="link"
              className="text-primary hover:text-accent font-sans tracking-wide"
            >
              <a href="#specials">Zu den Tages-Specials</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;
