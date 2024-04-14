import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native'; 
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl, SafeAreaView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Icon from "react-native-vector-icons/Ionicons";

const ReportsQueueScreen = () => {
    const [pdfList, setPdfList] = useState([]);
    const [jsonList, setJsonList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedItem, setselectedItem] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            loadPdfAndJsonList();
        }, [])
    );
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
        } catch (error) {
            console.error('Error al compartir PDF:', error.message);
        }
    };

    const handleItemPress = (item) => {
        // Verificar si el elemento ya está seleccionado
        const selectedIndex = selectedItem.indexOf(item);
        if (selectedIndex === -1) {
            // Si no está seleccionado, agregarlo al array de elementos seleccionados
            setselectedItem([...selectedItem, item]);
        } else {
            // Si ya está seleccionado, eliminarlo del array de elementos seleccionados
            const updatedItems = [...selectedItem];
            updatedItems.splice(selectedIndex, 1);
            setselectedItem(updatedItems);
        }
    };

    const loadPayload = async (jsonName) => {
        try {
            const jsonUri = `${FileSystem.documentDirectory}${jsonName}`;
            const jsonContent = await FileSystem.readAsStringAsync(jsonUri);
            const jsonData = JSON.parse(jsonContent);
        } catch (error) {
            console.error('Error cargando datos:', error);
        }
    };
    
    const handleRefresh = () => {
        setRefreshing(true);
        loadPdfAndJsonList();
        setRefreshing(false);
    };

    const removeFiles = async (fileName) => {
        try {
            if (selectedItem.length === 0) {
                await FileSystem.deleteAsync(FileSystem.documentDirectory + fileName);
            }
            const directory = FileSystem.documentDirectory;
            // Iterar sobre cada nombre de archivo seleccionado y eliminarlo
            await Promise.all(selectedItem.map(async (fileName) => {
                await FileSystem.deleteAsync(directory + fileName);
            }));
            // Limpiar la lista de archivos seleccionados
            setselectedItem([]);
            // Recargar la lista de PDF y JSON
            loadPdfAndJsonList();
        } catch (error) {
            console.error('Error eliminando archivos:', error);
        }
    };

    const renderPdfItem = ({ item }) =>  {
        const isSelected = selectedItem.includes(item);
        const itemStyle = [styles.itemContainer, isSelected && styles.selectedItem];

        return (
            <TouchableOpacity onPress={() => handleItemPress(item)} style={itemStyle}>
                <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.item}>
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

    const renderJsonItem = ({ item }) => {
        const isSelected = selectedItem.includes(item);
        const itemStyle = [styles.itemContainer, isSelected && styles.selectedItem];
        
        return (
            <TouchableOpacity onPress={() => handleItemPress(item)} style={itemStyle}>
                <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.item}>
                    <Text numberOfLines={1} ellipsizeMode="tail">{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeFiles(item)} style={styles.shareButton}>
                        <Icon name='trash-outline'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => loadPayload(item)} style={styles.shareButton}>
                    <Text onPress={() => loadPayload(item)} style={styles.shareButtonText}>Cargar datos</Text>
                </TouchableOpacity>
            </TouchableOpacity>
    )};

    return (
        <SafeAreaView style={styles.container}>
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
        </SafeAreaView>
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
        marginLeft:7,
        marginRight:7,
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
