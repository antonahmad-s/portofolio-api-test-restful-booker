import { expect } from 'chai';
import { authClient } from '../../src/clients/authClient.js';
import { bookingClient } from '../../src/clients/bookingClient.js';
import { config } from '../../src/config/env.js';
import {
  createBookingPayload,
  partialUpdateBookingPayload,
} from '../../src/helpers/testData.js';

describe('E2E - booking lifecycle', () => {
  it('should complete login -> create -> read -> update -> patch -> verify -> delete', async () => {
    const auth = await authClient.login(config.username, config.password);
    expect(auth.status, JSON.stringify(auth.data)).to.equal(200);
    const token = auth.data.token;
    expect(token).to.be.a('string').and.not.empty;

    const created = await bookingClient.createBooking(createBookingPayload());
    expect(created.status, JSON.stringify(created.data)).to.equal(200);
    const bookingId = created.data.bookingid;
    expect(bookingId).to.be.a('number');

    const fetched = await bookingClient.getBooking(bookingId);
    expect(fetched.status, JSON.stringify(fetched.data)).to.equal(200);

    const updated = await bookingClient.updateBooking(
      bookingId,
      token,
      createBookingPayload({ firstname: 'Lifecycle', totalprice: 999 })
    );
    expect(updated.status, JSON.stringify(updated.data)).to.equal(200);
    expect(updated.data.firstname).to.equal('Lifecycle');
    expect(updated.data.totalprice).to.equal(999);

    const patched = await bookingClient.partialUpdateBooking(
      bookingId,
      token,
      partialUpdateBookingPayload
    );
    expect(patched.status, JSON.stringify(patched.data)).to.equal(200);
    expect(patched.data.firstname).to.equal('James');
    expect(patched.data.lastname).to.equal('Brown');

    const verified = await bookingClient.getBooking(bookingId);
    expect(verified.status, JSON.stringify(verified.data)).to.equal(200);
    expect(verified.data.firstname).to.equal('James');
    expect(verified.data.lastname).to.equal('Brown');
    expect(verified.data.totalprice).to.equal(999);

    const deleted = await bookingClient.deleteBooking(bookingId, token);
    expect(deleted.status, JSON.stringify(deleted.data)).to.equal(201);

    const afterDelete = await bookingClient.getBooking(bookingId);
    expect(afterDelete.status, JSON.stringify(afterDelete.data)).to.equal(404);
  });
});
