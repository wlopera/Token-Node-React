const nodemailer = require("nodemailer");
// const fs = require('fs');
// const Handlebars = require('handlebars');
// const CryptoJS = require('crypto-js');
// const jwt = require("jsonwebtoken");

// exports.sendEmail = (req, toEmail, subject, templateName, paramsEmail) => {
exports.sendEmail = (fromEmail, toEmail, subject, html) => {
  return new Promise(async (resolve, reject) => {
    let transporter = null;
    // if (process.env.APP_ENV == "dev") {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // } else {
    //   transporter = nodemailer.createTransport({
    //     host: process.env.SMTP_HOST,
    //     port: process.env.SMTP_PORT,
    //   });
    // }

    // const templatePath = process.env.GLOBAL_DIR + "/resources/emails/templates/" + templateName + ".html";

    try {
      //   let source = await fs.readFileSync(templatePath);
      //   let template = Handlebars.compile(source.toString());
      //   template = template(paramsEmail);

      const mailOptions = {
        // from: process.env.SMTP_USERNAME,
        from: fromEmail.toString(),
        to: toEmail.toString(),
        subject: subject,
        html: html,
        // html: template,
      };

      const result = await transporter.sendMail(mailOptions);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};
