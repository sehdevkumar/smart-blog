/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
"use client";
import UploadAction, { type FromIniialState } from "./uploadAction";
import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Loading from "../loading";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { type BlogThumbnail } from "~/pages/api/api-typings";
import useHttpClientHandler from "~/app/hooks/useHttpLoader";
import { useMutation } from "@tanstack/react-query";
import HttpClient from "~/app/utils/axios-instance-interceptor";
import { isPropEmpty } from "~/app/utils/utilfunctions";
import { useRouter } from "next/navigation";
import { AppPathEnums } from "~/app/typings/app-typings";
const initialState: FromIniialState = {
  fileName: '',event: '',desc: '',location: '', buffer : null 
};

const CreatePostTitle = ({storyId}: {storyId:string | number}) => {
  const fileRef = useRef<any>();
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [fromState, action] = useFormState(UploadAction as any, initialState);
   const { setLoader, setError, setToast } = useHttpClientHandler();
  const formRef = useRef<HTMLFormElement>(null);
  const [isFormValid,setFormValid] = useState<boolean>(true);
  const router = useRouter()
  const onFileHandlerChanged = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const file: File | null = fileRef?.current?.files?.[0] ?? null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader?.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const postThumbnail= async (paload: BlogThumbnail)=> {
       return await HttpClient.put(`/stories/post-thumbnail`,paload);
  }


    const starBlogThumbnailMutation = useMutation({
    mutationFn: (paload: BlogThumbnail) => postThumbnail(paload),
    onSuccess: (startResponse) => {
      if ([200, 201].includes(startResponse?.status)) {
      setLoader(false);
      router.push(AppPathEnums.HOME)
      }
    },
    onError: (err) => {
      setLoader(false);
      setError(err);
      formRef.current?.preventDefault()
      console.log("error", err);
    },
  });
  useEffect(() => {
    const payload: BlogThumbnail =  {
      fileName: fromState?.fileName ,
      event: fromState.event,
      desc: fromState.desc,
      location: fromState?.location,
      buffer: imageSrc as string,
      blogId: storyId + ''
     }
    
    if(fromState.event) {
       if(payload.event && payload.desc) { 
         setLoader(true);
         starBlogThumbnailMutation.mutate(payload);
       }  
    }
  }, [fromState]);

  return (
    <>
      <div className="grid h-full  justify-center overflow-auto">
        <div className="flex flex-1 mobile:justify-center mobile:items-center gap-4 w-full mobile:flex-col desktop:flex-row tablet:flex-row large-screen:flex-row desktop:justify-start desktop:items-start ">
          <form className="flex-[4]" action={action} ref={formRef}>
           <p className="text-[24px]">Story Preview</p>
            <div className="flex h-max tablet:min-w-[800px] desktop:min-w-[900px] mobile:min-w-[200px] mobile:flex-col desktop:flex-row tablet:flex-row justify-center gap-y-[10px] rounded-md p-[20px] shadow-md shadow-slate-200 overflow-hidden gap-[15px]">
              <div className="w-full">
                <FormControl isRequired>
                  <FormLabel>Thumbnail</FormLabel>
                  <Input
                    outline={"none"}
                    border={"none"}
                    type="file"
                    name="upload_file"
                    placeholder="Event title"
                    onChange={onFileHandlerChanged}
                    ref={fileRef}
                  />
                </FormControl>

                {imageSrc && (
                  <div className="grid items-center justify-center overflow-hidden rounded-sm p-[10px] shadow-sm shadow-slate-500">
                    <Image
                      maxWidth={"100%"}
                      maxHeight={"200px"}
                      objectFit={"cover"}
                      src={`${imageSrc}`}
                      alt={"Selected Imaged"}
                    />
                  </div>
                )}
              </div>

              <div className="w-full flex flex-col gap-[10px]">
              Publishing to: Sehdev
              <div>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input placeholder="Title" name="event" />
                </FormControl>
              </div>
              <div>
                <FormControl isRequired>
                  <FormLabel>Location</FormLabel>
                  <Input placeholder="Location" name="location" />
                </FormControl>
              </div>
           
              <div>
                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea name="description" placeholder="Description" />
                </FormControl>
              </div>

              <div>
                <Button
                  className={`${isFormValid ? '' : 'no-ptr'}`}
                  style={{background: "var(--app-btn-bg)"}}

                  type="submit"
                  color={'var(--app-btn-text)'}
                  >
                  Publish
                </Button>
              </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePostTitle;
