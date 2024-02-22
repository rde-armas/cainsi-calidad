import { addImage, dimensionAspectRatio } from './addImage.js';
import { checkPageOverflow } from './index.js';

const addScheme = (doc, imageY, scheme) => {
    const imagePath = `../assets/${scheme.id}.png`;
    console.log(scheme.id);
    const pageWidth = doc.internal.pageSize.width;
    const { width, height } = dimensionAspectRatio(imagePath, pageWidth - 110, 80);
    const imageX = (pageWidth - width) / 2;
    let yPos = checkPageOverflow(doc, imageY, Math.max(height, 80));
    addImage(doc, imagePath, 'PNG', imageX, yPos, 80, 80);
    console.log(yPos);
    yPos =+ Math.max(height, 80);
    console.log(yPos);
    yPos = addGrid(doc, scheme, yPos);
    return yPos;
}

export { addScheme }
const addGrid = (doc, scheme, yPos) => {
    let scheme_temp = scheme;
    addToGridData(scheme_temp);
    const { gridData } = scheme_temp;
    const xOffset = 10; // Desplazamiento horizontal de la tabla
    const fontSize = 10; // Tamaño de fuente
    const lineHeight = 8; // Espaciado entre líneas
    const maxWidth = doc.internal.pageSize.width - xOffset * 2; // Ancho máximo disponible para la tabla
    let yPosGrid = yPos;
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
        yPosGrid = checkPageOverflow(doc, yPosGrid, 8 * data[0].length);

        const tableWidth = columnWidths.reduce((total, width) => total + width, 0); // Ancho total de la tabla
        let xPos = (maxWidth - tableWidth) / 2 + xOffset; // Posición X inicial para centrar la tabla

        // Agregar título de la tabla
        doc.setFontSize(fontSize + 2);
        doc.text(title, 50, yPosGrid);
        yPosGrid += 7; // Aumentar la posición Y para los datos de la tabla

        // Dibujar celdas y agregar datos
        doc.setFontSize(fontSize);
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