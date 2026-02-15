const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    this.transporter.verify((err, success) => {
      if (err) console.error("SMTP Verification Failed ❌", err);
      else console.log("SMTP Server ready ✅");
    });
  }

  async sendAutoReply({ name, email, message, contact, subject, links }) {
    const linksHtml = links
      .map((l) => `<li><a href="${l.url}" target="_blank">${l.text}</a></li>`)
      .join("");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height:1.5; color:#333;">
        <h2 style="color:#4a90e2;">Thank you for reaching out, ${name}!</h2>
        <p>I received your message and will get back to you shortly.</p>

        <h4 style="margin-top:15px; color:#4a90e2;">Your Message:</h4>
        <table style="width:100%; border-collapse:collapse; margin-top:10px; border:1px solid #ddd;">
          <tr>
            <td style="padding:8px; font-weight:bold; width:120px;">Phone:</td>
            <td style="padding:8px;">${contact}</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold;">Subject:</td>
            <td style="padding:8px;">${subject}</td>
          </tr>
          <tr>
            <td style="padding:8px; font-weight:bold;">Message:</td>
            <td style="padding:8px;">${message.replace(/\n/g, "<br>")}</td>
          </tr>
        </table>

        <h4 style="margin-top:20px; color:#4a90e2;">Connect with me:</h4>
        <ul>
          ${linksHtml}
        </ul>

        <p style="margin-top:20px;">Best regards,<br /><strong>Abishek Sathiyan</strong></p>
      </div>
    `;

    const mailOptions = {
      from: `"Abishek Sathiyan" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for contacting me!",
      html,
    };

    await this.transporter.sendMail(mailOptions);
    console.log(`Auto-reply sent to ${email} ✅`);
  }
}

module.exports = new EmailService();