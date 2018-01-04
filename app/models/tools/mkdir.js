const fs = require('fs');
const path = require('path');
let mkdir = function(filePath) {
    if (fs.existsSync(filePath)) {
        return true;
    }
    if (!fs.existsSync(path.dirname(filePath))) {
        mkdir(path.dirname(filePath));
    }
    fs.mkdirSync(filePath);
};

module.exports = mkdir;