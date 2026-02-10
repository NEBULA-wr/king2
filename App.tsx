import React from 'react';
import Hero from './components/Hero';
import PlanViewer from './components/PlanViewer';
import MapViewer from './components/MapViewer';
import GalleryGrid from './components/GalleryGrid';
import { ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Navbar Professional */}
      <header className="bg-white shadow-lg py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            {/* Logo Area */}
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-600 p-2 rounded-lg text-white">
                <ShieldCheck size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-emerald-900 tracking-tight leading-none">
                  PHRT
                </span>
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                  Plan de Seguridad
                </span>
              </div>
            </div>
            
            {/* Navigation links removed as requested */}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Hero />
        
        {/* Sections */}
        <div id="plan" className="scroll-mt-24">
          <PlanViewer />
        </div>

        <div id="mapa" className="scroll-mt-24">
          <MapViewer />
        </div>

        <div id="galeria" className="scroll-mt-24">
          <GalleryGrid />
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-10 text-center text-sm border-t-4 border-emerald-600">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <p className="font-semibold text-emerald-500 tracking-wider uppercase">Politécnico Hermana Rosario Torres</p>
          <p className="max-w-lg mx-auto leading-relaxed">
            La seguridad es responsabilidad de todos. Mantenga la calma, siga las rutas señalizadas y diríjase siempre a la zona frente a los cursos.
          </p>
          <p className="text-xs text-slate-600 pt-8">
            © {new Date().getFullYear()} Sistema de Gestión de Riesgos Escolares.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;