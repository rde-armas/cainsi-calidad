import React, { useState } from 'react';
import { View, Button, Image, Platform, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function Camara({inputName, onInputChange}) {
	const [selectedImage, setSelectedImage] = useState(null);

	const openImagePicker = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
			base64: true,
			imageExportType: 'jpeg',
		});

		if (!result.canceled) {
			//saveImage(result.assets[0]);
			onInputChange(inputName, [result.assets[0].base64, result.assets[0].width, result.assets[0].height]);
		}
	};

	const handleCameraLaunch = async () => {
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
			base64: true,
			imageExportType: 'jpeg',
		});

		if (!result.canceled) {
			//saveImage(result.assets[0]);
			onInputChange(inputName, [result.assets[0].base64, result.assets[0].width, result.assets[0].height]);
		}
	};

	const saveImage = async (image) => {
		try {
			let fileName = 'imagen.jpeg';
			let directory = FileSystem.documentDirectory;
			let destination = directory + fileName;

			if (Platform.OS === 'android') {
				await FileSystem.moveAsync({
					from: image.uri,
					to: destination,
				});
			} else {
				await FileSystem.copyAsync({
					from: image.uri,
					to: destination,
				});
			}

			setSelectedImage(image);
			console.log('Imagen guardada en:', selectedImage.uri);
		} catch (error) {
			console.error('Error al guardar la imagen:', error);
		}
	};
	
	// Obtener las dimensiones de la pantalla
	const windowWidth = Dimensions.get('window').width;
	const windowHeight = Dimensions.get('window').height;

	// Dentro de tu componente
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			{selectedImage && selectedImage.uri && (
				<View style={{ width: windowWidth * 0.7, height: windowHeight * 0.5, borderWidth: 2, borderColor: 'black' }}>
					<Image
						source={{ uri: `data:image/jpeg;base64,${selectedImage.base64}`}}
						style={{ flex: 1, width: undefined, height: undefined }}
						resizeMode="contain"
					/>
				</View>
			)}
			<View style={{ marginTop: 20 }}>
				<Button title="De galeria" onPress={openImagePicker} />
			</View>
			<View style={{ marginTop: 20 }}>
				<Button title="Tomar Foto" onPress={handleCameraLaunch} />
			</View>
		</View>
	);
}
