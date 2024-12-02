/**
 * @jest-environment @dynatrace/runtime-simulator/lib/test-environment
 */

import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import posts from './posts.action.ts';

enableFetchMocks();

describe('posts', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should produce expected results', async () => {
    fetchMock.mockResponse(
      JSON.stringify({
        schemaId: 'mattermost-connection',
        value: {
          name: 'Mattermost',
          token: 'abc123',
          url: 'https://foo.bar',
        },
        summary: 'Mattermost',
      }),
    );
    const result = await posts({ name: 'Mark', connectionId: 'mattermost-connection-object-id' });
    expect(result).toEqual({ message: 'Hello Mark!' });
    expect.assertions(1);
  });
});
