import React, { useState } from 'react';
import { Text, View, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function SchemeList({ onSelectImage }) {
    const images = [
        { id: '1', source: require('../assets/scheme/1.png') },
        { id: '2', source: require('../assets/scheme/2.png') },
        // Agrega más imágenes según sea necesario
    ];

    const handleImagePress = (id, image) => {
        onSelectImage(id, image);
    };

    return (
        <FlatList
        data={images}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
            <TouchableOpacity 
                onPress={() => handleImagePress(item.id)}
                style={style.touchable}    
            >
            <Image
                source={item.source}
                style={style.image}
            />
            </TouchableOpacity>
        )}
        contentContainerStyle={style.flatListContentContainer}
        />
    );
}

const style = StyleSheet.create({
    flatListContententContainer: {
        paddingHorizontal: 5,
    },
    touchable: {
        flex: 1,
        margin: 6,
    },
    image: {
        flex: 1,
        width: null,
        maxHeight: 220,
        borderWidth: 2,
        borderColor: "#000",
        resizeMode: "contain",
        margin: 6,
    },
});
