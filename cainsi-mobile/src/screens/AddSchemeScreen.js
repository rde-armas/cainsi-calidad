import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Image, View, Text , Modal, Alert, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import Icon from "react-native-vector-icons/Ionicons";
import { QuestionsAddScheme } from '../components/inputs/QuestionsAddScheme';

export default function AddSchemeScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [images, setImages] = useState([]);
    const [numero, setNumero] = useState(0);
    const [image, setImage] = useState({ id: '', source: null });
    const [data, setData] = useState([]);
    const [base64Image, setBase64Image] = useState('');

    useEffect(() => {
        loadImages();
    }, []);

    const loadImages = async () => {
        try {
            const directory = FileSystem.documentDirectory + 'esquemas'; 
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
            await loadImages();
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
				quality: 0.7,
				base64: true,
				imageExportType: 'jpeg',
			});
		
			if (!result.canceled) {
				const manipResult = await ImageManipulator.manipulateAsync(
					result.assets[0].uri,
					[],
					{ format: 'jpeg', base64: true }
				);

                setBase64Image(manipResult.base64);
				const directory = FileSystem.documentDirectory + 'esquemas/';
                const date = Date.now().toString();
				const newImageUri = `${directory}${date}.jpg`;
	
				await FileSystem.copyAsync({
					from: manipResult.uri,
					to: newImageUri,
				});
	
				const newImage = { id: date, source: { uri: newImageUri }};
                setImage(newImage);
                setModalVisible(true);
			}
		
		} catch (error) {
			console.error('Error al manipular la imagen:', error);
		}
	};

    const handleDataToGrid = async (data) => {
        const gridData = {id: image.id, grid: [], source: base64Image};
        for(const key in data) {
            if(key.startsWith('title')) {
                const index = key.replace('title', '');
                const title = data[key];
                const columns = data[`columns${index}`].split(',');
                const rows = data[`rows${index}`].split(',');
                gridData.grid.push([title, columns, rows]);
            }
        }
        
        // Ruta de la carpeta y archivo
        const folderPath = FileSystem.documentDirectory + 'esquemas/';
        const filePath = folderPath + 'escheme_mediciones_espesores.json';

        // Verificar si el archivo existe
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        if (fileInfo.exists) {
            try {
                // Leer contenido existente del archivo
                const existingContent = await FileSystem.readAsStringAsync(filePath);

                // Parsear contenido existente como JSON
                const existingData = JSON.parse(existingContent);

                // Agregar el nuevo objeto gridData al arreglo existente
                existingData.push(gridData);

                // Escribir contenido actualizado de vuelta al archivo
                await FileSystem.writeAsStringAsync(filePath, JSON.stringify(existingData));

            } catch (error) {
                console.error('Error al agregar objeto al archivo:', error);
            }
        } else {
            // Si el archivo no existe, escribir el objeto gridData en un nuevo archivo JSON
            try {
                await FileSystem.writeAsStringAsync(filePath, JSON.stringify([gridData]));
                console.log('Archivo creado con el nuevo objeto:', filePath);
            } catch (error) {
                console.error('Error al crear el archivo:', error);
            }
        }

        // Leer el contenido del archivo y hacer un console.log
                            try {
                                const fileContent = await FileSystem.readAsStringAsync(filePath);
                                console.log('Contenido del archivo:', fileContent);
                            } catch (error) {
                                console.error('Error al leer el archivo:', error);
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
            {/* popUp info tablbas */}
            
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('No se completa la  información, esquema incompleto y no guardado.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <QuestionsAddScheme image={image} setData={setData} />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    // Aquí puedes agregar la lógica para manejar el número ingresado
                                    setNumero(numero);
                                    console.log('Número ingresado:');
                                    handleDataToGrid(data);
                                    setModalVisible(!modalVisible);
                                    setImages(images => [...images, image]);
                                    setImage({ id: '', source: null });
                                    setBase64Image('');
                                }}>
                                <Text style={styles.textStyle}>Aceptar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
            

            {/* popUp info tablbas */}
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
    centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		width: '95%',
		height:'95%',
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		//shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
    textStyle: {
		color: 'black',
		fontWeight: 'bold',
		textAlign: 'center',
	},
    button: {
		borderRadius: 5,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#1590f2',
	},
});
