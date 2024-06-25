/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import axios, { type AxiosResponse } from 'axios'
import { type OpenViduServerConnectionConfig } from '../typings/openvidu-typings'


  
  const getOpenViduSession = '/api/get-openvidu-config';
  const SessionEndPoint = 'openvidu/api/sessions/';
  


  const getSessionConnectionConfiguration = async (job_id:string
  ): Promise<AxiosResponse<any,any>> => {
    const response = await axios.post(`${getOpenViduSession}`,{job_id:job_id});
     
    return  response;

  }

  const getAllTokensForSession = async (getOpenViduServerConnectionConfig: OpenViduServerConnectionConfig): Promise<AxiosResponse<any,any>> => {

      const options = {
        headers: {
          Authorization: `Basic ${getOpenViduServerConnectionConfig?.openvidu_secret}`,
          'Content-Type': 'application/json',
        },
      }
      const response = await axios.post(
        `${getOpenViduServerConnectionConfig?.openvidu_url}${SessionEndPoint}${getOpenViduServerConnectionConfig?.session_id}/connection`,
        {},
        options,
      )
      return  response
  }
export {getSessionConnectionConfiguration ,  getAllTokensForSession}
