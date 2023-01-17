const request = require('supertest');
const app = require('../../../src/app');

describe('healcheck api', () => {
  test('should response msg with message is Api ok !', async () => {
    const response = await request(app).get('/v2/healthCheck');
    expect(response._body.msg).toBe('Api ok !');
  });
});
