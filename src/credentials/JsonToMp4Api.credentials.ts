import { Icon, ICredentialType, INodeProperties } from 'n8n-workflow';

export class JsonToMp4Api implements ICredentialType {
	name = 'jsonToMp4Api';
	icon = 'file:../icon.png' as Icon;
	displayName = 'JsonToMp4 API';
	documentationUrl = 'https://json-to-mp4.online/docs/getting-started/authentication';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
	];
}
