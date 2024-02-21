import { addImage, dimensionAspectRatio } from './addImage.js';

const LOGO_PATH = '../assets/cainsi_logo.png'

function addHeader(pdf, path = LOGO_PATH) {
    const rectWidth = pdf.internal.pageSize.getWidth() - 70; // Ancho de la página - márgenes
    const fillColor = "#aca899";
    pdf.setFillColor(fillColor);
    pdf.rect(35, 15, rectWidth, 1.2, 'F')
    addImage(pdf, path, 'PNG', 45, 16, 75, 18);
}

// Función para agregar pie de página
function addFooter(pdf) {
    const lineHeight = 10; // Altura de línea
    const verticalCenter = pdf.internal.pageSize.height - 30; // Posición vertical en el centro
    pdf.setFontSize(11);
    pdf.setFont('Helvetica', 'bold');
    pdf.text('CAINSI - Servicios Industriales\n\nwww.cainsi.com', pdf.internal.pageSize.width / 2, verticalCenter, { align: 'center' });
}

function createCover(pdf, deviceName, client, madeBy ) {
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;

    // Obtener la fecha actual en el formato deseado
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('es-UY', options);

    // Configurar estilo para fecha
    pdf.setFontSize(12);
    pdf.setFont('Helvetica', 'normal');

    // Dibujar la fecha
    const dateX = pageWidth - pdf.getTextDimensions(`Montevideo, ${formattedDate}`).w - 35
    pdf.text(`Montevideo, ${formattedDate}`, dateX, 50);

    // Configurar estilo para línea negra
    pdf.setLineWidth(0.2);
    pdf.setDrawColor(0, 0, 0);

    // Configurar estilo para título
    pdf.setFontSize(16);
    pdf.setFont('Helvetica');

    // Dibujar el título
    const title = "Informe Técnico de Medición de Espesores en\nRecipientes de Presión";
    const titleY = 70;
    pdf.text(title, pageWidth / 2, titleY, { align: 'center' });

    // Dibujar línea encima del título
    const titleTopLineY = titleY - pdf.getTextDimensions(title).h - 7;
    pdf.line(35, titleTopLineY, pageWidth - 35, titleTopLineY);

    // Dibujar línea debajo del título
    const titleBottomLineY = titleY + pdf.getTextDimensions(title).h + 10;
    pdf.line(35, titleBottomLineY, pageWidth - 35, titleBottomLineY);

    // Name device
    pdf.text(deviceName, pageWidth / 2, titleBottomLineY + 15, { align: 'center' });

    // Añadir imagen al centro
    const imagePath = '../assets/Untitled.jpg'; 
    const { width, height } = dimensionAspectRatio(imagePath, pageWidth - 80, 115);
    const imageX = (pageWidth - width) / 2;
    const imageY = ((pageHeight - height) / 2) + 20;
    addImage(pdf, imagePath, 'JPG', imageX, imageY, pageWidth - 80, 115);
    pdf.rect(imageX - 3, imageY - 3, width + 6, height + 6);

    pdf.setFontSize(14);
    const clientText = `Cliente: ${client}`;
    const madeByText = `Elaborado por: ${madeBy}`;

    // Determinar la longitud del texto más largo
    const clientTextWidth = pdf.getTextDimensions(clientText).w;
    const madeByTextWidth = pdf.getTextDimensions(madeByText).w;
    const longestTextWidth = Math.max(clientTextWidth, madeByTextWidth);

    // Calcular las posiciones y dibujar la línea
    const lineY = pageHeight - 57;
    const lineX1 = (pageWidth - longestTextWidth) / 2;
    const lineX2 = (pageWidth + longestTextWidth) / 2;

    pdf.text(clientText, pageWidth / 2, pageHeight - 60, { align: 'center' });
    pdf.text(madeByText, pageWidth / 2, pageHeight - 50, { align: 'center' });

    // Dibujar la línea horizontal
    pdf.setLineWidth(0.2); 
    pdf.line(lineX1, lineY, lineX2, lineY);

}

export { addHeader, addFooter, createCover };