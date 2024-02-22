import React, { useState } from 'react';
import { Alert, SafeAreaView, Modal, Button, View, StyleSheet, Text, ScrollView, Pressable} from 'react-native';
import { TextMultiLineInputComponent, TextInputComponent, NumberInputComponent } from '../../components/inputs/InputsComponents';
import PhotoInputComponent from '../../components/inputs/PhotoInputComponent';
import SchemeList from '../../components/SchemeList';
import GridInput from '../../components/inputs/GridInputs';
import { sendJSONToServer } from '../../api/pdf';

const initialInputs = {
	dispositivo: '',
	cliente: '',
	elaborado: '',
	sitioInspeccion: 'Superficies accesibles del cuerpo del depósito. Dispositivo térmicamente aislado y en servicio. Se ensayaron zonas descubiertas en la aislación térmica.',
	resolucion: '0.01',
	minRange: '0.5',
	maxRange: '508',
	palpador:'5MHz',
	diametro: '6',
	norma: 'Norma: ASTM E-797\nMétodo: Medición de espesores por ultrasonido\nTécnica: Pulso - Eco',
	objeto: 'Todas las superficies accesibles y uniones soldadas del tanque.',
	propositoAlcance: 'Inspección de las superficies accesibles con la finalidad de descartar la existencia de deformaciones y severa corrosión localizada.',
	preparacion: 'Limpieza. Iluminación apropiada.',
	resultado:'',
	scheme: {id:'', grid: [], gridData: {}},
	conclusion: '',
};

const MedicionEspesoresScreen = () => {
	const [inputs, setInputs] = useState(initialInputs);
	const [modalVisible, setModalVisible] = useState(false);
	const [schemeImg, setScheme] =  useState({
		id:'',
		grid: [],
		imageUri: null,
	});

	const handleSchemeSet = (id, grid, imageUri) => {
		setScheme((scheme) => ({ ...scheme, id, grid, imageUri }));
		initialInputs.scheme.id = id;
		initialInputs.scheme.grid = grid;
	};

	const handleInputChangeGrid = (title, rowIndex, colIndex, text) => {
		setInputs(prevInputs => {
			const newInputs = { ...prevInputs };
	
			// Verificar si existe el objeto scheme y si tiene un objeto gridData
			if (newInputs.scheme && newInputs.scheme.gridData) {
				// Verificar si el objeto gridData ya tiene un objeto para el título dado
				if (!newInputs.scheme.gridData[title]) {
					newInputs.scheme.gridData[title] = []; // Inicializar como una matriz vacía
				}
				// Verificar si la fila en el índice rowIndex es una matriz
				if (!Array.isArray(newInputs.scheme.gridData[title][rowIndex])) {
					newInputs.scheme.gridData[title][rowIndex] = []; // Inicializar como una matriz vacía
				}
	
				// Actualizar el valor en la matriz correspondiente al título y coordenadas dadas
				newInputs.scheme.gridData[title][rowIndex][colIndex] = text;
			}
			return newInputs;
		});
	};
	
	

	const handleInputChange = (inputName, value) => {
		setInputs((prevInputs) => ({ ...prevInputs, [inputName]: value }));
	};

	const handleSubmit = () => {
		//console.log('Input values:', inputs);
		sendJSONToServer(inputs);
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<TextInputComponent inputName='dispositivo' label='Dipositivo' onInputChange={handleInputChange} />
				<TextInputComponent inputName='cliente' label='Cliente' onInputChange={handleInputChange} />
				<TextInputComponent inputName='elaborado' label='Elaborado por' onInputChange={handleInputChange} />
				<TextMultiLineInputComponent inputName='sitioInspeccion' label='Sitio bajo inspección' defaultInput={initialInputs.sitioInspeccion} onInputChange={handleInputChange} />
				<View>
					<Text>Equipamiento utilizado</Text>
					<NumberInputComponent inputName='resolucion' label='Resolución en mm' onInputChange={handleInputChange}/>
					<Text>Rango de medida</Text>
					<View style={
						{
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							margin:8,
						}
					}>
						<NumberInputComponent inputName='minRange' label='Min' defaultInput={initialInputs.minRange} onInputChange={handleInputChange}/>
						<NumberInputComponent inputName='maxRange' label='Max' defaultInput={initialInputs.maxRange} onInputChange={handleInputChange}/>
					</View>
				</View>

				<Text style={styles.label}>Ensayo visual</Text>
				
				<TextMultiLineInputComponent inputName='objeto' label='Objeto' defaultInput={initialInputs.objeto} onInputChange={handleInputChange} />
				<TextMultiLineInputComponent inputName='propositoAlcance' label='Propósito y alcance' onInputChange={handleInputChange} />
				<TextMultiLineInputComponent inputName='preparacion' label='Preparación' onInputChange={handleInputChange} />
				<TextMultiLineInputComponent inputName='resultado' label='Resultado' onInputChange={handleInputChange} />

				<Text style={styles.label}>Mediciones de Ultasonido</Text>
				<Text style={styles.label}>Aca van los equemas</Text>
				
				{/* PopUP SchemeList */}
				
				<View style={styles.centeredView}>
					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => {
							Alert.alert('No seleccioné ningún esquema.');
							setModalVisible(!modalVisible);
						}}>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<SchemeList onSelectImage={(id, grid, image) => {
									// Manejar el id de la imagen seleccionada aquí
									// setear el id de la imagen en la lista de inputs
										handleSchemeSet(id, grid, image);
										console.log(grid);
										setModalVisible(!modalVisible);
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
						<GridInput inputName={'scheme.gridData'} gridData= {schemeImg.grid} onInputChange={handleInputChangeGrid} />
					</ScrollView>)
				}

				<PhotoInputComponent/>

				<TextMultiLineInputComponent inputName='conclusion' label='conclusion' onInputChange={handleInputChange} />
				<Button title="Crear PDF" onPress={handleSubmit} />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
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

export { MedicionEspesoresScreen }