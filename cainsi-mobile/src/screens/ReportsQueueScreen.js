import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl, Linking } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'; // Importar desde expo-sharing en lugar de react-native

const ReportsQueueScreen = () => {
    const [pdfList, setPdfList] = useState([]);
    const [jsonList, setJsonList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);

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

    const handlePdfPress = (pdfName) => {
        setSelectedPdf(pdfName);
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
            <TouchableOpacity onPress={() => handleSharePdf(item)} style={styles.shareButton}>
                <Text style={styles.shareButtonText}>Compartir</Text>
            </TouchableOpacity>
        </View>
    );

    const renderJsonItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer}>
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
        marginRight: 10,
    },
    shareButtonText: {
        fontWeight: 'bold',
    },
    viewButton: {
        backgroundColor: 'lightgreen',
        padding: 5,
        borderRadius: 5,
    },
    viewButtonText: {
        fontWeight: 'bold',
    },
});

export default ReportsQueueScreen;
