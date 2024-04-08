const { jsPDF } = require('jspdf');
const { addHeader, addFooter, createCover } = require('./firstPage.js');
const { addScheme, checkPageOverflow } = require('./addScheme.js');
const { LatoRegular } = require('../utils/Lato-Regular-normal.js');
const { LatoLight } = require('../utils/Lato-Light-normal.js');
const { LatoBold } = require('../utils/Lato-Bold-normal.js');

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
    this.addFileToVFS('Lato-Regular-normal.ttf', LatoRegular);
    this.addFont('Lato-Regular-normal.ttf', 'Lato-Regular', 'normal');
    this.addFileToVFS('Lato-Bold-normal.ttf', LatoBold);
    this.addFont('Lato-Bold-normal.ttf', 'Lato-Bold', 'normal');
    this.addFileToVFS('Lato-Light-normal.ttf', LatoLight);
    this.addFont('Lato-Light-normal.ttf', 'Lato-Light', 'normal');
};

jsPDF.API.events.push(['addFonts', callAddFont])

const generatePDF = async (data) => { 
    const {dispositivo, cliente, elaborado, photoDivice} = data;
    const doc = new jsPDF();
    doc.setFont('Lato-Light', 'normal');
    addHeader(doc);
    createCover(doc, dispositivo, cliente, elaborado, photoDivice);
    addFooter(doc);
    doc.addPage(doc);
    addHeader(doc);
    addFooter(doc);
    addContent(doc, data);
    doc.save('InformeTecnico.pdf');
    const arrayBuffer = doc.output('arraybuffer');
    //return arrayBuffer;
};

// Función para agregar contenido
const addContent = async (doc, data) => {
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
            doc.setFont('Lato-Light', 'normal');
            contentLines = doc.splitTextToSize(`- Resolución: ${resolucion} mm\n- Rango de medida: ${minRange} a ${maxRange}mm\n- Scan basado en tiempo A/B y compuerta\n- Palpador: ${palpador}, diámetro ${diametro}mm`, maxWidth);
            yPos = checkPageOverflow(doc, yPos, contentLines.length * 7 + titleLines.length * 6);
        } else if (section.content === 'scheme') {
            const {scheme} = data;
            yPos = addScheme(doc, yPos, data.scheme, section.title);
            return;
        }  else if(section.content === 'ensayo'){
            titleLines = doc.splitTextToSize(section.title, maxWidth);
            doc.setFont('Lato-Bold', 'normal');
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
            doc.setFont('Lato-Regular', 'normal');
        } else {
            doc.setFont('Lato-Bold', 'normal');
        }
        doc.setFontSize(FONT_SIZE_SECCTION);
        doc.text(xposTitle , yPos, titleLines);
        yPos += titleLines.length * 7;
        
        //content
        doc.setFont('Lato-Light', 'normal');
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
    // Add firmas
    const pageWidth = doc.internal.pageSize.width;
    let linesFirma1 = [];
    
    if (data.firmaRes1.includes('\n')) {
        linesFirma1 = data.firmaRes1.split('\n');
    } else {
        linesFirma1.push(data.firmaRes1);
        linesFirma1.push('');
    }
    
    // Calcular el ancho de cada línea de texto
    let widthTextLine1 = doc.getTextWidth(linesFirma1[0]);
    let widthTextLine2 = doc.getTextWidth(linesFirma1[1]);
    
    // Calcular la posición X para cada línea de texto
    let textXLine1;
    let textXLine2;
    
    if (data.firma2 !== '-') {
        // Si hay una segunda firma, calcular la posición X de acuerdo al espacio entre las firmas
        const spaceBetweenFirmas = (pageWidth ) / 2;
        textXLine1 = (spaceBetweenFirmas - widthTextLine1) / 2 + 25; 
        textXLine2 = (spaceBetweenFirmas - widthTextLine2) / 2 + 25; 
    } else {
        // Si solo hay una firma, centrar el texto horizontalmente en la página
        textXLine1 = (pageWidth - widthTextLine1) / 2; // Posición X para el texto de firmaRes1
        textXLine2 = (pageWidth - widthTextLine2) / 2; // Posición X para el texto de firmaRes2
    }
    
    yPos = checkPageOverflow(doc, yPos, 40);
    
    // Calcular la posición Y para ambas líneas de texto
    let yPosLine1 = yPos;
    let yPosLine2 = yPos + 6;
    yPos += 8;
    
    // Dibujar la primera línea de texto encima de la primera firma
    doc.text(linesFirma1[0], textXLine1, yPosLine1);
    doc.setFont('Lato-Bold', 'normal');
    doc.text(linesFirma1[1], textXLine2, yPosLine2);
    
    // Calcular la posición X para la primera firma
    let imageX1;
    if (data.firma2 && data.firma2 !== '-') {
        // Si hay una segunda firma, colocar ambas firmas en la misma línea horizontal
        imageX1 = (pageWidth + 20 ) / 4; // Posición X de la primera firma
    } else {
        // Si solo hay una firma, centrarla horizontalmente en la página
        imageX1 = (pageWidth) / 2; // Posición X de la primera firma
    }
    
    // Dibujar la primera firma
    doc.addImage(data.firma1, 'JPEG', imageX1, yPos, 40, 30);
    
    // Verificar si hay una segunda firma
    if (data.firma2 && data.firma2 !== '-') {
        // Dibujar la segunda firma y texto asociado
        const imageX2 = (pageWidth - 40) / 4 * 3; // Posición X de la segunda firma
        doc.addImage(data.firma2, 'JPEG', imageX2, yPos, 40, 30);
    
        // Si hay un firmaRes2, dibujarla encima de la segunda firma
        if (data.firmaRes2 !== '-') {
            let linesFirma2 = [];
    
            if (data.firmaRes2.includes('\n')) {
                linesFirma2 = data.firmaRes2.split('\n');
            } else {
                linesFirma2.push(data.firmaRes2);
                linesFirma2.push('');
            }
            widthTextLine1 = doc.getTextWidth(linesFirma2[0]);
            widthTextLine2 = doc.getTextWidth(linesFirma2[1]);
            textXLine1 = imageX2 + (50 - widthTextLine1) / 2; // Posición X para firmaRes2 centrada
            textXLine2 = imageX2 + (50 - widthTextLine2) / 2; // Posición X para firmaRes2 centrada
            //doc.text(data.firmaRes2, textXRes2, yPos - 10); // Posición Y para firmaRes2 encima de la segunda firma
            yPosLine1 = yPos - 8;
            yPosLine2 = yPosLine1 + 6;
            doc.setFont('Lato-Light', 'normal');
            doc.text(linesFirma2[0], textXLine1, yPosLine1);
            doc.setFont('Lato-Bold', 'normal');
            doc.text(linesFirma2[1], textXLine2, yPosLine2);
        }
    }
    
    // Ajustar yPos para dejar espacio para la siguiente sección si es necesario
    yPos += (data.firma2 && data.firma2 !== '-') ? 40 : 0;
};

module.exports =  { generatePDF }