const fs = require('fs');

class FilesUpload {
    constructor(uploadFile, savePath) {
        this.uploadFile = uploadFile;
        this.savePath = savePath;
    }

    save() {
        return fs.writeFileSync(this.savePath, fs.readFileSync(this.uploadFile));
    }
}

module.exports = FilesUpload;