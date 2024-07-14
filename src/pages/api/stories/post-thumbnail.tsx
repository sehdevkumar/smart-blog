/* eslint-disable @typescript-eslint/dot-notation */
// pages/api/stories/post-story.ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getUserOnServer } from "~/server/getServerToken";
import { type BlogPost } from "../api-typings";
const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "12mb", // Set desired value here
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = getUserOnServer(req);
  if (req.method === "POST") {
    if (!user) {
      return res.status(401).end(`unauthorised`);
    }

    

   
    return res.status(201).send({ message: "tumbnail created" });
  }

  if (req.method === "GET") {
    if (!user) {
      return res.status(401).end(`unauthorised`);
    }



    return res.status(201).send([]);
  }

   else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
