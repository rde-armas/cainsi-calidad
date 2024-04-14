import * as FileSystem from 'expo-file-system';

export const saveJSONToDevice = async (data) => {
    try {
        const directory = FileSystem.documentDirectory;
        const filePath = directory + `${data.dispositivo}.json`;
        await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data));
    } catch (error) {
        console.error('Error al guardar el JSON en el dispositivo:', error);
    }
};