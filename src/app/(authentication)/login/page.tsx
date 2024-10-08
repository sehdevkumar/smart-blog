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
import { useEffect, useState } from "react";
import { Link } from "~/app/components/ChakraUI";
import useHttpClientHandler from "~/app/hooks/useHttpLoader";
import { removeUserSession, setUserSession, type UserSessionResponse } from "~/app/utils/user-session";
import { isPropEmpty } from "~/app/utils/utilfunctions";

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid,setFormValid] = useState<boolean>();
  
  
  const  {setLoader,setError,setToast} = useHttpClientHandler()
  
  const registerUserFn = async (): Promise<AxiosResponse<any,any>>=> {
    const payload = {
      email, password
    }
    return await axios.post('/api/auth/login',payload);

  }

  
  const startSignInMutation = useMutation({
    mutationFn: () => registerUserFn(),
    onSuccess: (startResponse) => {
      if ([200, 201].includes(startResponse.status)) {
        setToast('User Logged In Successfully...')
        setLoader(true,'redirecting....')
        setUserSession(startResponse.data as UserSessionResponse);
        setLoader(false);
        router.refresh()
        window.location.href = '/home'
      }
    },
    onError: (err) => {
      setLoader(false);
      setError(err);
      console.log("error", err);
    },
  });



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startSignInMutation.mutate()
  };


  useEffect(()=> {
     if(isPropEmpty(password) || isPropEmpty(email)) {
       setFormValid(false)
     }else {
         setFormValid(true)
       

     }
  } ,[email,password])


  useEffect(()=> {
    removeUserSession();
  },[])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--app-bg)]">
      <Image onClick={()=> router.push('/public-landing')} className="cursor-pointer w-[clamp(150px,1vw,200px)] mb-[30px] invert" src="/images/smartblog.png" alt=""/>
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
