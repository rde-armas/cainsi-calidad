import * as FileSystem from 'expo-file-system';
import { decode } from 'base-64';

const sendJSONToServer = async (jsonData) => {
    try {
        fetch('https://eltpjtzpzk.execute-api.sa-east-1.amazonaws.com/dev/cainsi-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Respuesta del servidor no es válida');
            }
            return response.blob();
        })
        .then(blob => {
            const reader = new FileReader();
            reader.readAsDataURL(blob); // Leer el Blob como una URL de datos
            reader.onload =  () => {
                const base64Data = reader.result.split(",")[1]; // Extraer la parte de la cadena que contiene la base64 pura
                const fileName = `${jsonData.dispositivo}${Date.now()}.pdf`;
                saveBlobAsPDF(base64Data, fileName);
            };
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });     
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

// Save archivos
async function saveBlobAsPDF(base64Data, fileName) {
    const binaryData = decode(base64Data);
    const base64String = binaryData.toString('base64');
    const directory = FileSystem.documentDirectory;
    FileSystem.writeAsStringAsync(directory + fileName, base64String, { encoding: FileSystem.EncodingType.Base64 });
}

export { sendJSONToServer };