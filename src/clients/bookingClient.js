import { httpClient } from './httpClient.js';

const jsonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

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
    return httpClient.put(`/booking/${id}`, payload, {
      headers: {
        ...jsonHeaders,
        Cookie: `token=${token}`,
      },
    });
  },

  async partialUpdateBooking(bookingId, token, payload) {
    return httpClient.patch(`/booking/${bookingId}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: `token=${token}`,
      },
    });
  },

  async patchBooking(id, token, payload) {
    return httpClient.patch(`/booking/${id}`, payload, {
      headers: {
        ...jsonHeaders,
        Cookie: `token=${token}`,
      },
    });
  },

  async deleteBooking(id, token) {
    return httpClient.delete(`/booking/${id}`, {
      headers: {
        Accept: 'application/json',
        Cookie: `token=${token}`,
      },
    });
  },
};
