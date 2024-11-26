const nodemailer = require("nodemailer");

/**
 * Send an email using nodemailer
 * @param {Object} options - Email configuration options
 * @param {string} options.email - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.message - Plain text email body
 * @param {string} [options.htmlMessage] - Optional HTML version of the message
 * @param {Array<{ filename: string, path: string }>} [options.attachments] - Optional attachments
 */
exports.sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587, // Adjust port as needed
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: true,
      },
      debug: true,
      logger: true,
    });

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.htmlMessage || undefined,
      attachments: options.attachments || [],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email");
  }
};
