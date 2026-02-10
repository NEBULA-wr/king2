export enum EmergencyPhase {
  ALARM = 'Alarma y Protección',
  EVACUATION = 'Ruta de Evacuación',
  ASSEMBLY = 'Punto de Encuentro',
  EVALUATION = 'Evaluación y Retorno'
}

export interface EvacuationStep {
  id: number;
  phase: EmergencyPhase;
  title: string;
  description: string;
  iconName: string;
}

export interface Role {
  title: string;
  responsibilities: string[];
}

export interface FloorProtocol {
  floorName: string;
  priority: number;
  instructions: string;
}

export interface RouteSection {
  type: 'AULAS' | 'PASILLOS' | 'ESCALERAS' | 'EXTERIOR' | 'PUNTO_REUNION';
  title: string;
  images: { url: string; label: string }[];
}

export interface RouteStep {
  id: number;
  title: string;
  description: string;
  sections: RouteSection[];
}