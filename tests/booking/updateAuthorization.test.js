import { expect } from 'chai';
import { authClient } from '../../src/clients/authClient.js';
import { bookingClient } from '../../src/clients/bookingClient.js';
import { config } from '../../src/config/env.js';
import { createBookingPayload } from '../../src/helpers/testData.js';

describe('Booking - PUT authorization', () => {
  let bookingId;
  let payload;

  before(async () => {
    const auth = await authClient.login(config.username, config.password);
    expect(auth.status, JSON.stringify(auth.data)).to.equal(200);

    const created = await bookingClient.createBooking(createBookingPayload());
    expect(created.status, JSON.stringify(created.data)).to.equal(200);

    bookingId = created.data.bookingid;
    payload = createBookingPayload({ firstname: 'Unauthorized' });
  });

  it('should reject PUT without a token', async () => {
    const response = await bookingClient.updateBooking(bookingId, undefined, payload);

    expect([401, 403]).to.include(response.status);
  });

  it('should reject PUT with an invalid token', async () => {
    const response = await bookingClient.updateBooking(
      bookingId,
      'invalid-token',
      payload
    );

    expect([401, 403]).to.include(response.status);
  });
});
