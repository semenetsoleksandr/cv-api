import request from "supertest";
import app from "./app";

describe("Test the root path", () => {
    it("It should response the GET /skills method", async () => {
        const response = await request(app).get("/skills");
        expect(response.statusCode).toBe(200);
    });
    it("It should response the GET /messages method", async () => {
        const response = await request(app).get("/messages");
        expect(response.statusCode).toBe(200);
    });
});
