import { jsPDF } from 'jspdf';
import { addHeader, addFooter, createCover } from './firstPage.js';

const sections = [
    {
        title: '1. Sitio de inspección',
        content: 'sitioInspeccion'
    },
    {
        title: '2. Equipamiento utilizado',
        content: ''
    },
    {
        title: '-  Resolución:',
        content: 'resolucion'
    },
    {
        title: '-  Rango de medición',
        content: 'minRange'
    },
    {
        title: '-  Rango de medición',
        content: 'maxRange'
    },
    {
        title: '3. Normativa de Referencia',
        content: 'norma'
    },
    {
        title: '4. Ensayo visual',
        content: ''
    },
    {
        title: 'a. Objeto',
        content: 'objeto'
    },
    {
        title: 'b. Propósito y alcance',
        content: 'propositoAlcance'
    },
    {
        title: 'c. Preparación',
        content: 'preparacion'
    },
    {
        title: 'd. Resultado',
        content: 'resultado'
    },
    {
        title: '5. Mediciones de Ultrasonido',
        content: ''
    },
    {
        title: '6. Conclusión',
        content: 'conclusion'
    }
];

const generatePDF = (data) => { 
    const {dispositivo, cliente, elaborado} = data;
    const doc = new jsPDF();
    addHeader(doc);
    createCover(doc, dispositivo, cliente, elaborado);
    addFooter(doc);
    doc.addPage(doc);
    addHeader(doc);
    addContent(doc, data);
    doc.save('a4.pdf')
    console.log('asdf')
}

// Función para agregar contenido
const addContent = (doc, data) => {
    let yPos = 70; // posición vertical inicial
    const pageHeight = doc.internal.pageSize.height;
    const maxWidth = doc.internal.pageSize.width - 40; // ancho máximo del texto

    sections.forEach(section => {
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(14);
        yPos += 5; // espacio antes de cada título
        const titleLines = doc.splitTextToSize(section.title, maxWidth);
        yPos = checkPageOverflow(doc, yPos, titleLines.length * 10);
        doc.text(10, yPos, titleLines);
        yPos += titleLines.length * 10;

        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(12);
        if (section.content !== '') {
            const contentLines = doc.splitTextToSize(data[section.content], maxWidth);
            yPos = checkPageOverflow(doc, yPos, contentLines.length * 8);
            doc.text(10, yPos, contentLines);
            yPos += contentLines.length * 8;
        }

        // Check if we need to add a new page
        if (yPos > pageHeight - 20) {
            doc.addPage();
            addHeader(doc);
            yPos = 50; // Reset yPos for new page
        }
    });
};

const checkPageOverflow = (doc, currentY, addedHeight) => {
    const pageHeight = doc.internal.pageSize.height;
    if (currentY + addedHeight > pageHeight - 20) {
        doc.addPage();
        addHeader(doc);
        return 50; // Return yPos for new page
    }
    return currentY;
};
export { generatePDF }