import {connect} from 'react-redux'
import storage ,{timestampConvert} from '../storage/storage.js'
import {useEffect,useState} from "react"
import {userOpenHistory} from '../api/api.js'
import Loader from './HistoryTrades/Loader.jsx'


const OpenTrades = (props) => {
  const {t,tradeType} = props
  const [openTrade, setOpenTrade] = useState([])
  const userdata = JSON.parse(localStorage.getItem("userData"))
//    useEffect(()=>{
//      setTimeout(() => {
        userOpenHistory(userdata.id, setOpenTrade, tradeType)
//   }, 4000)
//    }, [tradeType])

      const NoDeal = () => {
        return(
        <table>
          <tbody>
            <tr>
              <td>{t("NoHistoryDeals")}</td>
            </tr>
          </tbody>
        </table>
      )}

    return (
        <div className="open-trades">
            <div className="open-trades-header">
                <i className="fad fa-list"></i>
                <p className="">{t("openDeals")}</p>
            </div>
            <div className="open-trades-table">
                      {/*
                        openTrade !== 'error'  && openTrade.status !== 200 ?
                          openTrade.length === 0 ? <Loader/> :
                          openTrade[1] === 'binance' ?
                              <table>
                                <thead>
                                  <tr>{storage.open_trades.map((el, index) => <th key={el}>{t(el)}{index === 3 ? " (BTC)" : ''}</th>)}</tr>
                                </thead>
                                <tbody>
                                      {openTrade[0].data.map((el,index) =>
                                      <tr key={index}>
                                        <td>{timestampConvert(el.time)}</td>
                                        <td>{el.symbol}</td>
                                        <td>{el.qty}</td>
                                        <td style={{ color: el.side === 'BUY'? 'green':'red'}}>{el.side}</td>
                                      </tr>)}
                                </tbody>
                              </table>
                              :
                              <table>
                                <thead>
                                  <tr>{storage.open_trades.map((el, index) => <th key={el}>{t(el)}{index === 3 ? " (BTC)" : ''}</th>)}</tr>
                                </thead>
                                <tbody>
                                      {openTrade[0].data.data.map((el,index) =>
                                      <tr key={index}>
                                      <td>{timestampConvert(el['created-at'])}</td>
                                      <td>{el.symbol.toUpperCase()}</td>
                                      <td>{el.type.toUpperCase()}</td>
                                      <td>{el.amount}</td>
                                      </tr>)}
                                </tbody>
                              </table>
                         : <NoDeal/>*/}
            </div>
        </div>
    );
}


const mapDispatchToProps = {
    //createPost, showAlert
}

const mapStateToProps = state => ({
    //alert: state.app.alert
    opentrades: state.binanceApi.binanceOpenTrades
})

export default connect(mapStateToProps, mapDispatchToProps)(OpenTrades)
