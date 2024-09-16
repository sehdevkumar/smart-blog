import { Image, Box, Text, VStack } from "@chakra-ui/react";
const AboutPage = () => {
  return (
    <div className="grid mobile:grid-cols-1 desktop:grid-cols-1 tablet:grid-cols-1 w-full h-full justify-center items-center">
      {/* Image and About Text */}
      <div className="w-full flex flex-1 justify-center">
        <VStack spacing={6}>
          <Box>
            {/* Placeholder image - Replace with your actual image */}
            <Image
              src="https://avatars.githubusercontent.com/u/55868273?s=400&u=075adbb58b8fbe27597326cf4b501071f917d5ea&v=4"
              alt="Your Image"
              boxSize="200px"
              borderRadius="full"
              objectFit="cover"
            />
          </Box>
          <Box textAlign="center">
            <Text  className="text-[var(--app-text)]" fontSize="lg" fontWeight="bold">
              Hello! I am Sehdev Kumar
            </Text>
            <Text className="text-[var(--app-text)]">
              I am a passionate software developer with experience in building modern web applications, 
              especially using React, Angular, and TypeScript. My journey in the tech world started 
              with a love for creating user-friendly interfaces, and since then, I have worked on various 
              exciting projects. I enjoy learning new technologies and constantly improving my skills to 
              provide innovative solutions to real-world problems.
            </Text>
          </Box>
        </VStack>
      </div>
    </div>
  );
};

export default AboutPage;
