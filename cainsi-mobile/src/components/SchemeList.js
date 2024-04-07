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

        try {
            const fileInfo = await FileSystem.getInfoAsync(filePath);
            if (fileInfo.exists) {
                const fileContent = await FileSystem.readAsStringAsync(filePath);
                const data = JSON.parse(fileContent);
                for (const item of data[type]) {
                    const { id, grid, source, width, height } = item;
                    setImages((prevImages) => [...prevImages, { id, grid, source, width, height}]); //width, height
                }
            } else {
                alert('No se encontró el archivo de esquemas. Cargar esquemas por favor!!!')
            }
        } catch (error) {
            console.error('Error al leer el archivo:', error);
        }
    }


    const handleImagePress = (grid, source, width, height) => {
        onSelectImage(grid, [source, width, height]);
    };

    return (
        <FlatList
            data={images}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => handleImagePress(item.grid, item.source, item.width, item.height)}
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