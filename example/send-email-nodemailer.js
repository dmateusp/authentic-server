'use strict';

const nodemailer = require('nodemailer');

// Create a SMTP transporter object
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'noreply.microauth@gmail.com',
        pass:  'EXAMPLE'
    },
    debug: false // include SMTP traffic in the logs
}, {
    // default message fields

    // sender info
    from: 'Micro-Auth <no-reply@microauth.com>',
});

console.log('SMTP Configured');

// Message object
const message_template = () => {

    // Comma separated list of recipients
    // This will be overwritten
    to: 'Example <example@gmail.com>',

    // Subject of the message
    subject: 'Confirm email Micro-Auth', //

    // plaintext body
    text: 'please confirm email at ',

    // HTML body
    html: '<p>please confirm email at</p>',

    // Apple Watch specific HTML body
    watchHtml: '<b>Hello</b> to myself',

};

const sendMail = (message) => {
  msg_base = message_template()
  msg_base.to = message.email
  msg_base.text += message.confirmUrl
  msg_base.html += '<a href="' + message.confirmUrl + '">Confirm your email!</a>'

  transporter.sendEmail(msg_base, (error, info) => {
      console.log(msg_base)

      if (error) {
          console.log('Error occurred');
          console.log(error.message);
          return;
      }
      console.log('Message sent successfully!');
      console.log('Server responded with "%s"', info.response);
      transporter.close();
  });
}


module.exports = {
  sendEmail: sendEmail
};
