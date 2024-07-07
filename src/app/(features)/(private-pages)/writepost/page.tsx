"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import RichTextEditor from "../../../components/TextEditor";
import { useApplicationContext } from "~/app/context";
import useHttpClientHandler from "~/app/hooks/useHttpLoader";
import { useMutation } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import HttpClient from "~/app/utils/axios-instance-interceptor";
import { AppEventEnum, BlogPost } from "~/pages/api/api-typings";
import AlertDialogBox from "~/app/components/Alerts";
import CreatePostTitle from "./_create-title/page";
import { useSearchParams } from "next/navigation";
import { debounce } from "lodash";

function WritePostPage() {
  const richTextContentRef = useRef<any>(undefined);
  const askCreatePostTitleRef = useRef<any>(undefined);
  const { state, dispatch } = useApplicationContext();
  const { setLoader, setError, setToast } = useHttpClientHandler();
  const [getPostId,setPostId] = useState<any>();
  
   const waitQuery = debounce(()=> {
    startPostStoryMutation?.mutate();
  },500)
  
   /**
  //  1. if User natvigated from Draft or Edit story.
  //  2. Or an Random Id Which is generated from the Client Side and Save as Draft
    */  
  const query = useSearchParams();
  
  useEffect(()=> {
     const id = query?.get('pid');
     if(id) {
       setPostId(id)
         console.log("i am not working",id)
        console.log(getPostId,id);
      setLoader(true);

         startgetStoryMutation?.mutate(id)
     }
  },[query])



    const getPostHandler = async (id): Promise<AxiosResponse<any,any>>=> {
      
      
       return await HttpClient.get(`/stories/post-story/?pid=${id}`);

  }
  
  const startgetStoryMutation = useMutation({
    mutationFn: (id:any) => getPostHandler(id),
    onSuccess: (startResponse) => {
      if ([200, 201].includes(startResponse?.status)) {
        console.log("me what",startResponse)
      richTextContentRef?.current?.setValue((startResponse?.data[0] as BlogPost)?.content)
      setLoader(false);
      }
    },
    onError: (err) => {
      setLoader(false);
      setError(err);
      console.log("error", err);
    },
  });




  /**
   * If user Edit the Existing post then allow to update using post id
   * @returns 
   */
  const createPostHandler = async (): Promise<AxiosResponse<any, any>> => {
    const payload = {
      story: richTextContentRef?.current?.getValue(),
      id: +getPostId
    };
    return await HttpClient.put("/stories/post-story", payload);
  };

  const startPostStoryMutation = useMutation({
    mutationFn: () => createPostHandler(),
    onSuccess: (startResponse) => {
      if ([200, 201].includes(startResponse?.status)) {
        const {id} = startResponse.data as BlogPost
        if(id){
          setPostId(id);
        }
      }
    },
    onError: (err) => {
      console.log("error", err);
    },
  });

  const launchPostInput = () => {
    askCreatePostTitleRef.current.onOpen();
  };

  useEffect(() => {
    if (state.publishStory && richTextContentRef.current.getValue()) {
      launchPostInput();
      dispatch({ type: AppEventEnum.PUBLISH_STORY, payload: null });
      richTextContentRef.current.setValue(null);
    }
  }, [state.publishStory]);
  


   const onChangeRichTextContent = useCallback((arg:any)=> {
    waitQuery()
   },[])


  return (
    <div className="grid relative h-[calc(100%-0px)]  desktop:w-[calc(100%-500px)] mobile:w-full m-auto p-20">
      <RichTextEditor ref={richTextContentRef}  onChange={onChangeRichTextContent}/>
      <AlertDialogBox ref={askCreatePostTitleRef}>
        <CreatePostTitle />
      </AlertDialogBox>
    </div>
  );
}

export default WritePostPage;
