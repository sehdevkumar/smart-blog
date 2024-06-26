// pages/signup.tsx
"use client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "~/app/components/ChakraUI";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Box
        className="max-w-md w-full bg-white p-8 rounded-lg shadow-md"
        boxShadow="lg"
        p={8}
      >
        <Stack spacing={4}>
          <Heading
            fontSize={{ base: "2xl", md: "3xl" }}
            textAlign="center"
            color={useColorModeValue("gray.800", "white")}
          >
            Sign Up
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  focusBorderColor="blue.500"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  focusBorderColor="blue.500"
                />
              </FormControl>
              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  focusBorderColor="blue.500"
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                fontSize="md"
                className="w-full"
              >
                Sign Up
              </Button>
            </Stack>
          </form>
          <Text textAlign="center">
            Already have an account?{" "}
            <Link href="/login">
               LogIn
            </Link>
          </Text>
        </Stack>
      </Box>
    </div>
  );
}
