import jsPDF from 'jspdf';
import { APP_TITLE, EVACUATION_ROUTE, EVACUATION_STEPS, ROLES, MAP_LOCATION_URL } from '../constants';

const COLORS = {
  PRIMARY: [22, 163, 74], // Emerald 600
  SECONDARY: [6, 78, 59], // Emerald 900
  ACCENT_BLUE: [37, 99, 235], 
  ACCENT_AMBER: [217, 119, 6], 
  ACCENT_RED: [220, 38, 38], 
  WHITE: [255, 255, 255],
  GRAY_HEADER: [229, 231, 235],
  TEXT_DARK: [33, 37, 41]
};

const getDataUrl = (url: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    const timeout = setTimeout(() => resolve(''), 3000);
    img.onload = () => {
      clearTimeout(timeout);
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      } else {
        resolve('');
      }
    };
    img.onerror = () => { clearTimeout(timeout); resolve(''); };
    img.src = url;
  });
};

export const generatePDFReport = async () => {
  // CONFIGURACIÓN: Carta (Letter) 8.5 x 11 pulgadas
  const doc = new jsPDF('p', 'mm', 'letter');
  
  const pageWidth = doc.internal.pageSize.getWidth(); // ~215.9 mm
  const pageHeight = doc.internal.pageSize.getHeight(); // ~279.4 mm
  const margin = 25.4; // 1 pulgada (2.54 cm) de margen estándar
  const contentWidth = pageWidth - (margin * 2);

  // CONFIGURACIÓN TIPOGRÁFICA
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setLineHeightFactor(1.5);

  // Variable para rastrear el Índice
  const tocItems: { title: string; page: number; level: number }[] = [];

  // --- HELPERS ---
  
  const drawHeader = (title: string, subTitle?: string) => {
    // Fondo del encabezado
    doc.setFillColor(COLORS.SECONDARY[0], COLORS.SECONDARY[1], COLORS.SECONDARY[2]);
    doc.rect(0, 0, pageWidth, 30, 'F');
    
    // Título Principal
    doc.setTextColor(COLORS.WHITE[0], COLORS.WHITE[1], COLORS.WHITE[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14); 
    doc.text(APP_TITLE.toUpperCase(), margin, 12);
    
    // Título de Página
    doc.setFontSize(12);
    doc.text(title, margin, 20);
    
    if(subTitle) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(220, 220, 220);
      doc.text(subTitle, margin, 26);
    }

    // Reset para cuerpo de texto
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
  };

  const drawSimpleFooter = (pageNum: number) => {
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.text(String(pageNum), pageWidth - margin, pageHeight - 10, { align: "right" });
  };

  const checkPageBreak = (currentY: number, neededHeight: number) => {
    return (currentY + neededHeight > pageHeight - margin);
  };

  const addTocEntry = (title: string, level: number = 0) => {
    tocItems.push({ title, page: doc.getNumberOfPages(), level });
  };

  // ====================================================================
  // 1. PORTADA (HOJA 1) - DISEÑO MEJORADO (DURO/GEOMÉTRICO)
  // ====================================================================
  
  // Fondo blanco base
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Diseño Geométrico Agresivo
  // Triángulo Superior Izquierdo (Verde Oscuro)
  doc.setFillColor(COLORS.SECONDARY[0], COLORS.SECONDARY[1], COLORS.SECONDARY[2]); 
  doc.triangle(0, 0, pageWidth, 0, 0, pageHeight * 0.45, 'F');
  
  // Triángulo Inferior Derecho (Verde Claro)
  doc.setFillColor(COLORS.PRIMARY[0], COLORS.PRIMARY[1], COLORS.PRIMARY[2]); 
  doc.triangle(pageWidth, pageHeight, 0, pageHeight, pageWidth, pageHeight * 0.55, 'F');

  // Elemento decorativo diagonal (Línea)
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(3);
  doc.line(0, pageHeight * 0.45, pageWidth, pageHeight * 0.55);

  let coverY = 60;
  const centerX = pageWidth / 2;

  // Título Superior (Sobre fondo oscuro, texto blanco/claro)
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("INFORME TÉCNICO", margin, coverY);
  
  coverY += 12;
  doc.setFontSize(26);
  doc.setTextColor(200, 255, 200); // Verde muy pálido para contraste
  doc.text("PROFESIONAL", margin, coverY);

  coverY += 25;
  
  // Subtítulos
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text("SEGURIDAD E HIGIENE", margin, coverY);
  doc.text("INDUSTRIAL", margin, coverY + 8);

  // Bloque Central (Título del Proyecto) - Posicionado en el espacio negativo o cruzando
  coverY = (pageHeight / 2) - 10;
  
  doc.setTextColor(COLORS.TEXT_DARK[0], COLORS.TEXT_DARK[1], COLORS.TEXT_DARK[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  const mainTitleLines = doc.splitTextToSize("SEGURIDAD Y SALUD EN EL TRABAJO", contentWidth - 40);
  doc.text(mainTitleLines, pageWidth - margin, coverY, { align: "right" });

  coverY += (mainTitleLines.length * 12) + 15;

  doc.setFontSize(16);
  doc.setTextColor(100, 100, 100);
  doc.setFont("helvetica", "bold");
  doc.text("POLITÉCNICO ROSARIO TORRES", pageWidth - margin, coverY, { align: "right" });

  // Pie de Portada (Sobre fondo verde claro inferior)
  const bottomY = pageHeight - 50;

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  
  // Columna Izquierda (Abajo)
  doc.setFont("helvetica", "bold");
  doc.text("ESPECIALIDAD ACADÉMICA:", margin, bottomY);
  doc.setFont("helvetica", "normal");
  doc.text("Desarrollo de Aplicaciones", margin, bottomY + 6);
  
  // Columna Derecha (Abajo)
  doc.setFont("helvetica", "bold");
  doc.text("5TO AÑO - A", pageWidth - margin, bottomY, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.text("Santo Domingo, D.N.", pageWidth - margin, bottomY + 6, { align: "right" });

  // NOTA: Se eliminó el número de página de la portada como solicitado.


  // ====================================================================
  // 2. PRESENTACIÓN (HOJA 2) - EXACTAMENTE IGUAL AL PDF
  // ====================================================================
  doc.addPage();
  
  let presY = 30;
  const presCenterX = pageWidth / 2;

  // Encabezado
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Politécnico Hermana Rosario Torres Fe y Alegría", presCenterX, presY, { align: "center" });
  
  presY += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("Desarrollo de Aplicaciones e Informática", presCenterX, presY, { align: "center" });

  presY += 40;

  // Título Central
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("SEGURIDAD Y SALUD EN EL TRABAJO", presCenterX, presY, { align: "center" });
  
  presY += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("Grado 5to, Sección A", presCenterX, presY, { align: "center" });

  presY += 25;

  // Maestro
  doc.setFont("helvetica", "bold");
  doc.text("Maestro: Edgar King", presCenterX, presY, { align: "center" });

  presY += 20;

  // Proyecto
  doc.setFont("helvetica", "bold");
  doc.text("PROYECTO ACADÉMICO:", presCenterX, presY, { align: "center" });
  presY += 8;
  doc.setFont("helvetica", "normal");
  doc.text("Identificación de Peligros y Medidas de Prevención en Centros de Cómputo.", presCenterX, presY, { align: "center" });

  presY += 40;

  // Tabla de Estudiantes
  const tableWidth = 150;
  const tableLeft = (pageWidth - tableWidth) / 2;
  const tableRight = tableLeft + tableWidth;
  
  doc.setFont("helvetica", "bold");
  doc.text("Nombres y Apellidos:", tableLeft, presY);
  doc.text("Matrícula:", tableRight, presY, { align: "right" });
  
  presY += 2;
  doc.setLineWidth(0.5);
  doc.setDrawColor(0,0,0);
  doc.line(tableLeft, presY, tableRight, presY);
  presY += 8;

  const students = [
      { name: "Briant Alexis", id: "3053" },
      { name: "Nikaury Reyes", id: "3256" },
      { name: "Yinariry Moreno", id: "3077" }
  ];

  doc.setFont("helvetica", "normal");
  students.forEach(s => {
      doc.text(s.name, tableLeft, presY);
      doc.text(s.id, tableRight, presY, { align: "right" });
      presY += 10;
  });

  // Footer Presentación
  const footerPresY = pageHeight - 30;
  doc.text("Santo Domingo, República Dominicana", presCenterX, footerPresY, { align: "center" });
  doc.text("15 de febrero de 2026", presCenterX, footerPresY + 6, { align: "center" });

  // Número de página 2
  doc.text("2", pageWidth - margin, pageHeight - 10, { align: "right" });


  // ====================================================================
  // 3. ÍNDICE (HOJA 3)
  // ====================================================================
  doc.addPage();
  const indexPageNum = doc.getNumberOfPages(); // Debe ser 3
  // (El contenido del índice se rellena al final)


  // ====================================================================
  // 4. CONTENIDO PRINCIPAL (HOJA 4+)
  // ====================================================================
  
  // --- PROTOCOLOS ---
  doc.addPage();
  addTocEntry("Protocolo de Actuación", 0);
  
  drawHeader("PROTOCOLO DE ACTUACIÓN", "Pasos a seguir durante la emergencia");
  
  let yPos = 40;
  doc.setFontSize(12);
  doc.setLineHeightFactor(1.5);

  EVACUATION_STEPS.forEach(step => {
    doc.setFont("helvetica", "normal");
    const descLines = doc.splitTextToSize(step.description, contentWidth);
    const blockHeight = 10 + (descLines.length * 6.5) + 10;

    if (checkPageBreak(yPos, blockHeight)) {
        doc.addPage();
        drawHeader("PROTOCOLO DE ACTUACIÓN (Cont.)");
        yPos = 40;
    }

    addTocEntry(step.title, 1);

    doc.setFont("helvetica", "bold");
    doc.text(step.title, margin, yPos);
    yPos += 8;
    
    doc.setFont("helvetica", "normal");
    doc.text(descLines, margin, yPos, { align: "justify", maxWidth: contentWidth });
    yPos += (descLines.length * 6.5) + 8;
  });

  // --- ROLES ---
  doc.addPage();
  addTocEntry("Roles y Responsabilidades", 0);
  
  drawHeader("ROLES Y RESPONSABILIDADES", "Asignación de tareas por grupo");
  yPos = 40;

  ROLES.forEach(role => {
    if (checkPageBreak(yPos, 40)) {
        doc.addPage();
        drawHeader("ROLES Y RESPONSABILIDADES (Cont.)");
        yPos = 40;
    }

    addTocEntry(role.title, 1);

    doc.setFillColor(COLORS.GRAY_HEADER[0], COLORS.GRAY_HEADER[1], COLORS.GRAY_HEADER[2]);
    doc.rect(margin, yPos - 5, contentWidth, 10, 'F');
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0,0,0);
    doc.text(role.title, margin + 2, yPos + 2);
    yPos += 12;
    
    doc.setFont("helvetica", "normal");
    role.responsibilities.forEach(resp => {
        const bulletText = `• ${resp}`;
        const bulletLines = doc.splitTextToSize(bulletText, contentWidth - 5);
        
        if (checkPageBreak(yPos, bulletLines.length * 6.5)) {
             doc.addPage();
             drawHeader("ROLES Y RESPONSABILIDADES (Cont.)");
             yPos = 40;
        }

        doc.text(bulletLines, margin + 5, yPos, { align: "justify", maxWidth: contentWidth - 5 });
        yPos += (bulletLines.length * 6.5) + 2;
    });

    yPos += 8;
  });

  // --- RUTAS DE EVACUACIÓN (Lógica Mejorada) ---
  let isFirstRoutePage = true;
  for (const step of EVACUATION_ROUTE) {
    doc.addPage();
    
    if (isFirstRoutePage) {
        addTocEntry("Rutas de Evacuación", 0);
        isFirstRoutePage = false;
    }

    addTocEntry(step.title, 1);
    drawHeader(step.title, step.description);
    yPos = 40;

    for (const section of step.sections) {
      // PRE-CÁLCULO: Verificar si el Título + Primera fila de imágenes caben.
      const cardHeight = 65; 
      const titleHeight = 15;
      const spaceForTitleAndRow = titleHeight + cardHeight;

      if (checkPageBreak(yPos, spaceForTitleAndRow)) {
        doc.addPage();
        drawHeader(step.title, `${step.description} (Cont.)`);
        yPos = 40;
      }

      // Renderizar Título de Sección
      doc.setFont("helvetica", "bold");
      doc.setTextColor(COLORS.PRIMARY[0], COLORS.PRIMARY[1], COLORS.PRIMARY[2]);
      doc.text(section.title.toUpperCase(), margin, yPos);
      yPos += 8;
      doc.setTextColor(0,0,0);

      const columns = 2;
      const imgGap = 8;
      const imgWidth = (contentWidth - (imgGap * (columns - 1))) / columns;
      const imgDisplayHeight = 45; 
      
      for (let i = 0; i < section.images.length; i++) {
        const isNewRow = i % columns === 0;
        
        if (isNewRow) {
           if (i > 0) {
               yPos += cardHeight + 8; // Salto de fila
           }
           
           // Verificar si ESTA fila cabe
           if (checkPageBreak(yPos, cardHeight)) {
               doc.addPage();
               drawHeader(step.title, `${step.description} (Cont.)`);
               yPos = 40;
           }
        }

        const colIndex = i % columns;
        const xPos = margin + (colIndex * (imgWidth + imgGap));

        // DISEÑO DE TARJETA (Clean)
        doc.setDrawColor(220, 220, 220);
        doc.setFillColor(248, 250, 252); 
        doc.roundedRect(xPos, yPos, imgWidth, cardHeight, 2, 2, 'FD');

        try {
            const imgData = await getDataUrl(section.images[i].url);
            if (imgData) {
                // Marco blanco interno para la foto
                doc.setFillColor(255, 255, 255);
                doc.rect(xPos + 3, yPos + 3, imgWidth - 6, imgDisplayHeight, 'F');
                
                // Imagen centrada
                doc.addImage(imgData, 'JPEG', xPos + 4, yPos + 4, imgWidth - 8, imgDisplayHeight - 2);
                
                doc.setDrawColor(200, 200, 200);
                doc.rect(xPos + 4, yPos + 4, imgWidth - 8, imgDisplayHeight - 2);
            }
        } catch (e) { /* ignore */ }

        // Texto descriptivo
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(50, 50, 50);
        
        let label = section.images[i].label.replace(/^IMG \d+:\s*/, '');
        if (label.length > 55) label = label.substring(0, 52) + "...";
        
        const textLines = doc.splitTextToSize(label, imgWidth - 8);
        const textStartY = yPos + imgDisplayHeight + 8;
        
        doc.text(textLines, xPos + (imgWidth/2), textStartY, { align: "center" });
      }
      
      // Mover el cursor después de la última fila de imágenes de esta sección
      yPos += cardHeight + 12;
    }
  }

  // ====================================================================
  // 5. CONCLUSIONES (NUEVA PÁGINA)
  // ====================================================================
  doc.addPage();
  addTocEntry("Conclusiones y Validación", 0);
  drawHeader("CONCLUSIONES", "Consideraciones finales y aprobación");
  
  yPos = 40;
  
  // Texto de Conclusión
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  const conclusions = [
    "La seguridad escolar no es un producto estático, sino un proceso continuo y participativo. Este documento ha detallado exhaustivamente los protocolos de actuación, roles específicos y rutas de evacuación críticas para el Politécnico Hermana Rosario Torres.",
    
    "Se concluye que la efectividad de este Plan Maestro depende estrictamente de la interiorización de las rutas presentadas (Edificios A, B y Pabellones Anexos) y del cumplimiento disciplinado de las fases de alarma y evacuación. La identificación clara de los riesgos y la asignación precisa de responsabilidades a Docentes, Monitores y Personal de Apoyo constituyen la primera línea de defensa ante eventos sísmicos.",
    
    "Finalmente, es imperativo realizar simulacros periódicos para validar los tiempos de respuesta y asegurar que las vías de escape permanezcan libres de obstáculos, garantizando así un entorno educativo seguro y resiliente para todos los estudiantes y colaboradores."
  ];

  conclusions.forEach(paragraph => {
    const lines = doc.splitTextToSize(paragraph, contentWidth);
    doc.text(lines, margin, yPos, { align: "justify", maxWidth: contentWidth });
    yPos += (lines.length * 7) + 8;
  });

  // Sección de Firmas (Estilo Oficial)
  yPos = Math.max(yPos + 20, pageHeight - 70); // Asegurar que esté al final o después del texto

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(COLORS.PRIMARY[0], COLORS.PRIMARY[1], COLORS.PRIMARY[2]);
  doc.text("VALIDACIÓN DE AUTORIDAD", pageWidth / 2, yPos, { align: "center" });
  
  yPos += 30;
  
  // Líneas de firma
  const signatureY = yPos;
  const sigWidth = 60;
  const gap = (contentWidth - (sigWidth * 2)) / 2; // Centrar dos firmas o distribuir 3
  
  // Firma 1
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(margin, signatureY, margin + sigWidth, signatureY);
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text("Dirección Académica", margin + (sigWidth/2), signatureY + 5, { align: "center" });
  
  // Firma 2
  const sig2X = pageWidth - margin - sigWidth;
  doc.line(sig2X, signatureY, sig2X + sigWidth, signatureY);
  doc.text("Coordinación de Gestión de Riesgos", sig2X + (sigWidth/2), signatureY + 5, { align: "center" });


  // ====================================================================
  // 6. RENDERIZAR ÍNDICE (EN HOJA 3)
  // ====================================================================
  doc.setPage(indexPageNum);
  
  doc.setTextColor(192, 57, 43); // Rojo estilo screenshot
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("TABLA DE CONTENIDO", margin, 40);
  
  doc.setDrawColor(192, 57, 43);
  doc.setLineWidth(0.5);
  doc.line(margin, 42, contentWidth, 42); // Línea roja decorativa

  let indexY = 55;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  tocItems.forEach(item => {
      const pageStr = item.page.toString();
      const isMain = item.level === 0;

      doc.setFont("helvetica", isMain ? "normal" : "normal"); 
      
      const indent = isMain ? 0 : 5;
      let displayTitle = item.title;
      const maxChars = isMain ? 60 : 65; 
      if (displayTitle.length > maxChars) displayTitle = displayTitle.substring(0, maxChars) + "...";

      doc.text(displayTitle, margin + indent, indexY);
      
      const titleWidth = doc.getTextWidth(displayTitle);
      const pageNumWidth = doc.getTextWidth(pageStr);
      const dotsStart = margin + indent + titleWidth + 2;
      const dotsEnd = pageWidth - margin - pageNumWidth - 2;
      
      if (dotsEnd > dotsStart) {
          doc.setTextColor(150, 150, 150);
          let dX = dotsStart;
          while (dX < dotsEnd) {
             doc.text(".", dX, indexY);
             dX += 2; 
          }
          doc.setTextColor(0, 0, 0);
      }

      doc.text(pageStr, pageWidth - margin, indexY, { align: "right" });
      indexY += 10;
  });
  
  // Número de página 3
  doc.text("3", pageWidth - margin, pageHeight - 10, { align: "right" });

  // ====================================================================
  // 7. PAGINACIÓN RESTO DE PÁGINAS
  // ====================================================================
  const totalPages = doc.getNumberOfPages();
  for (let i = 4; i <= totalPages; i++) {
    doc.setPage(i);
    drawSimpleFooter(i);
  }

  doc.save("Plan_Evacuacion_PHRT_Oficial.pdf");
};  