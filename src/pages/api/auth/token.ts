// pages/api/auth/token.ts

import { type NextApiRequest, type NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { generateAccessToken } from '~/app/utils/jwt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { token } = req.body;
        if (!token) return res.status(401).end();

        const user = await prisma.user.findUnique({ where: { refreshToken: token , email : ''} });
        if (!user) return res.status(403);

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!, (err: any, decodedUser: any) => {
            if (err) return res.status(403);

            const accessToken = generateAccessToken({ id: user.id, email: user.email });
            res.json({ accessToken });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
