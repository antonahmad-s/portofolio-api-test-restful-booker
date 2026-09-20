import { expect } from "chai";
import { bookingClient } from "../../src/clients/bookingClient.js";
import { createBookingPayload } from "../../src/helpers/testData.js";
import { bookingSchema } from "../../src/schemas/bookingSchema.js";
import { assertSchema } from "../../src/helpers/schemaValidator.js";

describe("Booking - read", () => {
  let bookingId;

  before(async () => {
    const response = await bookingClient.createBooking(createBookingPayload());
    expect(response.status, JSON.stringify(response.data)).to.equal(200);
    bookingId = response.data.bookingid;
    expect(bookingId).to.be.a("number");
  });

  it("should list bookings", async () => {
    const response = await bookingClient.listBookings();
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an("array").and.not.empty;
  });

  it("should retrieve an existing booking", async () => {
    const response = await bookingClient.getBooking(bookingId);
    expect(response.status, JSON.stringify(response.data)).to.equal(200);
    assertSchema(bookingSchema, response.data);
  });

  it("should return 404 for an unknown booking", async () => {
    const response = await bookingClient.getBooking(999999999);
    expect(response.status).to.equal(404);
  });
});
