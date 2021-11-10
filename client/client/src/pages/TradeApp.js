import {connect} from 'react-redux'
import HistoryTrades from "../components/HistoryTrades";
import OpenTrades from "../components/OpenTrades";
import ChartMain from "../components/Chart/ChartMain";
import BinanceSettingsNotes from "../components/BinanceLabel/BinanceSettingsNotes";
import BinanceSettingsChange from "../components/BinanceLabel/BinanceSettingsChange";
import BinanceSettingsCurrent from "../components/BinanceLabel/BinanceApiCurrent";
import React from 'react'
import { useTranslation } from 'react-i18next'
//import Signals from '../components/Signals/Signals'

const TradeApp = (props) => {
  const {tradeType,keys}=props
  const { t } = useTranslation();
  const userdata = JSON.parse(localStorage.getItem("userData"))
  //console.log(keys.length !== 0 ? keys.filter(el => el.value !== null): 'None');

    return (
        <div className="trade-data">
            {props.isBinanceSettings ?
              <BinanceSettingsChange t={t} /> :
              keys.filter(el => el.value !== null).length !== 0 ?
               <BinanceSettingsCurrent t={t} tradeType={tradeType} apiCurrentdata={keys} /> : <BinanceSettingsNotes t={t}/>}
            <ChartMain
            tradeType={tradeType}
            t={t}/>
            <OpenTrades
            tradeType={tradeType}
            t={t}/>
            <HistoryTrades
            limit={10}
            tradeType={tradeType}
            />
        </div>
    );
}



const mapDispatchToProps = {
    //createPost, showAlert
}

const mapStateToProps = state => ({
    //alert: state.app.alert
    isBinanceSettings: state.uiApi.isBinanceSettings,
    isBinanceKeyValid: state.binanceApi.isBinanceKeyValid
})

export default connect(mapStateToProps, mapDispatchToProps)(TradeApp)
