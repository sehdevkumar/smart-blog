'use client'

import {useEffect, useState } from 'react'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { type Connection, type OpenViduServerConnectionConfig } from './typings/openvidu-typings'
import {getAllTokensForSession, getSessionConnectionConfiguration} from './requestHandlers/open-vidu-request-handler'
import VideoRenderer from './video-renderer/VideoRenderer'

interface ViewInput {
   jobId:string | null
}

const VideoStreamingPage:React.FC<ViewInput> = (props: ViewInput) => {
  const [
    getAccessToken,
    setToken,
  ] = useState<Connection>()


  const getInitSessionMutation = useMutation({
    mutationFn: () => getSessionConnectionConfiguration(props?.jobId ?? ''),
    onSuccess: (saveResponse) => {
      const status = saveResponse.status;
      const config =  saveResponse.data;
      if([200,201].includes( status)) {
        if(!getAccessToken) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          getInitTokenMutation.mutate(config)
        }
      }

    },
    onError: (err) => {
      console.log("someting went wrong",err)
    },
  })

  const getInitTokenMutation = useMutation({
    mutationFn: (config: OpenViduServerConnectionConfig) => getAllTokensForSession(config),
    onSuccess: (saveResponse) => {
        const config = saveResponse.data
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setToken(config)
        console.log(config,"");
    },
    onError: (err) => {
       console.log("someting went wrong",err)
    },
  })

  useEffect(() => {
    if(props?.jobId) {
      getInitSessionMutation.mutate()
    }
  }, [props?.jobId])

  return (

    <div className='grid overflow-hidden relative grid-flow-col w-full h-full'>
      <VideoRenderer token={getAccessToken?.token}/>
    </div>
  )
}

export default VideoStreamingPage
