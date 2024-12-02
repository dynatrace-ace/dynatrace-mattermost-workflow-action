import { AutomationTextInput, AutomationConnectionPicker } from '@dynatrace/automation-action-components';
import { FormField, Label } from '@dynatrace/strato-components-preview';
import { ActionWidget } from '@dynatrace-sdk/automation-action-utils';
import React, { useEffect } from "react";
import { SelectV2 } from "@dynatrace/strato-components-preview/forms";
import { MattermostTeamPayload,Team } from "../api/get-teams";
import { useAppFunction } from "@dynatrace-sdk/react-hooks";

interface CreateChannelInput {
  connectionId: string;
  team_id: string,
  name: string,
  display_name: string,
  type: null,
  team: string | null;
}

const PostsWidget: ActionWidget<CreateChannelInput> = (props) => {
  const { value, onValueChanged } = props;

  const updateValue = (newValue: Partial<CreateChannelInput>) => {
    onValueChanged({ ...value, ...newValue });
  };

  useEffect(() => {
    
  }, [value.connectionId]);

  const response = useAppFunction<MattermostTeamPayload>({
    name: "get-teams",
    data: value.connectionId,
    responseType: "json",
  });

  return (
    <>
      <FormField>
        <Label>Mattermost Connection</Label>
        <AutomationConnectionPicker
          connectionId={value.connectionId}
          schema='mattermost-connection'
          onChange={(connectionId) => updateValue({ connectionId })}
        />
      </FormField>
      {/* <FormField>
        <Label>Team Id</Label>
        <AutomationTextInput value={value.team_id} onChange={(team_id) => updateValue({ team_id })} />
      </FormField> */}
      <FormField>
        <Label>Channel Name</Label>
        <AutomationTextInput value={value.name} onChange={(name) => updateValue({ name })} />
      </FormField>
      <FormField>
        <Label>Channel Display Name</Label>
        <AutomationTextInput value={value.display_name} onChange={(display_name) => updateValue({ display_name })} />
      </FormField>
      <FormField>
        <Label>Channel Type</Label>
        <SelectV2
          value={value.type} 
          onChange={(type) => updateValue({ type })}
        >
          <SelectV2.Content>
            <SelectV2.Option value="O">Public</SelectV2.Option>
            <SelectV2.Option value="P">Private</SelectV2.Option>
          </SelectV2.Content>
        </SelectV2>
      </FormField>
      <FormField>
        <Label>Team</Label>
        <SelectV2
          name="team"
          value={value.team}
          onChange={(team) => updateValue({ team })}
        >
          <SelectV2.Content>
         { response.data ? response.data.list.map((team: Team) => (
            <SelectV2.Option key={team.id} value={team.id}>
              {team.name}
            </SelectV2.Option>
         )) :"" }
          </SelectV2.Content>
        </SelectV2>
      </FormField>
    </>
  );
};

export default PostsWidget;
