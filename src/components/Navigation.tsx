import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Instagram, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/translations";
import logo from "@/assets/libretto-logo.jpeg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  return (
    <nav className="fixed top-0 w-full bg-[#0f2d1d] backdrop-blur-sm z-50 border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Libretto Logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-primary-foreground hover:text-brand-beige transition-colors font-sans text-sm tracking-wide">
              {t(language, "nav.home")}
            </Link>
            <Link to="/menu" className="text-primary-foreground hover:text-brand-beige transition-colors font-sans text-sm tracking-wide">
              {t(language, "nav.menu")}
            </Link>
            <a
              href="https://www.instagram.com/cafelibretto/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground hover:text-brand-beige transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <button
              onClick={() => setLanguage(language === "de" ? "en" : "de")}
              className="text-primary-foreground hover:text-brand-beige transition-colors flex items-center space-x-1"
              aria-label="Switch language"
            >
              <Languages className="h-5 w-5" />
              <span className="font-sans text-sm tracking-wide">{language.toUpperCase()}</span>
            </button>
            <Button
              asChild
              className="bg-brand-beige text-brand-green hover:bg-brand-beige-dark font-sans tracking-wide"
            >
              <a
                href="https://www.opentable.de/restref/client/?rid=445905"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(language, "nav.reserve")}
              </a>
            </Button>
          </div>

          {/* Mobile Navigation - Language switcher and menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setLanguage(language === "de" ? "en" : "de")}
              className="text-primary-foreground hover:text-brand-beige transition-colors flex items-center space-x-1"
              aria-label="Switch language"
            >
              <Languages className="h-5 w-5" />
              <span className="font-sans text-sm tracking-wide">{language.toUpperCase()}</span>
            </button>
            <button
              className="text-primary-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/"
              className="block text-primary-foreground hover:text-brand-beige transition-colors font-sans text-sm tracking-wide"
              onClick={() => setIsOpen(false)}
            >
              {t(language, "nav.home")}
            </Link>
            <Link
              to="/menu"
              className="block text-primary-foreground hover:text-brand-beige transition-colors font-sans text-sm tracking-wide"
              onClick={() => setIsOpen(false)}
            >
              {t(language, "nav.menu")}
            </Link>
            <a
              href="https://www.instagram.com/cafelibretto/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-primary-foreground hover:text-brand-beige transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Instagram className="h-5 w-5" />
              <span className="font-sans text-sm tracking-wide">{t(language, "nav.instagram")}</span>
            </a>
            <Button
              asChild
              className="w-full bg-brand-beige text-brand-green hover:bg-brand-beige-dark font-sans tracking-wide"
            >
              <a
                href="https://www.opentable.de/restref/client/?rid=445905"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t(language, "nav.reserve")}
              </a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
