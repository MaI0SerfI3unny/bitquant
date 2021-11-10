import React, {useState} from 'react'
import binance from "../../../assets/img/binance.png";
import { ToastContainer, toast } from 'react-toastify';
import {toggleBinanceSettings} from "../../../redux/actions";
import {connect} from 'react-redux'


const BinanceForms = (props) => {
  const {t,sendKey} = props
  const [off, setOff] = useState(false)
  const [saveText, setSaveText] = useState(t("save"))
  //This hooks used for base handling values of inputs
  const [apiKey, setApiKey] = useState('')
  const [secret, setSecret] = useState('')
  const notifyError = (data) => toast.error(data);

  // Handlers Functions for inputs
  const apiKeyHandler = (event) => { setApiKey(event.target.value) }
  const secretHandler = (event) => { setSecret(event.target.value) }

  const userdata = JSON.parse(localStorage.getItem("userData"))

  //Validate for Binance Keys
  const clickhandlerBinance = () => {
      setOff(true)
      setSaveText(t("validation"))
      if(apiKey.length === 0 ){ notifyError(t("binanceErrorKey")) }
      if(secret.length === 0 ){ notifyError(t("binanceErrorSecret")) }
      if(apiKey && secret){
          sendKey(userdata.id, apiKey, secret, "BINANCE")
          .then(data => {
              if (data !== undefined) {
               props.toggleBinanceSettings()
              }else {
                setOff(false)
                setSaveText(t("save"))
                notifyError(t("incorrectBinanceData"))
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
    <img style={{width:42}} src={binance} alt="Binance coin logo"/>
        <div className="binance-connect-text">
            <div className="binance-api-data">
                <div className="input">
                    <i className="far fa-user"></i>
                    <input type="text" className="" placeholder="Binance Api Key" autoComplete={0} value={apiKey} onChange={(event)=>apiKeyHandler(event)}/>
                </div>
                <div className="input">
                    <i className="far fa-key"></i>
                    <input type="text" className="" placeholder="Binance Secret Key" autoComplete={0} value={secret} onChange={(event)=>secretHandler(event)}/>
                </div>
            </div>
        </div>
        <div className="binance-connect-button">
            <button className="binance-connect-save-settings" onClick={()=>clickhandlerBinance()} disabled={off}>
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
export default connect(mapStateToProps, mapDispatchToProps)(BinanceForms)
