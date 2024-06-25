/* eslint-disable @typescript-eslint/no-misused-promises */
import axios, { type AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { type ConnectionProperties, type ConnectionType, OpenVidu } from 'openvidu-node-client';
import { type SessionObject } from '~/app/video-streaming/typings/openvidu-typings';

const OPENVIDU_URL = process.env.OPENVIDU_URL ?? 'http://localhost:4443';
const OPENVIDU_SECRET = process.env.OPENVIDU_SECRET ?? 'MY_SECRET';
const openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);

const axiosInstance = axios?.create({
baseURL: `${OPENVIDU_URL}openvidu/api`,
headers: {
  'Authorization': `Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU`,
  'Content-Type': 'application/json',
},
});

const getAllSessions = async (): Promise<AxiosResponse<any, any>> => {
 
  const response = await axiosInstance.get('/sessions/');
  return response;
};

const deleteSession = async (sessionId: string): Promise<AxiosResponse<any, any>>=> {
    const response = await axiosInstance?.delete(`/sessions/${sessionId}`);
    
    return response;
};


// TODO: might we can use in future to delete the all sessions
const onEachSessionDelete = async ()=> {
  const allSessions: SessionObject = (await getAllSessions()).data;
  
  const promises: Promise<any>[] = [];
  if (allSessions?.content?.length > 0) {
    for (const session of allSessions?.content?.splice(1)) {
      if (session?.sessionId) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result =   deleteSession(session?.sessionId);
        promises.push(result)
        
        }
        }
    }
    return Promise?.all(promises);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { rtspUrl } = req.body;

  try {
    const session = await openvidu.createSession();
    const connectionProperties: ConnectionProperties = {
      type: 'IPCAM' as ConnectionType,
      rtspUri: rtspUrl,
      adaptativeBitrate: false,
      onlyPlayWithSubscribers: true,
      networkCache: 2000,
      data: "anything"
    };

    const connection = await session?.createConnection(connectionProperties);
    res.status(200).json({sessionId:session.sessionId,connection: connection});
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).send(error.message);
  }
}

// Export all important Utils function related to the Openvidu sessions Hnda
export {getAllSessions,deleteSession,onEachSessionDelete}