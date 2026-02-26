import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/translations";

/** Google Drive file ID. Replace the file in Drive (same link) to update the weekly menu. Share: "Anyone with the link can view". */
const WOCHENKARTE_DRIVE_ID = "1sUgSR3AHMefETJxeyZXTNVSfuEQ4vzTZ";
/** Cache-bust so a normal reload (F5) fetches the latest image after you update it on Drive. */
const CACHE_BUST = Date.now();
/** Thumbnail URL – clean image without Drive viewer bars; falls back to iframe if blocked. */
const WOCHENKARTE_IMAGE_URL = `https://drive.google.com/thumbnail?id=${WOCHENKARTE_DRIVE_ID}&sz=w1920&v=${CACHE_BUST}`;
const WOCHENKARTE_PREVIEW_URL = `https://drive.google.com/file/d/${WOCHENKARTE_DRIVE_ID}/preview?v=${CACHE_BUST}`;

const Specials = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { language } = useLanguage();
  const [useIframe, setUseIframe] = useState(false);

  return (
    <section ref={ref} id="specials" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className={`text-center mb-16 animate-fade-up ${isVisible ? "visible" : ""}`}>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-foreground mb-6">
            {t(language, "specials.title")}
          </h2>
          <div className="w-24 h-0.5 bg-primary mx-auto mb-8" />
        </div>

        <div className={`animate-fade-up ${isVisible ? "visible stagger-2" : ""}`}>
          <Card className="overflow-hidden shadow-2xl border-2 border-border hover:shadow-3xl transition-shadow duration-300 max-w-3xl mx-auto">
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] bg-muted/30 overflow-hidden">
              {useIframe ? (
                /* Scale iframe so the image fills the frame and top/bottom black bars are clipped */
                <iframe
                  src={WOCHENKARTE_PREVIEW_URL}
                  title={t(language, "specials.title")}
                  className="absolute inset-0 w-full h-full border-0 scale-125 origin-center"
                  allow="autoplay"
                  allowFullScreen
                />
              ) : (
                <img
                  src={WOCHENKARTE_IMAGE_URL}
                  alt={t(language, "specials.title")}
                  className="absolute inset-0 w-full h-full object-contain"
                  onError={() => setUseIframe(true)}
                />
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Specials;
