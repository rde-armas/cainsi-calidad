// import React, { useState } from 'react';
// import { View, Text, Button } from 'react-native';
// import Pdf from 'react-native-pdf';

// const PdfViewerScreen = ({ route }) => {
//     const { pdfPath } = route.params;
//     const [pdfError, setPdfError] = useState(null);

//     const handleLoadError = (error) => {
//         console.error('Error al cargar el PDF:', error);
//         setPdfError(error);
//     };

//     return (
//         <View style={{ flex: 1 }}>
//         {pdfError ? (
//             <Text>Error al cargar el PDF. Por favor, inténtalo de nuevo más tarde.</Text>
//         ) : (
//             <Pdf
//             source={{ uri: `file://${pdfPath}`, cache: true }}
//             onLoadError={handleLoadError}
//             style={{ flex: 1 }}
//             />
//         )}
//         </View>
//     );
// };

// export default PdfViewerScreen;
