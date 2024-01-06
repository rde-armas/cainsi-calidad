import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const GridInput = ({ numRows, numCols }) => {
  const [gridData, setGridData] = useState(createEmptyGrid(numRows, numCols));

  function createEmptyGrid (rows, cols) {
    const grid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push('');
      }
      grid.push(row);
    }
    return grid;
  };

  const renderItem = ({ item, index }) => {
    return (
        <View style={styles.row}>
            <Text style={styles.cell}>{`Row ${index + 1}`}</Text>
            {item.map((value, colIndex) => (
            <TextInput
                keyboardType="numeric"
                key={colIndex}
                style={styles.cell}
                placeholder={`Col ${colIndex + 1}`}
                value={value}
                onChangeText={(text) => handleInputChange(index, colIndex, text)}
            />
            ))}
        </View>
    );
  };

  const handleInputChange = (row, col, text) => {
    const updatedGrid = [...gridData];
    updatedGrid[row][col] = text;
    setGridData(updatedGrid);
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  cell: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginRight: 0,
  },
});

export default GridInput;
