import { expect } from 'chai';
import { httpClient } from '../../src/clients/httpClient.js';

describe('Health - ping', () => {
  it('should confirm the API is reachable', async () => {
    const response = await httpClient.get('/ping');

    expect(response.status, JSON.stringify(response.data)).to.equal(201);
  });
});
