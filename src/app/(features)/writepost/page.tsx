import React from 'react'
import RichTextEditor from '../../components/TextEditor'

function WritePostPage() {
  return (
    <div className='grid relative h-[calc(100%-0px)] w-[calc(100%-300px)] m-auto p-20'>
      <RichTextEditor/>
    </div>
  )
}

export default WritePostPage