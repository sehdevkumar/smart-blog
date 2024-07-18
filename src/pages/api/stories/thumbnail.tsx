/* eslint-disable @typescript-eslint/dot-notation */
// pages/api/stories/post-story.ts
import { type NextApiRequest, type NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getUserOnServer } from "~/server/getServerToken";
import { type BlogThumbnail } from "../api-typings";
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
  if (req.method === "PUT") {
    if (!user) {
      return res.status(401).end(`unauthorised`);
    }

    

    const thumbnailReq: BlogThumbnail = req.body


const existingThumbnail = await prisma.blogThumbnail.findUnique({
  where: { blogId: +thumbnailReq.blogId }
});

const thumbnailData = {
  buffer: thumbnailReq.buffer,
  desc: thumbnailReq.desc,
  event: thumbnailReq.event,
  fileName: thumbnailReq.fileName ?? '',
  location: thumbnailReq.location,
  blog: {
    connect: { id: +thumbnailReq.blogId }
  },
  blogId: +thumbnailReq?.blogId ?? 0
};
// Upsert the thumbnail
const upsertedThumbnail = await prisma.blogThumbnail.upsert({
  where: { id: existingThumbnail?.id ?? 0 },
  create: thumbnailData as any,
  update: thumbnailData as any
});

// Update the blog with the new thumbnail ID
 await prisma.blog.update({
  where: { id: +thumbnailReq.blogId },
  data: { thumbnailId: upsertedThumbnail?.id, published: true}
});


return res.status(201).send({ message: "Thumbnail created" });
  }
  if (req.method === "GET") {
    if (!user) {
      const blogsThumbnail: BlogThumbnail[] = (await prisma.blogThumbnail.findMany({ 
        include: {
            blog: true
        }
      }) as unknown as BlogThumbnail[]);
      return res.status(blogsThumbnail ? 200 : 204).send(blogsThumbnail);
    }
     const blogsThumbnail: BlogThumbnail[] = (await prisma.blogThumbnail.findMany({
        where: {
          blog : { 
            authorId: user?.id,
          },
        },
        include: {
           blog :true
        }
      })) as unknown as BlogThumbnail[];
        
    return res.status(blogsThumbnail ? 200 : 204).send(blogsThumbnail);
  }

   else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
