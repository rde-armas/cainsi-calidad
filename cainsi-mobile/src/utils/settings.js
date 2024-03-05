import React from 'react';
import * as FileSystem from 'expo-file-system';

function settings() {
    const createFolderIfNotExists = async (folderName) => {
        try {
            const folderInfo = await FileSystem.getInfoAsync(folderName);
            if (!folderInfo.exists) {
                await FileSystem.makeDirectoryAsync(folderName, { intermediates: true });
                console.log(`Carpeta '${folderName}' creada`);
            } else {
                console.log(`La carpeta '${folderName}' ya existe`);
            }
        } catch (error) {
            console.error(`Error al crear la carpeta '${folderName}':`, error);
        }
    };

    React.useEffect(() => {
        createFolderIfNotExists(FileSystem.documentDirectory + 'esquemas/');
        createFolderIfNotExists(FileSystem.documentDirectory + 'settings/');
    }, []);

    return null; 
}

export { settings };