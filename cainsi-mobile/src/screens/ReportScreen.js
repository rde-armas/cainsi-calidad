import React, { useState } from 'react';
import { Alert, SafeAreaView, Modal, Button, View, StyleSheet, Text, ScrollView, Pressable} from 'react-native';
import { TextMultiLineInputComponent, TextInputComponent, NumberInputComponent } from '../components/InputsComponents';
import PhotoInputComponent from '../components/PhotoInputComponent';
import SchemeList from '../components/SchemeList';
import GridInput from '../components/GridInputs';

const initialInputs = {
  input1: '',
  input2: '',
  input3: '',
  input4: '',
  input5: '',
};

const schemeImage = {
	id:'',
	imageUri: null,
};

export default function ReportScreen() {
	const [inputs, setInputs] = useState(initialInputs);
	const [modalVisible, setModalVisible] = useState(false);
	const [schemeImg, setScheme] =  useState(schemeImage)

	const handleSchemeSet = (id, imageUri) => {
		setScheme((scheme) => ({ ...scheme, id, imageUri }));
	};

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
				<TextInputComponent inputName='input1' label='Dipositivo' onInputChange={handleInputChange} />
				<TextInputComponent label='Cliente' onInputChange={handleInputChange} />
				<TextInputComponent label='Elaborado por' onInputChange={handleInputChange} />
				<TextInputComponent label='Dispositivo a inspeccionar' onInputChange={handleInputChange} />
				<TextMultiLineInputComponent label='Sitio bajo inspección' onInputChange={handleInputChange} />
				<View>
					<Text>Equipamiento utilizado</Text>
					<NumberInputComponent inputName='resolucion' label='Resolución en mm'/>
					<Text>Rango de medida</Text>
					<View style={
						{
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							margin:8,
						}
					}>
						<NumberInputComponent inputName='minRange' label='Min'/>
						<NumberInputComponent inputName='maxRange' label='Max'/>
					</View>
				</View>
				<Text>LA NORMATIVA ES SIEMPRE LAMISMA ??????????????</Text>

				<Text style={styles.label}>Ensayo visual</Text>
				
				<TextMultiLineInputComponent label='Objeto' onInputChange={handleInputChange} />
				<TextMultiLineInputComponent label='Propósito y alcance' onInputChange={handleInputChange} />
				<TextMultiLineInputComponent label='Preparación' onInputChange={handleInputChange} />
				<TextMultiLineInputComponent label='Resultado' onInputChange={handleInputChange} />

				<Text style={styles.label}>Mediciones de Ultasonido</Text>
				<Text style={styles.label}>Aca van los equemas</Text>
				
				{/* PopUP SchemeList */}
				
				<View style={styles.centeredView}>
					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => {
							Alert.alert('Modal has been closed.');
							setModalVisible(!modalVisible);
						}}>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<SchemeList onSelectImage={(id, image) => {
									// Manejar el id de la imagen seleccionada aquí
									// setear el id de la imagen en la lista de inputs
										handleSchemeSet(id, image)
										console.log(`Imagen seleccionada con id: ${id}`);
										setModalVisible(!modalVisible)
									}}/>
							</View>
						</View>
					</Modal>
					<Pressable
						style={[styles.button, styles.buttonOpen]}
						onPress={() => setModalVisible(true)}>
						<Text style={styles.textStyle}>Seleccionar esquema</Text>
					</Pressable>
				</View>
				{

				}
				{/* PopUP SchemeList end*/}

				{
					schemeImg.id && (
					<ScrollView horizontal>
						<GridInput numRows={5} numCols={6} />
					</ScrollView>)
				}

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
	},centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		width: '95%',
		height:'95%',
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});
