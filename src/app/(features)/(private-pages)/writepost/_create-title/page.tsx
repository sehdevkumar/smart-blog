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
const initialState: FromIniialState = {
   message: {fileName: '',event: '',desc: '',location: '', buffer : null }
};

const CreatePostTitle = ({storyId}: {storyId:string | number}) => {
  const fileRef = useRef<any>();
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [fromState, action] = useFormState(UploadAction as any, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onFileHandlerChanged = () => {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const file: File | null = fileRef?.current?.files?.[0] ?? null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLoading(false);
        setImageSrc(reader?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    console.log(fromState,"check response",storyId);
    
    formRef.current?.reset();
    setLoading(false);
    setImageSrc("");
  }, [fromState]);

  return (
    <>
      {isLoading && <Loading />}
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
                  style={{background: "var(--app-btn-bg)"}}
                  onClick={() => setLoading(true)}
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
