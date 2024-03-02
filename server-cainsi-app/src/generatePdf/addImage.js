const imageSize = require('image-size');
const { readFileSync } = require('fs');

function addImage(document, path, imgBase64, extension, x, y, maxWidth, maxHeight) {
    let image= '';;
    if (path !== ''){
        image = imageToBase64(path);
    } else {
        image = imgBase64[0];
    }
    const { width, height } = dimensionAspectRatio(path, maxWidth, maxHeight, imgBase64[1], imgBase64[2]);
    document.addImage(image, extension, x, y, width, height, compression='FAST');
}

function dimensionAspectRatio(path, maxWidth, maxHeight, width_=1, height_=1){
    // Calcular la relación de aspecto
    let dimensions = { width: 1, height: 1 };
    if (path !== ''){
        dimensions = imageSize(path);
    } else {
        dimensions = { width: width_, height: height_ };
    }
    const aspectRatio = dimensions.width / dimensions.height;
    let width = maxWidth;
    let height = maxWidth / aspectRatio;

    if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
    }
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

module.exports = { addImage, dimensionAspectRatio }