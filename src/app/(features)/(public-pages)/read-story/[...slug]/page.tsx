import { Box, Flex, Heading, Badge, Image, Text, Avatar } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { type CombineThumbnailResponse } from "~/pages/api/api-typings";

const prisma = new PrismaClient();
const ReadFullStory = async ({ params }: { params: { slug: string } }) => {
    
    const blog = (await prisma.blog.findUnique({
        where: {
            uuid: params.slug[0]?.split('#')[1],
            id:  +(params.slug[0]?.split('#')[0] ?? 0)
        },
        include: {
            thumbnail: true
        },

    })) as unknown as CombineThumbnailResponse


    const user = (await prisma.user.findFirst({
        where: {
            id: blog.authorId
        }

    })) as unknown as CombineThumbnailResponse



    return (
        <Box className="max-w-4xl mx-auto mt-8 p-4 shadow-lg rounded-lg">
            <Flex className="flex-col md:flex-row gap-y-4">
                <Heading as="h1" size="xl" className="text-[var(--app-text)] font-bold mb-2">
                    {blog.thumbnail.event}
                </Heading>


                <Box className="p-4 shadow-md rounded-md" display={'flex'} justifyContent={'start'} columnGap={'20px'} alignItems={'center' }>
                    <Avatar
                        cursor={'pointer'}
                        size="md"
                        name={user?.name}
                        src=""
                    />
                    <Text className="text-[var(--app-text)]">{user?.name}</Text>

                </Box>

                <Box className="md:w-1/3">
                    <Image
                        src={blog.thumbnail.buffer}
                        alt={blog.thumbnail.desc}
                        className="object-cover w-full h-64 rounded-md"
                    />
                </Box>
                <Box className="md:w-2/3 md:ml-4 mt-4 md:mt-0">

                    <Badge colorScheme={blog.published ? 'green' : 'red'} mb={4}>
                        {blog.published ? 'Published' : 'Draft'}
                    </Badge>
                    <Text className="text-[var(--app-text)]mb-2">
                        By {blog.name} on {new Date(blog.createdAt).toLocaleDateString()}
                    </Text>
                    <div
                        className="text-[var(--app-text)] mb-4 html_content_container"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </Box>
            </Flex>
        </Box>
    );

}


export default ReadFullStory;