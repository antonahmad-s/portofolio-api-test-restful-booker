export function createBookingPayload(overrides = {}) {
  return {
    firstname: 'Anton',
    lastname: 'Tester',
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-10-01',
      checkout: '2026-10-07',
    },
    additionalneeds: 'Breakfast',
    ...overrides,
  };
}

export const partialUpdateBookingPayload = () => {
  return {
    firstname: 'Anton',
    lastname: 'Ahmad',
  };
};
