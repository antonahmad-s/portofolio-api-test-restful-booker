import { expect } from 'chai';
import { authClient } from '../../src/clients/authClient.js';
import { bookingClient } from '../../src/clients/bookingClient.js';
import { config } from '../../src/config/env.js';
import { createBookingPayload } from '../../src/helpers/testData.js';
import { partialUpdateBookingPayload } from '../../src/helpers/testData.js';

describe('E2E - booking lifecycle', () => {
  it('should complete login -> create -> read -> update -> delete', async () => {
    const auth = await authClient.login(config.username, config.password);
    expect(auth.status).to.equal(200);
    const token = auth.data.token;

    const created = await bookingClient.createBooking(createBookingPayload());
    expect(created.status).to.equal(200);
    const bookingId = created.data.bookingid;

    const fetched = await bookingClient.getBooking(bookingId);
    expect(fetched.status).to.equal(200);

    const updated = await bookingClient.updateBooking(
      bookingId,
      token,
      createBookingPayload({ firstname: 'Lifecycle', totalprice: 999 })
    );
    expect(updated.status).to.equal(200);
    expect(updated.data.firstname).to.equal('Lifecycle');

    const partialupdate = await bookingClient.partialUpdateBooking(
      bookingId,
      token,
      partialUpdateBookingPayload()
    );
    expect(partialupdate.status).to.equal(200);
    expect(partialupdate.data.firstname).to.equal('Anton');
    expect(partialupdate.data.lastname).to.equal('Ahmad');

    const deleted = await bookingClient.deleteBooking(bookingId, token);
    expect(deleted.status).to.equal(201);

    const afterDelete = await bookingClient.getBooking(bookingId);
    expect(afterDelete.status).to.equal(404);
  });
});
