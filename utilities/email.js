const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    secureConnection: false,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  });
  // 2) define the email options
  const mailOptions = {
    from: 'Hana Mohamed <hanaamohamed632@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // 3) actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
