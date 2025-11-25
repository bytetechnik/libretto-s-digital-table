import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/libretto-logo.jpeg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-primary/95 backdrop-blur-sm z-50 border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Libretto Logo" className="h-12 w-auto brightness-0 invert" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-primary-foreground hover:text-brand-beige transition-colors font-sans text-sm tracking-wide">
              HOME
            </Link>
            <Link to="/menu" className="text-primary-foreground hover:text-brand-beige transition-colors font-sans text-sm tracking-wide">
              MENÜ
            </Link>
            <a
              href="https://www.instagram.com/libretto.ffm/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground hover:text-brand-beige transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <Button
              asChild
              className="bg-brand-beige text-brand-green hover:bg-brand-beige-dark font-sans tracking-wide"
            >
              <a
                href="https://www.opentable.de/restref/client/?rid=445905"
                target="_blank"
                rel="noopener noreferrer"
              >
                RESERVIEREN
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-primary-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/"
              className="block text-primary-foreground hover:text-brand-beige transition-colors font-sans text-sm tracking-wide"
              onClick={() => setIsOpen(false)}
            >
              HOME
            </Link>
            <Link
              to="/menu"
              className="block text-primary-foreground hover:text-brand-beige transition-colors font-sans text-sm tracking-wide"
              onClick={() => setIsOpen(false)}
            >
              MENÜ
            </Link>
            <a
              href="https://www.instagram.com/libretto.ffm/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-primary-foreground hover:text-brand-beige transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Instagram className="h-5 w-5" />
              <span className="font-sans text-sm tracking-wide">INSTAGRAM</span>
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
                RESERVIEREN
              </a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
