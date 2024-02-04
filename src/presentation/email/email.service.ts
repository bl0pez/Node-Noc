import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugins";

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  public constructor() {}

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs de sistema";
    const htmlBody = `
    <h3>Logs de sistema - NOC</h3>
    <p>Se adjunta el archivo de logs de sistema</p>
    `;

    const attachments: Attachment[] = [
      { filename: "all-logs.log", path: "./logs/all-logs.log" },
      { filename: "high-logs.log", path: "./logs/high-logs.log" },
      { filename: "medium-logs.log", path: "./logs/medium-logs.log" },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
