import {connect} from 'react-redux'
import {toggleBinanceSettings} from "../redux/actions";

const BinanceSettingsCurrent = (props) => {
    return (
        <div className="binance-connect">
            <div className="binance-connect-icon">!</div>
            <div className="binance-connect-text">
                <div className="binance-api-data">
                    <p className="p-bold">Binance ID: {props.userData.binanceId}</p>
                    <p className="p-bold">Выбраный Binance Api Key:</p>
                    <p className="p-normal">{props.binanceApiKey}</p>
                </div>
            </div>
            <div className="binance-connect-button">
                <button className="" onClick={()=>props.toggleBinanceSettings()}><i className="fas fa-cog"></i>Настроить binance.com API</button>
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    //createPost, showAlert
    toggleBinanceSettings
}

const mapStateToProps = state => ({
    //alert: state.app.alert
    binanceApiKey: state.binanceApi.binanceApiKey,
    userData: state.serverApi.userData
})

export default connect(mapStateToProps, mapDispatchToProps)(BinanceSettingsCurrent)
