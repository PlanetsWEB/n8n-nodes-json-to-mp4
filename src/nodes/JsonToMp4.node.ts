import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import axios from 'axios';

export class JsonToMp4 implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'JsonToMp4 giulia',
		name: 'jsonToMp4',
		group: ['transform'],
		version: 1,
		description: 'Cria vídeos usando a API JsonToMp4',
		defaults: {
			name: 'JsonToMp4',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'jsonToMp4Api',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Modo de Envio',
				name: 'modoDeEnvio',
				type: 'options',
				options: [
					{ name: 'Formulário Simplificado', value: 'form' },
					{ name: 'JSON Completo', value: 'json' },
				],
				default: 'form',
			},
			{
				displayName: 'JSON do Vídeo',
				name: 'videoJson',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						modoDeEnvio: ['json'],
					},
				},
			},
			{
				displayName: 'Webhook URL',
				name: 'webhook',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						modoDeEnvio: ['form'],
					},
				},
			},
			{
				displayName: 'Largura (width)',
				name: 'width',
				type: 'number',
				default: 1280,
				displayOptions: {
					show: {
						modoDeEnvio: ['form'],
					},
				},
			},
			{
				displayName: 'Altura (height)',
				name: 'height',
				type: 'number',
				default: 720,
				displayOptions: {
					show: {
						modoDeEnvio: ['form'],
					},
				},
			},
			{
				displayName: 'Mesclar Áudios Gerais?',
				name: 'generalAudiosMerge',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						modoDeEnvio: ['form'],
					},
				},
			},
			{
				displayName: 'Áudios Gerais',
				name: 'generalAudios',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						modoDeEnvio: ['form'],
					},
				},
				default: {},
				options: [
					{
						name: 'audio',
						displayName: 'Áudio',
						values: [
							{
								displayName: 'URL',
								name: 'url',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Volume',
								name: 'volume',
								type: 'number',
								default: 100,
							},
						],
					},
				],
			},
			{
				displayName: 'Aplicar Efeito de Zoom?',
				name: 'scaleZoom',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						modoDeEnvio: ['form'],
					},
				},
			},
			{
				displayName: 'Cenas',
				name: 'scenes',
				type: 'json',
				default: '',
				description: 'Cole o array de cenas conforme o schema da API.',
				displayOptions: {
					show: {
						modoDeEnvio: ['form'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const modo = this.getNodeParameter('modoDeEnvio', i) as string;
			const credentials = await this.getCredentials('jsonToMp4Api');
			let body: any;

			if (modo === 'json') {
				body = this.getNodeParameter('videoJson', i);
			} else {
				body = {
					webhook: this.getNodeParameter('webhook', i),
					width: this.getNodeParameter('width', i),
					height: this.getNodeParameter('height', i),
					generalAudiosMerge: this.getNodeParameter('generalAudiosMerge', i),
					generalAudios: (this.getNodeParameter('generalAudios', i) as any)?.audio,
					effects: {
						scaleZoom: this.getNodeParameter('scaleZoom', i),
					},
					scenes: this.getNodeParameter('scenes', i),
				};
			}

			const response = await axios.post('https://api.json-to-mp4.online/v1/api/video/criar', body, {
				headers: {
					'Content-Type': 'application/json',
					'api-key': String(credentials.apiKey),
				},
			});

			returnData.push({
				json: response.data,
			});
		}

		return [returnData];
	}
}
