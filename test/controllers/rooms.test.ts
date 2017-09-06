import {} from "jest";
import * as supertest from "supertest";

const app = require("../../src/app");
const request = supertest(app);

describe("GET /rooms/discover", () => {

  it("should return 302 Found when unauthenticated", () => {
    return request.get("/rooms/discover")
      .expect(302);
  });

});