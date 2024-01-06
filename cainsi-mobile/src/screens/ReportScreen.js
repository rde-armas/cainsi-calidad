import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, View, StyleSheet, Text, ScrollView } from 'react-native';
import { TextMultiLineInputComponent, TextInputComponent, NumberInputComponent } from '../components/InputsComponents';
import PhotoInputComponent from '../components/PhotoInputComponent';
import GridInput from '../components/GridInputs';

const initialInputs = {
  input1: '',
  input2: '',
  input3: '',
  input4: '',
  input5: '',
};

export default function ReportScreen() {
	const [inputs, setInputs] = useState(initialInputs);

	const handleInputChange = (inputName, value) => {
		setInputs((prevInputs) => ({ ...prevInputs, [inputName]: value }));
		console.log(value)
		console.log(inputs.input1.length)
	};

	const handleSubmit = () => {
		console.log('Input values:', inputs);
		console.log('Selected Image:', selectedImage);
	};

  return (
    <SafeAreaView style={styles.container}>
		<ScrollView>
			<TextInputComponent inputName='input1' label='Informe Técnico de' onInputChange={handleInputChange} />
			<TextInputComponent label='Cliente' onInputChange={handleInputChange} />
			<TextInputComponent label='Elaborado por' onInputChange={handleInputChange} />
			<TextInputComponent label='Dispositivo a inspeccionar' onInputChange={handleInputChange} />
			<TextMultiLineInputComponent label='Sitio bajo inspección' onInputChange={handleInputChange} />

			<Text style={styles.label}>Ensayo visual</Text>
			
			<TextMultiLineInputComponent label='Objeto' onInputChange={handleInputChange} />
			<TextMultiLineInputComponent label='Propósito y alcance' onInputChange={handleInputChange} />
			<TextMultiLineInputComponent label='Preparación' onInputChange={handleInputChange} />
			<TextMultiLineInputComponent label='Resultado' onInputChange={handleInputChange} />

			<Text style={styles.label}>Mediciones de Ultasonido</Text>
			<Text style={styles.label}>Aca van los equemas</Text>
			{inputs.input1 && (
				<ScrollView horizontal>
					<GridInput numRows={5} numCols={6} />
				</ScrollView>
			)}

			<Text>Equipamiento utilizado</Text>
			<PhotoInputComponent/>

			<Button title="Submit" onPress={handleSubmit} />
		</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     borderRadius: 5,
//     paddingHorizontal: 8,
// 	margin:5,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   numberInput: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
// 	borderRadius:5,
//     paddingHorizontal: 8,
//   },
//   imagePickerButtonText: {
//     color: 'white',
//   },
//   selectedImage: {
//     width: 200,
//     height: 200,
//     resizeMode: 'cover',
//     marginBottom: 12,
//   },
});
