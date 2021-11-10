import {connect} from 'react-redux'
import React, {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    changeBinanceApiKey,
    changeBinanceKeyValid,
    changeBinanceSecret,
    toggleBinanceSettings,
    updateBinanceKeys
} from "../redux/actions";

const BinanceSettingsChange = (props) => {
    const [apiKey, setApiKey] = useState(props.binanceApiKey)
    const [secret, setSecret] = useState(props.binanceSecret)
    const [off, setOff] = useState(false)
    const [saveText, setSaveText] = useState("Сохранить")
    const apiKeyHandler = (event) => {
        setApiKey(event.target.value)
    }
    const secretHandler = (event) => {
        setSecret(event.target.value)
    }
    const clickhandler = () => {
        //props.toggleBinanceSettings()
        setOff(true)
        setSaveText("Идет проверка данных...")
        if(!apiKey){
            notifyError("Вы не указали Binance Api Key")
        }
        if(!secret){
            notifyError("Вы не указали Binance Secret")
        }
        if(apiKey && secret){
            props.changeBinanceKeyValid(apiKey, secret).then((data)=>{
                console.log(data)
                setOff(false)
                setSaveText("Сохранить")
                //notifySuccess("Ключи успешно добавлены")
                props.updateBinanceKeys().then((data)=>{
                    console.log(data)
                    props.toggleBinanceSettings()
                }).catch((error)=>{
                    console.log(error)
                })
                //props.toggleBinanceSettings()
            }).catch((error)=>{
                console.log(error)
                setOff(false)
                setSaveText("Сохранить")
                notifyError("Вы указали неверные Binance Api Key или Binance Secret")
            })
            //props.toggleBinanceSettings()
        }
        else{
            setOff(false)
            setSaveText("Сохранить")
        }
    }
    const notifySuccess = (data) => toast.success(data);
    const notifyError = (data) => toast.error(data);
    return (
        <div className="binance-connect">
            <div className="binance-connect-icon"><i className="far fa-cog"></i></div>
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
                <button className="binance-connect-save-settings" onClick={()=>clickhandler()} disabled={off}>
                    {off?<div className="fa-1x"><i className="fas fa-spinner fa-spin"></i></div>:<i className="fas fa-cog"></i>}
                    {/*<i className="fas fa-cog"></i>*/}
                    {/*<div className="fa-1x"><i className="fas fa-spinner fa-spin"></i></div>*/}
                    {saveText}
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

const mapDispatchToProps = {
    //createPost, showAlert
    toggleBinanceSettings,
    changeBinanceKeyValid,
    updateBinanceKeys,
}

const mapStateToProps = state => ({
    //alert: state.app.alert
    binanceApiKey: state.binanceApi.binanceApiKey,
    binanceSecret: state.binanceApi.binanceSecret
})

export default connect(mapStateToProps, mapDispatchToProps)(BinanceSettingsChange)
