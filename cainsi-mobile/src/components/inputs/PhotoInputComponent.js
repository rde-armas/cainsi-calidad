import React, { useState } from 'react'
import { launchCamera } from 'react-native-image-picker'
import { View, Button, Image } from 'react-native'

export default function Camara() {
    const [image, setImage] = useState() 
    
    const takePicture = () => {
        const options = {
            title: 'Tomar una Imagen',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            includeBase64: true,
        }

        launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            } else {
                const uri = response.assets[0].uri
                setImage(uri)
            }
        
        })
    }
    
    return (
        <View>
            <Image
                style={{
                    alignSelf: 'center',
                    height: 200,
                    width: 300,
                    margin: 20,
                    borderRadius: 15,
                    borderWidth:2,
                    borderColor: 'black',
                }}
                source={{ uri: image }}
            />
            <Button
                title='Tomar Fotografia'
                onPress={ takePicture }
            />

            
        </View>
    )
}