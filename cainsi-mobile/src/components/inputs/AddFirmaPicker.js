import React, { useState } from 'react';
import { View, Button, Image, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

export default function AddFirmaPicker({ inputName, onInputChange }) {

    const openImagePicker = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.5,
                base64: true,
                imageExportType: 'jpeg',
            });

            if (!result.canceled) {
                const manipResult = await ImageManipulator.manipulateAsync(
                    result.assets[0].uri,
                    [],
                    { format: 'jpeg', compress: 0.9, base64: true } // Comprimir la imagen al 80% de calidad
                );
                onInputChange(inputName, [manipResult.base64, manipResult.width, manipResult.height]);
            }
        } catch (error) {
            console.error('Error al manipular la imagen:', error);
        }
    };

    // Obtener las dimensiones de la pantalla
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ marginTop: 20 }}>
                <Button title="Firma desde galeria" onPress={openImagePicker} />
            </View>
        </View>
    );
}
