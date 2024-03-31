import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, Modal, Button, View, StyleSheet, Text, ScrollView, Pressable, Dimensions} from 'react-native';
import { TextMultiLineInputComponent, TextInputComponent, NumberInputComponent } from '../../components/inputs/InputsComponents';
import { FirmaInputs } from '../../components/inputs/FirmaInputs';
import PhotoInputComponent from '../../components/inputs/PhotoInputComponent';
import { SchemeList } from '../../components/SchemeList';
import GridInput from '../../components/inputs/GridInputs';
import { sendJSONToServer } from '../../api/pdf';
import { saveJSONToDevice } from '../../utils/saveJSONToDevice';
import { ReportContext } from '../../components/context/ReportContext';
import { envolventes, casquetes } from '../../utils/constants';

const MedicionEspesoresScreen = ({ navigation }) => {
	const { reportInputs, resetReportValues } = React.useContext(ReportContext);
	let initialInputs = {...reportInputs};
	const [inputs, setInputs] = useState(initialInputs);
	const [modalVisibleEnvolventes, setModalVisibleEnvoventes] = useState(false);
	const [modalVisibleCasquetes, setModalVisibleCasquetes] = useState(false);
	const [modalVisibleFirma1, setModalVisibleFirma1] = useState(false);
	const [modalVisibleFirma2, setModalVisibleFirma2] = useState(false);
	const [schemeImg, setScheme] =  useState({
		idEnvolvente:'',
		idCasquete: '',
		grid: [],
		imageUriEnv: null,
		imageUriCas: null,
	});
	

	const handleSchemeSet = (idEnvolvente, grid, imageUriEnv, idCasquete='', imageUriCas='') => {
		setScheme((scheme) => (
			{ ...scheme, idEnvolvente, idCasquete, grid, imageUriEnv, imageUriCas, }
			));
	};

	const handleCasqueteSet = (id, list, img) => {
		schemeImg.grid[1].push(list);
		schemeImg.imageUriCas = img;
		schemeImg.idCasquete = id;
		inputs.scheme.grid = schemeImg.grid;
		inputs.scheme.idCasquete = id;
		inputs.scheme.idEnvolvente = schemeImg.idEnvolvente;
	}
	
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

	const isObjectEmpty = (obj) => {
		for (let key in obj) {
			if(key !== 'observaciones'){
				if (Array.isArray(obj[key])) {
					if (obj[key].length === 0 || obj[key].some(item => item === undefined)) {
						return [true, key];
					}
				} else if (!obj[key] || obj[key] === '' || obj[key] === undefined) {
					  return [true, key];
				} else if (typeof obj[key] === 'object') {
					const [isEmpty, nestedKey] = isObjectEmpty(obj[key]);
					if (isEmpty) {
						return [true, nestedKey];
					}
				}
			}
		}
		
		if (Object.keys(obj).length === 0) {
			return [true, 'de la tabla'];
		}

		return [false, null];
	};

	const handleSubmit = async () => {
		const key = isObjectEmpty(inputs)[1];
		if (isObjectEmpty(inputs)[0]) {
		  alert(`Por favor complete el campo "${key}" antes de generar el PDF.`);
		  return;
		}
		saveJSONToDevice(inputs);
		
		try {
			await sendJSONToServer(inputs);
			alert('Reporte enviado correctamente');
			resetReportValues('medicionEspesores');
			navigation.navigate("Home");
		} catch (error) {
			alert('Error al enviar el reporte');
			console.error(error);
		}
	};
	
	const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<TextInputComponent inputName='dispositivo' label='Dipositivo' defaultInput={initialInputs.dispositivo} onInputChange={handleInputChange} />
				<PhotoInputComponent inputName={'photoDivice'} onInputChange={handleInputChange}/>
				<TextInputComponent inputName='cliente' label='Cliente' defaultInput={initialInputs.cliente} onInputChange={handleInputChange} />
				<TextInputComponent inputName='elaborado' label='Elaborado por' defaultInput={initialInputs.elaborado} onInputChange={handleInputChange} />
				<TextMultiLineInputComponent inputName='sitioInspeccion' label='Sitio bajo inspección' defaultInput={initialInputs.sitioInspeccion} onInputChange={handleInputChange} />
				<View>
					<Text>Equipamiento utilizado</Text>
					<NumberInputComponent inputName='resolucion' label='Resolución en mm' defaultInput={initialInputs.resolucion} onInputChange={handleInputChange}/>
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
				<TextMultiLineInputComponent inputName='propositoAlcance' label='Propósito y alcance' defaultInput={initialInputs.propositoAlcance} onInputChange={handleInputChange} />
				<TextMultiLineInputComponent inputName='preparacion' label='Preparación' defaultInput={initialInputs.preparacion} onInputChange={handleInputChange} />
				<TextMultiLineInputComponent inputName='resultado' label='Resultado' defaultInput={initialInputs.resultado} onInputChange={handleInputChange} />

				<Text style={styles.label}>Mediciones de Ultrasonido</Text>
				
				{/* PopUP SchemeListencolvente */}
				
				<View style={styles.centeredView}>
					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisibleEnvolventes}
						onRequestClose={() => {
							Alert.alert('No seleccioné ningún esquema.');
							setModalVisibleEnvoventes(!modalVisibleEnvolventes);
						}}>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<SchemeList onSelectImage={(id, grid, image) => {
										handleSchemeSet(id, grid, image);
										setModalVisibleEnvoventes(!modalVisibleEnvolventes);
									}} type='envolventes'/>
							</View>
						</View>
					</Modal>
					<Pressable
						style={[styles.button, styles.buttonOpen]}
						onPress={() => setModalVisibleEnvoventes(true)}>
						<Text style={styles.textStyle}>Seleccionar Envolvente</Text>
					</Pressable>
				</View>

				{/* PopUP SchemeList envolventes end*/}

				{
					schemeImg.idEnvolvente && (
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
							<View style={{ width: windowWidth * 0.7, height: windowHeight * 0.5, borderWidth: 2, borderColor: 'black' }}>
								<Image
									source={{uri: `data:image/jpeg;base64,${schemeImg.imageUriEnv}`}}
									style={{ flex: 1, width: undefined, height: undefined }}
									resizeMode="contain"
								/>
							</View>
						</View>
					)
				}
				{/* PopUP casquetes */}
				{
					schemeImg.idEnvolvente && (
					<View style={styles.centeredView}>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalVisibleCasquetes}
							onRequestClose={() => {
								Alert.alert('No seleccioné ningún esquema.');
								setModalVisibleCasquetes(!modalVisibleCasquetes);
							}}>
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									<SchemeList onSelectImage={(id, grid, image) => {
										// Manejar el id de la imagen seleccionada aquí
										// setear el id de la imagen en la lista de inputs
											handleCasqueteSet(id, grid, image);
											setModalVisibleCasquetes(!modalVisibleCasquetes);
										}} type='casquetes'/>
								</View>
							</View>
						</Modal>
						<Pressable
							style={[styles.button, styles.buttonOpen]}
							onPress={() => setModalVisibleCasquetes(true)}>
							<Text style={styles.textStyle}>Seleccionar Casquete</Text>
						</Pressable>
					</View>
					)
				}

				{/* PopUP SchemeList casquetes end*/}

				{
					schemeImg.idCasquete && (
					<>
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
							<View style={{ width: windowWidth * 0.7, height: windowHeight * 0.5, borderWidth: 2, borderColor: 'black' }}>
								<Image
									source={{ uri:`data:image/jpeg;base64,${schemeImg.imageUriCas}`}}
									style={{ flex: 1, width: undefined, height: undefined }}
									resizeMode="contain"
								/>
							</View>
						</View>
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
							<ScrollView horizontal>
								<GridInput inputName={'scheme.gridData'} gridData= {schemeImg.grid} onInputChange={handleInputChangeGrid} />
							</ScrollView>
						</View>
					</>)
				}
				<TextMultiLineInputComponent inputName='firmaRes' label='Responsable' defaultInput={initialInputs.firmaRes} onInputChange={handleInputChange} />
				{/* popUp Firma */}
					<View style={styles.centeredView}>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalVisibleFirma1}
							onRequestClose={() => {
								Alert.alert('No se realizó ninguna firma.');
								setModalVisibleFirma1(!modalVisibleFirma1);
							}}>
							<View style={styles.centeredView}>
								<View style={styles.modalViewFirma}>
									<FirmaInputs onInputFrirma={(firma)=> {
										const img = firma.replace("data:image/jpeg;base64,", "");
										handleInputChange('firma1', img);
										initialInputs.firma1 = firma;
										console.log('firma', initialInputs.firma1);
										setModalVisibleFirma1(!modalVisibleFirma1);
									}}/>
								</View>
							</View>
						</Modal>
						<Pressable
							style={[styles.button, styles.buttonOpen]}
							onPress={() => setModalVisibleFirma1(true)}>
							<Text style={styles.textStyle}>Firmar</Text>
						</Pressable>
					</View>
					{/* segunda firma */}
					<View style={styles.centeredView}>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalVisibleFirma2}
							onRequestClose={() => {
								Alert.alert('No se realizó ninguna firma.');
								setModalVisibleFirma2(!modalVisibleFirma2);
							}}>
							<View style={styles.centeredView}>
								<View style={styles.modalViewFirma}>
									<FirmaInputs onInputFrirma={(firma)=> {
										const img = firma.replace("data:image/jpeg;base64,", "");
										handleInputChange('firma2', img);
										initialInputs.firma2 = firma;
										setModalVisibleFirma2(!modalVisibleFirma2);
									}}/>
								</View>
							</View>
						</Modal>
						<Pressable
							style={[styles.button, styles.buttonOpen]}
							onPress={() => setModalVisibleFirma2(true)}>
							<Text style={styles.textStyle}>Agregar segunda firma.</Text>
						</Pressable>
					</View>
				{/* Fin PopUP FIrma */}
				{	
					initialInputs.firma1 && (
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
							<View style={{ width: windowWidth * 0.7, height: windowHeight * 0.5, borderWidth: 2, borderColor: 'black' }}>
								<Image
									source={{uri: initialInputs.firma1}}
									style={{ flex: 1, width: undefined, height: undefined }}
									resizeMode="contain"
									/>
							</View>
						</View>
					)
				}
				{	
					initialInputs.firma2 && (
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
							<View style={{ width: windowWidth * 0.7, height: windowHeight * 0.5, borderWidth: 2, borderColor: 'black' }}>
								<Image
									source={{uri: initialInputs.firma2}}
									style={{ flex: 1, width: undefined, height: undefined }}
									resizeMode="contain"
									/>
							</View>
						</View>
					)
				}

				
				<TextMultiLineInputComponent inputName='conclusion' label='Conclusion' defaultInput={initialInputs.conclusion} onInputChange={handleInputChange} />
				<View style={{ margin: 20 }}>
 					<Button title="Crear PDF" onPress={handleSubmit} />
				</View>
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
		//shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalViewFirma: {
		width: '95%',
		height:'60%',
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		//shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 5,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#1590f2',
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