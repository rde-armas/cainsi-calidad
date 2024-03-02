const { generatePDF } = require('../generatePdf/index.js');
const { PDFDocument } = require('pdf-lib');

module.exports.serverApp = async (event) => {
  try {
    const jsonData = JSON.parse(event.body);
    const pdfBytes = await generatePDF(jsonData);

    // Comprimir el PDF
    const compressedPdfBytes = await compressPdf(pdfBytes);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="documento.pdf"'
      },
      body: compressedPdfBytes.toString('base64'),
      isBase64Encoded: true
    };
  } catch (error) {
    console.error('Error al generar o enviar el PDF:', error);
    return {
      statusCode: 500,
      body: 'Error al generar o enviar el PDF'
    };
  }
};

async function compressPdf(pdfBytes) {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  // Opciones de compresión 
  const options = {
    useObjectStreams: true,  // Usa streams de objetos para reducir el tamaño del archivo
    objectsPerTick: 1,       // Procesa solo un objeto a la vez para un control más fino
    compress: true,          // Habilita la compresión del PDF
    autoOptimize: true,      // Optimiza automáticamente el tamaño del archivo
    updateFieldOffsets: true // Actualiza automáticamente los desplazamientos de campo
  };
  const compressedPdfBytes = await pdfDoc.save(options);
  return compressedPdfBytes;
}
