import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl, Linking } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Icon from "react-native-vector-icons/Ionicons";

const ReportsQueueScreen = () => {
    const [pdfList, setPdfList] = useState([]);
    const [jsonList, setJsonList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState([]);

    useEffect(() => {
        loadPdfAndJsonList();
    }, []);

    const loadPdfAndJsonList = async () => {
        try {
            const directory = FileSystem.documentDirectory;
            const files = await FileSystem.readDirectoryAsync(directory);
            const pdfFiles = files.filter(file => file.endsWith('.pdf')).reverse();
            const jsonFiles = files.filter(file => file.endsWith('.json')).reverse();
            setPdfList(pdfFiles);
            setJsonList(jsonFiles);
        } catch (error) {
            console.error('Error cargando lista de archivos:', error);
        }
    };
    
    const handleSharePdf = async (pdfName) => {
        try {
            const pdfUri = `${FileSystem.documentDirectory}${pdfName}`;
            // Utilizar expo-sharing en lugar de Share de react-native
            await Sharing.shareAsync(`file://${pdfUri}`);
            console.log('PDF compartido');
        } catch (error) {
            console.error('Error al compartir PDF:', error.message);
        }
    };

    const handlePdfPress = (item) => {
        // Verificar si el elemento ya está seleccionado
        const selectedIndex = selectedPdf.indexOf(item);
        if (selectedIndex === -1) {
            // Si no está seleccionado, agregarlo al array de elementos seleccionados
            setSelectedPdf([...selectedPdf, item]);
        } else {
            // Si ya está seleccionado, eliminarlo del array de elementos seleccionados
            const updatedItems = [...selectedPdf];
            updatedItems.splice(selectedIndex, 1);
            setSelectedPdf(updatedItems);
        }
    };

    const loadPayload = async (jsonName) => {
        try {
            const jsonUri = `${FileSystem.documentDirectory}${jsonName}`;
            const jsonContent = await FileSystem.readAsStringAsync(jsonUri);
            const jsonData = JSON.parse(jsonContent);
            console.log('Datos cargados:', jsonData);
        } catch (error) {
            console.error('Error cargando datos:', error);
        }
    };
    
    const handleRefresh = () => {
        setRefreshing(true);
        loadPdfAndJsonList();
        setRefreshing(false);
    };

    const removeFiles = async () => {
        try {
            const directory = FileSystem.documentDirectory;
            // Iterar sobre cada nombre de archivo seleccionado y eliminarlo
            await Promise.all(selectedPdf.map(async (fileName) => {
                await FileSystem.deleteAsync(directory + fileName);
            }));
            // Limpiar la lista de archivos seleccionados
            setSelectedPdf([]);
            // Recargar la lista de PDF y JSON
            loadPdfAndJsonList();
        } catch (error) {
            console.error('Error eliminando archivos:', error);
        }
    };

    const renderPdfItem = ({ item }) =>  {
        const isSelected = selectedPdf.includes(item);
        const itemStyle = [styles.itemContainer, isSelected && styles.selectedItem];

        return (
            <TouchableOpacity onPress={() => handlePdfPress(item)} style={itemStyle}>
                <TouchableOpacity onPress={() => handlePdfPress(item)} style={styles.item}>
                    <Text numberOfLines={1} ellipsizeMode="tail">{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeFiles(item)} style={styles.shareButton}>
                    <Icon name='trash-outline'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSharePdf(item)} style={styles.shareButton}>
                    <Icon name='share-social'/>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    const renderJsonItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer}>
            <TouchableOpacity style={styles.item}>
                <Text numberOfLines={1} ellipsizeMode="tail">{item}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeFiles(item)} style={styles.shareButton}>
                    <Icon name='trash-outline'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSharePdf(item)} style={styles.shareButton}>
                <Text onPress={() => loadPayload(item)} style={styles.shareButtonText}>Cargar datos</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Historial de PDFs</Text>
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
                <Text style={styles.sectionTitle}>Historial de JSONs</Text>
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
        borderRadius:8,
        paddingLeft:20,
    },
    item: {
        flex: 1,
    },
    selectedItem: {
        backgroundColor: '#e7e7e7',
        marginLeft:5,
        marginRight:5,
    },
    shareButton: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    shareButtonText: {
        fontWeight: 'bold',
    },
});

export default ReportsQueueScreen;
