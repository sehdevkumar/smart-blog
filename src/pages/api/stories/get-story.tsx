/* eslint-disable @typescript-eslint/dot-notation */
// pages/api/stories/post-story.ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getUserOnServer } from "~/server/getServerToken";
import { type BlogPost } from "../api-typings";
const prisma = new PrismaClient();


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = getUserOnServer(req);

  if (req.method === "GET") {
    if (!user) {
      return res.status(401).end(`unauthorised`);
    }

    let blogs: BlogPost[] = (await prisma.blog.findMany({
      where: {
        authorId: user?.id,
      },
    })) as BlogPost[];

    blogs.map((d) => (d.name = user.name));

    const isQueryid = req.query;
    if (isQueryid["pid"]) {
      blogs = blogs.filter((b) => "" + b.id === isQueryid["pid"]);
    }

    return res.status(201).send([...blogs]);
  }

 else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
