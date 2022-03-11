process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
const items = require("./fakeDb");

let tylenol = { name: "tylenol", price: 10.99 };

beforeEach(() => {
  items.push(tylenol);
});

afterEach(() => {
  items.length = 0;
});

// this will return an error

describe("GET /items", function () {
  test("GET list of items", async function () {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(items.length).toEqual(1);
    expect(res.body[0]).toEqual({ name: "tylenol", price: 10.99 });
  });
});

describe("POST /items", function () {
  test("Creates new item.", async () => {
    const res = await request(app)
      .post("/items")
      .send({ name: "thing", price: 100 });
    expect(res.statusCode).toBe(201);
    expect(res.body.added).toEqual({ name: "thing", price: 100 });
    expect(items.length).toEqual(2);
  });
});

describe("GET /items/:item", function () {
  test("Get specific item information", async () => {
    const res = await request(app).get("/items/tylenol");
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toEqual("tylenol");
    expect(res.body.price).toEqual(10.99);
  });
});

describe("PATCH /items/:item", function () {
  test("Edit a list item", async () => {
    const res = await request(app)
      .patch("/items/tylenol")
      .send({ name: "aleve", price: 7.99 });
    expect(res.statusCode).toBe(204);
    expect(items[0]).toEqual({ name: "aleve", price: 7.99 });
  });
});

describe("DELETE /items/:item", function () {
  test("Delete a list item", async () => {
    const res = await request(app).delete("/items/tylenol");
    expect(res.statusCode).toBe(204);
    expect(items.length).toEqual(0);
  });
});
