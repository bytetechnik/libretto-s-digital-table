import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/translations";

const Impressum = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl mb-8 text-center">
            {t(language, "impressum.title")}
          </h1>
          <div className="prose prose-lg max-w-none font-sans space-y-6">
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "impressum.company")}</h2>
              <p>{t(language, "impressum.companyName")}</p>
              <p>{t(language, "impressum.address")}</p>
              <p>{t(language, "impressum.city")}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "impressum.contact")}</h2>
              <p>{t(language, "impressum.phone")}</p>
              <p>{t(language, "impressum.email")}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "impressum.responsible")}</h2>
              <p>{t(language, "impressum.responsibleText")}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Impressum;

