import React, { useState } from 'react'
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import { View, Button, Image } from 'react-native'

export default function Camara() {

    
    const [selectedImage, setSelectedImage] = useState(null);

    const openImagePicker = () => {
        const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('Image picker error: ', response.error);
        } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            setSelectedImage(imageUri);
        }
        });
    };
  
    handleCameraLaunch = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchCamera(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
            console.log('User cancelled camera');
            } else if (response.error) {
            console.log('Camera Error: ', response.error);
            } else {
            // Process the captured image
            let imageUri = response.uri || response.assets?.[0]?.uri;
            setSelectedImage(imageUri);
            console.log(imageUri);
            }
        });
    }
    
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            {selectedImage && (
                <Image
                    source={{ uri: selectedImage }}
                    style={{ flex: 1 }}
                    resizeMode="contain"
                />
            )}
            <View style={{ marginTop: 20 }}>
            <Button title="De galeria" onPress={openImagePicker} />
            </View>
            <View style={{ marginTop: 20,marginBottom: 50 }}>
            <Button title="Abrir camara" onPress={handleCameraLaunch} />
            </View>
        </View>
    );
}