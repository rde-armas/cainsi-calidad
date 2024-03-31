import { useState, useEffect } from 'react';
import { Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';

function SchemeList({ onSelectImage, type}) {
    const [images, setImages] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isVisible) {
            loadSchemes();
        }
    }, [isVisible]);

    const loadSchemes = async () => {
        const folderPath = FileSystem.documentDirectory + 'esquemas/';
        const filePath = folderPath + 'escheme_mediciones_espesores.json';

        // Leer el contenido del archivo y hacer un console.log
        try {
            const fileInfo = await FileSystem.getInfoAsync(filePath);
            if (fileInfo.exists) {
                const fileContent = await FileSystem.readAsStringAsync(filePath);
                const data = JSON.parse(fileContent);
                for (const item of data[type]) {
                    const { id, grid, source } = item;
                    setImages((prevImages) => [...prevImages, { id, grid, source }]);
                    console.log('grid', grid)
                }
            } else {
                alert('No se encontró el archivo de esquemas. Cargar esquemas por favor!!!')
            }
        } catch (error) {
            console.error('Error al leer el archivo:', error);
        }
    }


    const handleImagePress = (id, grid, image) => {
        onSelectImage(id, grid, image);
    };

    return (
        <FlatList
            data={images}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => handleImagePress(item.id, item.grid, item.source)}
                    style={style.touchable}
                >
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${item.source}` }}
                        style={style.image}
                    />
                </TouchableOpacity>
            )}
            onLayout={() => setIsVisible(true)}
        />
    );
}

const style = StyleSheet.create({
    flatListContententContainer: {
        paddingHorizontal: 100,
    },
    touchable: {
        flex: 1,
        margin: 6,
        height:180,
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
});

export { SchemeList }