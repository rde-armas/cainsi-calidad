import express from 'express';
import bodyParser from 'body-parser';
import { generatePDF } from '../generatePdf/index.js';
import { PDFDocument } from 'pdf-lib';
import { createWriteStream } from 'fs';

const app = express();
const PORT = 3000;

app.use(bodyParser.json({ limit: '50mb' }));

app.post('/receive-json', async (req, res) => {
    try {
        const jsonData = req.body;
        const pdfBytes = await generatePDF(jsonData);

        // Comprimir el PDF
        const compressedPdfBytes = await compressPdf(pdfBytes);

        // Enviamos el PDF comprimido como respuesta
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="documento.pdf"'); // Cambiar el nombre del archivo si es necesario
        res.send(compressedPdfBytes);
    } catch (error) {
        console.error('Error al generar o enviar el PDF:', error);
        res.status(500).send('Error al generar o enviar el PDF');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

async function compressPdf(pdfBytes) {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const compressedPdfBytes = await pdfDoc.save({ useObjectStreams: false });
    return compressedPdfBytes;
}
