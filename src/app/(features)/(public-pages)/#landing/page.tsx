import React from 'react';
import { Box, Image, Text, Heading, VStack, Button } from '@chakra-ui/react';

function PublicLandingPage() {
  return (
    <div className="PublicLandingPage">
      <Box className="bg-gray-100 p-8">
        <HeroSection />
        <FeaturesSection />
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

function FeaturesSection() {
  const features = [
    { id: 1, title: 'Easy to Use', description: 'Our platform is user-friendly and easy to navigate.', imageUrl: 'https://via.placeholder.com/300x200' },
    { id: 2, title: 'Customizable', description: 'Personalize your blog with various themes and plugins.', imageUrl: 'https://via.placeholder.com/300x200' },
    { id: 3, title: 'SEO Optimized', description: 'Built-in SEO features to help your blog rank higher.', imageUrl: 'https://via.placeholder.com/300x200' },
  ];

  return (
    <Box className="py-24 bg-gray-200">
      <Heading as="h2" size="xl" className="text-center mb-8">Features</Heading>
      <VStack spacing={12}>
        {features.map(feature => (
          <Box key={feature.id} className="flex flex-col md:flex-row items-center bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
            <Image src={feature.imageUrl} alt={feature.title} className="w-full md:w-1/2 rounded-lg" />
            <Box className="mt-4 md:mt-0 md:ml-8 text-center md:text-left">
              <Heading as="h3" size="lg">{feature.title}</Heading>
              <Text className="mt-2">{feature.description}</Text>
            </Box>
          </Box>
        ))}
      </VStack>
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
