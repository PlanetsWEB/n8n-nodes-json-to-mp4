import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
  } from 'n8n-workflow';
  
  import axios from 'axios';
  
  export class JsonToMp4Node implements INodeType {
    description: INodeTypeDescription = {
      displayName: 'JsonToMp4',
      name: 'jsonToMp4',
      group: ['transform'],
      version: 1,
      description: 'Gera vídeo a partir de JSON usando a API JsonToMp4',
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
          displayName: 'JSON do Vídeo',
          name: 'videoJson',
          type: 'json',
          default: '',
          description: 'Estrutura JSON com os dados para criação do vídeo',
          required: true,
        },
      ],
    };
  
    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
      const items = this.getInputData();
  
      const returnData: INodeExecutionData[] = [];
  
      for (let i = 0; i < items.length; i++) {
        const jsonBody = this.getNodeParameter('videoJson', i) as object;
        const credentials = await this.getCredentials('jsonToMp4Api');
  
        const response = await axios.post(
          'https://api.json-to-mp4.online/v1/api/video/criar',
          jsonBody,
          {
            headers: {
              'Content-Type': 'application/json',
              'api-key': credentials.apiKey,
            },
          }
        );
  
        returnData.push({
          json: response.data,
        });
      }
  
      return [returnData];
    }
  }
  