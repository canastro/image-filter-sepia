/**
 * @name getCanvas
 * @param {number} w - width
 * @param {number} h - height
 */
function getCanvas(w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    return canvas;
}

/**
 * @name getPixels
 * @param {object} canvas
 * @param {object} context
 * @param {object} imageData
 */
function getPixels(canvas, context, imageData) {
    context.putImageData(imageData, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
}

/**
 * @name transform
 * @param {object} canvas
 * @param {object} context
 * @param {object} imageData
 */
function transform(canvas, context, imageData) {
    var data = imageData.data;
    for (var i = 0; i < data.length; i+= 4) {
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];
        data[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);
        data[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
        data[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
    };

    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
}

/**
 * @name sepia
 * @param {object} options
 * @param {string} options.data - data of a image extracted from a canvas
 * @param {string} options.contrast - contrast value to apply
 */
module.exports = function sepia(options) {
    var factor;
    var result;
    var canvas;
    var context;

    if (!options.data) {
        throw new Error('image-filter-sepia:: invalid options provided');
    }

    canvas = getCanvas(options.data.width, options.data.height);
    context = canvas.getContext('2d');

    options.data = getPixels(canvas, context, options.data);

    result = transform(canvas, context, options.data);

    return result;
}
