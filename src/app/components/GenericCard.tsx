"use client"
import React from "react"

const GenericCard = ({children,title}: {
    children: React.ReactNode,
    title:string
})=> {

    

    return (        
        <div className="flex flex-col rounded-[8px] overflow-hidden" style={{boxShadow:'0px 6px 6px 2px #CAC9C9'
}}>
            <div className="text-[var(--app-text-clr)] w-full inter text-[20px] h-[54px] bg-[var(--app-card-header)] pl-[20px] pt-[15px]">
                {title}
            </div>
           <div className="w-full">
              {children}
           </div>
        </div>
    )


}


export default React.memo(GenericCard)