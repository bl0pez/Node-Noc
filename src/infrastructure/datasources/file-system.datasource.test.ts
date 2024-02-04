import fs from "fs";
import path from "path";
import { FileSystemDataSource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
describe("FileSystemDatasource", () => {
  const logPath = path.join(__dirname, "../../../logs");

  //Se ejecuta antes de cada test
  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test("Should create log files if they do not exists", () => {
    new FileSystemDataSource();
    const files = fs.readdirSync(logPath);
    expect(files).toEqual(["all-logs.log", "high-logs.log", "medium-logs.log"]);
  });

  test("Should save a log in all-logs.log", () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: "Test log",
      origin: "file-system.datasource.ts",
    });

    logDataSource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/all-logs.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
  });

  test("Should save a log in all-logs.log and medium-logs.log", () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: "Test log",
      origin: "file-system.datasource.ts",
    });

    logDataSource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/all-logs.log`, "utf-8");
    const mediumLogs = fs.readFileSync(`${logPath}/medium-logs.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  test("Should save a log in all-logs.log and high-logs.log", () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.high,
      message: "Test log",
      origin: "file-system.datasource.ts",
    });

    logDataSource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/all-logs.log`, "utf-8");
    const highLogs = fs.readFileSync(`${logPath}/high-logs.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));
  });

  test("Should return all logs", async () => {
    const logDataSource = new FileSystemDataSource();
    const logLow = new LogEntity({
      level: LogSeverityLevel.low,
      message: "Test log",
      origin: "file-system.datasource.ts",
    });

    const logMedium = new LogEntity({
      level: LogSeverityLevel.medium,
      message: "Test log",
      origin: "file-system.datasource.ts",
    });

    const logHigh = new LogEntity({
      level: LogSeverityLevel.high,
      message: "Test log",
      origin: "file-system.datasource.ts",
    });

    await logDataSource.saveLog(logLow);
    await logDataSource.saveLog(logMedium);
    await logDataSource.saveLog(logHigh);

    const logsLow = await logDataSource.getLogs(LogSeverityLevel.low);
    const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium);
    const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high);

    expect(logsLow).toEqual(
      expect.arrayContaining([logLow, logMedium, logHigh])
    );
    expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
    expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
  });

  test("Should not throw an error if logs files already exists", () => {
    new FileSystemDataSource();
    new FileSystemDataSource();

    expect(true).toBeTruthy();
  });

  test("Should throw and error if severity level is not defined", async () => {
    const logDataSource = new FileSystemDataSource();
    const customSeverityLevel = "not-defined" as LogSeverityLevel;
    const log = new LogEntity({
      level: customSeverityLevel,
      message: "Test log",
      origin: "file-system.datasource.ts",
    });

    try {
      await logDataSource.getLogs(customSeverityLevel);
      expect(true).toBeFalsy();
    } catch (error) {
      const errorString = `${error}`;
      expect(errorString).toContain(`${customSeverityLevel} not implemented`);
    }
  });
});
