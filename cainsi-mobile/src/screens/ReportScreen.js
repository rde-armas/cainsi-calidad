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
  };

  const handleSubmit = () => {
    console.log('Input values:', inputs);
    console.log('Selected Image:', selectedImage);
  };

  return (
    <SafeAreaView style={styles.container}>
		<ScrollView>
			<TextInputComponent label='Informe Técnico de' onInputChange={handleInputChange} />
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
			<ScrollView horizontal>
				<GridInput numRows={5} numCols={6}/>
			</ScrollView>
			
			<Text>Equipamiento utilizado</Text>

			{/* <View style={styles.container}>
				<Text style={styles.label}>Resolucion:</Text>
				<TextInput
					style={styles.numberInput}
					placeholder="Ingrese un número"
					keyboardType="numeric"
					value={inputs.input5}
					onChangeText={(text) => handleInputChange('input5', text)}
				/>
			</View>

			<View style={styles.container}>
				<Text style={styles.label}>Rango de medidas:</Text>
				<TextInput
					style={styles.numberInput}
					placeholder="Ingrese un número"
					keyboardType="numeric"
					value={inputs.input5}
					onChangeText={(text) => handleInputChange('input5', text)}
				/>
				<TextInput
				style={styles.numberInput}
				placeholder="Ingrese un número"
				keyboardType="numeric"
				value={inputs.input5}
				onChangeText={(text) => handleInputChange('input5', text)}
			/>
			</View>

			<View style={styles.container}>
				<Text style={styles.label}>Resolucion:</Text>
				<TextInput
					style={styles.numberInput}
					placeholder="Ingrese un número"
					keyboardType="numeric"
					value={inputs.input5}
					onChangeText={(text) => handleInputChange('input5', text)}
				/>
			</View>

			<View>
				<Text style={styles.label}>Label for Input 5</Text>
				<TextInput
				style={styles.input}
				placeholder="Input 5"
				value={inputs.input5}
				onChangeText={(text) => handleInputChange('input5', text)}
				/>
			</View>

			<View>
				<Text style={styles.label}>Label for Input 5</Text>
				<TextInput
				style={styles.input}
				placeholder="Input 5"
				value={inputs.input5}
				onChangeText={(text) => handleInputChange('input5', text)}
				/>
			</View>

			<View>
				<Text style={styles.label}>Label for Input 5</Text>
				<TextInput
				style={styles.input}
				placeholder="Input 5"
				value={inputs.input5}
				onChangeText={(text) => handleInputChange('input5', text)}
				/>
			</View>

			<View>
				<Text style={styles.label}>Label for Input 5</Text>
				<TextInput
				style={styles.input}
				placeholder="Input 5"
				value={inputs.input5}
				onChangeText={(text) => handleInputChange('input5', text)}
				/>
			</View>

			<View>
				<Text style={styles.label}>Label for Input 5</Text>
				<TextInput
				style={styles.input}
				placeholder="Input 5"
				value={inputs.input5}
				onChangeText={(text) => handleInputChange('input5', text)}
				/>
			</View> */}

			

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
