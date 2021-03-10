import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
} from 'react'
import { Button } from 'react-bootstrap';



const RC_Button = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = 'flat',
    children,
    active,
    type,
    width,
    loading = false,
    disabled = false,
    classType = "primary",
    Component = 'button',
    size, // xs
    onClick,
    ...rest
  } = props;

  const ref = useRef<typeof Component>(null)

  let compClass = ''
  if (classType == 'primary') {
    compClass = `btn-primary rc_btn`
  } else if (classType == 'plain') {
    compClass = `btn-plain rc_btn`
  } else if (classType == 'link') {
    compClass = `btn-link`
  }
  if(size){
    compClass += ` ${"btn-size-"+size}`
  }

  const handleBtnOnClick=(e:any)=>{
    onClick(e);
  }

  return (

    classType === "link" ? (
      <p className={compClass} onClick={handleBtnOnClick}>{children}</p>
    ) : (
        <Button className={`${compClass} ${className}`} onClick={handleBtnOnClick} disabled={disabled}>{children}</Button>
      )
  )
})

export default RC_Button
