import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/receive-json', (req, res) => {
    const jsonData = req.body;
    console.log(jsonData);
    // Aquí puedes llamar a la función para generar el PDF
  // generatePDF(jsonData);
    res.send('JSON recibido correctamente');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});