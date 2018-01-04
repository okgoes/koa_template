const nodemailer = require('nodemailer');
const emailconfig = require('../configs/email');
/**
 * Email
 */
class Email {
    /**
     * 构造函数
     */
    constructor() {
        this.transporter = nodemailer.createTransport(emailconfig);
    }
    /**
     * 邮件发送
     * @param {Sting} toUser
     * @param {Sting} subject
     * @param {Sting} content
     */
    send(toUser, subject, content) {
        let mailOptions = {
            from: '"起航博客"<account@okgoes.com>', // sender address
            to: toUser, // list of receivers
            subject: subject, // Subject line
            text: content, // plain text body
            html: content // html body
        };
        return new Promise((resolve, reject)=>{
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                    return console.log(error);
                }
                resolve(info.response);
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
        });
    }
}

module.exports = Email;
