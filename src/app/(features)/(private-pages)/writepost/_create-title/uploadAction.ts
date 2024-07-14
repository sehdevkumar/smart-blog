/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */


"use server";

export interface FromIniialState {
   message: { fileName:string, event:string, desc:string, location: string, buffer: null | Uint8Array }
}

const UploadAction = async (_prevState: FromIniialState, formData: FormData)=> {

     const event = formData.get("event");
     const desc = formData.get("description");
     const location = formData.get("location");

     const file = formData.get("upload_file") as File;

      const fileName = file?.name;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);      

     return {
         messsage: { fileName, event, desc, location, buffer }
     }
}


export default UploadAction
