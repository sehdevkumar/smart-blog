"use client";
import { useApplicationContext } from "./context"
import HttpLoader from "./components/Loader";
import React from "react";
import initWebsocketConnections from "./websocket/websocket-connection";
import { useJustandStore } from "./justand";




const LoaderProvider = () => {
     const {onEvent} = useJustandStore();

    const  {state} = useApplicationContext();

    // Please register all websocket  events
    initWebsocketConnections([],(d)=> onEvent(d));


   
    return (

        <>
            {
                state?.loader?.state &&
                <div className="bg-[var(--http-loader-bg)] top-0 left-0 cursor-progress fixed w-screen h-screen z-[9999999999999]">

                </div>
            }
            {
                state?.loader?.state &&
                <HttpLoader text={state?.loader.text ?? 'fetching...'} />
            } 
        </>
    )
}


export default React.memo(LoaderProvider);