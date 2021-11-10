import React from "react";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {sendKey} from '../../api/api.js'
import BinanceForms from './ChangeForms/BinanceForms'
import HuobiForms from './ChangeForms/HuobiForms'


const BinanceSettingsChange = (props) => {
    const {t} = props
    return (
      <div style={{marginBottom:35}}>
      {/*
            <BinanceForms t={t} sendKey={sendKey}/>
        <div className="binanceOr">{t('or')}</div>
        */}
            <HuobiForms t={t} sendKey={sendKey}/>
        <ToastContainer />
        </div>
    );
}


export default BinanceSettingsChange
