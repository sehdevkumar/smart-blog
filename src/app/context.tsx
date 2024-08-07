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
import {  AppEventEnum, BlogPost } from "~/pages/api/api-typings";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ErrorDialog from "./components/ErrorDialog";
import LoaderProvider from "./LoaderProvider";


export type GlobalState = {
  error: any;
  loader: { state: boolean; text?: string } | null;
  webSocketData: any;
  publishStory:any;
  selectedPost: BlogPost | null
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

type PublishStoryEvent = {
   type: AppEventEnum.PUBLISH_STORY;
   payload: any
};

type SelectedBlogPost = {
   type: AppEventEnum.SELECT_POST;
   payload: any
};


export type AppEvent =  ErrorEvent | LoaderEvent | PublishStoryEvent | SelectedBlogPost;

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
     case AppEventEnum.PUBLISH_STORY:
      return { ...state, publishStory: action.payload};
       case AppEventEnum.SELECT_POST:
      return { ...state, selectedPost: action.payload};
    default:
      return state;
  }
};

const ApplicationProvider = React.memo(({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());
    

  const initialState: GlobalState = {
    error: null,
    loader: null,
    webSocketData: null,
    publishStory:null,
    selectedPost: null
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
