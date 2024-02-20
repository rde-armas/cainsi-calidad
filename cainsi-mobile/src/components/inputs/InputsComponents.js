import { View, Text, StyleSheet, TextInput} from 'react-native';
import React, { useState } from 'react';

const TextInputComponent = ({label, imputName, onInputChange}) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (text) => {
        setInputValue(text);
        onInputChange(imputName, text);
    }

    return (
        <View>
            <Text style={styles.label}>{label}:</Text>
            <TextInput
                style={styles.input}
                placeholder="Escribe aqui .."
                autoCorrect={true}
                value={inputValue}
                onChangeText={handleInputChange}
            />
        </View>
    );
};

const TextMultiLineInputComponent = ({label, imputName, defaultInput, onInputChange}) => {
    const [inputValue, setInputValue] = useState({
        input: defaultInput !== '' ? defaultInput : '',
    });

    const handleInputChange = (text) => {
        setInputValue(text);
        onInputChange(imputName, text);
    }

    return (
        <View>
            <Text style={styles.label}>{label}:</Text>
            <TextInput
                multiline
                numberOfLines={4} 
                placeholder="Escribe aquí..."
                value={inputValue.input}
                onChangeText={handleInputChange}
                style={styles.multilineText}
            />
        </View>
    );
};

const NumberInputComponent = ({label, imputName, onInputChange}) => {
    const [inputValue, setInputValue] = useState({
        input: '',
    });

    const handleInputChange = (text) => {
        setInputValue(text);
        onInputChange(imputName, text);
    }

    return (
        <View style={styles.numberView}>
            <Text style={styles.label}>{label}:</Text>
            <TextInput
                style={styles.numberInput}
                placeholder="Ingrese un número"
                keyboardType="numeric"
                value={inputValue.input}
                onChangeText={handleInputChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        borderRadius: 5,
        paddingHorizontal: 8,
        margin:5,
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
    },
    numberView: {
        flexDirection: 'row',
        alignItems: 'center',
        margin:5,
    },
    numberInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius:5,
        paddingHorizontal: 8,
        marginLeft:8,
    },
    multilineText: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 10,
        textAlignVertical: 'top',
    },
});

export { TextMultiLineInputComponent, TextInputComponent, NumberInputComponent };
