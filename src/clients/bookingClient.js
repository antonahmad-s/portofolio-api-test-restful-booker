import { httpClient } from './httpClient.js';

const jsonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const authHeaders = (token) => ({
  ...jsonHeaders,
  Cookie: `token=${token}`,
});

export const bookingClient = {
  async listBookings() {
    return httpClient.get('/booking', {
      headers: { Accept: 'application/json' },
    });
  },

  async getBooking(id) {
    return httpClient.get(`/booking/${id}`, {
      headers: { Accept: 'application/json' },
    });
  },

  async createBooking(payload) {
    return httpClient.post('/booking', payload, {
      headers: jsonHeaders,
    });
  },

  async updateBooking(id, token, payload) {
    const config = token ? { headers: authHeaders(token) } : {};
    return httpClient.put(`/booking/${id}`, payload, config);
  },

  async partialUpdateBooking(id, token, payload) {
    const config = token ? { headers: authHeaders(token) } : {};
    return httpClient.patch(`/booking/${id}`, payload, config);
  },

  async patchBooking(id, token, payload) {
    return bookingClient.partialUpdateBooking(id, token, payload);
  },

  async deleteBooking(id, token) {
    const config = token
      ? { headers: { Accept: 'application/json', Cookie: `token=${token}` } }
      : { headers: { Accept: 'application/json' } };

    return httpClient.delete(`/booking/${id}`, config);
  },
};
