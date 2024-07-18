/* eslint-disable @typescript-eslint/no-unused-vars */
// pages/api/auth/token.ts

import { type NextApiRequest, type NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "~/app/utils/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === "POST") {
    const { token } = req.body;

    if (!token) {
      return res.status(401).end();
    }

    try {
      const user = await prisma.user.findFirst({
        where: { refreshToken: token },
      });


      if (!user) {
        return res.status(403).end();
      }

      jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET!,
        (err: any, decodedUser: any) => {
          if (err) {
            return res.status(403).end();
          }

          const accessToken = generateAccessToken({
            id: user.id,
            email: user.email,
            name: user.name ?? "",
          });

          return res
            .status(200)
            .send({ accessToken: accessToken, refreshToken: token });
        }
      );
    } catch (error) {
      console.error("Error verifying token or finding user:", error);
      return res.status(500).end();
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
