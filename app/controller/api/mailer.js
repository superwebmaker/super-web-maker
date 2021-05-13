const Controller = require('egg').Controller;
const nodemailer = require('nodemailer');

const account = {
  user: '',
  pass: ''
};

function createMail() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mxhichina.com', // 阿里企业邮箱
    port: 465,
    secure: true,
    auth: {
      user: account.user,
      pass: account.pass
    }
  });

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[success]', 'Server is ready to take our messages');
    }
  });

  return transporter;
}

class MailerController extends Controller {
  async send() {
    const { ctx } = this;

    const transporter = createMail();

    const mailOptions = {
      from: 'sender@server.com',
      to: 'receiver@sender.com',
      subject: 'Hello BalmJS',
      // text: 'Hello BalmJS'
      html:
        '<h1>Hello BalmJS</h1> <p>Visit <a href="//balm.js.org/" target="_blank">balm.js.org</a></p>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }

      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

    ctx.body = 'mail gg';
  }
}

module.exports = MailerController;
