"use client";

import { useMutation } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import useHttpClientHandler from "~/app/hooks/useHttpLoader";
import HttpClient from "~/app/utils/axios-instance-interceptor";
import { type BlogPost } from "~/pages/api/api-typings";
import BlogCard from "./BlogCard";


const HomePage =  ()=> {
   
  const {setLoader,setError,setToast} = useHttpClientHandler(); 
  const [getBlogPosts,setBlogPosts] = useState<BlogPost[]>([])


  const createPostHandler = async (): Promise<AxiosResponse<any,any>>=> {
      
       return await HttpClient.get('/stories/post-story');

  }
  
  const startPostStoryMutation = useMutation({
    mutationFn: () => createPostHandler(),
    onSuccess: (startResponse) => {
      if ([200, 201].includes(startResponse?.status)) {
      setBlogPosts(startResponse.data as BlogPost[]);
      setLoader(false);
      }


    },
    onError: (err) => {
      setLoader(false);
      setError(err);
      console.log("error", err);
    },
  });


  useEffect(()=> {   
    setLoader(true)
    startPostStoryMutation.mutate()

  },[])
    
    

    return (
         <>
             
       <div className="container h-max mx-auto  p-4 grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-[20px] justify-start items-start">
        {getBlogPosts?.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>



         </>
    )

}


export default HomePage