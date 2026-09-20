import { expect } from 'chai';
import { authClient } from '../../src/clients/authClient.js';
import { bookingClient } from '../../src/clients/bookingClient.js';
import { config } from '../../src/config/env.js';
import {
  createBookingPayload,
  partialUpdateBookingPayload,
} from '../../src/helpers/testData.js';
import { bookingSchema } from '../../src/schemas/bookingSchema.js';
import { assertSchema } from '../../src/helpers/schemaValidator.js';

describe('Booking - partial update', () => {
  let token;
  let bookingId;

  before(async () => {
    const authResponse = await authClient.login(
      config.username,
      config.password
    );
    expect(authResponse.status, JSON.stringify(authResponse.data)).to.equal(200);
    token = authResponse.data.token;
    expect(token).to.be.a('string').and.not.empty;

    const bookingResponse = await bookingClient.createBooking(
      createBookingPayload({ firstname: 'Before' })
    );
    expect(
      bookingResponse.status,
      JSON.stringify(bookingResponse.data)
    ).to.equal(200);
    bookingId = bookingResponse.data.bookingid;
    expect(bookingId).to.be.a('number');
  });

  it('should partially update firstname and lastname', async () => {
    const response = await bookingClient.partialUpdateBooking(
      bookingId,
      token,
      partialUpdateBookingPayload
    );

    expect(response.status, JSON.stringify(response.data)).to.equal(200);
    expect(response.data.firstname).to.equal('James');
    expect(response.data.lastname).to.equal('Brown');
    assertSchema(bookingSchema, response.data);
  });
});
