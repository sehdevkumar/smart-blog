"use client"
import { useRouter } from "next/router";
import { useEffect } from "react";


const useRouterHandleHook = ()=> {
     
  const router = useRouter();

  useEffect(() => {
    router.events.on('beforeHistoryChange', (url) => {
      console.log(`appending ${url} to history`);
    });
  }, [router.events]);
}


export default useRouterHandleHook;