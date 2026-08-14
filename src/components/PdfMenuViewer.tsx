import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type { PDFPageProxy } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/translations";
import { cn } from "@/lib/utils";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const MIN_SCALE = 1;
const MAX_SCALE = 2.4;
const SCALE_STEP = 0.2;
const DOUBLE_TAP_MS = 280;

type PdfMenuViewerProps = {
  file: string;
  title: string;
};

const clampScale = (value: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

const touchDistance = (touches: TouchList) => {
  const a = touches[0];
  const b = touches[1];
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
};

const PdfMenuViewer = ({ file, title }: PdfMenuViewerProps) => {
  const { language } = useLanguage();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scaleRef = useRef(1);
  const pinchStartDistance = useRef(0);
  const pinchStartScale = useRef(1);
  const lastTapAt = useRef(0);
  const didPinch = useRef(false);
  const [containerWidth, setContainerWidth] = useState(320);
  const [pageRatio, setPageRatio] = useState<number | null>(null);
  const [pageBoxHeight, setPageBoxHeight] = useState<number | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [visiblePage, setVisiblePage] = useState(1);
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  scaleRef.current = scale;

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const updateSize = () => {
      setContainerWidth(Math.max(Math.floor(el.clientWidth), 240));
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    window.addEventListener("resize", updateSize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    setNumPages(0);
    setVisiblePage(1);
    setIsLoading(true);
    setHasError(false);
    setScale(1);
    setPageRatio(null);
    setPageBoxHeight(null);
    scrollerRef.current?.scrollTo({ top: 0, left: 0 });
  }, [file]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root || numPages === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const page = Number(visible?.target.getAttribute("data-page"));
        if (page) setVisiblePage(page);
      },
      { root, threshold: [0.45, 0.7] }
    );

    pageRefs.current.forEach((pageEl) => {
      if (pageEl) observer.observe(pageEl);
    });

    return () => observer.disconnect();
  }, [numPages, file]);

  const renderedWidth = Math.floor(containerWidth * scale);
  const isZoomed = scale > 1.02;

  useEffect(() => {
    if (isZoomed) return;
    const firstPage = pageRefs.current[0];
    const canvas = firstPage?.querySelector("canvas");
    const height = canvas?.getBoundingClientRect().height;
    if (height && height > 0) {
      setPageBoxHeight(Math.round(height));
    }
  }, [renderedWidth, numPages, isZoomed]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        pinchStartDistance.current = touchDistance(event.touches);
        pinchStartScale.current = scaleRef.current;
        lastTapAt.current = 0;
        didPinch.current = true;
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 2 || pinchStartDistance.current <= 0) return;
      event.preventDefault();
      didPinch.current = true;
      const ratio = touchDistance(event.touches) / pinchStartDistance.current;
      setScale(clampScale(pinchStartScale.current * ratio));
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (event.touches.length === 0) {
        pinchStartDistance.current = 0;
        if (didPinch.current) {
          didPinch.current = false;
          lastTapAt.current = 0;
          return;
        }
      }

      if (event.touches.length > 0 || event.changedTouches.length !== 1) return;

      const now = Date.now();
      if (now - lastTapAt.current < DOUBLE_TAP_MS) {
        lastTapAt.current = 0;
        setScale((current) => (current > 1.05 ? 1 : 1.6));
      } else {
        lastTapAt.current = now;
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const boxHeight =
    !isZoomed && pageBoxHeight
      ? pageBoxHeight
      : pageRatio
        ? Math.round(renderedWidth * pageRatio)
        : undefined;

  const handleFirstPage = (page: PDFPageProxy) => {
    const viewport = page.getViewport({ scale: 1 });
    if (viewport.width > 0) {
      setPageRatio(viewport.height / viewport.width);
    }
    requestAnimationFrame(() => {
      const firstPage = pageRefs.current[0];
      const canvas = firstPage?.querySelector("canvas");
      const height = canvas?.getBoundingClientRect().height ?? firstPage?.getBoundingClientRect().height;
      if (height && height > 0) {
        setPageBoxHeight(Math.round(height));
      }
    });
  };

  return (
    <Card className="overflow-hidden shadow-2xl border-2 border-border max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4 border-b border-border bg-secondary/30">
        <p className="font-serif text-sm sm:text-base text-foreground truncate min-w-0">
          {title}
          {numPages > 0 && (
            <span className="font-sans text-xs sm:text-sm text-muted-foreground ml-2">
              {t(language, "menu.pdfPageOf")
                .replace("{current}", String(visiblePage))
                .replace("{total}", String(numPages))}
            </span>
          )}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-12 w-12 min-h-[48px] min-w-[48px] touch-manipulation active:scale-95"
            onClick={() => setScale((s) => clampScale(s - SCALE_STEP))}
            disabled={scale <= MIN_SCALE}
            aria-label={t(language, "menu.pdfZoomOut")}
          >
            <Minus className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-12 w-12 min-h-[48px] min-w-[48px] touch-manipulation active:scale-95"
            onClick={() => setScale((s) => clampScale(s + SCALE_STEP))}
            disabled={scale >= MAX_SCALE}
            aria-label={t(language, "menu.pdfZoomIn")}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className={cn(
          "pdf-menu-scroller relative w-full bg-white overflow-auto select-none",
          isZoomed ? "pdf-menu-scroller--zoomed" : "pdf-menu-scroller--paged",
          numPages > 1 && "pdf-menu-scroller--scroll",
        )}
        style={boxHeight ? { height: boxHeight } : { minHeight: 280 }}
        role="region"
        aria-label={title}
      >
        {isLoading && !hasError && (
          <div className="flex h-full items-center justify-center p-3">
            <div className="w-full">
              <Skeleton className="w-full aspect-[1/1.4]" />
              <p className="font-sans text-sm text-muted-foreground text-center mt-3">
                {t(language, "menu.pdfLoading")}
              </p>
            </div>
          </div>
        )}

        {hasError ? (
          <div className="p-8 sm:p-12 text-center">
            <p className="font-sans text-sm sm:text-base text-muted-foreground">
              {t(language, "menu.pdfError")}
            </p>
          </div>
        ) : (
          <Document
            key={file}
            file={file}
            className="block w-full"
            onLoadSuccess={({ numPages: next }) => {
              setNumPages(next);
              setVisiblePage(1);
              setIsLoading(false);
            }}
            onLoadError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            loading=""
          >
            {Array.from({ length: numPages }, (_, index) => (
              <div
                key={`${file}-${index + 1}`}
                data-page={index + 1}
                ref={(el) => {
                  pageRefs.current[index] = el;
                }}
                className="pdf-menu-page w-full overflow-hidden bg-white leading-none"
              >
                <Page
                  pageNumber={index + 1}
                  width={renderedWidth}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  onLoadSuccess={index === 0 ? handleFirstPage : undefined}
                />
              </div>
            ))}
          </Document>
        )}
      </div>
    </Card>
  );
};

export default PdfMenuViewer;
