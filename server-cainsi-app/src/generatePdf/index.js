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
    //doc.save('InformeTecnico.pdf');
    const arrayBuffer = doc.output('arraybuffer');
    return arrayBuffer;
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
    const pageWidth = doc.internal.pageSize.width;
    let lines = [];
    if (data.firmaRes.includes('\n')){
        lines = data.firmaRes.split('\n');
    } else {
        lines.push(data.firmaRes);
        lines.push('');
    }

    // Calcular el ancho de cada línea de texto
    const widthTextLine1 = doc.getTextWidth(lines[0]);
    const widthTextLine2 = doc.getTextWidth(lines[1]);

    // Calcular la posición X para cada línea de texto
    const textXLine1 = (pageWidth - widthTextLine1) / 2;
    const textXLine2 = (pageWidth - widthTextLine2) / 2;
    
    yPos = checkPageOverflow(doc, yPos, 40);
    // Calcular la posición Y para ambas líneas de texto
    const yPosLine1 = yPos; 
    const yPosLine2 = yPos + 6; 
    yPos+=8;

    doc.text(lines[0], textXLine1, yPosLine1);
    doc.setFont('Lato-Bold', 'normal');
    doc.text(lines[1], textXLine2, yPosLine2);
    const imageX = (pageWidth - 38 ) / 2;
    doc.addImage(data.firma, 'JPEG', imageX, yPos, 40, 30);
};

module.exports =  { generatePDF }