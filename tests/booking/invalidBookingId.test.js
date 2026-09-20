import { expect } from 'chai';
import { bookingClient } from '../../src/clients/bookingClient.js';

describe('Booking - invalid booking ID', () => {
  it('should return 404 for a non-existing numeric booking ID', async () => {
    const response = await bookingClient.getBooking(999999999);

    expect(response.status, JSON.stringify(response.data)).to.equal(404);
  });

  it('should return 404 for booking ID 0', async () => {
    const response = await bookingClient.getBooking(0);

    expect(response.status, JSON.stringify(response.data)).to.equal(404);
  });

  it('should return 404 for a negative booking ID', async () => {
    const response = await bookingClient.getBooking(-1);

    expect(response.status, JSON.stringify(response.data)).to.equal(404);
  });

  it('should return 404 for a non-numeric booking ID', async () => {
    const response = await bookingClient.getBooking('abc');

    expect(response.status, JSON.stringify(response.data)).to.equal(404);
  });
});
