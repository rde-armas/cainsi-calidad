import React, { useState } from 'react';
import { Text, View, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function SchemeListCasquete({ onSelectImage }) {
    const images = [
        { id: '1', source: require('../assets/scheme/casquetes/1.png') },
        { id: '2', grid:[
            ['Envolvente', ['A', 'B', 'C', 'D'], [1, 2, 3, 4, 5, 6]], 
            ['Casquete', ['Inferior','Superior'], [1, 2, 3, 4, 5, 6, 7, 8, 9]]
            ], source: require('../assets/scheme/casquetes/2.png') },
        { id: '3', grid:[
            ['Resultado', ['Punto', 'Medicio'], [1, 2, 3]], 
            ], source: require('../assets/scheme/casquetes/3.png') },

    ];

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
            contentContainerStyle={style.flatListContentContainer}
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
