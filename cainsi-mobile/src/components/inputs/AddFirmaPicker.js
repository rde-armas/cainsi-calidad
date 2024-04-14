import React from 'react';
import { View, Dimensions, TouchableOpacity, Text, StyleSheet } from 'react-native';
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
                    { format: 'jpeg', compress: 0.6, base64: true } // Comprimir la imagen al 80% de calidad
                );
                onInputChange(inputName, manipResult.base64);//, manipResult.width, manipResult.height]);
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
                <TouchableOpacity onPress={openImagePicker} style={styles.button}>
                    <Text style={styles.buttonText}>Agregar Firma Galeria</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1590f2', 
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10, 
    },
    buttonText: {
        color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
    },
});