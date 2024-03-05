import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Image, Button, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import Icon from "react-native-vector-icons/Ionicons";

export default function AddSchemeScreen() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        loadImages();
    }, []);

    const loadImages = async () => {
        try {
            const directory = FileSystem.documentDirectory + 'esquemas/'; 
            const files = await FileSystem.readDirectoryAsync(directory);
            const imagesData = files.map(file => ({ id: file, source: { uri: `${directory}/${file}` } }));
            setImages(imagesData);
        } catch (error) {
            console.error('Error cargando imágenes:', error);
        }
    };

    const handleImagePress = (id, grid, source) => {
        // Lógica para manejar el evento de presionar una imagen
    };

	const removeImage = async (id) => {
		try {
			const directory = FileSystem.documentDirectory + 'esquemas/';
			const image = images.find(image => image.id === id);
			await FileSystem.deleteAsync(`${directory}${image.id}`);
			setImages(images => images.filter(image => image.id !== id));
			console.log('Imagen eliminada:', image);
		} catch (err) {
			console.error('Error al eliminar la imagen:', err);
		}
	};

    const handleAddImages = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				quality: 1,
				base64: true,
				imageExportType: 'jpeg',
			});
		
			if (!result.canceled) {
				const manipResult = await ImageManipulator.manipulateAsync(
					result.assets[0].uri,
					[],
					{ format: 'jpeg', base64: true }
				);
				const directory = FileSystem.documentDirectory + 'esquemas/';
				const newImageUri = `${directory}${Date.now().toString()}.jpg`;
	
				await FileSystem.copyAsync({
					from: manipResult.uri,
					to: newImageUri,
				});
	
				const newImage = { id: Math.random().toString(), source: { uri: newImageUri } };
				setImages(images => [...images, newImage]);
				console.log('Imagen agregada:', newImage);
			}
		
		} catch (error) {
			console.error('Error al manipular la imagen:', error);
		}
	};

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={images}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => handleImagePress(item.id, item.grid, item.source)}
                        style={styles.touchable}    
                    >
                        <Image
                            source={item.source}
                            style={styles.image}
                        />
                        <TouchableOpacity style={styles.deleteButton} onPress={() => removeImage(item.id)}>
							<Icon name='trash-outline' /> 
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
			<TouchableOpacity onPress={handleAddImages}>
				<Icon name='add-circle' size={50} color='#3786ff' style={styles.addButtonContainer} />
			</TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    touchable: {
        flex: 1,
        margin: 6,
        height: 180,
        position: 'relative', // Para que el botón de eliminar esté posicionado correctamente
    },
    image: {
        flex: 1,
        width: null,
        maxHeight: 150,
        borderWidth: 2,
        borderColor: "#000",
        resizeMode: "contain",
        margin: 6,
    },
    deleteButton: {
        position: 'absolute',
        bottom: 15,
        right: 0,
        backgroundColor: '#adadad',
        padding: 5,
        borderTopRightRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
    },
    container: {
        flex: 1,
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 20, // Ajusta esto según tu preferencia
        alignSelf: 'center',
    },
});
