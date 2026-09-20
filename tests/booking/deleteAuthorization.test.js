import { expect } from 'chai';
import { bookingClient } from '../../src/clients/bookingClient.js';
import { createBookingPayload } from '../../src/helpers/testData.js';

describe('Booking - DELETE authorization', () => {
  let bookingId;

  before(async () => {
    const created = await bookingClient.createBooking(createBookingPayload());
    expect(created.status, JSON.stringify(created.data)).to.equal(200);
    bookingId = created.data.bookingid;
  });

  it('should reject DELETE without a token', async () => {
    const response = await bookingClient.deleteBooking(bookingId);

    expect([401, 403]).to.include(response.status);
  });

  it('should reject DELETE with an invalid token', async () => {
    const response = await bookingClient.deleteBooking(bookingId, 'invalid-token');

    expect([401, 403]).to.include(response.status);
  });
});
