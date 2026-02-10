import jsPDF from 'jspdf';
import { APP_TITLE, EVACUATION_ROUTE, EVACUATION_STEPS, ROLES, MAP_LOCATION_URL } from '../constants';

const COLORS = {
  PRIMARY: [22, 163, 74], // Emerald 600
  SECONDARY: [6, 78, 59], // Emerald 900
  ACCENT_BLUE: [37, 99, 235], // Blue for Classrooms
  ACCENT_AMBER: [217, 119, 6], // Amber for Hallways
  ACCENT_RED: [220, 38, 38], // Red for Stairs
  TEXT_DARK: [30, 41, 59], // Slate 800
  TEXT_LIGHT: [71, 85, 105], // Slate 600
  BG_LIGHT: [248, 250, 252], // Slate 50
  WHITE: [255, 255, 255],
  GRAY_HEADER: [229, 231, 235] // Gray 200
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
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  
  // --- HELPERS ---
  const drawHeader = (title: string, subTitle?: string) => {
    doc.setFillColor(COLORS.SECONDARY[0], COLORS.SECONDARY[1], COLORS.SECONDARY[2]);
    doc.rect(0, 0, pageWidth, 28, 'F');
    
    doc.setTextColor(COLORS.WHITE[0], COLORS.WHITE[1], COLORS.WHITE[2]);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(APP_TITLE.toUpperCase(), margin, 10);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(title, margin, 18);
    if(subTitle) {
      doc.setFontSize(9);
      doc.setTextColor(200, 200, 200);
      doc.text(subTitle, margin, 24);
    }
  };

  const drawFooter = (pageNum: number) => {
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
    
    doc.setFontSize(8);
    doc.setTextColor(COLORS.TEXT_LIGHT[0], COLORS.TEXT_LIGHT[1], COLORS.TEXT_LIGHT[2]);
    doc.text(`Plan de Evacuación - PHRT`, margin, pageHeight - 10);
    doc.text(`Pág. ${pageNum}`, pageWidth - margin - 15, pageHeight - 10);
  };

  const checkPageBreak = (currentY: number, neededHeight: number) => {
    return (currentY + neededHeight > pageHeight - 20);
  };

  // ==========================================
  // PAGE 1: PRESENTATION (Exact Design Request)
  // ==========================================
  
  // 1. Header
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  // Using explicit strings from the image request
  doc.text("Politécnico Hermana Rosario Torres Fe y Alegría", pageWidth / 2, 20, { align: "center" });
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("Desarrollo de Aplicaciones e Informática", pageWidth / 2, 28, { align: "center" });

  // 2. Middle Section
  const middleY = 85;
  
  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("SEGURIDAD Y SALUD EN EL TRABAJO", pageWidth / 2, middleY, { align: "center" });
  
  // Grade
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("Grado 5to, Sección A", pageWidth / 2, middleY + 10, { align: "center" });
  
  // Separator Line (Short horizontal line)
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.line(pageWidth / 2 - 35, middleY + 15, pageWidth / 2 + 35, middleY + 15);

  // Teacher
  doc.text("Maestro: Edgar King", pageWidth / 2, middleY + 25, { align: "center" });

  // Academic Project Title
  const projectY = middleY + 45;
  doc.setFont("helvetica", "bold");
  doc.text("PROYECTO ACADÉMICO:", pageWidth / 2, projectY, { align: "center" });
  
  // Project Description
  doc.setFont("helvetica", "normal");
  const topicText = "Identificación de Peligros y Medidas de Prevención en Centros de Cómputo.";
  const topicLines = doc.splitTextToSize(topicText, 140);
  doc.text(topicLines, pageWidth / 2, projectY + 10, { align: "center" });

  // Vertical Blue Line (The aesthetic element from the PDF screenshot)
  doc.setDrawColor(0, 51, 102); // Dark Navy Blue
  doc.setLineWidth(1.5);
  // Positioned to the right of the text block
  doc.line(185, middleY - 5, 185, projectY + 25);
  doc.setDrawColor(0, 0, 0); // Reset to black

  // 3. Students Table
  const listY = 180;
  const col1X = 40;
  const col2X = 140;

  // Headers
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Nombres y Apellidos:", col1X, listY);
  doc.text("Matrícula:", col2X, listY);

  // Header Underline
  doc.setLineWidth(0.5);
  doc.line(col1X, listY + 2, 175, listY + 2);

  // Student Data (From Image)
  const students = [
      { name: "Briant Alexis", id: "3053" },
      { name: "Nikaury Reyes", id: "3256" },
      { name: "Yinariry Moreno", id: "3077" }
  ];

  doc.setFont("helvetica", "normal");
  let currentStudentY = listY + 12;
  
  students.forEach(s => {
      doc.text(s.name, col1X, currentStudentY);
      doc.text(s.id, col2X, currentStudentY);
      currentStudentY += 10;
  });

  // 4. Footer
  const footerY = 260;
  doc.setFontSize(13);
  doc.text("Santo Domingo, República Dominicana", pageWidth / 2, footerY, { align: "center" });
  doc.text("9 de febrero de 2026", pageWidth / 2, footerY + 10, { align: "center" });

  // Map Link (Unobtrusive)
  doc.setFontSize(10);
  doc.setTextColor(37, 99, 235);
  doc.textWithLink("Ver Ubicación del Centro (Google Maps)", pageWidth / 2, footerY + 20, { 
      align: "center",
      url: MAP_LOCATION_URL 
  });


  // ==========================================
  // PAGE 2+: REPORT CONTENT
  // ==========================================
  
  // --- 2. PROTOCOL DETAILS PAGE ---
  let pageNum = 2;
  doc.addPage();
  drawHeader("PROTOCOLO DE ACTUACIÓN", "Pasos a seguir durante la emergencia");
  
  let yPos = 40;
  
  EVACUATION_STEPS.forEach(step => {
    // Phase Header
    doc.setFillColor(COLORS.PRIMARY[0], COLORS.PRIMARY[1], COLORS.PRIMARY[2]);
    doc.rect(margin, yPos, pageWidth - (margin*2), 8, 'F');
    doc.setTextColor(COLORS.WHITE[0], COLORS.WHITE[1], COLORS.WHITE[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(step.title.toUpperCase(), margin + 2, yPos + 5.5);
    
    yPos += 14;
    
    // Description
    doc.setTextColor(COLORS.TEXT_DARK[0], COLORS.TEXT_DARK[1], COLORS.TEXT_DARK[2]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const descLines = doc.splitTextToSize(step.description, pageWidth - (margin*2));
    doc.text(descLines, margin, yPos);
    
    yPos += (descLines.length * 5) + 8;
  });

  drawFooter(pageNum);
  pageNum++;

  // --- 3. ROLES & RESPONSIBILITIES PAGE ---
  doc.addPage();
  drawHeader("ROLES Y RESPONSABILIDADES", "Asignación de tareas por grupo");
  
  yPos = 40;

  ROLES.forEach(role => {
    if (checkPageBreak(yPos, 50)) {
        drawFooter(pageNum);
        doc.addPage();
        pageNum++;
        drawHeader("ROLES Y RESPONSABILIDADES (Cont.)");
        yPos = 40;
    }

    // Role Title Box
    doc.setDrawColor(COLORS.TEXT_LIGHT[0], COLORS.TEXT_LIGHT[1], COLORS.TEXT_LIGHT[2]);
    doc.setFillColor(COLORS.GRAY_HEADER[0], COLORS.GRAY_HEADER[1], COLORS.GRAY_HEADER[2]);
    doc.rect(margin, yPos, pageWidth - (margin*2), 10, 'FD');
    
    doc.setTextColor(COLORS.TEXT_DARK[0], COLORS.TEXT_DARK[1], COLORS.TEXT_DARK[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(role.title, margin + 4, yPos + 6.5);
    
    yPos += 10;
    
    // Responsibilities List
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    
    role.responsibilities.forEach(resp => {
        const bulletLines = doc.splitTextToSize(`• ${resp}`, pageWidth - (margin*2) - 5);
        
        // Draw background for list item
        doc.setDrawColor(COLORS.GRAY_HEADER[0], COLORS.GRAY_HEADER[1], COLORS.GRAY_HEADER[2]);
        doc.rect(margin, yPos, pageWidth - (margin*2), (bulletLines.length * 5) + 2);
        
        doc.text(bulletLines, margin + 2, yPos + 5);
        yPos += (bulletLines.length * 5) + 2;
    });

    yPos += 8; // Space between roles
  });

  drawFooter(pageNum);
  pageNum++;

  // --- 4. VISUAL ROUTE PAGES ---
  for (const step of EVACUATION_ROUTE) {
    doc.addPage();
    drawHeader(step.title, step.description);
    
    yPos = 35;

    for (const section of step.sections) {
      
      let sectionColor = COLORS.TEXT_DARK;
      if (section.type === 'AULAS') sectionColor = COLORS.ACCENT_BLUE;
      if (section.type === 'PASILLOS') sectionColor = COLORS.ACCENT_AMBER;
      if (section.type === 'ESCALERAS') sectionColor = COLORS.ACCENT_RED;

      if (checkPageBreak(yPos, 60)) {
        drawFooter(pageNum);
        doc.addPage();
        pageNum++;
        drawHeader(step.title, `${step.description} (Cont.)`);
        yPos = 35;
      }

      // Draw Section Title
      doc.setFillColor(sectionColor[0], sectionColor[1], sectionColor[2]);
      doc.rect(margin, yPos, 4, 8, 'F');
      
      doc.setTextColor(sectionColor[0], sectionColor[1], sectionColor[2]);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(section.title.toUpperCase(), margin + 8, yPos + 6);
      
      yPos += 12;

      const imgGap = 5;
      const columns = 2;
      const imgWidth = (pageWidth - (margin * 2) - imgGap) / columns;
      const imgHeight = 55;
      
      for (let i = 0; i < section.images.length; i++) {
        if (i % columns === 0 && checkPageBreak(yPos, imgHeight + 10)) {
           drawFooter(pageNum);
           doc.addPage();
           pageNum++;
           drawHeader(step.title, `${step.description} (Cont.)`);
           yPos = 35;
        }

        const colIndex = i % columns;
        const xPos = margin + (colIndex * (imgWidth + imgGap));
        
        if (i > 0 && i % columns === 0) {
            yPos += imgHeight + 10;
        }

        doc.setFillColor(245, 245, 245);
        doc.rect(xPos, yPos, imgWidth, imgHeight, 'F');
        doc.setDrawColor(220, 220, 220);
        doc.rect(xPos, yPos, imgWidth, imgHeight, 'S');

        try {
            const imgData = await getDataUrl(section.images[i].url);
            if (imgData) {
                doc.addImage(imgData, 'JPEG', xPos, yPos, imgWidth, imgHeight - 8);
            }
        } catch (e) { /* ignore */ }

        doc.setFillColor(COLORS.SECONDARY[0], COLORS.SECONDARY[1], COLORS.SECONDARY[2]);
        doc.rect(xPos, yPos + imgHeight - 8, imgWidth, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        
        let label = section.images[i].label.replace(/^IMG \d+:\s*/, '');
        if (label.length > 35) label = label.substring(0, 32) + "...";
        doc.text(label, xPos + 2, yPos + imgHeight - 2.5);
      }
      yPos += imgHeight + 15;
    }

    drawFooter(pageNum);
    pageNum++;
  }

  doc.save("Plan_Evacuacion_PHRT_Oficial.pdf");
};