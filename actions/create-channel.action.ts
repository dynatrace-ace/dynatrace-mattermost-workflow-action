import { userLogger } from '@dynatrace-sdk/automation-action-utils/actions';
import { appSettingsObjectsClient } from '@dynatrace-sdk/client-app-settings';

interface CreateChannelRequestBody {
  "team_id": string,
  "name": string,
  "display_name": string,
  "type": string,
}

export default async (payload) => {
  if (!payload.team) {
    throw new Error("Input field 'Team Id' is missing.");
  }

  if (!payload.name) {
    throw new Error("Input field 'channelName' is missing.");
  }

  if (!payload.display_name) {
    throw new Error("Input field 'channeldisplayName' is missing.");
  }

  if (!payload.type) {
    throw new Error("Input field 'channelType' is missing.");
  }

  // Retrieves the app settings object associated with the given objectId.
  // Its values can be later used to, for example, communicate with third party services.
  const connectionObject = await appSettingsObjectsClient.getAppSettingsObjectByObjectId({
    objectId: payload.connectionId,
  });
  
  // mattermost server connection plus the api endpoint
  const apiUrl = connectionObject.value?.url + '/api/v4/channels';

  // normalize url by removing the "/" if exists
  const normalizedUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl; 

  const bearerToken = connectionObject.value?.token;
  const body_payload: CreateChannelRequestBody = {
    "team_id": payload.team,
    "name": payload.name,
    "display_name": payload.display_name,
    "type": payload.type,
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
      body: JSON.stringify(body_payload)
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();
    userLogger.info('Data:'+ data);
    
    return data;
  } catch (error) {
    throw new Error('Error fetching data: '+ error);
  }
  
};