import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/translations";

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { language } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`text-center mb-16 animate-fade-up ${isVisible ? "visible" : ""}`}
        >
          <h2 className="font-serif text-5xl md:text-6xl text-foreground mb-4">
            {t(language, "contact.title")}
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
                  <h3 className="font-serif text-xl text-foreground mb-2">{t(language, "contact.address")}</h3>
                  <p className="font-sans text-muted-foreground leading-relaxed">
                    Liebfrauenberg 24<br />
                    60313 Frankfurt am Main<br />
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
                  <h3 className="font-serif text-xl text-foreground mb-2">{t(language, "contact.phone")}</h3>
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
                  <h3 className="font-serif text-xl text-foreground mb-2">{t(language, "contact.email")}</h3>
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
                  <h3 className="font-serif text-xl text-foreground mb-2">{t(language, "contact.hours")}</h3>
                  <div className="font-sans text-muted-foreground space-y-2">
                    <div className="flex justify-between gap-8">
                      <span>{t(language, "contact.weekdays")}</span>
                      <span className="font-medium">09:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>{t(language, "contact.sunday")}</span>
                      <span className="font-medium">{t(language, "contact.closed")}</span>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3034.9537485855835!2d8.681836076813578!3d50.11331641158051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd0ea5b1608a9b%3A0x2debb2591f7a58d2!2sCaf%C3%A9%20Libretto!5e1!3m2!1sen!2sde!4v1764079307959!5m2!1sen!2sde"
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
