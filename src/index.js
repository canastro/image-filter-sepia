var utils = require('./utils');

/**
 * @name transform
 * @param {object} canvas
 * @param {object} context
 * @param {object} imageData
 */
function transform(imageData) {
    var data = imageData.data;
    for (var i = 0; i < data.length; i+= 4) {
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];
        data[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);
        data[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
        data[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
    };

    return imageData;
}

/**
 * @name sepia
 * @param {object} options
 * @param {string} options.data - data of a image extracted from a canvas
 * @param {string} options.contrast - contrast value to apply
 * @param {bool} options.asDataURL
 */
module.exports = function sepia(options) {
    var factor;
    var result;
    var canvas;
    var context;

    if (!options.data) {
        throw new Error('image-filter-sepia:: invalid options provided');
    }

    canvas = utils.getCanvas(options.data.width, options.data.height);
    context = canvas.getContext('2d');

    options.data = utils.getPixels(canvas, context, options.data);

    result = transform(options.data);

    if (options.asDataURL) {
        return utils.convertToDataURL(canvas, context, result);
    }

    return result;
}
