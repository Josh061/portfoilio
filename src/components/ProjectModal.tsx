import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, Github, Smartphone, Check, ZoomIn } from 'lucide-react';
import type { Project } from '../App';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const screenshots = project.screenshots || [];
  const hasScreenshots = screenshots.length > 0;

  // Keyboard navigation & locking body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && hasScreenshots && !isLightboxOpen) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && hasScreenshots && !isLightboxOpen) {
        handlePrev();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, hasScreenshots, isLightboxOpen]);

  const handleNext = () => {
    if (!hasScreenshots) return;
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const handlePrev = () => {
    if (!hasScreenshots) return;
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-[fadeIn_0.25s_ease-out]"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-5xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-900 rounded-2xl shadow-2xl flex flex-col md:grid md:grid-cols-12 max-h-[90vh] overflow-hidden transition-all duration-300"
      >
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100/80 dark:bg-slate-900/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 cursor-pointer border border-slate-200/50 dark:border-slate-800 transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: CAROUSEL/SCREENSHOTS */}
        <div className="col-span-6 bg-slate-950 dark:bg-slate-900 flex flex-col justify-between p-4 md:p-6 border-b md:border-b-0 md:border-r border-slate-200/40 dark:border-slate-900 relative min-h-[300px] md:min-h-[500px] max-h-[45vh] md:max-h-none">
          {hasScreenshots ? (
            <>
              {/* MAIN IMAGE HOLDER */}
              <div className="relative flex-1 flex items-center justify-center overflow-hidden rounded-xl bg-slate-900/50 group select-none">
                <img 
                  src={screenshots[currentIndex]} 
                  alt={`${project.title} screenshot ${currentIndex + 1}`}
                  className="max-w-full max-h-[220px] md:max-h-[360px] object-contain rounded-lg transition-all duration-500 hover:scale-[1.01]"
                />
                
                {/* PREV/NEXT OVERLAY BUTTONS */}
                {screenshots.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrev}
                      className="absolute left-3 p-2 rounded-full bg-slate-950/70 text-white border border-white/10 hover:bg-emerald-500 hover:text-slate-950 hover:border-transparent transition-all duration-350 cursor-pointer opacity-80 hover:opacity-100 shadow-md"
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleNext}
                      className="absolute right-3 p-2 rounded-full bg-slate-950/70 text-white border border-white/10 hover:bg-emerald-500 hover:text-slate-950 hover:border-transparent transition-all duration-350 cursor-pointer opacity-80 hover:opacity-100 shadow-md"
                      aria-label="Next screenshot"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* ZOOM / LIGHTBOX TRIGGER */}
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-slate-950/60 text-white border border-white/10 hover:bg-emerald-500 hover:text-slate-950 hover:border-transparent cursor-pointer transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-md"
                  title="View full image"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {/* SLIDE COUNT INDICATOR */}
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider bg-slate-950/65 text-slate-300 border border-white/5 backdrop-blur-sm">
                  {currentIndex + 1} / {screenshots.length}
                </span>
              </div>

              {/* THUMBNAILS GALLERY */}
              {screenshots.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto py-2.5 px-0.5 mt-3 scrollbar-thin select-none max-h-[80px]">
                  {screenshots.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 bg-slate-900 cursor-pointer transition-all ${
                        currentIndex === idx 
                          ? 'border-emerald-500 scale-105 shadow-md shadow-emerald-500/20' 
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={src} 
                        alt="Thumbnail" 
                        className="w-full h-full object-cover" 
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* PLACEHOLDER / DUMMY PREVIEW FOR PROJECTS WITHOUT SCREENSHOTS */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-900 rounded-xl border border-slate-800">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-500 border border-emerald-500/20">
                {project.icon}
              </div>
              <h4 className="text-slate-300 font-bold mb-1">Visual Preview Ongoing</h4>
              <p className="text-xs text-slate-500 max-w-[240px]">
                Interactive deployment screenshots are being catalogued. Check back soon for the visual gallery.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: PROJECT DETAILS */}
        <div className="col-span-6 flex flex-col justify-between p-6 md:p-8 overflow-y-auto max-h-[45vh] md:max-h-[85vh] scrollbar-thin">
          <div className="flex flex-col gap-5">
            {/* CATEGORY & TITLE */}
            <div>
              <span className="text-xs font-bold text-emerald-500 dark:text-emerald-450 uppercase tracking-widest block mb-1">
                {project.category}
              </span>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white leading-tight">
                {project.title}
              </h3>
            </div>

            {/* TAGS */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-semibold bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-350 border border-slate-200/50 dark:border-slate-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* DESCRIPTION */}
            <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-3">
              <p>{project.longDescription || project.description}</p>
            </div>

            {/* KEY FEATURES */}
            {project.features && project.features.length > 0 && (
              <div className="flex flex-col gap-3 pt-3 border-t border-slate-100 dark:border-slate-900">
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-slate-450 dark:text-slate-500">
                  Key Technical Features
                </h4>
                <ul className="grid grid-cols-1 gap-2.5">
                  {project.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-tight">
                      <span className="w-4.5 h-4.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center flex-shrink-0 text-emerald-500 border border-emerald-500/20">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ACTION BUTTONS & FOOTER */}
          <div className="flex flex-wrap items-center gap-3.5 mt-8 pt-5 border-t border-slate-100 dark:border-slate-900">
            {project.links?.live && (
              <a 
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full font-display font-semibold text-xs bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-slate-950 flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/5 transition-transform hover:scale-[1.02]"
              >
                <span>Launch Live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            
            {project.links?.github && (
              <a 
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full font-display font-semibold text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            )}

            {project.links?.playstore && (
              <a 
                href={project.links.playstore}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full font-display font-semibold text-xs border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Get on Play Store</span>
              </a>
            )}

            <button 
              onClick={onClose}
              className="ml-auto px-5 py-2.5 rounded-full font-display font-semibold text-xs bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-400 cursor-pointer transition-colors border border-slate-200/50 dark:border-slate-800"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX FOR IMAGES */}
      {isLightboxOpen && hasScreenshots && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800 cursor-pointer shadow-lg z-50"
            aria-label="Close light box"
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="relative max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={screenshots[currentIndex]} 
              alt="Full size screenshot" 
              className="max-w-[95vw] max-h-[90vh] object-contain rounded-md" 
            />

            {screenshots.length > 1 && (
              <>
                <button 
                  onClick={handlePrev}
                  className="absolute left-4 p-3 rounded-full bg-slate-900/80 text-white border border-slate-800 hover:bg-emerald-500 hover:text-slate-950 hover:border-transparent transition-all cursor-pointer shadow-lg"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={handleNext}
                  className="absolute right-4 p-3 rounded-full bg-slate-900/80 text-white border border-slate-800 hover:bg-emerald-500 hover:text-slate-950 hover:border-transparent transition-all cursor-pointer shadow-lg"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
