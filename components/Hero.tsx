import React, { useState } from 'react';
import { AlertTriangle, FileText, Loader2 } from 'lucide-react';
import { APP_TITLE, PLAN_TITLE } from '../constants';
import { generatePDFReport } from '../services/pdfService';

const Hero: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generatePDFReport();
    } catch (error) {
      console.error("Error generating PDF", error);
      alert("Hubo un error generando el reporte. Por favor intente de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white py-16 px-6 shadow-xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full mix-blend-overlay filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="space-y-6 max-w-2xl">
          <div className="flex items-center space-x-2 text-emerald-200 font-bold tracking-wider uppercase text-sm bg-emerald-900/30 w-fit px-3 py-1 rounded-full border border-emerald-500/30">
            <AlertTriangle size={16} />
            <span>Seguridad Institucional</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              {APP_TITLE}
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 font-light border-l-4 border-emerald-400 pl-4">
              {PLAN_TITLE}
            </p>
          </div>

          <p className="text-emerald-50 text-lg leading-relaxed">
            Plataforma oficial para la gestión de emergencias. Consulte los protocolos de actuación, rutas de evacuación y roles asignados para salvaguardar la integridad de la comunidad educativa.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
             <button 
              onClick={handleDownload}
              disabled={isGenerating}
              className={`flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 ${
                isGenerating 
                  ? 'bg-emerald-700 text-emerald-200 cursor-wait' 
                  : 'bg-white text-emerald-900 hover:bg-emerald-50 hover:scale-105 hover:shadow-xl'
              }`}
            >
              {isGenerating ? <Loader2 size={24} className="animate-spin" /> : <FileText size={24} />}
              <span>{isGenerating ? "Generando Informe..." : "Descargar Plan PDF"}</span>
            </button>
          </div>
          <p className="text-xs text-emerald-200 opacity-80 italic">
            * El PDF incluye el mapa, protocolos y roles actualizados.
          </p>
        </div>

        {/* Hero Visual */}
        <div className="mt-12 md:mt-0 hidden md:block relative">
             <div className="w-72 h-72 border-4 border-white/20 rounded-full flex items-center justify-center animate-[pulse_4s_ease-in-out_infinite]">
                <div className="w-56 h-56 bg-emerald-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <AlertTriangle size={100} className="text-white drop-shadow-lg" />
                </div>
             </div>
             {/* Decorative dots */}
             <div className="absolute top-0 right-0 w-4 h-4 bg-amber-400 rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;