import "dotenv/config";
import { describe, expect, it } from "@jest/globals";

import request from "supertest";

import app from "../../index";
import { isJson } from "../../utils/lib/test.lib";
import { ServerResposneType } from "./server.test.type";

describe("[COMMON] Invalid URLs / 404 handling", () => {
  /**
   * Test case: Try to call a GET not allowed url
   */
  it("should return the status code when calling a non-existent GET url", async () => {
    const res: ServerResposneType = await request(app)
      .get("/not/allowed/url")
      .expect(400)
      .expect("Content-Type", /json/);

    expect(res.statusCode).toBe(400);
    expect(isJson(res.text)).toBe(true);

    const resultsJson = JSON.parse(res.text!);
    expect(resultsJson).toHaveProperty("status", 400);
    expect(typeof resultsJson.status).toBe("number");
  });

  /**
   * Test case: Try to call a POST not allowed url
   */
  it("should return the status code when calling a non-existent POST url", async () => {
    const res: ServerResposneType = await request(app)
      .post("/not/allowed/url")
      .send({ fakeKey: "Fake Value" })
      .expect(400)
      .expect("Content-Type", /json/);

    expect(res.statusCode).toBe(400);
    expect(isJson(res.text)).toBe(true);

    const resultsJson = JSON.parse(res.text!);
    expect(resultsJson).toHaveProperty("status", 400);
    expect(typeof resultsJson.status).toBe("number");
  });
});
