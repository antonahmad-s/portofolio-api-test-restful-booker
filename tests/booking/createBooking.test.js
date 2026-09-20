import { expect } from "chai";
import { bookingClient } from "../../src/clients/bookingClient.js";
import { createBookingPayload } from "../../src/helpers/testData.js";
import { bookingSchema } from "../../src/schemas/bookingSchema.js";
import { assertSchema } from "../../src/helpers/schemaValidator.js";

describe("Booking - create", () => {
  it("should create a booking successfully", async () => {
    const payload = createBookingPayload();
    const response = await bookingClient.createBooking(payload);

    expect(response.status, JSON.stringify(response.data)).to.equal(200);
    expect(response.data.bookingid).to.be.a("number");
    expect(response.data.booking).to.deep.include(payload);
    assertSchema(bookingSchema, response.data.booking);
  });

  it("should create a booking when optional additional needs is omitted", async () => {
    const payload = createBookingPayload();
    delete payload.additionalneeds;

    const response = await bookingClient.createBooking(payload);

    expect(response.status, JSON.stringify(response.data)).to.equal(200);
    expect(response.data.bookingid).to.be.a("number");
  });

  it("should return a validation error for an incomplete payload", async () => {
    const response = await bookingClient.createBooking({
      firstname: "Invalid",
      bookingdates: { checkin: "2026-10-01" }
    });

    expect([400, 500], JSON.stringify(response.data)).to.include(response.status);
  });
});
