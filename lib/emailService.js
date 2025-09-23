import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ebukacharles006@gmail.com",
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });
};
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send welcome email function
export const sendWelcomeEmail = async (toEmail, userName) => {
  try {
    const transporter = createTransporter();
    const verificationCode = generateVerificationCode()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

    await transporter.verify();
    console.log("SMTP connection verified");

    const mailInfo = await transporter.sendMail({
      from: '"Kadick Integrated Limited" <noreply@kadickintegrated.com>',
      to: toEmail,
            subject: "Your Break Log Verification Code",
      text: `
Hello ${userName},

Your verification code for Break Log is: ${verificationCode}

This code will expire in 10 minutes (${expiresAt.toLocaleTimeString()}).

If you didn't request this code, please ignore this email.

Best regards,
Kadick Integrated Team
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">Break Log Verification Code</h2>
  
  <p>Hello <strong>${userName}</strong>,</p>
  
  <p>Your verification code for Break Log is:</p>
  
  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
    <h1 style="margin: 0; color: #ec3338; font-size: 32px; letter-spacing: 5px;">
      ${verificationCode}
    </h1>
  </div>
  
  <p style="color: #666;">
    This code will expire in <strong>10 minutes</strong> (${expiresAt.toLocaleTimeString()}).
  </p>
  
  <p style="color: #999; font-size: 12px;">
    If you didn't request this code, please ignore this email.
  </p>
  
  <br>
  <p>Best regards,<br><strong>Kadick Integrated Team</strong></p>
</div>
      `,

    });

     console.log("Verification code sent to:", toEmail);
    console.log("Generated code:", verificationCode);
    console.log("Expires at:", expiresAt.toLocaleTimeString());

    return {
      code: verificationCode,
      expiresAt: expiresAt,
      emailInfo: mailInfo
    };

  } catch (error) {
    console.error("Failed to send welcome email:", error);
    throw error;
  }
};

// You can add more email functions here later
// export const sendPasswordResetEmail = async (toEmail, resetToken) => {
//   // Implementation for password reset
// };

// export const sendNotificationEmail = async (toEmail, subject, message) => {
//   // Generic email function
// };
