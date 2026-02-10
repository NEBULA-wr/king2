import React, { useState, useEffect, useCallback } from 'react';
import { EVACUATION_ROUTE } from '../constants';
import { MapPin, ArrowRight, Flag, Shield, Library, ArrowDownUp, DoorOpen, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const RouteGallery: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [flatImages, setFlatImages] = useState<{url: string, label: string, phaseTitle: string}[]>([]);

  // Flatten all images into a single array for easy navigation
  useEffect(() => {
    const images: {url: string, label: string, phaseTitle: string}[] = [];
    EVACUATION_ROUTE.forEach(step => {
      step.sections.forEach(section => {
        section.images.forEach(img => {
          images.push({
            url: img.url,
            label: img.label,
            phaseTitle: step.title
          });
        });
      });
    });
    setFlatImages(images);
  }, []);

  const openLightbox = (url: string) => {
    const index = flatImages.findIndex(img => img.url === url);
    if (index !== -1) {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % flatImages.length);
  }, [flatImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + flatImages.length) % flatImages.length);
  }, [flatImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  // Helper to get icon for section type
  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'AULAS': return <Library size={18} className="text-blue-600" />;
      case 'PASILLOS': return <ArrowRight size={18} className="text-amber-600" />;
      case 'ESCALERAS': return <ArrowDownUp size={18} className="text-red-600" />;
      case 'EXTERIOR': return <DoorOpen size={18} className="text-green-600" />;
      default: return <MapPin size={18} className="text-slate-600" />;
    }
  };

  const getSectionColor = (type: string) => {
    switch (type) {
      case 'AULAS': return 'bg-blue-50 border-blue-100 text-blue-800';
      case 'PASILLOS': return 'bg-amber-50 border-amber-100 text-amber-800';
      case 'ESCALERAS': return 'bg-red-50 border-red-100 text-red-800';
      case 'EXTERIOR': return 'bg-green-50 border-green-100 text-green-800';
      default: return 'bg-slate-50 border-slate-100 text-slate-800';
    }
  };

  return (
    <div className="bg-slate-50 border-t border-slate-200">
      
      {/* Lightbox Overlay */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm">
          {/* Close Button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors z-50"
          >
            <X size={40} />
          </button>

          {/* Navigation Buttons */}
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 text-white/50 hover:text-white p-4 hover:bg-white/5 rounded-full transition-all"
          >
            <ChevronLeft size={48} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 text-white/50 hover:text-white p-4 hover:bg-white/5 rounded-full transition-all"
          >
            <ChevronRight size={48} />
          </button>

          {/* Main Image Container */}
          <div className="flex flex-col items-center max-w-[90vw] max-h-[90vh]">
            <img 
              src={flatImages[currentImageIndex]?.url} 
              alt={flatImages[currentImageIndex]?.label}
              className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm border-2 border-white/10" 
            />
            <div className="mt-4 text-center">
              <h3 className="text-emerald-400 font-bold text-lg tracking-wide uppercase">
                {flatImages[currentImageIndex]?.phaseTitle}
              </h3>
              <p className="text-white text-xl font-medium mt-1">
                {flatImages[currentImageIndex]?.label.replace(/^IMG \d+:\s*/, '')}
              </p>
              <p className="text-white/40 text-sm mt-2">
                Imagen {currentImageIndex + 1} de {flatImages.length}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        
        {/* Professional Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-200 pb-8 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 text-emerald-700 font-bold uppercase tracking-widest text-xs mb-2">
              <Shield size={16} />
              <span>Protocolo Oficial PHRT</span>
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
              Recorrido Táctico Detallado
            </h2>
            <p className="text-lg text-slate-600 mt-4 leading-relaxed">
              Guía visual dividida por <span className="font-bold text-blue-700">Cursos</span>, <span className="font-bold text-amber-600">Pasillos</span> y <span className="font-bold text-red-600">Escaleras</span>. Haga clic en las imágenes para ampliar.
            </p>
          </div>
        </div>

        {/* Timeline Steps */}
        <div className="relative space-y-12">
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-200 hidden md:block"></div>

          {EVACUATION_ROUTE.map((step) => (
            <div key={step.id} className="relative md:pl-24 group">
              
              <div className="hidden md:flex absolute left-0 top-0 w-16 h-16 bg-white border-2 border-slate-200 rounded-2xl items-center justify-center shadow-sm z-10">
                <span className="text-2xl font-black text-slate-400">
                  {String(step.id).padStart(2, '0')}
                </span>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-800 px-6 py-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <span className="md:hidden bg-slate-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                      {step.id}
                    </span>
                    {step.title}
                  </h3>
                </div>

                <div className="p-6">
                  <p className="text-slate-600 mb-8 italic border-l-4 border-slate-300 pl-4">
                    {step.description}
                  </p>

                  <div className="space-y-8">
                    {step.sections.map((section, sIdx) => (
                      <div key={sIdx} className="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                        <div className={`flex items-center space-x-2 mb-4 px-3 py-2 rounded-lg w-fit ${getSectionColor(section.type)}`}>
                          {getSectionIcon(section.type)}
                          <h4 className="font-bold text-sm uppercase tracking-wide">
                            {section.title}
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {section.images.map((img, imgIdx) => (
                            <div 
                              key={imgIdx} 
                              className="group/img cursor-pointer"
                              onClick={() => openLightbox(img.url)}
                            >
                              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-200 border border-slate-300 shadow-sm">
                                <img 
                                  src={img.url} 
                                  alt={img.label} 
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover/img:opacity-100">
                                   <div className="bg-white/90 p-2 rounded-full text-slate-900 shadow-lg transform scale-75 group-hover/img:scale-100 transition-transform">
                                      <ZoomIn size={24} />
                                   </div>
                                </div>
                              </div>
                              <p className="mt-2 text-xs font-medium text-slate-500 group-hover/img:text-emerald-600 transition-colors">
                                {img.label.replace(/^IMG \d+:\s*/, '')}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          ))}
          
          <div className="md:pl-24 pt-8 pb-12">
             <div className="bg-emerald-600 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center text-center gap-4 shadow-xl">
                <Flag size={32} />
                <h4 className="text-xl font-bold">Misión Cumplida: Espere Instrucciones</h4>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RouteGallery;