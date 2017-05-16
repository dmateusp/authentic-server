'use strict';

const nodemailer = require('nodemailer');

// Create a SMTP transporter object
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'EXAMPLE@gmail.com',
        pass:  'YOURPASSWORD'
    },
    debug: false // include SMTP traffic in the logs
}, {
    // default message fields

    // sender info
    from: 'Micro-Auth <no-reply@micro-auth.com>',
});

console.log('SMTP Configured');

// Message object
let message_default = {

    // Comma separated list of recipients
    to: 'Daniel Mateus Pires <dmateusp@gmail.com>',

    // Subject of the message
    subject: 'Nodemailer is unicode friendly ✔ #', //

    // plaintext body
    text: 'Hi',

    // HTML body
    html: '<p>Hi</p>' +
        '<p>How are you?</p>',

    // Apple Watch specific HTML body
    watchHtml: '<b>Hello</b> to myself',

};

console.log('Sending Mail');
const sendMail = (message) => transporter.sendMail(message_default, (error, info) => {
    console.log(message)
    if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return;
    }
    console.log('Message sent successfully!');
    console.log('Server responded with "%s"', info.response);
    transporter.close();
});

module.exports = {
  sendMail: sendMail
};
