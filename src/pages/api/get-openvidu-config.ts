/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextApiRequest } from 'next';
import { type OpenViduServerConnectionConfig } from '~/app/video-streaming/typings/openvidu-typings';
import { type NextApiResponseWithSocket } from './api-typings';
import { PrismaClient } from '@prisma/client';

const OPENVIDU_URL = process.env.OPENVIDU_URL ?? 'http://localhost:4443';
const OPENVIDU_SECRET = process.env.OPENVIDU_SECRET ?? 'MY_SECRET';

const prisma = new PrismaClient();


export default async function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  const {job_id} = await req.body;
  const isRecordExists = await prisma?.cargoCount?.findUnique({
    where: {
      poNumber: job_id,
    },
  })
  try { 
    const config: OpenViduServerConnectionConfig = {
      openvidu_secret: 'T1BFTlZJRFVBUFA6TVlfU0VDUkVU',
        openvidu_url: OPENVIDU_URL,
        session_id: isRecordExists?.session_id+''
    }
    res.status(200).json(config);
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).send(error.message);
  }
}
