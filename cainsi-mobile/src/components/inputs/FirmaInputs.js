import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';

const FirmaInputs = ({onInputFrirma}) => {
    const ref = useRef();

    // Called after ref.current.readSignature() reads a non-empty base64 string
    const handleOK = (signature) => {
        onInputFrirma(signature); // Callback from Component props
    };
  
    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
        console.log("Empty");
    };
  
    // Called after ref.current.clearSignature()
    const handleClear = () => {
         console.log("clear success!");
    };

    return (
        <View style={{ flex: 1 }}>
            <SignatureCanvas
                ref={ref}
                onOK={handleOK}
                //onEnd={handleEnd}
                onEmpty={handleEmpty}
                onClear={handleClear}
                backgroundColor="#ffffff"
                strokeColor="#000000"
                minStrokeWidth={2}
                maxStrokeWidth={4}
                clearText="Borrar"
                confirmText="Firmar"
                imageType="image/jpeg"
                canvasStyle={{ flex: 1 }}
            />
        </View>
    );
};

export { FirmaInputs };
