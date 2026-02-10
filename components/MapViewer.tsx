import React from 'react';
import { IMAGES, MAP_LOCATION_URL } from '../constants';
import { ZoomIn, Map as MapIcon, ExternalLink } from 'lucide-react';

const MapViewer: React.FC = () => {
  return (
    <div className="bg-slate-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">Ubicación y Plano General</h2>
            <p className="text-slate-400 max-w-lg">
              Visualice la distribución del plantel, incluyendo el Pabellón Principal, Segundo y Tercer Pabellón.
            </p>
          </div>
          
          <a 
            href={MAP_LOCATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-emerald-500/20"
          >
            <MapIcon size={20} />
            <span>Ver Ubicación Satelital</span>
            <ExternalLink size={16} className="opacity-70" />
          </a>
        </div>

        <div className="bg-white p-2 rounded-xl shadow-2xl overflow-hidden relative group">
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2 backdrop-blur-sm z-10 pointer-events-none">
            <ZoomIn size={16} />
            <span>Plano Arquitectónico</span>
          </div>
          
          <div className="overflow-auto max-h-[70vh] bg-slate-100 flex items-center justify-center">
            {/* 
               NOTA: Esta imagen es un placeholder. 
               El usuario debe reemplazarla por el plano real.
            */}
            <img 
              src={IMAGES.architecturalPlan} 
              alt="Plano General del Liceo Politecnico Hermana Rosario Torres" 
              className="w-full h-auto object-contain min-w-[800px]"
            />
          </div>
          
          <div className="bg-slate-50 p-4 border-t border-slate-200 text-sm text-slate-600 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
               <span className="w-3 h-3 rounded-full bg-yellow-400 block shadow-sm"></span>
               <span>Escaleras (Paución)</span>
            </div>
            <div className="flex items-center space-x-2">
               <span className="w-3 h-3 rounded-full bg-green-500 block shadow-sm"></span>
               <span>Ruta Segura</span>
            </div>
            <div className="flex items-center space-x-2">
               <span className="w-3 h-3 rounded-full bg-blue-500 block shadow-sm"></span>
               <span>Punto de Encuentro</span>
            </div>
            <div className="flex items-center space-x-2">
               <span className="w-3 h-3 rounded-full bg-slate-800 block shadow-sm"></span>
               <span>Pabellones 1, 2 y 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapViewer;