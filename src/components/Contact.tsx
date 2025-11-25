import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`text-center mb-16 animate-fade-up ${isVisible ? "visible" : ""}`}
        >
          <h2 className="font-serif text-5xl md:text-6xl text-foreground mb-4">
            Kontakt
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div
              className={`animate-fade-up ${isVisible ? "visible" : ""} stagger-2`}
            >
              <div className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border hover:border-primary transition-colors">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-2">Adresse</h3>
                  <p className="font-sans text-muted-foreground leading-relaxed">
                    Musterstraße 123<br />
                    12345 Berlin<br />
                    Deutschland
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`animate-fade-up ${isVisible ? "visible" : ""} stagger-3`}
            >
              <div className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border hover:border-primary transition-colors">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-2">Telefon</h3>
                  <a
                    href="tel:+49301234567"
                    className="font-sans text-muted-foreground hover:text-primary transition-colors"
                  >
                    +49 30 1234567
                  </a>
                </div>
              </div>
            </div>

            <div
              className={`animate-fade-up ${isVisible ? "visible" : ""} stagger-4`}
            >
              <div className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border hover:border-primary transition-colors">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-2">E-Mail</h3>
                  <a
                    href="mailto:info@libretto.de"
                    className="font-sans text-muted-foreground hover:text-primary transition-colors"
                  >
                    info@libretto.de
                  </a>
                </div>
              </div>
            </div>

            <div
              className={`animate-fade-up ${isVisible ? "visible" : ""} stagger-5`}
            >
              <div className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border hover:border-primary transition-colors">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-2">Öffnungszeiten</h3>
                  <div className="font-sans text-muted-foreground space-y-2">
                    <div className="flex justify-between gap-8">
                      <span>Montag - Freitag:</span>
                      <span className="font-medium">08:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Samstag:</span>
                      <span className="font-medium">09:00 - 00:00</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Sonntag:</span>
                      <span className="font-medium">09:00 - 22:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div
            className={`animate-fade-up ${isVisible ? "visible" : ""} stagger-6`}
          >
            <div className="h-full min-h-[500px] rounded-lg overflow-hidden border-2 border-border shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.409435793997!2d13.404953977144254!3d52.52000097204479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c655f20989%3A0x26bbfb4e84674c63!2sBrandenburger%20Tor!5e0!3m2!1sen!2sde!4v1234567890123!5m2!1sen!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Libretto Restaurant Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
