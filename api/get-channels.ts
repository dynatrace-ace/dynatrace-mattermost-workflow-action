import { appSettingsObjectsClient } from "@dynatrace-sdk/client-app-settings";

export interface MattermostConnection {
  token: string;
  url: string;
  name: string;
}
export interface MattermostChannelPayload{
  list : Channel[];
}
export type Channel={
  id: number;
  name: string;
}
export default async function (connectionId: string):Promise<MattermostChannelPayload> {
  const connectionObject =
    await appSettingsObjectsClient.getAppSettingsObjectByObjectId({
      objectId: connectionId,
    });
    const settings = connectionObject.value as MattermostConnection;

  const apiUrl = connectionObject.value?.url + '/api/v4/channels';
  const bearerToken = connectionObject.value?.token;
  const apiResponse = await fetch(apiUrl, { 
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`, // Add the Bearer token here
    },
  });
  if (!apiResponse.ok) {
    throw new Error();
  }
  const response = await apiResponse.json();
  
  const list = response ?? response.map((channel: any) => ({
    id: channel.id,
    name: channel.name,
  }));


  return { list : list ?? [] }; 
}