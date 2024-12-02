import { IntentPayload } from '@dynatrace-sdk/navigation';
import { mockNavigation } from '@dynatrace-sdk/navigation/testing';
import { render, screen } from '@dynatrace/strato-components-preview/testing';
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import React from 'react';
import PostsWidget from './posts.widget';

enableFetchMocks();

describe('PostsWidget', () => {
  beforeEach(() => {
    fetchMock.resetMocks();

    // Mock the `getIntentLink` value to be a valid URL.
    mockNavigation({
      getIntentLink: (intentPayload: IntentPayload, appId?: string, intentId?: string) => 'https://mock.url',
    });
  });

  it('should render a widget with values', async () => {
    // Mock settings objects response value.
    fetchMock.mockIf(
      new RegExp('/platform/app-settings/v1/objects'),
      JSON.stringify({
        items: [
          {
            objectId: 'mattermost-connection-object-id',
            summary: 'Mattermost Connection',
          },
        ],
        totalCount: 1,
        pageSize: 100,
      }),
    );
    render(
      <PostsWidget
        value={{ name: 'Mark', connectionId: 'mattermost-connection-object-id' }}
        onValueChanged={jest.fn()}
      />
    );

    expect(screen.getByText('Mark')).toBeTruthy();
    expect(await screen.findByText('My Connection')).toBeTruthy();
  });
});
