import nodemailer from "nodemailer";
import { EmailService, SendEmailOptions } from "./email.service";

describe("EmailService", () => {
  const mockSendMail = jest.fn();

  // Mock al createTransport
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  const emailSevice = new EmailService();

  test("should send email", async () => {
    const options: SendEmailOptions = {
      to: "prueba@google.com",
      subject: "Test",
      htmlBody: "<h1>Test</h1>",
    };

    await emailSevice.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: "<h1>Test</h1>",
      subject: "Test",
      to: "prueba@google.com",
    });
  });

  test("should send email with attachements", async () => {
    const email = "prueba@google.com";
    await emailSevice.sendEmailWithFileSystemLogs(email);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: "Logs de sistema",
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { filename: "all-logs.log", path: "./logs/all-logs.log" },
        { filename: "high-logs.log", path: "./logs/high-logs.log" },
        { filename: "medium-logs.log", path: "./logs/medium-logs.log" },
      ]),
    });
  });
});
