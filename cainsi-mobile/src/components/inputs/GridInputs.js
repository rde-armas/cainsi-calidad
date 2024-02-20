import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const GridInput = ({ gridData }) => {
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
		};

		return (
		<View style={styles.grid}>
			<Text style={styles.gridTitle}>{title}</Text>
			<View style={styles.gridRow}>
			<Text style={styles.gridCell}></Text>
			{columns.map((columnName, colIndex) => (
				<Text key={colIndex} style={styles.gridCell}>{columnName}</Text>
			))}
			</View>
			{rowsData.map((rowData, rowIndex) => (
			<View key={rowIndex} style={styles.gridRow}>
				<Text style={styles.gridCell}>{rowData}</Text>
				{columns.map((column, colIndex) => (
				<TextInput
					key={colIndex}
					style={styles.gridCell}
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
	},
	gridTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	gridRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 5,
	},
	gridCell: {
		borderWidth: 1,
		borderColor: 'gray',
		padding: 5,
		flex: 1,
	},
});

export default GridInput;
