import { Instagram, MapPin, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/translations";
import logo from "@/assets/libretto-logo.jpeg";

const Footer = () => {
  const { language } = useLanguage();
  return (
    <footer className="bg-[#0f2d1d] text-primary-foreground py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div>
            <img src={logo} alt="Libretto Logo" className="h-16 w-auto mb-4" />
            <p className="font-sans text-sm leading-relaxed opacity-90">
              {t(language, "footer.description")}
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-serif text-2xl mb-4">{t(language, "footer.contact")}</h3>
            <div className="space-y-3 font-sans text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p>
                  Hasengasse 4
                  <br />
                  60311 Frankfurt am Main
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <p>06920019010</p>
              </div>
              <a
              href="https://www.instagram.com/cafelibretto/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <Instagram className="h-5 w-5 flex-shrink-0" />
                <p>@cafelibretto</p>
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-serif text-2xl mb-4">{t(language, "footer.hours")}</h3>
            <div className="space-y-2 font-sans text-sm">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Mo - Sa: 9:00 - 20:00</p>
                  <p className="font-medium">So: Geschlossen</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center space-y-2">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link
              to="/impressum"
              className="font-sans text-sm opacity-75 hover:opacity-100 underline transition-opacity"
            >
              {t(language, "footer.impressum")}
            </Link>
            <span className="font-sans text-sm opacity-75">|</span>
            <Link
              to="/datenschutz"
              className="font-sans text-sm opacity-75 hover:opacity-100 underline transition-opacity"
            >
              {t(language, "footer.dataPrivacy")}
            </Link>
          </div>
          <p className="font-sans text-sm opacity-75">
            © {new Date().getFullYear()} Libretto Cafe Restaurant Tagesbar. {t(language, "footer.rights")}
          </p>
          <p className="font-sans text-xs opacity-60">
            {t(language, "footer.developedBy")}{" "}
            <a
              href="https://bytetechnik.de"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
            >
              ByteTechnik.de
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
