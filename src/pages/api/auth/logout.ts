// pages/api/auth/logout.ts

import { PrismaClient } from '@prisma/client';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { setCookie } from 'nookies';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { token } = req.body;

        await prisma.user.updateMany({
            where: { refreshToken: token },
            data: { refreshToken: null }
        });


        // Destroy the __userSession__ cookie
        setCookie({ res }, '__userSession__', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: -1, // Set the maxAge to a negative value to delete the cookie
            path: '/',
        });

        res.status(204).end();
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
