const { addImage, dimensionAspectRatio } = require('./addImage.js');
const { addHeader, addFooter } = require('./firstPage.js');
//const { checkPageOverflow } = require('./index.js');

const addScheme = (doc, imageY, scheme, title) => {
    const pageWidth = doc.internal.pageSize.width;
    
    // const imagePathEnv = `./src/assets/envolventes/${scheme.idEnvolvente}.png`;
    // const imagePathCas = `./src/assets/casquetes/${scheme.idCasquete}.png`;
    const imagePathEnv = `../assets/envolventes/${scheme.idEnvolvente}.png`;
    const imagePathCas = `../assets/casquetes/${scheme.idCasquete}.png`;

    const { width, height } = dimensionAspectRatio(imagePathEnv, pageWidth - 90, 90);
    const imageXEnv = (pageWidth - width) / 2;
    let yPos = checkPageOverflow(doc, imageY, Math.max(90, height) + 14);
    
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
    addImage(doc, imagePathEnv, '', 'PNG', imageXEnv, yPos, width, 90);
    yPos += Math.max(90, height) + 7;
    // add casquete
    const aux = dimensionAspectRatio(imagePathCas, pageWidth - 40, 40);
    const widthCas = aux.width;
    const heightCas = aux.height;
    const imageXCas = (pageWidth - widthCas) / 2;
    yPos = checkPageOverflow(doc, yPos, Math.max(40, heightCas) + 14);
    doc.text('- Casquete', 50 , yPos);
    yPos += 7;
    addImage(doc, imagePathCas, '', 'PNG', imageXCas, yPos, widthCas, 40);
    yPos += Math.max(40, heightCas) + 7;

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
                const cellWidth = doc.getStringUnitWidth(cellData.toString()) * fontSize; // Ancho del texto en la celda
                maxWidthInColumn = Math.max(maxWidthInColumn, cellWidth);
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
                doc.rect(xPos, yPosGrid, cellWidth, lineHeight); // Dibujar celda
                doc.text(cellData.toString(), xPos + 2, yPosGrid + fontSize / 2); // Agregar texto a la celda
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
    let footerText = '¹Todas las medidas están en mm';
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
    if (currentY + addedHeight > pageHeight - 80) {
        doc.addPage();
        addHeader(doc);
        addFooter(doc);
        return 40; // Return yPos for new page
    }
    return currentY;
};

module.exports = { addScheme, checkPageOverflow }