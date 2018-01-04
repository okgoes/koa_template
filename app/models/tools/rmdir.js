const fs = require('fs');

let rmdir = function (filePath) {
    if (!fs.existsSync(filePath)) {
        return true;
    }
    let state = fs.statSync(filePath);
    if (state.isFile()) {
        fs.unlinkSync(filePath);
        return true;
    }
    let dirs = fs.readdirSync(filePath);
    for (let i = 0; i < dirs.length; i++) {
        state = fs.statSync(filePath + '/' + dirs[i]);
        if (state.isFile()) {
            fs.unlinkSync(filePath + '/' + dirs[i]);
        } else {
            rmdir(filePath + '/' + dirs[i]);
        }
    }
    fs.rmdirSync(filePath);
    return true;
}

module.exports = rmdir;