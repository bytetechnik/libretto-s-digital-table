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
          <div className="prose prose-lg max-w-none font-sans space-y-8">
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "dataPrivacy.intro")}</h2>
              <p>{t(language, "dataPrivacy.introText")}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "dataPrivacy.controller")}</h2>
              <p>{t(language, "dataPrivacy.controllerText")}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "dataPrivacy.noContactForm")}</h2>
              <p>{t(language, "dataPrivacy.noContactFormText")}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "dataPrivacy.serverLogs")}</h2>
              <p>{t(language, "dataPrivacy.serverLogsText")}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "dataPrivacy.cookies")}</h2>
              <p>{t(language, "dataPrivacy.cookiesText")}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "dataPrivacy.thirdParty")}</h2>
              <p>{t(language, "dataPrivacy.thirdPartyText")}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "dataPrivacy.legalBasis")}</h2>
              <p>{t(language, "dataPrivacy.legalBasisText")}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "dataPrivacy.retention")}</h2>
              <p>{t(language, "dataPrivacy.retentionText")}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "dataPrivacy.rights")}</h2>
              <p>{t(language, "dataPrivacy.rightsText")}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "dataPrivacy.complaint")}</h2>
              <p>{t(language, "dataPrivacy.complaintText")}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl mb-4">{t(language, "dataPrivacy.changes")}</h2>
              <p>{t(language, "dataPrivacy.changesText")}</p>
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

