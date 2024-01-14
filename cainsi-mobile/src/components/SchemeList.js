import React, { useState } from 'react';
import { Text, View, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function SchemeList({ onSelectImage }) {
    const images = [
        { id: '1', source: require('../assets/scheme/1.png') },
        { id: '2', source: require('../assets/scheme/2.png') },
        { id: '3', source: require('../assets/scheme/3.png') },
        { id: '4', source: require('../assets/scheme/4.png') },
        { id: '5', source: require('../assets/scheme/5.png') },
        { id: '6', source: require('../assets/scheme/6.png') },
        { id: '7', source: require('../assets/scheme/7.png') },
        { id: '8', source: require('../assets/scheme/8.png') },
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
