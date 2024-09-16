/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
  Image
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "~/app/components/ChakraUI";
import useHttpClientHandler from "~/app/hooks/useHttpLoader";
import { isUserLoggedIn } from "~/app/utils/user-session";
import { isPropEmpty, strCmp } from "~/app/utils/utilfunctions";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isFormValid,setFormValid] = useState<boolean>();
  const router = useRouter()
  
  const  {setLoader,setError,setToast} = useHttpClientHandler()
  
  const registerUserFn = async (): Promise<AxiosResponse<any,any>>=> {
    const payload = {
      name, email, password
    }
    return await axios.post('/api/auth/register',payload);

  }

  
  const startSignUpMutation = useMutation({
    mutationFn: () => registerUserFn(),
    onSuccess: (startResponse) => {
      if ([200, 201].includes(startResponse.status)) {
        setToast('User registered Successfully...')
        setLoader(true,'redirecting....')
        const ref =  setTimeout(()=> {
          clearTimeout(ref);
          setLoader(false);
           router.push('/login')
         },3000)
      }
    },
    onError: (err) => {
      setLoader(false);
      setError(err);
      console.log("error", err);
    },
  });



  useLayoutEffect(() => {
    // is User already lodded in redicet to home
      if(isUserLoggedIn()) {
         router.push('/home')
      }
  }, [])


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     setLoader(true);
    startSignUpMutation.mutate()
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--app-bg)]">
      <Image onClick={() => router.push('/public-landing')} className="cursor-pointer w-[clamp(150px,1vw,200px)] mb-[30px] invert" src="/images/smartblog.png" alt="" />
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
