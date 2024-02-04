import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe("LogRepositoryImpl", () => {
  const mockLogDataSource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const logRepository = new LogRepositoryImpl(mockLogDataSource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("saveLog should call the dataSource with argument", async () => {
    const log = {
      level: LogSeverityLevel.high,
      message: "hola",
    } as LogEntity;

    await logRepository.saveLog(log);
    expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log);
  });

  test("getLogs should call the dataSource with argument", async () => {
    await logRepository.getLogs(LogSeverityLevel.low);

    expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(
      LogSeverityLevel.low
    );
  });
});
