// Card.js
import React from 'react';
import { Box, Text, Badge } from '@chakra-ui/react';
import { type BlogPost } from '~/pages/api/api-typings';

const BlogCard = ({ post }: {post: BlogPost}) => {
  return (
    <Box
      className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
      p={6}
      border="1px solid"
      borderColor="gray.200"
    >
      <Box className="flex justify-between items-center">
        <Badge colorScheme="purple">Author: {post.name}</Badge>
        <Text fontSize="xs" color="gray.500">
          {new Date(post.createdAt).toLocaleDateString()}
        </Text>
      </Box>
    </Box>
  );
};

export default BlogCard;
