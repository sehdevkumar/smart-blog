"use client";

import { Link } from "@chakra-ui/next-js";
import { usePathname } from "next/navigation";
import { EditIcon } from "../components/Icons";
import { useEffect, useState } from "react";
import { AppPathEnums } from "../typings/app-typings";
import { Button } from "@chakra-ui/react";

const DynamicHeaderPage = ()=> {
  const route = usePathname();
  const [isWritePage,setWritePage] = useState<boolean>(false); 
  const [isDefaultPages,setDefaultPages] = useState<boolean>(false); 



  useEffect(()=> {    
    if(route === AppPathEnums.WRITE_POST) {
         setWritePage(true);
         setDefaultPages(false);
    }else {
         setWritePage(false);
         setDefaultPages(true);
    }
  },[route])


    return  (
       <div className="flex w-full justify-between">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/home">
                <div className="text-2xl inter font-bold text-gray-900">SmartBlog</div>
              </Link>
            </div>
            <nav className="flex items-center justify-center gap-x-1">
              {
                 isDefaultPages &&   <Link  href="/writepost" className='flex justify-center items-center'>
                 <EditIcon/>
                <div className="text-gray-900 hover:text-gray-700 px-2 py-2 rounded-md text-sm font-medium">Write</div>
              </Link>
              }

              {
                isWritePage && <>
                     
               <Button  style={{background: 'var(--app-btn-bg)',color: 'var(--app-btn-text)'}}>
                 <EditIcon/>
                <div className="text-[var(--app-btn-text)] hover:text-gray-700 px-2 py-2 rounded-md text-sm font-medium">Publish</div>
              </Button>
                     
                
                </>
              }
            
          
            </nav>
          </div>
    )

}


export default DynamicHeaderPage