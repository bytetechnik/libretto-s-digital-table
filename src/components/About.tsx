const About = () => {
  return (
    <section id="about" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl font-light text-foreground mb-6">
            Qualität & Gastfreundschaft
          </h2>
          <div className="w-24 h-0.5 bg-primary mx-auto mb-8" />
        </div>

        <div className="space-y-8 text-foreground/90 font-sans leading-relaxed">
          <p className="text-center text-lg">
            Das Libretto ist ein Ort, an dem Qualität und Gastfreundschaft aufeinandertreffen.
          </p>

          <p>
            In zweiter Generation geführt, arbeiten wir mit regionalen Händlern und ausgewählten
            Lieferanten aus Italien zusammen. Vom frischen Gemüse aus der Kleinmarkthalle bis hin
            zu italienischen Spezialitäten finden Sie bei uns ausschließlich Produkte von höchster
            Qualität.
          </p>

          <p>
            Bei uns bleibt das traditionelle Frühstück lebendig und wird durch moderne Frühstücks-
            und Brunch-Optionen bereichert.
          </p>

          <p>
            Zum Mittag bieten wir Ihnen eine sorgfältige Auswahl an Gerichten, die mit frischen,
            saisonalen Zutaten zubereitet werden – perfekt für eine genussvolle Auszeit am Tag.
          </p>

          <p>
            Der Aperitivo ist bei uns mehr als nur eine Tradition. Er ist eine Einladung, den Tag
            stilvoll ausklingen zu lassen. Mit erlesenen Weinen von lokalen Weingütern sowie
            internationalen Spitzenwinzern und kleinen, feinen Snacks bieten wir die ideale
            Begleitung für entspannte Momente.
          </p>

          <p className="text-center text-xl font-medium italic mt-12">
            Bei uns bleibt das Vertraute erhalten – ergänzt durch frische, zeitgemäße und kreative
            Ideen.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
