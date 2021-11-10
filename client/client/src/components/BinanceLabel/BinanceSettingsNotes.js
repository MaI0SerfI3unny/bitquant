import {connect} from 'react-redux'
import {toggleBinanceSettings} from "../../redux/actions";
const BinanceSettingsNotes = (props) => {
  const {t} = props
    return (
        <div style={{marginBottom:35}} className="binance-connect">
            <div className="binance-connect-icon">!</div>
            <div className="binance-connect-text">{t("binanceDescription")}
            </div>
            <div className="binance-connect-button">
                <button className="" onClick={()=>props.toggleBinanceSettings()}><i className="fas fa-cog"></i>{t("settingsButton")}</button>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(BinanceSettingsNotes)
