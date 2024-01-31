import { envs } from "./envs.plugins";

describe("Test envs.plugins.ts", () => {
  test("Should return env options", () => {
    expect(envs).toEqual({
      MAILER_EMAIL: "blopez4434@gmail.com",
      MAILER_SECRET_KEY: "ifavozrpyeavkjrb",
      MAILER_SERVICE: "gmail",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_URL: "mongodb://bryan:123456@localhost:27017",
      PORT: 3000,
      PROD: false,
    });
  });

  test("Should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";

    try {
      await import("./envs.plugins");
      expect(true).toBe(false);
    } catch (error) {
      expect(String(error)).toContain('"PORT" should be a valid integer');
    }
  });
});
