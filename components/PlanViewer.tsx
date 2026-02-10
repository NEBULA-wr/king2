import React from 'react';
import { EVACUATION_STEPS, FLOOR_PROTOCOLS, ROLES } from '../constants';
import { ShieldAlert, Footprints, ArrowRightCircle, Users, ClipboardCheck, Info } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  ShieldAlert: <ShieldAlert size={32} />,
  Footprints: <Footprints size={32} />,
  ArrowRightCircle: <ArrowRightCircle size={32} />,
  Users: <Users size={32} />
};

const PlanViewer: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-16">
      
      {/* Introduction */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-slate-800 border-b-4 border-emerald-500 inline-block pb-2">
          Protocolo de Actuación
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Siga estos pasos estrictamente para garantizar su seguridad y la de sus compañeros.
        </p>
      </section>

      {/* Steps Grid */}
      <section className="grid md:grid-cols-2 gap-8">
        {EVACUATION_STEPS.map((step) => (
          <div key={step.id} className="bg-white rounded-xl shadow-md overflow-hidden border-l-8 border-emerald-500 hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-emerald-100 text-emerald-700 rounded-lg">
                  {iconMap[step.iconName]}
                </div>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Fase {step.id}: {step.phase}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Floor Priority */}
      <section className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
        <div className="flex items-center space-x-3 mb-6">
          <Info className="text-amber-600" size={28} />
          <h3 className="text-2xl font-bold text-amber-800">Orden de Evacuación</h3>
        </div>
        <div className="space-y-4">
            {FLOOR_PROTOCOLS.map((floor) => (
                <div key={floor.floorName} className="flex flex-col md:flex-row md:items-center bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex-shrink-0 mb-2 md:mb-0 md:mr-6">
                        <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-bold text-xl ${floor.priority === 1 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                            {floor.priority}º
                        </span>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-800">{floor.floorName}</h4>
                        <p className="text-slate-600">{floor.instructions}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Roles */}
      <section>
        <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Responsabilidades por Rol</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROLES.map((role, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="flex items-center space-x-2 mb-4 text-emerald-700">
                <ClipboardCheck size={24} />
                <h4 className="font-bold text-lg">{role.title}</h4>
              </div>
              <ul className="space-y-3">
                {role.responsibilities.map((res, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-700">
                    <span className="mr-2 text-emerald-500">•</span>
                    {res}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PlanViewer;