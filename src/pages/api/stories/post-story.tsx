// pages/api/stories/post-story.ts
import { type NextApiRequest, type NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getUserOnServer } from '~/server/getServerToken';
import { title } from 'process';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

        const user = getUserOnServer(req);
        if(!user) {
          return res.status(401).end(`unauthorised`);
        }
         

         const blog = await prisma.blog.create({
           data: {
             title: req?.body?.title,
             content: req?.body?.story,
             published: true,
             author: {
               connect: { id: user.id },
             },
           },
         });

         console.log(blog,user)
          return res.status(201).send({message: 'post created'});

       
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}


