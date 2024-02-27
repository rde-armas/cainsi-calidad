import React, { useEffect, useState } from 'react';
import { Share } from 'react-native';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { openPdf } from '../utils/openPdf'; // Función para abrir PDFs

const ReportsQueueScreen = () => {
    const [pdfList, setPdfList] = useState([]);
    const [jsonList, setJsonList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

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

    const handleSharePdf = async (pdfUri) => {
        try {
            const result = await Share.share({
                url: pdfUri,
            });
            
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // Se compartió a través de una actividad específica
                    console.log(`Compartido a través de ${result.activityType}`);
                } else {
                    // Se compartió
                    console.log('PDF compartido');
                }
            } else if (result.action === Share.dismissedAction) {
                // Se canceló el cuadro de diálogo
                console.log('Compartir cancelado');
            }
        } catch (error) {
            console.error('Error al compartir PDF:', error.message);
        }
    };

    const handlePdfPress = async (pdfName) => {
        const pdfUri = `${FileSystem.documentDirectory}${pdfName}`;
        openPdf(pdfUri);
    };

    const handleJsonPress = async (jsonName) => {
        // Aquí puedes manejar la acción de abrir el archivo JSON
    };

    const handleRefresh = () => {
        setRefreshing(true);
        loadPdfAndJsonList();
        setRefreshing(false);
    };

    const renderPdfItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => handlePdfPress(item)} style={styles.item}>
                <Text numberOfLines={1} ellipsizeMode="tail">{item}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSharePdf(`${FileSystem.documentDirectory}${item}`)} style={styles.shareButton}>
                <Text style={styles.shareButtonText}>Compartir</Text>
            </TouchableOpacity>
        </View>
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
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                        />
                    }
                />
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Historial de JSONs:</Text>
                <FlatList
                    data={jsonList}
                    renderItem={renderJsonItem}
                    keyExtractor={item => item}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                        />
                    }
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
    },
    item: {
        flex: 1,
    },
    shareButton: {
        backgroundColor: 'lightblue',
        padding: 5,
        borderRadius: 5,
    },
    shareButtonText: {
        fontWeight: 'bold',
    },
});


export default ReportsQueueScreen;
