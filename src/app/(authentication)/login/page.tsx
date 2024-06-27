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
import { isPropEmpty } from "~/app/utils/utilfunctions";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid,setFormValid] = useState<boolean>();




  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic
  };


  useEffect(()=> {
     if(isPropEmpty(password) || isPropEmpty(email)) {
       setFormValid(false)
     }else {
         setFormValid(true)
       

     }
  } ,[email,password])

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
            Sign In
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
             
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
              <Button
                type="submit"
                size="lg"
                fontSize="md"
                className={`${isFormValid ? "" : "no-ptr"} w-full bg-[var(--app-btn-bg)!important] text-[var(--app-btn-text)!important]`}
              >
                Sign In
              </Button>
            </Stack>
          </form>
          <Text textAlign="center">
            Do not have an account? <Link href="/signup">SignUp</Link>
          </Text>
        </Stack>
      </Box>
    </div>
  );
}
