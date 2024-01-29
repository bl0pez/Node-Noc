import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

export class Server {
  public static start(): void {
    console.log("Server is running...");

    CronService.createJob("*/5 * * * * *", () => {
      const url = "http://localhost:3000";
      new CheckService(
        fileSystemLogRepository,
        () => console.log(`Success on check service: ${url}`),
        (error) => console.log(`Error on check service: ${error}`)
      ).execute(url);
    });
  }
}
