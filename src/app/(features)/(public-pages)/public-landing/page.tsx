"use client";

import React, { useEffect, useState } from 'react';
import { Box, Text, Heading, Button, Badge, Image, SimpleGrid } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import HttpClient from '~/app/utils/axios-instance-interceptor';
import { BlogThumbnail } from '@prisma/client';

 function PublicLandingPage() {
   
  const [getBlogThumbnails, setBlogThumnails] = useState<BlogThumbnail[]>([])

 
  const getThumbnailHandler = async (): Promise<AxiosResponse<any, any>> => {
    return await HttpClient.get("/stories/thumbnail");
  };

  const startPostStoryMutation = useMutation({
    mutationFn: () => getThumbnailHandler(),
    onSuccess: (startResponse) => {
      if ([200, 201].includes(startResponse?.status)) {
        const blogdata = startResponse.data as BlogThumbnail[];
        setBlogThumnails(blogdata);
        
      }
    },
    onError: (err) => {
      console.log("error", err);
    },
  });

  useEffect(()=> {
    startPostStoryMutation.mutate()
  },[])

  return (
    <div className="PublicLandingPage">
      <Box className="bg-gray-100 p-8">
        <HeroSection />

        {/* Render Thumbnails */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={8}>
          {getBlogThumbnails.map((thumbnail) => (
            <BlogCard key={thumbnail.blogId} {...thumbnail} />
          ))}
        </SimpleGrid>

      </Box>
    </div>
  );
}

function HeroSection() {
  return (
    <Box className="text-center py-24 bg-blue-500 text-white">
      <Heading as="h1" size="2xl" className="mb-4">Create Amazing Blog Posts</Heading>
      <Text className="mb-8">Discover, create, and share your stories with the world.</Text>
      <Button colorScheme="teal" size="lg">Get Started</Button>
    </Box>
  );
}


const BlogCard = ({ buffer, desc, event, blogId, fileName, location }) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      className="shadow-lg"
    >
      <Image src={buffer} alt={fileName} className="w-full h-48 object-cover" />

      <Box p="6">
        <Box className="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {event}
          </Badge>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          className="text-lg"
        >
          {desc}
        </Box>

        <Text mt="2" color="gray.500">
          Location: {location}
        </Text>
      </Box>
    </Box>
  );
};







export default PublicLandingPage;
