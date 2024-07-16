/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */


"use server";

export interface FromIniialState {
   fileName: string, event: string, desc: string, location: string, buffer: null | ArrayBuffer 
}

const UploadAction = async (_prevState: FromIniialState, formData: FormData)=> {

     const event = formData.get("event");
     const desc = formData.get("description");
     const location = formData.get("location");

     const file = formData.get("upload_file") as File;

      const fileName = file?.name;

     return    { fileName, event, desc, location }
     
}


export default UploadAction
