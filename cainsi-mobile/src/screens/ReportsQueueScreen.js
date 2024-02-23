import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { openPdf } from '../utils/openPdf'; // Función para abrir PDFs

const ReportsQueueScreen = () => {
    const [pdfList, setPdfList] = useState([]);
    const [jsonList, setJsonList] = useState([]);

    useEffect(() => {
        loadPdfAndJsonList();
    }, []);

    const loadPdfAndJsonList = async () => {
        try {
            const directory = FileSystem.documentDirectory;
            const files = await FileSystem.readDirectoryAsync(directory);
            const pdfFiles = files.filter(file => file.endsWith('.pdf'));
            const jsonFiles = files.filter(file => file.endsWith('.json'));
            setPdfList(pdfFiles);
            setJsonList(jsonFiles);
        } catch (error) {
            console.error('Error cargando lista de archivos:', error);
        }
    };

    const handlePdfPress = async (pdfName) => {
        const pdfUri = `${FileSystem.documentDirectory}${pdfName}`;
        openPdf(pdfUri);
    };

    const handleJsonPress = async (jsonName) => {
        // Aquí puedes manejar la acción de abrir el archivo JSON
    };

    const renderPdfItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePdfPress(item)} style={styles.itemContainer}>
            <Text>{item}</Text>
        </TouchableOpacity>
    );

    const renderJsonItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleJsonPress(item)} style={styles.itemContainer}>
            <Text>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Historial de PDFs:</Text>
                <FlatList
                    data={pdfList}
                    renderItem={renderPdfItem}
                    keyExtractor={item => item}
                />
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Historial de JSONs:</Text>
                <FlatList
                    data={jsonList}
                    renderItem={renderJsonItem}
                    keyExtractor={item => item}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
    },
});

export default ReportsQueueScreen;
