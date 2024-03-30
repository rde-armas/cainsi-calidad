import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, Image } from 'react-native';

function QuestionsAddScheme({ image, setData }) {
	const [numInputs, setNumInputs] = useState(0);
  	const [inputValues, setInputValues] = useState({});

	// Función para actualizar el estado con el nuevo número
	const handleNumInputsChange = (text) => {
		const num = parseInt(text);
		if(text === '' || isNaN(num)) {
			setNumInputs(0);
			setInputValues([]);
			return;
		}
		setNumInputs(num);
		// Reiniciar los valores de los inputs
		setInputValues(Array(num).fill(''));
	};
	
	// Función para manejar los cambios en los valores de los inputs
	const handleInputChange = (text, index) => {
		const newInputValues = {...inputValues};
		newInputValues[index] = text;
		setInputValues(newInputValues);
		setData(newInputValues);
	};
	
	return (
		<ScrollView contentContainerStyle={styles.scrollViewContainer}>
			<Text style={styles.label}>Esquema seleccionado</Text>
			<Image
				source={image.source}
				style={{ flex: 1, width: undefined, minHeight: 300, margin: 15}}
				resizeMode="contain"
			/>
			<Text style={styles.label}>Ingrese la cantidad de tablas:</Text>
			<TextInput
				style={styles.input}
				placeholder="Ingrese un número"
				onChangeText={handleNumInputsChange}
				keyboardType="numeric"
			/>
			{
				numInputs !== 0 && 
				<Text style={styles.help}>
					Para colocar los nombres(filas o columnas), debes seguir el siguiente patrón: 
					"A,B,C", donde después de dar el nombre de una columna (o fila),
					debes colocar una coma "," para separarla de la siguiente..
				</Text>
			}
			{/* Renderizar los inputs según el número ingresado */}
			{
				Array.from({ length: numInputs }, (_, index) => (
					<View key={index}>
						<Text style={styles.label}>Ingresar el titulo de la tabla {index + 1}: </Text>
						<TextInput
							key={'title' + index}
							style={styles.input}
							placeholder={`Ingresar nombres`}
							value={inputValues[`title${index}`]}
							onChangeText={(text) => handleInputChange(text, `title${index}`)}
						/>
						<Text style={styles.label}>Ingresar el nombre de las columnas de la tabla {index + 1}: </Text>
						<TextInput
							key={'columns' + index}
							style={styles.input}
							placeholder={`Ingresar nombres`}
							value={inputValues[`columns${index}`]}
							onChangeText={(text) => handleInputChange(text, `columns${index}`)}
						/>
						<Text style={styles.label}>Ingresar el nombre de las filas de la tabla {index + 1}</Text>
						<TextInput
							key={'rows' + index}
							style={styles.input}
							placeholder={`Ingresar nombres`}
							value={inputValues[`rows${index}`]}
							onChangeText={(text) => handleInputChange(text, `rows${index}`)}
						/>
				</View>
			))}
		</ScrollView>
	);
};
	
const styles = StyleSheet.create({
	scrollViewContainer: {
        flexGrow: 1,
    },
	container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
	input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        borderRadius: 5,
        paddingHorizontal: 8,
        margin:5,
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
    },
	help: {
		fontSize: 16,
		marginBottom: 15,
		marginTop: 15,
	}
});

export { QuestionsAddScheme }