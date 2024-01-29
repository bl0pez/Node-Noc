import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmaillUseCase {
  execute(to: string | string[]): Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmaillUseCase {
  public constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  public async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

      if (!sent) throw new Error(`Error sending email to ${to}`);

      const log = new LogEntity({
        message: `Log sent to ${to}`,
        level: LogSeverityLevel.low,
        origin: "send-email-logs.ts",
      });

      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin: "send-email-logs.ts",
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
