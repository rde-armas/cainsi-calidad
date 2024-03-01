import { jsPDF } from 'jspdf';
import { addHeader, addFooter, createCover } from './firstPage.js';
import { addScheme } from './addScheme.js';
import { OpenSansSemiBold } from '../utils/OpenSans-SemiBold-normal.js'
import { OpenSansBold } from '../utils/OpenSans-Bold-normal.js'
import { OpenSansRegular } from '../utils/OpenSans-Regular-normal.js'

const FONT_SIZE_SECCTION = 14;

const sections = [
    {
        title: '1. Sitio de inspección',
        content: 'sitioInspeccion'
    },
    {
        title: '2. Equipamiento utilizado',
        content: '-'
    },
    {
        title: '3. Normativa de Referencia',
        content: 'norma'
    },
    {
        title: '4. Ensayo visual',
        content: 'ensayo'
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
        content: 'scheme'
    },
    {
        title: '6. Conclusión',
        content: 'conclusion'
    }
];

// load fonts
var callAddFont = function () {
    this.addFileToVFS('OpenSans-Regular-normal.ttf', OpenSansRegular);
    this.addFont('OpenSans-Regular-normal.ttf', 'OpenSans-Regular', 'normal');
    this.addFileToVFS('OpenSans-Bold-normal.ttf', OpenSansBold);
    this.addFont('OpenSans-Bold-normal.ttf', 'OpenSans-Bold', 'normal');
    this.addFileToVFS('OpenSans-SemiBold-normal.ttf', OpenSansSemiBold);
    this.addFont('OpenSans-SemiBold-normal.ttf', 'OpenSans-SemiBold', 'normal');
};

jsPDF.API.events.push(['addFonts', callAddFont])

const generatePDF = async (data) => { 
    const {dispositivo, cliente, elaborado, photoDivice} = data;
    const doc = new jsPDF();
    doc.setFont('OpenSans-Regular', 'normal');
    addHeader(doc);
    createCover(doc, dispositivo, cliente, elaborado, photoDivice);
    addFooter(doc);
    doc.addPage(doc);
    addHeader(doc);
    addFooter(doc);
    addContent(doc, data);
    doc.save('a4.pdf')
    return doc.output('bloburl');
}

// Función para agregar contenido
const addContent = (doc, data) => {
    const { resolucion, minRange, maxRange, palpador, diametro} = data;
    let yPos = 40; // posición vertical inicial
    const pageHeight = doc.internal.pageSize.height;
    const maxWidth = doc.internal.pageSize.width - 60; // ancho máximo del texto

    sections.forEach(section => {
        let titleLines = '';
        let contentLines = '';
        let xposTitle = 30;
        let xposContent = 35;
        if (section.content == '-' ){
            //Title
            titleLines = doc.splitTextToSize(section.title, maxWidth);
            
            // content
            doc.setFont('OpenSans-Regular', 'normal');
            contentLines = doc.splitTextToSize(`- Resolución: ${resolucion} mm\n- Rango de medida: ${minRange} a ${maxRange}mm\n- Scan basado en tiempo A/B y compuerta\n- Palpador: ${palpador}, diámetro ${diametro}mm`, maxWidth);
            yPos = checkPageOverflow(doc, yPos, contentLines.length * 7 + titleLines.length * 6);
        } else if (section.content === 'scheme') {
            const {scheme} = data;
            yPos = addScheme(doc, yPos, data.scheme, section.title);
            return;
        }  else if(section.content === 'ensayo'){
            titleLines = doc.splitTextToSize(section.title, maxWidth);
            doc.setFont('OpenSans-Bold', 'normal');
            doc.setFontSize(FONT_SIZE_SECCTION);
            
            doc.text(xposTitle , yPos, titleLines);
            yPos += titleLines.length * 7;
            return;
        } else if (isNaN(parseInt(section.title[0]))) {
            //Title
            titleLines = doc.splitTextToSize(section.title, maxWidth);
            xposTitle = 40;
            
            // content
            contentLines = doc.splitTextToSize(data[section.content], maxWidth, maxWidth);
            yPos = checkPageOverflow(doc, yPos, (contentLines.length + titleLines.length) * 6);
            xposContent = 45;
        } 
        else if (section.content !== '' ) {
            //Title
            titleLines = doc.splitTextToSize(section.title, maxWidth);
            
            // content
            contentLines = doc.splitTextToSize(data[section.content], maxWidth, maxWidth);
            yPos = checkPageOverflow(doc, yPos, contentLines.length * 7 + titleLines.length * 6);
        } 
        
        //title
        if(isNaN(parseInt(section.title[0]))) {
            doc.setFont('OpenSans-SemiBold', 'normal');
        } else {
            doc.setFont('OpenSans-Bold', 'normal');
        }
        doc.setFontSize(FONT_SIZE_SECCTION);
        doc.text(xposTitle , yPos, titleLines);
        yPos += titleLines.length * 7;
        
        //content
        doc.setFont('OpenSans-Regular', 'normal');
        doc.setFontSize(11);
        doc.text(xposContent, yPos, contentLines);
        yPos += contentLines.length * 7;

        // Check if we need to add a new page
        if (yPos > pageHeight - 30) {
            doc.addPage();
            addHeader(doc);
            addFooter(doc);
            yPos = 50; // Reset yPos for new page
        }
    });
};

const checkPageOverflow = (doc, currentY, addedHeight) => {
    const pageHeight = doc.internal.pageSize.height;
    if (currentY + addedHeight > pageHeight - 80) {
        doc.addPage();
        addHeader(doc);
        addFooter(doc);
        return 40; // Return yPos for new page
    }
    return currentY;
};

export { generatePDF, checkPageOverflow }