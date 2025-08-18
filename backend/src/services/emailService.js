const nodemailer = require('nodemailer');
const config = require('../config/config');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    try {
      this.transporter = nodemailer.createTransporter({
        host: config.email.host,
        port: config.email.port,
        secure: config.email.port === 465, // true for 465, false for other ports
        auth: {
          user: config.email.user,
          pass: config.email.password
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      // Verify connection configuration
      this.transporter.verify((error, success) => {
        if (error) {
          console.error('Email service configuration error:', error);
        } else {
          console.log('📧 Email service is ready');
        }
      });
    } catch (error) {
      console.error('Failed to initialize email transporter:', error);
    }
  }

  /**
   * Send email
   * @param {object} options - Email options
   * @param {string} options.to - Recipient email
   * @param {string} options.subject - Email subject
   * @param {string} options.template - Email template name
   * @param {object} options.data - Template data
   * @param {string} options.html - HTML content (optional)
   * @param {string} options.text - Text content (optional)
   */
  async sendEmail({ to, subject, template, data, html, text }) {
    try {
      if (!this.transporter) {
        throw new Error('Email transporter not initialized');
      }

      let emailHtml = html;
      let emailText = text;

      // Generate HTML and text from template if provided
      if (template) {
        const templateContent = this.getTemplate(template, data);
        emailHtml = templateContent.html;
        emailText = templateContent.text;
      }

      const mailOptions = {
        from: config.email.from,
        to,
        subject,
        html: emailHtml,
        text: emailText
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log(`📧 Email sent to ${to}: ${result.messageId}`);
      return result;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }

  /**
   * Get email template
   * @param {string} templateName - Template name
   * @param {object} data - Template data
   * @returns {object} Template content
   */
  getTemplate(templateName, data) {
    const templates = {
      'email-verification': {
        html: this.getEmailVerificationTemplate(data),
        text: `Hi ${data.firstName},\n\nPlease verify your email address by clicking the following link:\n${process.env.FRONTEND_URL}/verify-email/${data.verificationToken}\n\nBest regards,\nCELF Mining Team`
      },
      'password-reset': {
        html: this.getPasswordResetTemplate(data),
        text: `Hi ${data.firstName},\n\nYou requested a password reset. Click the following link to reset your password:\n${process.env.FRONTEND_URL}/reset-password/${data.resetToken}\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nCELF Mining Team`
      },
      'welcome': {
        html: this.getWelcomeTemplate(data),
        text: `Welcome to CELF Mining, ${data.firstName}!\n\nThank you for joining our platform. We're excited to have you on board.\n\nBest regards,\nCELF Mining Team`
      }
    };

    return templates[templateName] || { html: '', text: '' };
  }

  getEmailVerificationTemplate(data) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Verify Your Email</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #007bff; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .button { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>CELF Mining</h1>
          </div>
          <div class="content">
            <h2>Hi ${data.firstName},</h2>
            <p>Thank you for signing up for CELF Mining! Please verify your email address to complete your registration.</p>
            <p>
              <a href="${process.env.FRONTEND_URL}/verify-email/${data.verificationToken}" class="button">
                Verify Email Address
              </a>
            </p>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p>${process.env.FRONTEND_URL}/verify-email/${data.verificationToken}</p>
            <p>This link will expire in 24 hours.</p>
          </div>
          <div class="footer">
            <p>Best regards,<br>The CELF Mining Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getPasswordResetTemplate(data) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Reset Your Password</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #007bff; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .button { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>CELF Mining</h1>
          </div>
          <div class="content">
            <h2>Hi ${data.firstName},</h2>
            <p>You requested a password reset for your CELF Mining account.</p>
            <p>
              <a href="${process.env.FRONTEND_URL}/reset-password/${data.resetToken}" class="button">
                Reset Password
              </a>
            </p>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p>${process.env.FRONTEND_URL}/reset-password/${data.resetToken}</p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this password reset, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>Best regards,<br>The CELF Mining Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  getWelcomeTemplate(data) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to CELF Mining</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #007bff; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to CELF Mining!</h1>
          </div>
          <div class="content">
            <h2>Hi ${data.firstName},</h2>
            <p>Welcome to CELF Mining! We're excited to have you join our community.</p>
            <p>You can now start exploring our platform and begin your mining journey.</p>
            <p>If you have any questions, feel free to contact our support team.</p>
          </div>
          <div class="footer">
            <p>Best regards,<br>The CELF Mining Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = new EmailService();
