/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  type ExceptionEvent,
  OpenVidu,
  type StreamEvent,
} from 'openvidu-browser';
import { useEffect, useRef } from "react";
const VideoRenderer = ({token})=> {
   
    const openViduRef = useRef<unknown>(null);
    const videosContainer = useRef<HTMLDivElement>(null);
    


  const  getStartLiveStreamingVideos = (token: string): void=>  {
    
    const openVidu = openViduRef?.current as OpenVidu;
    const session = openVidu?.initSession();

    console.log(token,"this token")

    session
      .connect(token)
      .then(() => {
        console.info('Session Has Connected Successfully');
      })
      .catch((err: any) => {
        console.warn('Session Not Connected',err);
      });

    // On every asynchronous exception...
    session.on('exception', (exception: ExceptionEvent) => {
      console.warn(exception);
    //   this.subscribeTokensAndStartLiveStreaming();
    });
    session.on('streamCreated', (event: StreamEvent) => {
      const videoDiv = document.createElement('div');

      const stream = event?.stream;
      const data = stream?.connection?.data?.split(',');
      const getStreamName = data?.[0];
      const angle = data?.[1];

     

      videoDiv.classList.add('video-container');
      videoDiv.id = stream.streamId;
      videosContainer.current?.appendChild(videoDiv);
      const subscriber = session.subscribe(event.stream, videoDiv, {
        insertMode: 'APPEND',
      });

      // When the HTML video has been appended to DOM...
      subscriber?.on('videoElementCreated', (ev: any) => {
        // ...append camera name on top of video
        const videoControl = document.createElement('div');
        videoControl.classList.add('video-control');
        ev?.element?.parentNode?.appendChild(videoControl);

        const cameraName = document.createElement('div');

        cameraName.innerText = getStreamName ?? '';
        cameraName.classList.add('camera-name');
        const loader = document.createElement('div');
        loader.classList.add('loader-waiting');
        ev?.element?.parentNode?.insertBefore(loader, ev.element.nextSibling);
      });

      // When the HTML video starts playing...
      subscriber.on('streamPlaying', (ev: any) => {
        // ...remove loader
        const cameraVideoElement = subscriber?.videos[0]?.video;
        cameraVideoElement?.parentNode?.removeChild(
          cameraVideoElement?.nextSibling as HTMLUnknownElement,
        );
        // ... mute video if browser blocked autoplay
        autoplayMutedVideoIfBlocked(cameraVideoElement as any, angle);
      });

      // When the HTML video has been removed from DOM...
      subscriber.on('videoElementDestroyed', (ev: any) => {
        // ...remove the HTML elements related to the destroyed video
        const videoContainer = document.getElementById(stream.streamId);
        videoContainer?.parentNode?.removeChild(videoContainer);
      });
    });
  }
 const  autoplayMutedVideoIfBlocked = async (video: HTMLVideoElement, angle?: string)=>  {
    // Browser can block video playback if it is auto played without user interaction
    // One solution is to mute the video and let the user know
    video.controls = false;
    const promise =  video?.play();
    if (promise !== undefined) {
      promise
        .then(() => {
           console.log("can configure the video rotation")
        })
        .catch((error) => {
          // The video must play muted until user hits play button
          video.muted = true;
          video?.play();
        });
    }

  }

  const cleanAndRenderAgain = ()=> {
   
    const openVidu = new OpenVidu();
    openViduRef.current = openVidu
    getStartLiveStreamingVideos(token)

}

  

  // eslint-disable-next-line react-hooks/rules-of-hooks
   useEffect(() => {
    const timer = setTimeout(() => {
      if (videosContainer.current) {
        Array.from(videosContainer?.current?.childNodes)?.forEach((c) => {
          videosContainer.current?.removeChild(c);
        });

        cleanAndRenderAgain();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [token]);




  return (
     <div className='relative' ref={videosContainer}></div>
  )

}




export default VideoRenderer;