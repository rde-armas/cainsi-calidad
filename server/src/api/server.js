import express from 'express';
import bodyParser from 'body-parser';
import { generatePDF } from '../generatePdf/index.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/receive-json', (req, res) => {
    const jsonData = req.body;
    generatePDF(jsonData);
    res.send('JSON recibido correctamente');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});