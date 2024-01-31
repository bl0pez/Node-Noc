import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log-datasource";

const logRepository = new LogRepositoryImpl(
  // new FileSystemDataSource()
  new MongoLogDataSource()
);

const emailService = new EmailService();

export class Server {
  public static start(): void {
    console.log("Server is running...");

    //Mandar email
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "blopez4434@gmail.com",
    // ]);

    CronService.createJob("*/5 * * * * *", () => {
      const url = "http://localhost:3000";
      new CheckService(
        logRepository,
        () => console.log(`Success on check service: ${url}`),
        (error) => console.log(`Error on check service: ${error}`)
      ).execute(url);
    });
  }
}
