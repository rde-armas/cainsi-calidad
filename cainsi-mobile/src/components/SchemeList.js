import { Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function SchemeListEnvolvente({ onSelectImage, images }) {

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
                    source={item.source}
                    style={style.image}
                />
                </TouchableOpacity>
            )}
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
