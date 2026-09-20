import { expect } from "chai";
import { authClient } from "../../src/clients/authClient.js";
import { config } from "../../src/config/env.js";
import { authSchema } from "../../src/schemas/authSchema.js";
import { assertSchema } from "../../src/helpers/schemaValidator.js";

describe("Authentication - positive scenarios", () => {
  it("should authenticate with valid credentials", async () => {
    const response = await authClient.login(config.username, config.password);

    expect(response.status).to.equal(200);
    expect(response.data.token).to.be.a("string").and.not.empty;
    assertSchema(authSchema, response.data);
  });
});