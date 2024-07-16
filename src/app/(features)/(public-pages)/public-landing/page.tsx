import React from 'react';
import { Box, Text, Heading, Button } from '@chakra-ui/react';

function PublicLandingPage() {
  return (
    <div className="PublicLandingPage">
      <Box className="bg-gray-100 p-8">
        <HeroSection />
        <CallToActionSection />
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



function CallToActionSection() {
  return (
    <Box className="text-center py-24 bg-blue-500 text-white">
      <Heading as="h2" size="xl" className="mb-4">Join Our Community</Heading>
      <Text className="mb-8">Sign up today and start creating amazing blog posts.</Text>
      <Button colorScheme="teal" size="lg">Sign Up</Button>
    </Box>
  );
}

export default PublicLandingPage;
