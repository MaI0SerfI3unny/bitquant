import {connect} from 'react-redux'
import ReactTooltip from "react-tooltip";
import {toggleBinanceTradeStarted} from "../redux/actions";



const NavBar = (props) => {
    const logOut = () =>{
        localStorage.removeItem("userData")
        window.location.href = "/"
    }
    return (
        <div className="header">
            <div className="start-trade-info">
                <button className={props.isBinanceTradeStarted?"stop-btn":"start-btn"} disabled={!props.isBinanceKeyValid} onClick={()=>props.toggleBinanceTradeStarted()}>
                    {props.isBinanceTradeStarted?"Остановить торговлю":"Запустить торговлю"}
                </button>
            </div>
            <div className="balance-info">
                <p className="">Текущий баланс:</p>
                <h1 className="">{props.binanceBalance} $</h1>
            </div>
            <div className="user-info" onClick={()=>logOut()} data-tip="Выйти">
                <p className="">{props.userData.email}</p>
                <div className="ava"></div>
            </div>
            <ReactTooltip place="bottom" type="dark" effect="float"/>
        </div>
    );
}


const mapDispatchToProps = {
    //createPost, showAlert
    toggleBinanceTradeStarted
}

const mapStateToProps = state => ({
    //alert: state.app.alert
    binanceBalance: state.binanceApi.balance,
    userData: state.serverApi.userData,
    isBinanceKeyValid: state.binanceApi.isBinanceKeyValid,
    isBinanceTradeStarted: state.binanceApi.isBinanceTradeStarted
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
