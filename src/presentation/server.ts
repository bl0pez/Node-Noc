import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";

export class Server {
  public static start(): void {
    console.log("Server is running...");

    CronService.createJob("*/5 * * * * *", () => {
      const url = "http://localhost:3000";
      new CheckService(
        () => console.log(`Success on check service: ${url}`),
        (error) => console.log(`Error on check service: ${error}`)
      ).execute(url);
    });
  }
}
