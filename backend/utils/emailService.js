


// const nodemailer = require('nodemailer');

// // Create transporter
// const createTransporter = () => {
//   // For development/testing, use ethereal.email
//   if (process.env.NODE_ENV === 'development' && !process.env.EMAIL_USER) {
//     return nodemailer.createTransport({
//       host: 'smtp.ethereal.email',
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.ETHEREAL_EMAIL || 'your-ethereal-email',
//         pass: process.env.ETHEREAL_PASSWORD || 'your-ethereal-password'
//       }
//     });
//   }

//   // Production email configuration
//   return nodemailer.createTransport({
//     host: process.env.EMAIL_HOST || 'smtp.gmail.com',
//     port: process.env.EMAIL_PORT || 587,
//     secure: process.env.EMAIL_SECURE === 'true',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });
// };

// // Generate OTP
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // Send OTP email
// const sendOTPEmail = async (email, otp, fullName) => {
//   try {
//     const transporter = createTransporter();
    
//     const mailOptions = {
//       from: `"Pezzi Support" <${process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@pezzi.com'}>`,
//       to: email,
//       subject: 'Password Reset OTP - Pezzi',
//       html: `
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <style>
//             .container {
//               max-width: 600px;
//               margin: 0 auto;
//               padding: 20px;
//               font-family: Arial, sans-serif;
//             }
//             .header {
//               background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
//               color: white;
//               padding: 30px;
//               text-align: center;
//               border-radius: 10px 10px 0 0;
//             }
//             .content {
//               background: #f8fafc;
//               padding: 30px;
//               border-radius: 0 0 10px 10px;
//               border: 1px solid #e2e8f0;
//             }
//             .otp-box {
//               background: white;
//               border: 2px solid #2563eb;
//               border-radius: 8px;
//               padding: 20px;
//               margin: 20px 0;
//               text-align: center;
//             }
//             .otp-code {
//               font-size: 36px;
//               font-weight: bold;
//               letter-spacing: 8px;
//               color: #2563eb;
//             }
//             .footer {
//               text-align: center;
//               margin-top: 30px;
//               color: #64748b;
//               font-size: 14px;
//             }
//             .warning {
//               background: #fff3cd;
//               border: 1px solid #ffeeba;
//               color: #856404;
//               padding: 10px;
//               border-radius: 5px;
//               margin-top: 20px;
//               font-size: 13px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h1>Password Reset Request</h1>
//             </div>
//             <div class="content">
//               <h2>Hello ${fullName || 'User'},</h2>
//               <p>We received a request to reset your password for your Pezzi account. Use the OTP code below to complete the process:</p>
              
//               <div class="otp-box">
//                 <div class="otp-code">${otp}</div>
//               </div>
              
//               <p>This OTP is valid for <strong>10 minutes</strong>. If you didn't request this, please ignore this email.</p>
              
//               <div class="warning">
//                 ⚠️ For security reasons, never share this OTP with anyone. Our team will never ask for your OTP.
//               </div>
              
//               <p>If you're having trouble, please contact our support team.</p>
//             </div>
//             <div class="footer">
//               <p>&copy; ${new Date().getFullYear()} Pezzi. All rights reserved.</p>
//               <p>This is an automated message, please do not reply to this email.</p>
//             </div>
//           </div>
//         </body>
//         </html>
//       `
//     };

//     const info = await transporter.sendMail(mailOptions);
    
//     // For ethereal email, log the preview URL
//     if (process.env.NODE_ENV === 'development' && info.messageId) {
//       console.log('Email preview URL:', nodemailer.getTestMessageUrl(info));
//     }

//     return { success: true, messageId: info.messageId };
//   } catch (error) {
//     console.error('Email sending error:', error);
//     return { success: false, error: error.message };
//   }
// };

// module.exports = {
//   generateOTP,
//   sendOTPEmail
// };



const nodemailer = require('nodemailer');

/**
 * Create email transporter based on environment
 */
const createTransporter = () => {
  // Development environment with ethereal.email
  if (process.env.NODE_ENV === 'development' && !process.env.EMAIL_USER) {
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ETHEREAL_EMAIL || 'your-ethereal-email',
        pass: process.env.ETHEREAL_PASSWORD || 'your-ethereal-password'
      }
    });
  }

  // Production email configuration
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

/**
 * Generate 6-digit OTP
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send OTP email for password reset
 */
const sendOTPEmail = async (email, otp, fullName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Pezzi Support" <${process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@pezzi.com'}>`,
      to: email,
      subject: 'Password Reset OTP - Pezzi',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              font-family: Arial, sans-serif;
            }
            .header {
              background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f8fafc;
              padding: 30px;
              border-radius: 0 0 10px 10px;
              border: 1px solid #e2e8f0;
            }
            .otp-box {
              background: white;
              border: 2px solid #2563eb;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
              text-align: center;
            }
            .otp-code {
              font-size: 25px;
              font-weight: bold;
              letter-spacing: 6px;
              color: #2563eb;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #64748b;
              font-size: 14px;
            }
            .warning {
              background: #fff3cd;
              border: 1px solid #ffeeba;
              color: #856404;
              padding: 10px;
              border-radius: 5px;
              margin-top: 20px;
              font-size: 13px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <h2>Hello ${fullName || 'User'},</h2>
              <p>We received a request to reset your password for your Pezzi account. Use the OTP code below to complete the process:</p>
              
              <div class="otp-box">
                <div class="otp-code">${otp}</div>
              </div>
              
              <p>This OTP is valid for <strong>5 minutes</strong>. If you didn't request this, please ignore this email.</p>
              
              <div class="warning">
                ⚠️ For security reasons, never share this OTP with anyone. Our team will never ask for your OTP.
              </div>
              
              <p>If you're having trouble, please contact our support team.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Pezzi. All rights reserved.</p>
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    // For ethereal email, log the preview URL
    if (process.env.NODE_ENV === 'development' && info.messageId) {
      console.log('📧 Email preview URL:', nodemailer.getTestMessageUrl(info));
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email sending error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send password reset success confirmation email
 */
const sendPasswordResetSuccessEmail = async (email, fullName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Pezzi Support" <${process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@pezzi.com'}>`,
      to: email,
      subject: 'Password Reset Successful - Pezzi',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              font-family: Arial, sans-serif;
            }
            .header {
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f8fafc;
              padding: 30px;
              border-radius: 0 0 10px 10px;
              border: 1px solid #e2e8f0;
            }
            .success-icon {
              text-align: center;
              font-size: 48px;
              margin-bottom: 20px;
            }
            .message-box {
              background: white;
              border: 2px solid #10b981;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
              text-align: center;
            }
            .button {
              display: inline-block;
              background: #10b981;
              color: white;
              text-decoration: none;
              padding: 12px 30px;
              border-radius: 5px;
              font-weight: bold;
              margin-top: 20px;
            }
            .button:hover {
              background: #059669;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #64748b;
              font-size: 14px;
            }
            .security-note {
              background: #e6f7ff;
              border: 1px solid #91d5ff;
              color: #0050b3;
              padding: 15px;
              border-radius: 5px;
              margin-top: 20px;
              font-size: 13px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Successful</h1>
            </div>
            <div class="content">
              <div class="success-icon">✅</div>
              
              <h2>Hello ${fullName || 'User'},</h2>
              
              <div class="message-box">
                <p style="font-size: 18px; margin-bottom: 10px;">Your password has been successfully reset!</p>
                <p style="color: #4b5563;">You can now log in to your account with your new password.</p>
              </div>
              
              <div style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/login" class="button">
                  Go to Login
                </a>
              </div>
              
              <div class="security-note">
                <strong>🔒 Security Notice:</strong>
                <p>If you did not perform this password reset, please contact our support team immediately as your account may be compromised.</p>
              </div>
              
              <p>For any assistance, feel free to reach out to our support team.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Pezzi. All rights reserved.</p>
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    // For ethereal email, log the preview URL
    if (process.env.NODE_ENV === 'development' && info.messageId) {
      console.log('📧 Success email preview URL:', nodemailer.getTestMessageUrl(info));
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Password reset success email error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  generateOTP,
  sendOTPEmail,
  sendPasswordResetSuccessEmail
};