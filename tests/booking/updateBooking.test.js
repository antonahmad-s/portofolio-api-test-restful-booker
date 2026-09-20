import { expect } from "chai";
import { authClient } from "../../src/clients/authClient.js";
import { bookingClient } from "../../src/clients/bookingClient.js";
import { config } from "../../src/config/env.js";
import { createBookingPayload } from "../../src/helpers/testData.js";

describe("Booking - update", () => {
  let token;
  let bookingId;

  before(async () => {
    const authResponse = await authClient.login(config.username, config.password);
    expect(authResponse.status, JSON.stringify(authResponse.data)).to.equal(200);
    token = authResponse.data.token;
    expect(token).to.be.a("string").and.not.empty;

    const bookingResponse = await bookingClient.createBooking(createBookingPayload());
    expect(bookingResponse.status, JSON.stringify(bookingResponse.data)).to.equal(200);
    bookingId = bookingResponse.data.bookingid;
    expect(bookingId).to.be.a("number");
  });

  it("should update a booking with a valid token", async () => {
    const payload = createBookingPayload({
      firstname: "Updated",
      totalprice: 250
    });

    const response = await bookingClient.updateBooking(bookingId, token, payload);

    expect(response.status, JSON.stringify(response.data)).to.equal(200);
    expect(response.data.firstname).to.equal("Updated");
    expect(response.data.totalprice).to.equal(250);
  });

  it("should patch a booking", async () => {
    const response = await bookingClient.patchBooking(bookingId, token, {
      additionalneeds: "Dinner"
    });

    expect(response.status, JSON.stringify(response.data)).to.equal(200);
    expect(response.data.additionalneeds).to.equal("Dinner");
  });
});
