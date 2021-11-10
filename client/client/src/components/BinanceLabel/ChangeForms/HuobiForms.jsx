import React, {useState} from 'react'
import huobi from "../../../assets/img/huobi.png";
import { ToastContainer, toast } from 'react-toastify';
import {connect} from 'react-redux'
import {toggleBinanceSettings} from "../../../redux/actions";

const HuobiForms = (props) => {
  const {t,sendKey} = props
  //This hooks used for base handling values of inputs
  const [apiKeyHuobi, setApiHuobi] = useState('')
  const [secretHuobi, setSecretHuobi] = useState('')

  const userdata = JSON.parse(localStorage.getItem("userData"))

  //This hook we used for buttons.
  const [off, setOff] = useState(false)
  const [saveText, setSaveText] = useState(t("save"))

  // Handlers Functions for inputs
  const apiKeyHandlerHuobi = (event) => { setApiHuobi(event.target.value) }
  const secretHandlerHuobi = (event) => { setSecretHuobi(event.target.value) }

  const notifyError = (data) => toast.error(data);
  //Validate for Huobi
      const clickhandlerHuobi = () => {
        setOff(true)
        setSaveText("Идет проверка данных...")
        if(apiKeyHuobi.length === 0 ){ notifyError(t("huobiErrorKey")) }
        if(secretHuobi.length === 0 ){ notifyError(t("huobiErrorSecret")) }
        if(apiKeyHuobi && secretHuobi){
          sendKey(userdata.id, apiKeyHuobi, secretHuobi, "HUOBI", userdata.password).then(data => {
            if (data !== undefined) {
              props.toggleBinanceSettings()
            }else {
              setOff(false)
              setSaveText(t("save"))
              notifyError(t("incorrectHuobiData"))
            }
           })
        }
        else{
            setOff(false)
            setSaveText(t("save"))
        }
      }
  return(
    <div className="binance-connect">
    <img style={{width:42}} src={huobi} alt="Huobi coin logo"/>
        <div className="binance-connect-text">
            <div className="binance-api-data">
                <div className="input">
                    <i className="far fa-user"></i>
                    <input type="text" placeholder="Huobi Api Key" autoComplete={0} value={apiKeyHuobi} onChange={(event)=>apiKeyHandlerHuobi(event)} />
                </div>
                <div className="input">
                    <i className="far fa-key"></i>
                    <input type="text" placeholder="Huobi Secret Key" autoComplete={0} value={secretHuobi} onChange={(event)=>secretHandlerHuobi(event)} />
                </div>
            </div>
        </div>
        <div className="binance-connect-button">
            <button className="binance-connect-save-settings" disabled={off} onClick={()=>clickhandlerHuobi()}>
                {off?<div className="fa-1x"><i className="fas fa-spinner fa-spin"></i></div>:<i className="fas fa-cog"></i>}
                {saveText}
            </button>
        </div>
    </div>
  )
}
const mapDispatchToProps = {
    toggleBinanceSettings,
}

const mapStateToProps = state => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(HuobiForms)
