"use client";
import React, { useEffect, useRef } from 'react'
import RichTextEditor from '../../../components/TextEditor'
import { useApplicationContext } from '~/app/context';
import useHttpClientHandler from '~/app/hooks/useHttpLoader';
import { useMutation } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import HttpClient from '~/app/utils/axios-instance-interceptor';
import { AppEventEnum } from '~/pages/api/api-typings';

function WritePostPage() {
   
  const richTextContentRef = useRef<any>(undefined);
  const { state, dispatch } = useApplicationContext();
  const {setLoader,setError,setToast} = useHttpClientHandler(); 


  const createPostHandler = async (): Promise<AxiosResponse<any,any>>=> {
    
       const payload = {
          story: richTextContentRef.current.getValue()
       }
       return await HttpClient.post('/stories/post-story',payload);

  }
  
  const startPostStoryMutation = useMutation({
    mutationFn: () => createPostHandler(),
    onSuccess: (startResponse) => {
      if ([200, 201].includes(startResponse?.status)) {
        setToast('Story Published Successfully...')
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
        
    if (state.publishStory && richTextContentRef.current.getValue()) {
      setLoader(true);
      startPostStoryMutation.mutate();
      dispatch({ type: AppEventEnum.PUBLISH_STORY, payload: null });
       richTextContentRef.current.setValue(null);
    }

  },[state.publishStory])
  
  
  

  return (
    <div className='grid relative h-[calc(100%-0px)]  desktop:w-[calc(100%-500px)] mobile:w-full m-auto p-20'>
      <RichTextEditor ref={richTextContentRef}/>
    </div>
  )
}

export default WritePostPage