import React from 'react'
import RichTextEditor from '../../../components/TextEditor'

function WritePostPage() {
  return (
    <div className='grid relative h-[calc(100%-0px)]  desktop:w-[calc(100%-500px)] mobile:w-full m-auto p-20'>
      <RichTextEditor/>
    </div>
  )
}

export default WritePostPage