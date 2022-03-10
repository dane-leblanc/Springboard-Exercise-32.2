process.env.NODE_ENV = "test";

const { test, expect } = require("@jest/globals");
const request = require("supertest");
const { describe } = require("yargs");

const app = require("./app");
const items = require("./fakeDb");

let tylenol = { name: "tylenol", price: 10.99 };

beforeEach(() => {
  items.push(tylenol);
});

afterEach(() => {
  items.pop;
});

describe("GET /items", function () {
  test("GET status code", async function () {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
  });
});
