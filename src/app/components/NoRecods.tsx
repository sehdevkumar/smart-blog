import React from "react";

const NoRecordsFound = ({children}: {
    children?:React.ReactNode
})=> {
  

  return (
    
    <div className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] font-semibold">
         {children}
    </div>

  )

}


export default NoRecordsFound;