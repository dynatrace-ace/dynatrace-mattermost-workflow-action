import { userLogger } from '@dynatrace-sdk/automation-action-utils/actions';
import { appSettingsObjectsClient } from '@dynatrace-sdk/client-app-settings';

interface PostRequestBody {
  channel_id: string;
  message: string;
}

export default async (payload) => {
  if (!payload.connectionId) {
    throw new Error("Input field 'connectionId' is missing.");
  }

  if (!payload.channel) {
    throw new Error("Input field 'Channel Id' is missing.");
  }

  if (!payload.message) {
    throw new Error("Input field 'message' is missing.");
  }

  // Retrieves the app settings object associated with the given objectId.
  // Its values can be later used to, for example, communicate with third party services.
  const connectionObject = await appSettingsObjectsClient.getAppSettingsObjectByObjectId({
    objectId: payload.connectionId,
  });
  
  // mattermost server connection plus the api endpoint
  const apiUrl = connectionObject.value?.url + '/api/v4/posts';

  // normalize url by removing the "/" if exists
  const normalizedUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl; 

  // grab mattermost personal access token
  const bearerToken = connectionObject.value?.token;

  // grab channel and message from the tsx payload
  const requestBody: PostRequestBody = {
    channel_id: payload.channel,
    message: payload.message
  };

  // Call Mattermost
  try {
    // Execute the request
    const response = await fetch(normalizedUrl, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearerToken}`, // Add the Bearer token here
      },
      body: JSON.stringify(requestBody),
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();
    userLogger.info('Data: '+ data);
    
    return data;
  } catch (error) {
    throw new Error('Error fetching data: '+ error);
  }
  
};

