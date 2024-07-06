/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */


"use server";
import sharp from "sharp";

export interface FromIniialState {
    message:string;
}

const UploadAction = async (prevState: FromIniialState, formData: FormData)=> {

     const apiUrl = `https://eventworld.onrender.com/api/event`;
     const event = formData.get("event");
     const desc = formData.get("description");
     const location = formData.get("location");

     const file = formData.get("upload_file") as File;

      const fileName = file?.name;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const compressedImageBuffer = await sharp(buffer)
        .resize({ width: 800 }) // Resize the image if needed
        .toBuffer();

     return {
        message: "Done",
        imagePath: ''
     }


    await fetch(apiUrl,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body : JSON.stringify({
            
        })
    })
 
    return {
        message: "Form Successfully"
    }

}


export default UploadAction
