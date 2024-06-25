/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { type AppEventEnum } from "~/pages/api/api-typings";


const initWebsocketConnections = (events: AppEventEnum[],cb:(arg: any)=>void)=> {
  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socketRef = useRef<any>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function socketClient() {
    const socket = io({
      transports: ["websocket"],
    });

    socket.on("connect", () => {
     
    //   Please iterate each event
      events?.forEach(event=> {
          socket?.on(event as unknown as string, async (data) => {
            // monkey patch the event
            if(typeof data === 'object') {
              // eslint-disable-next-line @typescript-eslint/dot-notation
              data['event'] =  (event ?? '' as string);
              cb(data);         
            }
          });
         
      })

      console.log("Connected");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    socket.on("connect_error", async (err) => {
      console.log(`connect_error due to ${err.message}`);
      await fetch('/api/socket');
    });

  
    socketRef.current = socket;
   
  }

  useEffect(() => {
    
    socketClient();
    return ()=> {
      socketRef?.current?.disconnect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


}

export default initWebsocketConnections;