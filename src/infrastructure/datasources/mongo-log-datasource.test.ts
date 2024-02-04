import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugins";
import { MongoDatabase } from "../../data/mongo/init";
import { MongoLogDataSource } from "./mongo-log-datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogModel } from "../../data/mongo/models/log.model";

describe("MongoLogDatasource", () => {
  const logDataSource = new MongoLogDataSource();
  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: "Test log",
    origin: "mongo-log-datasource.ts",
  });

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  //Eliminar todos los logs antes de cada test
  afterEach(async () => {
    await LogModel.deleteMany();
  });

  //Cerrar la conexión con la base de datos después de cada test
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Should create a log", async () => {
    const logSpy = jest.spyOn(console, "log");

    await logDataSource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      "Mongo Log created:",
      expect.any(String)
    );
  });

  test("Should get logs", async () => {
    await logDataSource.saveLog(log);

    const logs = await logDataSource.getLogs(LogSeverityLevel.medium);
    expect(logs.length).toBe(1);
    expect(logs[0].level).toBe(LogSeverityLevel.medium);
  });
});
