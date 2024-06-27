// utils/jwt.ts

import jwt from 'jsonwebtoken';

export const generateAccessToken = (user: { id: number, email: string ,name:string}) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
};

export const generateRefreshToken = (user: { id: number, email: string ,name:string}) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!);
};
