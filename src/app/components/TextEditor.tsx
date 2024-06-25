/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import { AddIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                 // remove formatting button
];



interface RichTextEditorRef {
  getValue: () => string;
  setValue: (value: string) => void;
  clear: () => void;
}



export default forwardRef<RichTextEditorRef,{}>(function RichTextEditor(props,ref) {


 const [value, setValue] = useState('');
 const editorRef = useRef<any>(null);
 const toolBarRef = useRef<any>(null);
 const toolbarIconRef = useRef<any>(null);


   useImperativeHandle(ref, () => ({
    getValue: () => value,
    setValue: (newValue) => setValue(newValue),
    clear: () => setValue(''),
  }));
   

   useEffect(() => {
    if (editorRef.current) {
      const editorElement = editorRef.current.getEditor().root;
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      const toolbar = document.querySelector('.ql-toolbar')!;
      toolBarRef.current = toolbar
      editorElement.addEventListener('pointerdown', (e: PointerEvent) => {
        const x = e.clientX;
        const y = e.clientY;
        // if (toolbar) {
        //   toolbar.style.position = 'absolute';
        //   toolbar.style.left = `${x}px`;
        //   toolbar.style.top = `${y}px`;
        // }
      });
    }

    return () => {
      if (editorRef.current) {
        const editorElement = editorRef.current.getEditor().root;
        editorElement.removeEventListener('pointerdown', (e: PointerEvent) => {
          // Cleanup logic
        });
      }
    };
  }, [editorRef]);


  


  return (
    <>
       <div>
         <AddIcon/>
       </div>
       <ReactQuill ref={editorRef} modules={{toolbar: toolbarOptions}} placeholder='Tell Your Story...' theme="snow" value={value} onChange={setValue} />;
    
    </>
  ) 
  
}
)
