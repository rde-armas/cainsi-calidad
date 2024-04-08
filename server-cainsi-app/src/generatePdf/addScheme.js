const { addImage, dimensionAspectRatio } = require('./addImage.js');
const { addHeader, addFooter } = require('./firstPage.js');
//const { checkPageOverflow } = require('./index.js');

const addScheme = (doc, imageY, scheme, title) => {
    const pageWidth = doc.internal.pageSize.width;
    // Configurar estilo para línea negra
    doc.setLineWidth(0.2);
    doc.setDrawColor(0, 0, 0);
  
    const maxDimeEnv = 90;
    const { width, height } = dimensionAspectRatio(
        '', pageWidth - 50, maxDimeEnv, scheme.imageUriEnv[1], scheme.imageUriEnv[2]
        );
    const imageXEnv = (pageWidth - width) / 2;
    let yPos = checkPageOverflow(doc, imageY, Math.max(maxDimeEnv, height) + 14);
    
    // title
    doc.setFont('Lato-Bold', 'normal');
    doc.setFontSize(14);
    doc.text(title, 30 , yPos);
    doc.setFont('Lato-Regular', 'normal');
    yPos += 7;
    doc.text('a. Esquema de medición', 40 , yPos);
    yPos += 7;
    doc.setFont('Lato-Regular', 'normal');
    doc.text('- Envolventes', 50 , yPos);
    yPos += 7;
    addImage(doc, '', scheme.imageUriEnv, 'JPEG', imageXEnv, yPos, width, maxDimeEnv);
    doc.rect(imageXEnv - 3, yPos - 3, width + 6, height + 6);
    yPos += Math.max(90, height) + 10;
    // add casquete
    const maxDimeCas = 60;
    const aux = dimensionAspectRatio(
        '', pageWidth - maxDimeCas, maxDimeCas, scheme.imageUriCas[1], scheme.imageUriCas[2]
        );
    const widthCas = aux.width;
    const heightCas = aux.height;
    const imageXCas = (pageWidth - widthCas) / 2;
    console.log('Maximo', doc.internal.pageSize.height);
    console.log('Ypos', yPos);
    console.log('Maximo', Math.max(maxDimeCas, heightCas));
    yPos = checkPageOverflow(doc, yPos, Math.max(maxDimeCas, heightCas) + 10);
    console.log('Ypos', yPos);
    doc.setFont('Lato-Regular', 'normal');
    doc.setFontSize(14);
    doc.text('- Casquete', 50 , yPos);
    yPos += 7;
    addImage(doc, '', scheme.imageUriCas, 'JPEG', imageXCas, yPos, widthCas, maxDimeCas);
    doc.rect(imageXCas - 3, yPos - 3, widthCas + 6, heightCas + 6);
    yPos += Math.max(maxDimeCas, heightCas) + 7;
    yPos = addGrid(doc, scheme, yPos);
    return yPos;
}

const addGrid = (doc, scheme, yPos) => {
    //subtitulo
    let scheme_temp = scheme;
    addToGridData(scheme_temp);
    const { gridData } = scheme_temp;
    const xOffset = 10; // Desplazamiento horizontal de la tabla
    const fontSize = 10; // Tamaño de fuente
    const lineHeight = 8; // Espaciado entre líneas
    const maxWidth = doc.internal.pageSize.width - xOffset * 2; // Ancho máximo disponible para la tabla
    let yPosGrid = yPos;
    let flag = true;
    Object.keys(gridData).forEach(title => {
        const data = gridData[title];
        const numRows = data.length;
        const columnWidths = []; // Almacena los anchos de las columnas
        
        // Calcular los anchos de las columnas basados en el elemento más largo en cada columna
        for (let j = 0; j < data[0].length; j++) {
            let maxWidthInColumn = 0;
            for (let i = 0; i < numRows; i++) {
                const cellData = data[i][j];
                let chararray = [];
                chararray = doc.getCharWidthsArray(cellData.toString());
                const cellWidth = doc.getStringUnitWidth(cellData.toString()) * 12 * 25.6 /72 + 2 ;// Ancho del texto en la celda
                maxWidthInColumn = Math.max(maxWidthInColumn, cellWidth, 10);
            }
            columnWidths.push(maxWidthInColumn);
        }
        yPosGrid = checkPageOverflow(doc, yPosGrid, 8 * data[0].length + 7);
        if(flag){
            doc.setFont('Lato-Regular', 'normal');
            doc.setFontSize(14);
            doc.text('b. Resultados¹', 40 , yPosGrid);
            yPosGrid += 7;
            flag = false;
            addMedidasEnMM(doc);
        }
        
        const tableWidth = columnWidths.reduce((total, width) => total + width, 0); // Ancho total de la tabla
        let xPos = (maxWidth - tableWidth) / 2 + xOffset; // Posición X inicial para centrar la tabla
        
        // Agregar título de la tabla
        doc.setFont('Lato-Regular', 'normal');
        doc.setFontSize(12);
        doc.text(`- ${title}`, 50, yPosGrid);
        const fillColor = "#aca899";
        doc.setFillColor(fillColor);
        doc.rect(50, 15, 100, 1.2, 'F')
        yPosGrid += 7; // Aumentar la posición Y para los datos de la tabla
        
        // Dibujar celdas y agregar datos
        doc.setFontSize(12);
        doc.setFont('Lato-Regular', 'normal');
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < data[i].length; j++) {
                const cellData = data[i][j];
                const cellWidth = columnWidths[j];
                const textWidth = doc.getStringUnitWidth(cellData.toString()) * 12 * 25.6 /72 + 2;
                const xPosCentered = xPos + (cellWidth - textWidth) / 2 + 1;
                doc.rect(xPos, yPosGrid, cellWidth, lineHeight); // Dibujar celda
                doc.text(cellData.toString(), xPosCentered, yPosGrid + fontSize / 2); // Agregar texto a la celda
                xPos += cellWidth; // Mover a la siguiente posición X
            }
            xPos = (maxWidth - tableWidth) / 2 + xOffset; // Reiniciar la posición X para la próxima fila
            yPosGrid += lineHeight; // Mover a la siguiente posición Y
        }
        
        yPosGrid += 7; // Aumentar la posición Y para la próxima tabla
    });
    return yPosGrid;
}



const addToGridData = (scheme) => {
    // Recorremos la matriz 'grid' dentro del objeto 'scheme'
    scheme.grid.forEach(([title, ...values]) => {
        scheme.gridData[title].unshift(values[0]);
    });
    
    scheme.grid.forEach(([title, ...values]) => {
        if (values[1].length > 0){
            scheme.gridData[title][0].unshift('');
        }
        values[1].forEach((row, rowIndex) => {
            scheme.gridData[title][rowIndex + 1].unshift(row);
        });
    });
};

const addMedidasEnMM = (doc) => {
    let pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    
    // Definir posición para la línea y el texto del pie de página
    let lineHeight = 4; // Altura de la línea
    let footerText = '¹Todos los valores estas expresados en mm';
    let footerTextSize = 7; // Tamaño de la fuente para el texto del pie de página
    let footerTextPadding = 25; // Espacio entre la línea y el texto del pie de página
    let footerTextX = 30; // Posición X del texto del pie de página
    
    // Dibujar línea justo encima del texto del pie de página
    doc.setLineWidth(0.07); // Grosor de la línea
    doc.line(footerTextX, pageHeight - footerTextPadding - lineHeight, 100, pageHeight - footerTextPadding - lineHeight);
    
    // Agregar texto del pie de página
    doc.setFontSize(footerTextSize); // Establecer el tamaño de la fuente para el texto del pie de página
    doc.text(footerText, 50 , pageHeight - footerTextPadding);
    
}

const checkPageOverflow = (doc, currentY, addedHeight) => {
    const pageHeight = doc.internal.pageSize.height;
    if (currentY + addedHeight > pageHeight - 60) {
        doc.addPage();
        addHeader(doc);
        addFooter(doc);
        return 40; // Return yPos for new page
    }
    return currentY;
};

module.exports = { addScheme, checkPageOverflow }