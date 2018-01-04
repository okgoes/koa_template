const path = require('path');
module.exports = {
    images: {
        type: ['image/jpeg'],
        savepath: path.dirname(path.dirname(__dirname)) + '/public/upload/images'
    },
    files: {
        type: true,
        savepath: path.dirname(path.dirname(__dirname)) + '/public/upload/files'
    },
    htmls: {
        type: ['text/html'],
        savepath: path.dirname(path.dirname(__dirname)) + '/public/upload/htmls'
    },
    phps: {
        type: ['application/octet-stream'],
        savepath: path.dirname(path.dirname(__dirname)) + '/public/upload/phps'
    }
};