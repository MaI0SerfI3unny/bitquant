import {connect} from 'react-redux'
import {toggleBinanceSettings} from "../redux/actions";
const BinanceSettingsNotes = (props) => {
    return (
        <div className="binance-connect">
            <div className="binance-connect-icon">!</div>
            <div className="binance-connect-text">Для продолжение работы, необходимо настроить
                соединение с Api сервером Binance.com
                Для этого перейдите в настройки Api Binance.com, нажав кнопку настройки ниже, и укажите:
                Api Key и Api Secret.
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
})

export default connect(mapStateToProps, mapDispatchToProps)(BinanceSettingsNotes)