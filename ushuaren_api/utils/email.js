// const nodemailer = require('nodemailer');

// const sendEmail = async options => {
//   //1） create a transporter: service that send the email. it not node.js , it just a service ,such as gmail
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//     //Activate in gmail "less secure app" option
//   });
//   //2) defind the email options
//   const mailOptions = {
//     from: 'admin lee <admin@gmail.com>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     //html:
//   };
//   //3) actually send the email
//   await transporter.sendMail(mailOptions); //async
// };

// module.exports = sendEmail;

const nodemailer = require('nodemailer');

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // smtp.mailtrap.io
    port: process.env.EMAIL_PORT, // 2525
    auth: {
      user: process.env.EMAIL_USERNAME, // 009c7193ca4fc3
      pass: process.env.EMAIL_PASSWORD, // dd8a298bcdaffb
    },
  });

  const mailOptions = {
    from: 'admin lee <admin@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
