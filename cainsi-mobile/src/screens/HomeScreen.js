import { SafeAreaView, Image, TouchableHighlightBase, StyleSheet } from 'react-native';
import React from 'react';

export default function HomeScreen() {
  return (
    <SafeAreaView style={style.container}>
      	<Image source={require('../assets/cainsi_logo.png')}/>

    </SafeAreaView>
  )
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		alignContent: 'center'
	},
	button: {
	  width: '100', // Ajusta el ancho del botón al 70%
	  backgroundColor: 'white', // Fondo blanco
	  borderColor: 'black', // Borde negro
	  borderWidth: 1, // Grosor del borde
	  color: 'black', // Texto negro
	},
  });