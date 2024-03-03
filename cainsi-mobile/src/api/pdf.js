import * as FileSystem from 'expo-file-system';

const sendJSONToServer = async (jsonData) => {
    try {
        fetch('https://eltpjtzpzk.execute-api.sa-east-1.amazonaws.com/dev/cainsi-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
        .then(response =>  {
            console.log('Response:', response.status, response.statusText);
            return response })
        .then(blob => {
            console.log('Blob:', blob);
            // const reader = new FileReader();
            // reader.readAsDataURL(blob); // Leer el Blob como una URL de datos
            // reader.onload =  () => {
            //     const dataUrl = reader.result;
            //     console.log('data url', dataUrl);
            //     const base64Content = dataUrl.split(',')[1]; // Extraer el contenido codificado en Base64
            //     console.log('PDF en Base64:', base64Content);
            //     const pdfUri = FileSystem.documentDirectory + 'documento.pdf'; // Ruta del archivo en el dispositivo

            //     try {
            //         // Guardar el contenido codificado en Base64 en el sistema de archivos del dispositivo
            //         FileSystem.writeAsStringAsync(pdfUri, base64Content, { encoding: FileSystem.EncodingType.Base64 });

            //         console.log('PDF guardado en el dispositivo:', pdfUri);
            //     } catch (error) {
            //         console.error('Error al guardar el PDF en el dispositivo:', error);
            //     }
            // };

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

export { sendJSONToServer };
