import { Instagram, MapPin, Phone, Clock } from "lucide-react";
import logo from "@/assets/libretto-logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div>
            <img src={logo} alt="Libretto Logo" className="h-16 w-auto mb-4 brightness-0 invert" />
            <p className="font-sans text-sm leading-relaxed opacity-90">
              Seit 2007 Ihr Ort für Genuss in Frankfurt. Qualität und Gastfreundschaft seit über
              einem Jahrzehnt.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-serif text-2xl mb-4">Kontakt</h3>
            <div className="space-y-3 font-sans text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p>
                  Liebfrauenberg 24
                  <br />
                  60313 Frankfurt am Main
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <p>069 29 72 01 48</p>
              </div>
              <a
                href="https://www.instagram.com/libretto.ffm/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <Instagram className="h-5 w-5 flex-shrink-0" />
                <p>@libretto.ffm</p>
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-serif text-2xl mb-4">Öffnungszeiten</h3>
            <div className="space-y-2 font-sans text-sm">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Mo - Fr: 8:00 - 23:00</p>
                  <p className="font-medium">Sa - So: 9:00 - 23:00</p>
                  <p className="opacity-90 mt-2 text-xs">
                    Küche: 8:00 - 22:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="font-sans text-sm opacity-75">
            © {new Date().getFullYear()} Libretto Cafe Restaurant Tagesbar. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
