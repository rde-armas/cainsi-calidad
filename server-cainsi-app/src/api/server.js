const express = require('express');
const bodyParser = require('body-parser');
const { generatePDF } = require('../generatePdf/index.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json({ limit: '10mb' }));

app.post('/receive-json', (req, res) => {
    const jsonData = req.body;
    // Aquí puedes llamar a la función para generar el PDF
    generatePDF(jsonData);
    res.send('JSON recibido correctamente');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// const { generatePDF } = require('../generatePdf/index.js');

// module.exports.serverApp = async (event) => {
//   try {
//     const jsonData = JSON.parse(event.body);
//     const pdfArrayBuffer = await generatePDF(jsonData);

//     // Convertir el ArrayBuffer a cadena base64
//     const pdfBase64 = arrayBufferToBase64(pdfArrayBuffer);

//     return {
//       statusCode: 200,
//       headers: {
//         'Content-Type': 'application/pdf',
//         'Content-Disposition': 'attachment; filename="documento.pdf"'
//       },
//       body: pdfBase64,
//       isBase64Encoded: true
//     };
//   } catch (error) {
//     console.error('Error al generar o enviar el PDF:', error);
//     return {
//       statusCode: 500,
//       body: 'Error al generar o enviar el PDF'
//     };
//   }
// };

// // Función para convertir un ArrayBuffer a cadena base64
// function arrayBufferToBase64(arrayBuffer) {
//   const uint8Array = new Uint8Array(arrayBuffer);
//   const binaryString = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
//   return btoa(binaryString);
// }
