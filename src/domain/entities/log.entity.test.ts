import { LogEntity, LogSeverityLevel } from "./log.entity";

describe("log.entity.ts", () => {
  const dataObject = {
    message: "test-message",
    origin: "log.entity.test.ts",
    level: LogSeverityLevel.high,
  };

  test("Should create a LogEntity instance", () => {
    const log = new LogEntity({
      message: "test-message",
      origin: "log.entity.test.ts",
      level: LogSeverityLevel.high,
    });

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObject.message);
    expect(log.origin).toBe(dataObject.origin);
    expect(log.level).toBe(dataObject.level);
  });

  test("Should create a logEntity instance from json", () => {
    const json = `{"message":"http://localhost:3000 is not ok. TypeError: fetch failed","level":"high","createdAt":"2024-02-02T00:29:20.087Z","origin":"check-service.ts"}`;

    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(
      "http://localhost:3000 is not ok. TypeError: fetch failed"
    );
    expect(log.origin).toBe("check-service.ts");
    expect(log.level).toBe(LogSeverityLevel.high);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("Should create a LogEntity instance from object", () => {
    const log = LogEntity.fromObject(dataObject);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObject.message);
    expect(log.origin).toBe(dataObject.origin);
    expect(log.level).toBe(dataObject.level);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
