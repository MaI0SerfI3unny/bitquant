import React,{useState,useEffect,useRef} from 'react'
import { useTranslation } from 'react-i18next'
import arrow from "../../assets/img/svg/arrow.svg"

const LangSwitch = () => {
  const { i18n } = useTranslation();
  const [open,setOpen] = useState(false);
  let menuref = useRef();

  useEffect(() => {
 document.addEventListener("mousedown", (event="") => {
     try {
       if (!menuref.current.contains(event.target)) {
         setOpen(false);
       }
     } catch (e) {}
 })
})

const Change = (lang) => {
  i18n.changeLanguage(lang);
  setOpen(false);
}

  return(
    <div className="lang-block" ref={menuref}>
    <p  onClick={() => open ? setOpen(false) : setOpen(true)}>{i18n.language === 'en'? "English" :"Русский"}
      <img style={{
        width: 15,
        marginLeft:10,
        transform: open ? "rotate(180deg)" : "rotate(0)",
        transition: '0.5s'
      }} src={arrow} alt="arrow"/>
    </p>
    <div style={!open ? {display: 'none'}:{display: 'block'}}>
    <p onClick={() => Change("ru")}>Russian</p>
    <p onClick={() => Change("en")}>English</p>
    </div>
    </div>
  )
}

export default LangSwitch
