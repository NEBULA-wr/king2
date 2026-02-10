import { EmergencyPhase, EvacuationStep, Role, FloorProtocol, RouteStep } from './types';

export const APP_TITLE = "Politécnico Hermana Rosario Torres";
export const PLAN_TITLE = "Plan Maestro de Evacuación y Seguridad";
export const MAP_LOCATION_URL = "https://www.google.com/maps/place/Super+Col.+Kikay/@18.4917365,-69.8849197,3a,75y,87.86h,58.85t/data=!3m7!1e1!3m5!1sd6fN8MpZG8k9zk1pi_YF_g!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D31.152840127948217%26panoid%3Dd6fN8MpZG8k9zk1pi_YF_g%26yaw%3D87.85755303163717!7i13312!8i6656!4m6!3m5!1s0x8eaf8842b405a02d:0x92b003a7b3eeba00!8m2!3d18.4919918!4d-69.8846905!16s%2Fg%2F11j1306qsl?entry=ttu";

// --- GESTIÓN DE ASSETS (Imágenes) ---
// Usamos new URL(..., import.meta.url).href para asegurar que Vite incluya
// las imágenes en el build de producción (GitHub Pages / Netlify).
// NOTA: Asegúrate de que las imágenes estén en la misma carpeta que este archivo.

const imgPlan = new URL('./imagen.png', import.meta.url).href;

// Definición de variables para cada imagen según tu lista
const img1 = new URL('./1.jpeg', import.meta.url).href;
const img2 = new URL('./2.jpeg', import.meta.url).href;
const img3 = new URL('./3.jpeg', import.meta.url).href;
const img4 = new URL('./4.jpeg', import.meta.url).href;
const img5 = new URL('./5.jpeg', import.meta.url).href;
const img6 = new URL('./6.jpeg', import.meta.url).href;
const img7 = new URL('./7.jpeg', import.meta.url).href;
const img8 = new URL('./8.jpeg', import.meta.url).href;
const img11 = new URL('./11.jpeg', import.meta.url).href;
const img12 = new URL('./12.jpeg', import.meta.url).href;
const img13 = new URL('./13.jpeg', import.meta.url).href;
const img14 = new URL('./14.jpeg', import.meta.url).href;
const img15 = new URL('./15.jpeg', import.meta.url).href;
const img16 = new URL('./16.jpeg', import.meta.url).href;
const img17 = new URL('./17.jpeg', import.meta.url).href;
const img18 = new URL('./18.jpeg', import.meta.url).href;
const img19 = new URL('./19.jpeg', import.meta.url).href;
const img20 = new URL('./20.jpeg', import.meta.url).href;
const img21 = new URL('./21.jpeg', import.meta.url).href;
const img22 = new URL('./22.jpeg', import.meta.url).href;
const img23 = new URL('./23.jpeg', import.meta.url).href;
const img24 = new URL('./24.jpeg', import.meta.url).href;
const img25 = new URL('./25.jpeg', import.meta.url).href;
const img26 = new URL('./26.jpeg', import.meta.url).href;

export const IMAGES = {
  architecturalPlan: imgPlan, 
};

export const EVACUATION_ROUTE: RouteStep[] = [
  {
    id: 1,
    title: "FASE 1: EDIFICIO A (Desarrollo) - PLANTA BAJA",
    description: "Evacuación inmediata de laboratorios y aulas del área de Desarrollo de Aplicaciones.",
    sections: [
      {
        type: 'AULAS',
        title: "Cursos y Aulas de la Primera Planta",
        images: [
           { url: img1, label: "Curso 1" },
           { url: img2, label: "Curso 2" },
           { url: img3, label: "Curso 3" },
           { url: img4, label: "Curso 4" },
           { url: img5, label: "Curso 5" }
        ]
      },
      {
        type: 'PASILLOS',
        title: "Pasillo Central A",
        images: [
           { url: img6, label: "Pasillo Principal hacia el Patio" },
           { url: img7, label: "Pasillo Principal hacia el Patio" },
           { url: img8, label: "Pasillo Principal hacia el Patio" }
        ]
      },
      {
        type: 'EXTERIOR',
        title: "Salida al Exterior",
        images: [
           { url: img26, label: "Puerta de Acceso al Patio Central" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "FASE 2: EDIFICIO B (Soporte) - PLANTA BAJA",
    description: "Evacuación del Edificio Frontal: Área de Soporte y Oficinas.",
    sections: [
      {
        type: 'AULAS',
        title: "Aulas de Soporte",
        images: [
          { url: img16, label: "Edificio B" },
          { url: img17, label: "Aulas planta de abajo" }
        ]
      },
      {
        type: 'PASILLOS',
        title: "Pasillo Frontal",
        images: [
          { url: img21, label: "Ruta hacia Explanada Frontal" }
        ]
      },
      {
        type: 'EXTERIOR',
        title: "Punto de Reunión B",
        images: [
          { url: img26, label: "Zona de Seguridad Frontal" }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "FASE 3: EDIFICIO A (Desarrollo) - 2DA PLANTA",
    description: "Salida de Aulas Superiores. Uso estricto de escalera principal Edif A.",
    sections: [
      {
        type: 'PASILLOS',
        title: "Pasillo Superior A",
        images: [
          { url: img11, label: "Fila India (Mano Derecha en Pared)" },
          { url: img12, label: "Fila India (Mano Derecha en Pared)" },
          { url: img13, label: "Fila India (Mano Derecha en Pared)" }
        ]
      },
      {
        type: 'ESCALERAS',
        title: "Escalera Edificio A",
        images: [
          { url: img14, label: "Bajada por Escalera Principal" },
          { url: img15, label: "Llegada a Planta Baja" }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "FASE 4: EDIFICIO B (Soporte) - 2DA PLANTA",
    description: "Salida de Aulas Superiores Frontales. Bajar por escalera Edif B.",
    sections: [
      {
        type: 'AULAS',
        title: "Aulas Superiores B",
        images: [
          { url: img18, label: "Aulas de Edificio B" },
          { url: img19, label: "Aulas de Edificio B" }
        ]
      },
      {
        type: 'ESCALERAS',
        title: "Escalera Edificio B",
        images: [
          { url: img20, label: "Uso de Escaleras Frontales" },
          { url: img21, label: "Evacuación hacia Explanada" }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "FASE 5: ZONA TRASERA (Pabellones Anexos)",
    description: "Evacuación masiva de Pabellones Posteriores (Aulas Generales).",
    sections: [
      {
        type: 'AULAS',
        title: "Pabellón 3",
        images: [
          { url: img22, label: "Aula de la Planta Trasera" },
        ]
      },
      {
        type: 'PASILLOS',
        title: "Conexión Externa",
        images: [
          { url: img23, label: "Ruta hacia Punto de Encuentro Trasero" },
          { url: img24, label: "Ruta hacia Punto de Encuentro Trasero" },
          { url: img25, label: "Ruta hacia Punto de Encuentro Trasero" }
        ]
      }
    ]
  },
  {
    id: 6,
    title: "FASE 6: PUNTO DE REUNIÓN",
    description: "Organización final en filas por Curso y Sección asignada.",
    sections: [
      {
        type: 'PUNTO_REUNION',
        title: "Zona de Filas",
        images: [
          { url: img26, label: "Formación en Patio Central" },
        ]
      }
    ]
  }
];

export const EVACUATION_STEPS: EvacuationStep[] = [
  {
    id: 1,
    phase: EmergencyPhase.ALARM,
    title: "1. DURANTE EL SISMO (Protección)",
    description: "Mantenga la calma. Aplique el triángulo de la vida o ubíquese debajo de los pupitres (Agáchate, Cúbrete y Agárrate). Aléjese inmediatamente de ventanas, estantes altos y objetos de vidrio que puedan caer.",
    iconName: "ShieldAlert"
  },
  {
    id: 2,
    phase: EmergencyPhase.EVACUATION,
    title: "2. INICIO DE EVACUACIÓN (Salida)",
    description: "Espere a que el movimiento cese por completo. El docente dará la orden de salida. Las Plantas Bajas de todos los edificios salen primero. No corra, no grite y no empuje.",
    iconName: "Footprints"
  },
  {
    id: 3,
    phase: EmergencyPhase.EVACUATION,
    title: "3. TRÁNSITO POR PLANTA ALTA",
    description: "Los cursos de planta alta salen al pasillo manteniendo obligatoriamente su MANO DERECHA en la pared. Avanzan hacia la escalera asignada sin detenerse.",
    iconName: "ArrowRightCircle"
  },
  {
    id: 4,
    phase: EmergencyPhase.ASSEMBLY,
    title: "4. PUNTO DE REUNIÓN (Conteo)",
    description: "Al llegar a la explanada, ubíquese en la fila de su sección correspondiente al año escolar en curso. Permanezca en silencio para facilitar el pase de lista.",
    iconName: "Users"
  }
];

export const ROLES: Role[] = [
  {
    title: "COORDINADOR DE SEGURIDAD",
    responsibilities: [
      "Activar la alarma de emergencia (timbre intermitente).",
      "Centralizar las comunicaciones con bomberos y 911.",
      "Dar la orden final de retorno o evacuación externa."
    ]
  },
  {
    title: "DOCENTES DE AULA",
    responsibilities: [
      "Mantener la calma del grupo durante el sismo.",
      "Tomar el registro de asistencia (físico o digital) antes de salir.",
      "Liderar la fila: Un docente al frente y el monitor de clase al final.",
      "Asegurar que las secciones no se mezclen en los pasillos.",
      "Realizar el conteo final en el punto de encuentro."
    ]
  },
  {
    title: "MONITORES DE SECCIÓN",
    responsibilities: [
      "Ser el último en salir del aula verificando que esté vacía.",
      "Ayudar a compañeros con movilidad reducida.",
      "Portar el cartel de identificación de su sección (Si está disponible).",
      "Mantener silencio absoluto para escuchar instrucciones."
    ]
  },
  {
    title: "PERSONAL DE APOYO",
    responsibilities: [
      "Abrir inmediatamente todos los portones de salida del recinto.",
      "Cortar el suministro de gas y energía eléctrica si es posible.",
      "Bloquear el acceso a zonas colapsadas o peligrosas."
    ]
  }
];

export const FLOOR_PROTOCOLS: FloorProtocol[] = [
  {
    floorName: "PLANTA BAJA (PB)",
    priority: 1,
    instructions: "Salida Inmediata: Todos los cursos de PB en Edificios A, B y Anexos. Prioridad absoluta."
  },
  {
    floorName: "PLANTA ALTA (PA)",
    priority: 2,
    instructions: "Espera táctica de 30 seg. Salida ordenada usando mano derecha en escaleras asignadas."
  }
];