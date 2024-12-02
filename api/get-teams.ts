import { appSettingsObjectsClient } from "@dynatrace-sdk/client-app-settings";

export interface MattermostConnection {
  token: string;
  url: string;
  name: string;
}
export interface MattermostTeamPayload{
  list : Team[];
}
export type Team={
  id: number;
  name: string;
}
export default async function (connectionId: string):Promise<MattermostTeamPayload> {
  const connectionObject =
    await appSettingsObjectsClient.getAppSettingsObjectByObjectId({
      objectId: connectionId,
    });
    const settings = connectionObject.value as MattermostConnection;

  const apiUrl = connectionObject.value?.url + '/api/v4/teams';
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
  
  const list = response ?? response.map((team: any) => ({
    id: team.id,
    name: team.name,
  }));


  return { list : list ?? [] }; 
}