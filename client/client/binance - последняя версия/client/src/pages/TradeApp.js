import {connect} from 'react-redux'
import Chart from "../components/Chart";
import _ from "lodash";
import HistoryTrades from "../components/HistoryTrades";
import OpenTrades from "../components/OpenTrades";
import ChartMain from "../components/ChartMain";
import BinanceSettingsNotes from "../components/BinanceSettingsNotes";
import BinanceSettingsChange from "../components/BinanceSettingsChange";
import BinanceSettingsCurrent from "../components/BinanceApiCurrent";
import axios from "axios";
import {changeBinanceKeyValid} from "../redux/actions";

const TradeApp = (props) => {

    const checkBoxHandler = (event) => {
        event.preventDefault()
        console.log("Clicked")
    }

    const pay = async ()=> {

        axios.post(`/api/payments/testPayment`).then((response) => {
            console.log(response)
        }).catch((error) => {
            if (error.response){
                console.log(error.response)
            }else if(error.request){
                console.log(error.request)
            }else if(error.message){
                console.log(error.message)
            }
        })
        // axios.post(`https://bitquant.online/api/payments/paymentStatus`, {data: "test"}).then((response) => {
        //     console.log(response)
        // }).catch((error) => {
        //     if (error.response){
        //         console.log(error.response)
        //     }else if(error.request){
        //         console.log(error.request)
        //     }else if(error.message){
        //         console.log(error.message)
        //     }
        // })
    }

    return (
        <div className="trade-data">
            {/*<BinanceSettingsNotes></BinanceSettingsNotes>*/}
            {/*<BinanceSettingsChange></BinanceSettingsChange>*/}
            {/*<BinanceSettingsCurrent></BinanceSettingsCurrent>*/}
            {props.isBinanceSettings?<BinanceSettingsChange></BinanceSettingsChange>:props.isBinanceKeyValid?<BinanceSettingsCurrent></BinanceSettingsCurrent>:<BinanceSettingsNotes></BinanceSettingsNotes>}
            <div className="binance-signals">
                <div className="binance-signals-title">
                    <i className="fas fa-signal-3"></i>
                    <h1 className="">Сигналы</h1>
                </div>
                <div className="binance-signals-card-wrap">
                    <div className="binance-signals-card">
                        <div className="binance-signals-card-body">
                            <h1>Demo</h1>
                            <div className="binance-signals-card-expiration">
                                <p className="binance-signals-card-expiration-text">Действует до:</p>
                                {/*<p className="binance-signals-card-expiration-data">{time(_.now()/1000)}</p>*/}
                                <p className="binance-signals-card-expiration-data">Unlimited</p>
                            </div>
                            <div className="binance-signals-card-status">
                                <i className="fas fa-check-circle"></i>
                                <p>Активный</p>
                            </div>
                        </div>
                    </div>
                    <div className="binance-signals-card">
                        <div className="binance-signals-card-body">
                            <h1>Название сигнала</h1>
                            <div className="binance-signals-card-expiration">
                                <h1>$19/месяц</h1>
                            </div>
                            {/*<div className="binance-signals-card-currency">*/}
                            {/*    <div className="currency-item">*/}
                            {/*        <input type="checkbox" name="USDT" onClick={(event)=>checkBoxHandler(event)}/>*/}
                            {/*        <label htmlFor="USDT">USDT</label>*/}
                            {/*    </div>*/}
                            {/*    <div className="currency-item">*/}
                            {/*        <input type="checkbox" name="BTC" onClick={(event)=>checkBoxHandler(event)}/>*/}
                            {/*        <label htmlFor="BTC">BTC</label>*/}
                            {/*    </div>*/}
                            {/*    <div className="currency-item">*/}
                            {/*        <input type="checkbox" name="ETH" onClick={(event)=>checkBoxHandler(event)}/>*/}
                            {/*        <label htmlFor="ETH">ETH</label>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="binance-signals-card-status">
                                <button className="" onClick={()=>pay()}>Подписаться</button>
                            </div>
                        </div>
                    </div>
                    <div className="binance-signals-card">
                        <div className="binance-signals-card-body">
                            <h1>Название сигнала</h1>
                            <div className="binance-signals-card-expiration">
                                <h1>$50/месяц</h1>
                            </div>
                            <div className="binance-signals-card-status">
                                <button className="">Подписаться</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ChartMain></ChartMain>
            <OpenTrades></OpenTrades>
            <HistoryTrades></HistoryTrades>
        </div>
    );
}

const time = (unixtime) => {
    let dates = new Date(unixtime * 1000);
    let year = dates.getFullYear();
    let month = (dates.getMonth() < 10) ? "0" + (dates.getMonth() + 1) : dates.getMonth()+1;
    let day = (dates.getDate() < 10) ? "0" + dates.getDate() : dates.getDate();
    let hours = (dates.getHours() < 10) ? "0" + dates.getHours() : dates.getHours();
    let minets = (dates.getMinutes() < 10) ? "0" + dates.getMinutes() : dates.getMinutes();
    let second = (dates.getSeconds() < 10) ? "0" + dates.getSeconds() : dates.getSeconds();
    let datecurrent = year + '-' + month + '-' + day + " " + hours + ':' + minets + ':' + second;
    //let datecurrent = hours + ':' + minets + ':' + second;
    return datecurrent;
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
