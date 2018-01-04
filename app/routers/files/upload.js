const Upload  = require('../../controllers/files/upload');
const fileUploadConfig = require('../../configs/files-upload');
module.exports = function(router) {
    router.post('/upload/images', async function(ctx, next) {
        let files = ctx.request.body.files;
        let upload = new Upload();
        upload.upload(files['upload'].path, fileUploadConfig.images.savepath + '/' + files['upload'].name);
        ctx.body = fileUploadConfig.images.savepath + '/' + files['upload'].name;
    });
    return router;
}