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
import { useEffect, useState } from "react";
import { Link } from "~/app/components/ChakraUI";
import { isPropEmpty, strCmp } from "~/app/utils/utilfunctions";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isFormValid,setFormValid] = useState<boolean>();




  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic
  };


  useEffect(()=> {
     if(isPropEmpty(password) || isPropEmpty(email) || isPropEmpty(name) || isPropEmpty(confirmPassword)) {
       setFormValid(false)
     }else {
       
        if(strCmp(confirmPassword,password)) {
          setFormValid(true)
           
        }else {
           setFormValid(false)
        }

     }
  } ,[email,password,confirmPassword,name])

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
              <FormControl id="name" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Username"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  focusBorderColor="blue.500"
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  placeholder="example@gmail.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  focusBorderColor="blue.500"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="*****"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  focusBorderColor="blue.500"
                />
              </FormControl>
              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  placeholder="*****"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  focusBorderColor="blue.500"
                />
              </FormControl>
              <Button
                type="submit"
                size="lg"
                fontSize="md"
                className={`${isFormValid ? "" : "no-ptr"} w-full bg-[var(--app-btn-bg)!important] text-[var(--app-btn-text)!important]`}
              >
                Sign Up
              </Button>
            </Stack>
          </form>
          <Text textAlign="center">
            Already have an account? <Link href="/login">LogIn</Link>
          </Text>
        </Stack>
      </Box>
    </div>
  );
}
