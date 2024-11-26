import nodemailer from "nodemailer";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
  htmlMessage?: string; // Optional HTML version of the message
  attachments?: Array<{ filename: string; path: string }>; 
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // Corrected variable name
      port: 587, // Corrected variable name
      // secure:true, // Use secure for port 465
      auth: {
        user: process.env.SMTP_USERNAME, // Corrected variable name
        pass: process.env.SMTP_PASSWORD, // Corrected variable name
      },
      tls: {
        rejectUnauthorized: true, // Ensure server certificate is verified
      },
      debug: true, // Show debug output
      logger: true, // Log information
    });

    // Define email options
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL, // Corrected variable name
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.htmlMessage || undefined, // Add HTML message if provided
      attachments: options.attachments || [],
    };

    // Send email using the defined transporter and options
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);

  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;
