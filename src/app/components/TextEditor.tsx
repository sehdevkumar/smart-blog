/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'
import { AddIcon, SmallCloseIcon } from '@chakra-ui/icons'
import React, {
  HTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'


export const ReactQuill = dynamic(()=> import('react-quill'), {ssr:false})

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
]

interface RichTextEditorRef   extends  React.HTMLAttributes<HTMLElement> {
  getValue?: () => string
  setValue?: (value: string) => void,
  onChange?: (arg)=> void,
  clear?: () => void,
  children?: React.ReactNode

}

export default forwardRef(function RichTextEditor(
  props : RichTextEditorRef,
  ref,
) {
  const [value, setValue] = useState('')
  const editorRef = useRef<any>(null)
  const toolBarRef = useRef<any>(null)
  const toolbarIconRef = useRef<any>(null)
  const storeCoordsRef = useRef<number[]>([])
  const [getIconToggled, setIconToggled] = useState<boolean>(false)

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    setValue: (newValue) => setValue(newValue),
    clear: () => setValue(''),
  }))

  const toolBarIconHandle = () => {
      const toolbar = document.querySelector('.ql-toolbar')!
        toolBarRef.current = toolbar
    if (!getIconToggled) {
      const toolbar = toolBarRef.current as HTMLDivElement
      if (toolbar) {
        toolbar.style.display = 'block'
        toolbar.style.zIndex = '9999999999999'
        toolbar.style.position = 'fixed'
        // toolbar.style.left = `${(storeCoordsRef?.current[0])}px`
        toolbar.style.top = `${storeCoordsRef?.current[1]}px`
      }
      setIconToggled(true)
    } else {
      const toolbar = toolBarRef.current as HTMLDivElement
      if (toolbar) {
        toolbar.style.zIndex = '9999999999999'
        toolbar.style.position = 'fixed'
        // toolbar.style.left = `${(storeCoordsRef?.current[0])}px`
        toolbar.style.top = `${storeCoordsRef?.current[1]}px`
        toolbar.style.display = 'none'
      }
      setIconToggled(false)
    }
  }

  useEffect(() => {
    if (typeof window !=='undefined') {
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      const editorElement = editorRef?.current?.getEditor()?.root
      if(!toolBarRef.current) {
        const toolbar = document.querySelector('.ql-toolbar')!
        toolBarRef.current = toolbar

      }
        editorElement?.addEventListener('pointerdown', (e: PointerEvent) => {
  
          const toolbar = toolBarRef?.current as HTMLDivElement
          
          const toolbarIcon = toolbarIconRef?.current as HTMLDivElement
          const x = e?.clientX
          const y = e?.clientY + e?.height
  
          storeCoordsRef.current = [x, y - 80]
          toolbar.style.top = `${storeCoordsRef?.current[1]}px`
          if (toolbarIcon) {
            toolbarIcon.style.position = 'fixed'
            toolbarIcon.style.left = `270px`
            toolbarIcon.style.top = `${y - 80}px`
          }
        })
    }

    return () => {
      if (editorRef?.current) {
        const editorElement = editorRef?.current?.getEditor()?.root
        editorElement?.removeEventListener('pointerdown', (e: PointerEvent) => {
          // Cleanup logic
        })
      }
    }
  }, [editorRef.current])


  useEffect(()=> {
       
    if(value=='<p><br></p>' || value==='') {
       return
    }else {
      (props as any).onChange(value)
    }
  }, [value])

  return (
    <div className='relative'>
      <div
        onClick={toolBarIconHandle}
        ref={toolbarIconRef}
        className="z-[999] cursor-pointer border-white border-[1px] w-[40px] h-[40px] rounded-full flex justify-center items-center"
      >
        {getIconToggled && <SmallCloseIcon color={'white'} />}
        {!getIconToggled && <AddIcon color={'white'} />}
      </div>
     { typeof window !== 'undefined'  && <div >
        <ReactQuill
          ref={editorRef}
          modules={{ toolbar: toolbarOptions}}
          placeholder="Tell Your Story..."
          theme="snow"
          value={value}
          className='text-editor text-[var(--app-text)]'
          onChange={setValue}
        />
        
      </div> 
     }
    </div>
  )
})
