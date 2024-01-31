import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log-datasource";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

// const logRepository = new LogRepositoryImpl(
//   new FileSystemDataSource()
//   new MongoLogDataSource()
//   new PostgresLogDataSource()
// );

const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDataSource()
);

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server is running...");

    //Mandar email
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "blopez4434@gmail.com",
    // ]);

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "http://localhost:3000";
    //   new CheckService(
    //     logRepository,
    //     () => console.log(`Success on check service: ${url}`),
    //     (error) => console.log(`Error on check service: ${error}`)
    //   ).execute(url);
    // });

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "http://localhost:3000";
    //   new CheckServiceMultiple(
    //     [fsLogRepository, mongoLogRepository, postgresLogRepository],
    //     () => console.log(`Success on check service: ${url}`),
    //     (error) => console.log(`Error on check service: ${error}`)
    //   ).execute(url);
    // });
  }
}
