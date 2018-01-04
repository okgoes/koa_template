const FilesUpload = require('../../models/files-upload');

class Upload {
    constructor() {}

    upload(file, savePath) {
        let filesUpload = new FilesUpload(file, savePath);
        return filesUpload.save();
    }
}

module.exports = Upload;