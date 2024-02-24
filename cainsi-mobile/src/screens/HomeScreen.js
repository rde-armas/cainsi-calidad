import { SafeAreaView, Image, StyleSheet, TouchableOpacity, View, Dimensions, Text, Alert } from 'react-native';
import React from 'react';
import { ReportContextApp } from '../components/context/AppContext';
import { ReportContext } from '../components/context/ReportContext';

export default function HomeScreen(props) {
  	const { navigation } = props;

	const { setReportUse, report } = React.useContext(ReportContextApp);
	const { resetReportValues, setReportValues, reportInputs } = React.useContext(ReportContext);

	const goToReport = (reportName) => {
		console.log(reportName, report);
		if (report != null && report !== reportName) {
			Alert.alert(
				"Advertencia",
				"Perderás el trabajo del reporte en el que ya estabas trabajando. ¿Deseas continuar?",
				[
					{ text: "Cancelar", style: "cancel" },
					{ text: "Continuar", onPress: () => {
						resetReportValues(reportName);
						setReportUse(reportName);
						navigation.navigate("Report");
					}}
				]
			);
		} else {
			setReportValues(reportName);
			setReportUse(reportName);
			navigation.navigate("Report");
		}
	}

  return (
    <SafeAreaView style={styles.container}>
		<Image source={require('../assets/cainsi_logo.png')} style={styles.logo} />
		<View style={styles.centeredContainer}>
			<TouchableOpacity
				style={styles.touchableOpacity}
				onPress={()=> goToReport("medicionEspesores")}
			>
				<Text style={styles.buttonText}>Medición de Espesores en Recipientes de Presión</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.touchableOpacity}
				onPress={()=> goToReport("empty")}
			>
				<Text style={styles.buttonText}>....</Text>
			</TouchableOpacity>
		</View>
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	centeredContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: windowWidth, // Ajusta el ancho de la imagen según tus necesidades
		marginBottom: 20, // Espacio entre la imagen y el botón
	},
	touchableOpacity: {
		width: windowWidth * 0.8,
		borderWidth: 1,
		borderColor: 'black',
		borderRadius: 10,
		padding: 10,
		alignItems: 'center', // Alinea el contenido al centro horizontalmente
	},
	buttonText: {
		textAlign: 'center', // Alinea el texto al centro
	},
});
