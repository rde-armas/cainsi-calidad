import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { openPdf } from '../utils/openPdf'; // Función para abrir PDFs

const ReportsQueueScreen = () => {
    const [pdfList, setPdfList] = useState([]);

    useEffect(() => {
        loadPdfList();
    }, []);

    const loadPdfList = async () => {
        try {
            const directory = FileSystem.documentDirectory;
            const files = await FileSystem.readDirectoryAsync(directory);
            const pdfFiles = files.filter(file => file.endsWith('.pdf'));
            console.log(FileSystem.documentDirectory)
            setPdfList(pdfFiles);
        } catch (error) {
            console.error('Error cargando lista de PDFs:', error);
        }
    };

    const handlePdfPress = async (pdfName) => {
        const pdfUri = `${FileSystem.documentDirectory}${pdfName}`;
        
        openPdf(pdfUri); // Función para abrir el PDF seleccionado
    };

    const renderPdfItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePdfPress(item)}>
            <Text>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
            <View style={{ height: '50%' }}>
                <Text>Historial de PDFs:</Text>
                <FlatList
                    data={pdfList}
                    renderItem={renderPdfItem}
                    keyExtractor={item => item}
                />
            </View>
            <View style={{ height: '50%',  }}>
                {/* Aquí puedes mostrar la segunda lista de archivos */}
            </View>
        </View>
    );
};

export default ReportsQueueScreen;
