'use strict';

module.exports.featuredImage = function (imageId) {
    var Handlebars = require('handlebars'),
        template, data, images = this.options.media.images,
        dir = '/' + this.options.media.directories.image + '/large/',
        imageSource;
    if (imageId && imageId in images) {
        imageSource = dir + images[imageId].source;

        data = {
            source: imageSource,
            size: images[imageId].sizes.large,
            alt: images[imageId].alt,
            classes: 'img-polaroid featured-image'
        };
        template = this.app.getPartial('image');
        console.log(new Handlebars.SafeString(template.render(data)));
        // [fix] - This returns a string that gets put through encoding
        // return template.render(data);
        return new Handlebars.SafeString(template.render(data));
    }
};
