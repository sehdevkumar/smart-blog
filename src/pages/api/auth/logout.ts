// pages/api/auth/logout.ts

import { PrismaClient } from '@prisma/client';
import { type NextApiRequest, type NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { token } = req.body;

        await prisma.user.updateMany({
            where: { refreshToken: token },
            data: { refreshToken: null }
        });

        res.status(204).end();
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
