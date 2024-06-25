/* eslint-disable react/display-name */
"use client";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, {
  type Dispatch,
  createContext,
  useContext,
  useReducer,
  useMemo,
} from "react";
import {  AppEventEnum } from "~/pages/api/api-typings";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorDialog from "./components/ErrorDialog";
import LoaderProvider from "./LoaderProvider";


export type GlobalState = {
  error: any;
  loader: { state: boolean; text?: string } | null;
  webSocketData: any;
};

export type ApplicationType = {
  state: GlobalState;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  dispatch: Dispatch<{type: AppEventEnum, payload: GlobalState | any}>;
};



type ErrorEvent = {
  type: AppEventEnum.ERROR;
  payload: any;
};

type LoaderEvent = {
   type: AppEventEnum.LOADER;
   payload: { state: boolean; text?: string }
};

export type AppEvent =  ErrorEvent | LoaderEvent;

const applicationContext = createContext<ApplicationType | undefined>(undefined);

const useApplicationContext = () => {
  const context = useContext(applicationContext);
  if (context === undefined) {
    throw new Error("Application Context is undefined");
  }

  return context;
};

const reducer = (state: GlobalState, action: AppEvent): GlobalState => {
  switch (action.type as any) {
    case AppEventEnum.ERROR:
      return { ...state, error: action.payload };
    case AppEventEnum.WEBSOCKET_EVENT:
      return { ...state, webSocketData: action.payload };
    case AppEventEnum.LOADER:
      return { ...state, loader: { state: action.payload.state, text: action.payload.text } };
    default:
      return state;
  }
};

const ApplicationProvider = React.memo(({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());
    

  const initialState: GlobalState = {
    error: null,
    loader: null,
    webSocketData: null
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <applicationContext.Provider value={contextValue}>
        {children}
        <LoaderProvider/>
        <ErrorDialog/>
      </applicationContext.Provider>
    </QueryClientProvider>
  );
});

export { ApplicationProvider, useApplicationContext };
