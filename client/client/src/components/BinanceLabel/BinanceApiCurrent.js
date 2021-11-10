import {connect} from 'react-redux'
import {useState} from 'react'
import {toggleBinanceSettings} from "../../redux/actions";
import correct from '../../assets/img/accept.png';

const BinanceSettingsCurrent = (props) => {
  const {t,apiCurrentdata,tradeType} = props
  const [ d ] = useState();
  const activeKeys = apiCurrentdata.filter(el => el.value !== null)
    return (
        <div style={{marginBottom:35}} className="binance-connect current">
            <div className="binance-connect-icon">!</div>
            {d}
            <div className="binance-connect-text">
            <h2>Доступные ключи</h2>
            {activeKeys.map((el,index) =>
              <div key={index} className="binance-api-data">
              <p className="p-bold">{t("choose") + " " + el.name}: { tradeType.toUpperCase() === el.name ? <img style={{width: 18}} src={correct} alt='correct'/>: ''}</p>
              <p style={{marginBottom: 20}} className="p-normal">{el.value.apiKey}</p>
              </div>) }
            </div>
            <div className="binance-connect-button current-button">
                <button onClick={()=>props.toggleBinanceSettings()}><i className="fas fa-cog"></i>{t("settingsButton")}</button>
            </div>
        </div>
    );
}

const mapDispatchToProps = {toggleBinanceSettings}

const mapStateToProps = state => ({
    //alert: state.app.alert
    binanceApiKey: state.binanceApi.binanceApiKey,
    userData: state.serverApi.userData
})

export default connect(mapStateToProps, mapDispatchToProps)(BinanceSettingsCurrent)
