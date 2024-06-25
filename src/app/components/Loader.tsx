import React from 'react'

function HttpLoader({text}: {text:string}) {
  return (
    <div className="fixed z-[999999999999] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex">
      <div className="rounded-md min-w-[120px] p-[40px] min-h-[120px] bg-[#1919198e] left-0 shadow-sm shadow-slate-400">
      <div className="spinner center">
      <span className='inter text-[15px] font-semibold absolute z-[9999999999] left-[20px] top-[50px] translate-y-[-50%] translate-x-[-50%] text-white'>{text ?? 'fetching...'}</span>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
      </div>
      </div>
    </div>
  )
}

export default HttpLoader
