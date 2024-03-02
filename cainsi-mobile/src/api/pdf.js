import * as FileSystem from 'expo-file-system';

const sendJSONToServer = async (jsonData) => {
    try {
        const response = await fetch('https://eltpjtzpzk.execute-api.sa-east-1.amazonaws.com/dev/receive-json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        });
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.startsWith('application/pdf')) {
            // Leer el contenido del PDF como un blob
            const pdfBlob = await response.blob();
            
            // Convertir el blob a una cadena base64
            const reader = new FileReader();
            reader.readAsDataURL(pdfBlob);
            
            let base64Data = '';
            reader.onloadend = () => {
                base64Data = reader.result.split(',')[1]; // Elimina el prefijo data URL
            };
            
            // Esperar a que se lea el blob y se convierta en una cadena base64
            await new Promise((resolve) => {
                reader.onloadend = () => {
                    resolve();
                };
            });
            
            // Generar un nombre de archivo único para el PDF
            const fileName = `${jsonData.dispositivo}${Date.now()}.pdf`;

            // Guardar el PDF en la memoria del dispositivo
            const fileUri = `${FileSystem.documentDirectory}${fileName}`;
            await FileSystem.writeAsStringAsync(fileUri, base64Data, {
                encoding: FileSystem.EncodingType.Base64,
            });

            console.log('PDF guardado correctamente en:', fileUri);
            return fileUri; // Devolver la ruta del archivo guardado
            
        } else {
            // Si la respuesta no es un PDF, lanzar un error
            console.log(response)
            throw new Error('La respuesta no es un PDF');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export { sendJSONToServer };
