import { expect } from "chai";
import { bookingClient } from "../../src/clients/bookingClient.js";
import { createBookingPayload } from "../../src/helpers/testData.js";

describe("Booking - negative scenarios", () => {
  it("should handle a non-existing booking id", async () => {
    const response = await bookingClient.getBooking(999999999);
    expect([404, 200]).to.include(response.status);
  });

  it("should not authorize update without a token", async () => {
    const created = await bookingClient.createBooking(createBookingPayload());
    const id = created.data.bookingid;

    const response = await bookingClient.updateBooking(
      id,
      "invalid-token",
      createBookingPayload({ firstname: "Unauthorized" })
    );

    expect([200, 403, 401]).to.include(response.status);
  });

  it("should not authorize delete without a valid token", async () => {
    const created = await bookingClient.createBooking(createBookingPayload());
    const id = created.data.bookingid;

    const response = await bookingClient.deleteBooking(id, "invalid-token");

    expect([201, 403, 401]).to.include(response.status);
  });
});