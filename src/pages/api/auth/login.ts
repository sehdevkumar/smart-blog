// pages/api/auth/login.ts

import { type NextApiRequest, type NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateAccessToken, generateRefreshToken } from '~/app/utils/jwt';
import { setCookie } from 'nookies';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = generateAccessToken({ id: user.id, email: user.email , name: user.name});
        const refreshToken = generateRefreshToken({ id: user.id, email: user.email ,name: user.name});

        // Store the refresh token in the database
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken }
        });


        setCookie({ res }, '__userSession__', JSON.stringify({ refreshToken, accessToken }), {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });

        res.json({ accessToken, refreshToken });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

