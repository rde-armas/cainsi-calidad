import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SchemeRender = ({ image }) => {
    return (
        <View style={styles.container}>
        <Image
            style={styles.image}
            source={{ uri: image }}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        margin: 20,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'black',
    },
    image: {
        height: 200,
        width: 300,
        borderRadius: 15,
        resizeMode: 'contain',
    },
});

export default SchemeRender;
