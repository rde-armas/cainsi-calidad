import { imageSize } from 'image-size';
import { readFileSync } from 'fs';

function addImage(document, path, extension, x, y, maxWidth, maxHeight) {
    const image = imageToBase64(path);
    const { width, height } = dimensionAspectRatio(path, maxWidth, maxHeight);
    document.addImage(image, extension, x, y, width, height);
}

function dimensionAspectRatio(path, maxWidth, maxHeight){
    // Calcular la relación de aspecto
    const dimensions = imageSize(path);
    const aspectRatio = dimensions.width / dimensions.height;
    let width = maxWidth;
    let height = maxWidth / aspectRatio;

    if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
    }
    console.log(width)
    return { width, height };
}

function imageToBase64(imagePath) {
    try {
        const imageBuffer = readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');
        const dataUrl = `data:image/png;base64,${base64Image}`;
        return dataUrl;
    } catch (error) {
        console.error('Error al convertir la imagen a base64:', error.message);
        return null;
    }
}

export { addImage, dimensionAspectRatio }