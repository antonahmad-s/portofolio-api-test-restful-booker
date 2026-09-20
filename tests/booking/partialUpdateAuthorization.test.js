import { expect } from 'chai';
import { bookingClient } from '../../src/clients/bookingClient.js';
import { createBookingPayload, partialUpdateBookingPayload } from '../../src/helpers/testData.js';

describe('Booking - PATCH authorization', () => {
  let bookingId;

  before(async () => {
    const created = await bookingClient.createBooking(createBookingPayload());
    expect(created.status, JSON.stringify(created.data)).to.equal(200);
    bookingId = created.data.bookingid;
  });

  it('should reject PATCH without a token', async () => {
    const response = await bookingClient.partialUpdateBooking(
      bookingId,
      undefined,
      partialUpdateBookingPayload
    );

    expect([401, 403]).to.include(response.status);
  });

  it('should reject PATCH with an invalid token', async () => {
    const response = await bookingClient.partialUpdateBooking(
      bookingId,
      'invalid-token',
      partialUpdateBookingPayload
    );

    expect([401, 403]).to.include(response.status);
  });
});
