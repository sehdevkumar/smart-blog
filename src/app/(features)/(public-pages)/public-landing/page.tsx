"use client";

import React, { useEffect, useState } from 'react';
import { Box, Text, Heading, Button, Badge, Image, SimpleGrid, Link } from '@chakra-ui/react';
import { type AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import HttpClient from '~/app/utils/axios-instance-interceptor';
import { type CombineBlogResponse } from '~/pages/api/api-typings';
import { useRouter } from 'next/navigation';

 function PublicLandingPage() {
   
  const [getBlogThumbnails, setBlogThumnails] = useState<CombineBlogResponse[]>([])

 
  const getThumbnailHandler = async (): Promise<AxiosResponse<any, any>> => {
    return await HttpClient.get("/stories/thumbnail");
  };

  const startPostStoryMutation = useMutation({
    mutationFn: () => getThumbnailHandler(),
    onSuccess: (startResponse) => {
      if ([200, 201].includes(startResponse?.status)) {
        const blogdata = startResponse.data as CombineBlogResponse[];
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
            <BlogCard key={thumbnail.blogId} response={thumbnail} />
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


const BlogCard = ({ response }: {response: CombineBlogResponse}) => {

  const router  = useRouter()
    
  const onReadFullStory = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,uuid:string)=> {
   e.preventDefault();
   router.push(`/read-story/${uuid}`)
  }


  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      className="shadow-lg"
    >
      <Image src={response.buffer} alt={response.fileName} className="w-full h-48 object-cover" />

      <Box p="6">
        <Box className="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {response?.event}
          </Badge>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          className="text-lg"
        >
          {response?.desc}
        </Box>

        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Text mt="2" color="gray.500">
          Location: {response?.location}
        </Text>
        <Link onClick={(e)=> onReadFullStory(e,response?.blog?.uuid ?? '')} colorScheme='blue' color={'#1f71ed'}>Read more</Link>
        </Box>


      </Box>
    </Box>
  );
};







export default PublicLandingPage;
