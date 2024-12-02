import { AutomationTextInput, AutomationConnectionPicker } from '@dynatrace/automation-action-components';
import { FormField, Label, FormFieldMessages } from '@dynatrace/strato-components-preview';
import { ActionWidget } from '@dynatrace-sdk/automation-action-utils';
import React, { useEffect } from 'react';
import { AutomationSelect } from '@dynatrace/automation-action-components';
import { SelectV2 } from "@dynatrace/strato-components-preview/forms";
import { MattermostChannelPayload,Channel } from "../api/get-channels";
import { useAppFunction } from "@dynatrace-sdk/react-hooks";

interface PostsInput {
  connectionId: string;
  channel: string | null;
  message: string;
}

const PostsWidget: ActionWidget<PostsInput> = (props) => {
  // WORKING VERSION
  const { value, onValueChanged } = props;
  
  const updateValue = (newValue: Partial<PostsInput>) => {
    onValueChanged({ ...value, ...newValue });
  }; 

  useEffect(() => {
    
  }, [value.connectionId]);

  const response = useAppFunction<MattermostChannelPayload>({
    name: "get-channels",
    data: value.connectionId,
    responseType: "json",
  });

  // const [automationselect_value, onValueChange] = useState<string | null | Expression>('{{ result("task_1").value_1 }}');

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
      <FormField>
        <Label>Message</Label>
        <AutomationTextInput value={value.message} onChange={(message) => updateValue({ message })} />
      </FormField>
      <FormField>
        <Label>Channel</Label>
        <AutomationSelect 
          name="channel"
          value={value.channel ?? ''}
          onChange={(channel) => updateValue({ channel })}
        >
          <SelectV2.Content>
          { response.data ? response.data.list.map((channel: Channel) => (
              <SelectV2.Option key={channel.id} value={channel.id}>
                {channel.name}
              </SelectV2.Option>
          )) :"" }
          </SelectV2.Content>
        </AutomationSelect>
      </FormField>
    </>
  );
};

export default PostsWidget;
