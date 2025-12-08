import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/translations";

const DataPrivacy = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl mb-8 text-center">
            {t(language, "dataPrivacy.title")}
          </h1>
          <div className="prose prose-lg max-w-none font-sans space-y-6">
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "dataPrivacy.intro")}</h2>
              <p>{t(language, "dataPrivacy.introText")}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "dataPrivacy.dataCollection")}</h2>
              <p>{t(language, "dataPrivacy.dataCollectionText")}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "dataPrivacy.dataUsage")}</h2>
              <p>{t(language, "dataPrivacy.dataUsageText")}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "dataPrivacy.rights")}</h2>
              <p>{t(language, "dataPrivacy.rightsText")}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "dataPrivacy.contact")}</h2>
              <p>{t(language, "dataPrivacy.contactText")}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DataPrivacy;

