// Card.js
import React from 'react';
import { Box, Text, Badge, Button } from '@chakra-ui/react';
import { type BlogPost } from '~/pages/api/api-typings';
import { useRouter } from 'next/navigation';

const BlogCard = ({ post }: { post: BlogPost }) => {

  const router = useRouter();

  const navigateToWritePost =(pid:string | number)=> {
     router.push(`/writepost/?pid=${pid}`)
  }

  return (
    <Box
      className="max-w-md mx-auto min-w-[350px] bg-white shadow-lg rounded-lg overflow-hidden p-6 border border-gray-200"
    >
      <Box className="grid grid-cols-2 w-full gap-[20px] items-center">
        <div className='flex w-full justify-between gap-x-4'>
        <Badge colorScheme="purple">Author: {post.name}</Badge>
        <Text fontSize="xs" color="gray.500">
          {new Date(post.createdAt).toLocaleDateString()}
        </Text>
        </div>
      </Box>
      <Box className="grid grid-cols-2 gap-4 items-center mt-4">
        {post.published ? (
          <Text>Published</Text>
        ) : (
          <Button size="sm" className="text-sm bg-blue-500 text-white px-2 py-1 rounded" onClick={()=> navigateToWritePost(post.id)}>Edit</Button>
        )}
      </Box>
    </Box>
  );
};

export default BlogCard;
