/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'
import { AddIcon, SmallCloseIcon } from '@chakra-ui/icons'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

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

interface RichTextEditorRef {
  getValue: () => string
  setValue: (value: string) => void
  clear: () => void
}

export default forwardRef<RichTextEditorRef, {}>(function RichTextEditor(
  props,
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
      }
      toolbar.style.display = 'none'
      setIconToggled(false)
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined" && document) {
      const editorElement = editorRef?.current?.getEditor()?.root
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      const toolbar = document.querySelector('.ql-toolbar')!
      toolBarRef.current = toolbar
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
      if (editorRef?.current && typeof window !== "undefined" && document) {
        const editorElement = editorRef?.current?.getEditor()?.root
        editorElement?.removeEventListener('pointerdown', (e: PointerEvent) => {
          // Cleanup logic
        })
      }
    }
  }, [editorRef])

  return (
    <div className='relative'>
      <div
        onClick={toolBarIconHandle}
        ref={toolbarIconRef}
        className="z-[9999999999] cursor-pointer border-slate-800 border-[1px] w-[40px] h-[40px] rounded-full flex justify-center items-center"
      >
        {getIconToggled && <SmallCloseIcon />}
        {!getIconToggled && <AddIcon />}
      </div>
      <div >
        <ReactQuill
          ref={editorRef}
          modules={{ toolbar: toolbarOptions}}
          placeholder="Tell Your Story..."
          theme="snow"
          value={value}
          onChange={setValue}
        />
        
      </div>
    </div>
  )
})
