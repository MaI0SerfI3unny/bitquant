import {connect} from 'react-redux'
import { useTranslation } from 'react-i18next'
import storage ,{timestampConvert} from '../storage/storage.js'
import {userDataHistory} from '../api/api.js'
import {useEffect,useState} from 'react'
import Loader from './HistoryTrades/Loader.jsx'


const HistoryTrades = (props) => {
  const { limit,tradeType } = props
  const { t } = useTranslation();
  const [history, setHistory] = useState([]);
  const userdata = JSON.parse(localStorage.getItem("userData"))['id']

  //useEffect(()=>{
  //    setTimeout(() => {
//        userDataHistory(userdata, setHistory, tradeType)
  //      getBalanceHuobi();
//   }, 4000)
//  }, [tradeType])

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
        <div className="history-trades">
            <div className="history-trades-header">
                <i className="fal fa-history"></i>
                <p className="">{t('HistoryDeals') + (limit !== undefined ? ` (${t('last')} ${limit} ${t('trades')})`: " ")}</p>
            </div>
            <div className="history-trades-table">
            {/*history !== 'error'?
                history.length === 0 ? <Loader/> :
                    <table>
                        <thead>
                          <tr>{storage.history.map((el,index) => <th key={index}>{t(el)}</th>)}</tr>
                        </thead>
                        <tbody>
                            { history.data.slice(0,limit).map((el,index) =>
                            <tr key={index}>
                              <td>{timestampConvert(el.time)}</td>
                              <td>{el.symbol}</td>
                              <td>{el.qty}</td>
                              <td style={{ color: el.side === 'BUY'? 'green':'red'}}>{el.side}</td>
                            </tr> )}
                        </tbody>
                    </table>
                    :
                    <NoDeal/>
                  */}
            </div>
        </div>
    );
}





const mapDispatchToProps = {
    //createPost, showAlert
}

const mapStateToProps = state => ({
    //alert: state.app.alert
    binanceHistoryTrades: state.binanceApi.binanceHistoryTrades
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTrades)
