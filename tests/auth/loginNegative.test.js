import { expect } from "chai";
import { authClient } from "../../src/clients/authClient.js";

describe("Authentication - negative scenarios", () => {
  it("should reject an invalid username", async () => {
    const response = await authClient.login("invalid-user", "password123");
    expect(response.status).to.equal(200);
    expect(response.data.reason).to.be.a("string");
  });

  it("should reject an invalid password", async () => {
    const response = await authClient.login("admin", "wrong-password");
    expect(response.status).to.equal(200);
    expect(response.data.reason).to.be.a("string");
  });

  it("should reject missing credentials", async () => {
    const response = await authClient.login("", "");
    expect(response.status).to.equal(200);
    expect(response.data.reason).to.be.a("string");
  });
});