import { jsPDF } from "jspdf";
import { readFileSync } from 'fs';

const LOGO_PATH = '../assets/cainsi_logo.png'

const generatePDF = () => { 

    const doc = new jsPDF();
    addHeader(doc)
    addContent(doc)
    addFooter(doc)
    // doc.addPage()
    // addHeader(doc)
    // addContent(doc)
    // addHeader(doc)
    doc.save('a4.pdf')
    console.log("asdf")
 }

 function addHeader(pdf, path = LOGO_PATH) {
    // Ajusta las coordenadas y dimensiones según tus necesidades
    const x = 10;
    const y = 10;
    const width = 50;
    const height = 50;
    const image = imageToBase64(path)
    pdf.addImage(image, 'PNG', x, y, width, height);
 }
 
// Función para agregar pie de página
function addFooter(pdf) {
    pdf.text("Este es el pie de página", 20, pdf.internal.pageSize.height - 10);
}

// Función para agregar contenido
function addContent(pdf) {
    pdf.text("Este es el contenido del documento PDF", 20, 40);
}

function imageToBase64(imagePath) {
    try {
        const imageBuffer = readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');
        const dataUrl = `data:image/png;base64,${base64Image}`;
        return dataUrl;
    } catch (error) {
        console.error('Error al convertir la imagen a base64:', error.message);
        return null;
    }
}

generatePDF()