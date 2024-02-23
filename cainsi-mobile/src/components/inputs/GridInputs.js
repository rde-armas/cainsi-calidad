import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const GridInput = ({ inputName, gridData, onInputChange }) => {
	const [gridDataCells, setGridDataCells] = useState({});

	const renderItem = ({ item }) => {
		const title = item[0];
		const columns = item[1];
		const rowsData = item[2];

		const handleInputChange = (rowIndex, colIndex, text) => {
			const updatedGridData = { ...gridDataCells };
			if (!updatedGridData[title]) {
				updatedGridData[title] = [];
			}
			if (!updatedGridData[title][rowIndex]) {
				updatedGridData[title][rowIndex] = [];
			}
			updatedGridData[title][rowIndex][colIndex] = text;
			//console.log(gridDataCells);
			setGridDataCells(updatedGridData);
			console.log(inputName);
			onInputChange(title, rowIndex, colIndex, text);
		};

		return (
				<View style={styles.grid}>
				<Text style={styles.gridTitle}>{title}</Text>
				<View style={styles.gridRow}>
					<Text style={[styles.gridCell, styles.gridCellNonInput]}></Text>
					{columns.map((columnName, colIndex) => (
					<Text key={colIndex} style={[styles.gridCell, styles.gridCellNonInput]}>{columnName}</Text>
					))}
				</View>
				{rowsData.map((rowData, rowIndex) => (
					<View key={rowIndex} style={styles.gridRow}>
					<Text style={[styles.gridCell, styles.gridCellNonInput]}>{rowData}</Text>
					{columns.map((column, colIndex) => (
						<TextInput
						key={colIndex}
						style={styles.textInput}
						keyboardType="numeric"
						value={gridDataCells[title]?.[rowIndex]?.[colIndex] || ''}
						onChangeText={(text) => handleInputChange(rowIndex, colIndex, text)}
						/>
					))}
					</View>
				))}
				</View>
			);
		};
		

	return (
		<FlatList
		data={gridData}
		renderItem={renderItem}
		keyExtractor={(item, index) => index.toString()}
		/>
	);
};

const styles = StyleSheet.create({
	grid: {
		marginBottom: 20,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
		padding: 10,
	},
	gridTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 5,
		flex: 1, // Hace que todas las celdas del título tengan el mismo tamaño
	},
	gridRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 5,
	},
	gridCell: {
		borderWidth: 1,
		borderColor: 'gray',
		padding: 10,
		flex: 1, // Hace que todas las celdas tengan el mismo tamaño
		textAlign: 'center',
	},
	textInput: {
		flex: 1, // Hace que todas las celdas de entrada de texto tengan el mismo tamaño
		borderWidth: 1,
		borderColor: 'gray',
		padding: 10,
		textAlign: 'center',
	},
	gridCellNonInput: {
		backgroundColor: '#c0c0c0', // Color de fondo gris claro
	},
});
  
  

export default GridInput;
