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
            return response.blob();
        })
        .then(blob => {
            const reader = new FileReader();
            reader.readAsDataURL(blob); // Leer el Blob como una URL de datos
            reader.onload =  () => {
                //const dataUrl = reader.result;
                const base64Data = reader.result.split(",")[1]; // Extraer la parte de la cadena que contiene la base64 pura
                console.log('response', base64Data);
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

// Función para guardar un Blob como un archivo PDF en el dispositivo
async function saveBlobAsPDF(base64Data, fileName) {
    const binaryData = decode(base64Data);
    const base64String = binaryData.toString('base64');
    console.log('base64Data', binaryData);
    const directory = FileSystem.documentDirectory;
    FileSystem.writeAsStringAsync(directory + fileName, base64String, { encoding: FileSystem.EncodingType.Base64 });
}

export { sendJSONToServer };