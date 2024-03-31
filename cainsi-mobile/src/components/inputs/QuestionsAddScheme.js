import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';

function QuestionsAddScheme({ image, setData }) {
  	const [inputValues, setInputValues] = useState({});
	const [selectedOption, setSelectedOption] = useState('');
	const [selectedDirection, setSelectedDirection] = useState('');

	// Función para manejar los cambios en los valores de los inputs
	const handleInputChange = (text, index) => {
		const newInputValues = {...inputValues};
		newInputValues[index] = text;
		setInputValues(newInputValues);
		setData(newInputValues);
	};
	
	return (
		<ScrollView contentContainerStyle={styles.scrollViewContainer}>
			<Text style={styles.label}>Esquema seleccionado</Text>
			<Image
				source={image.source}
				style={{ flex: 1, width: undefined, minHeight: 300, margin: 15}}
				resizeMode="contain"
			/>
			<View style={styles.buttonContainer}>
                <Button
                    title="Envolvente"
                    onPress={() => {
							setSelectedOption('envolvente');
							handleInputChange('envolvente', 'title');
						}
					}
                    color={selectedOption === 'envolvente' ? 'gray' : null}
                />
                <Button
                    title="Casquete"
                    onPress={() => {
							setSelectedOption('casquete');
							handleInputChange('casquete', 'title');
						}
					}
                    color={selectedOption === 'casquete' ? 'gray' : null}
                />
            </View>
			{
				selectedOption !== '' && 
				<Text style={styles.help}>
					Para colocar los nombres que identifican los puntos de medicion, 
					debera seguir el siguiente patrón: "A,B,C", donde después de dar
					el nombre de de un punto,debe colocar una coma "," para separarla
					de la siguiente.
				</Text>
			}

			{ 
				selectedOption === 'envolvente' && 
				(
					<View >
						<View >
							<Text style={styles.label}>Ingresar las secciones a medir según esquema: </Text>
							<TextInput
								key={'seccion'}
								style={styles.input}
								placeholder={`Ingresar nombres`}
								value={inputValues['seccion']}
								onChangeText={(text) => handleInputChange(text, 'seccion')}
							/>
							<Text style={styles.label}>Ingresar las direcciones a medir según esquema:</Text>
							<TextInput
								key={'direccion'}
								style={styles.input}
								placeholder={`Ingresar nombres`}
								value={inputValues['direccion']}
								onChangeText={(text) => handleInputChange(text, 'direccion')}
							/>
						</View>
						<View style={styles.buttonContainer}>
							<Button
								title="Vertical"
								onPress={() => {
										setSelectedDirection('vertical');
										handleInputChange('vertical', 'direction');
									}
								}
								color={selectedDirection === 'vertical' ? 'gray' : null}
							/>
							<Button
								title="Horizontal"
								onPress={() => {
										setSelectedDirection('horizontal');
										handleInputChange('horizontal', 'direction');
									}
								}
								color={selectedDirection === 'horizontal' ? 'gray' : null}
							/>
						</View>
					</View>
				)
			}
			{ 
				selectedOption === 'casquete' && 
				(
					<View >
						<Text style={styles.label}>Ingresar el identificador de los puntos de medicion: </Text>
						<TextInput
							key={'rows'}
							style={styles.input}
							placeholder={`Ingresar nombres`}
							value={inputValues[`rows`]}
							onChangeText={(text) => handleInputChange(text, 'rows')}
						/>
					</View>
				)
			}
		</ScrollView>
	);
};
	
const styles = StyleSheet.create({
	scrollViewContainer: {
        flexGrow: 1,
    },
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
	help: {
		fontSize: 16,
		marginBottom: 15,
		marginTop: 15,
	},
	buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
});

export { QuestionsAddScheme }