process.env.NODE_ENV = "test";
const { hasUncaughtExceptionCaptureCallback } = require("process");
// npm packages
const request = require("supertest");
// app imports
const app = require("./app");

let items = require("./fakeDb")

let item = {name:"Chocolate", price: 100};

beforeEach(async () => {
    items.push(item)
  });

  afterEach(async () => {
    items = []
  });

describe("GET /items", function(){
    test("Get all items", async function(){
        const res = await request(app).get(`/items`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(items)
    })
})

describe("GET /items/:name", function(){
    test("Get specific item", async function(){
        const res = await request(app).get(`/items/${item.name}`)
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual(item)
    })
})

describe("POST /items", function(){
    test("create item", async function(){
        const res = await request(app)
            .post(`/items`)
            .send({
                name:"rice",
                price:200
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            item:{name:"rice", price:200}
        });
    });
});

describe("PATCH /items/:name", function(){
    test("Update an item", async function(){
        const res = await request(app)
        .patch(`/items/${item.name}`)
        .send({
            name:"Unch"
        });
    expect(res.statusCode).toBe(200);
    expect(res.body.item).toEqual({
            name:"Unch"
        });
    });
});


describe("DELETE /items/:name", async function () {
    test("Deletes a single a item", async function () {
      const response = await request(app)
        .delete(`/items/${item.name}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: "Deleted" });
    });
  });
