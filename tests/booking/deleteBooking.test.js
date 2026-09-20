import { expect } from "chai";
import { authClient } from "../../src/clients/authClient.js";
import { bookingClient } from "../../src/clients/bookingClient.js";
import { config } from "../../src/config/env.js";
import { createBookingPayload } from "../../src/helpers/testData.js";

describe("Booking - delete", () => {
  it("should delete a booking with a valid token", async () => {
    const authResponse = await authClient.login(config.username, config.password);
    expect(authResponse.status).to.equal(200);
    const token = authResponse.data.token;

    const bookingResponse = await bookingClient.createBooking(createBookingPayload());
    expect(bookingResponse.status, JSON.stringify(bookingResponse.data)).to.equal(200);
    const bookingId = bookingResponse.data.bookingid;

    const deleteResponse = await bookingClient.deleteBooking(bookingId, token);
    expect(deleteResponse.status, JSON.stringify(deleteResponse.data)).to.equal(201);

    const getResponse = await bookingClient.getBooking(bookingId);
    expect(getResponse.status).to.equal(404);
  });
});
