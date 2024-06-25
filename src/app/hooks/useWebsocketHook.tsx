/* eslint-disable @typescript-eslint/no-unsafe-return */
import { type AppEventEnum } from "~/pages/api/api-typings";
import { useEffect } from "react";
import { useJustandStore } from "../justand";

const useWebSocketConnectionHook = (event: AppEventEnum, cb: (arg: unknown) => void) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const  websocketData = useJustandStore((state)=>state.websocketData)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (websocketData  && websocketData?.event === event) {
      console.log("i never got the event")
      cb(websocketData);
    }
  }, [websocketData]); // Include event and cb in the dependency array

}

export default useWebSocketConnectionHook
