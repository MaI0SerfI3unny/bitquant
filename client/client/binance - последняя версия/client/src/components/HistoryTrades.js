import {connect} from 'react-redux'
import _ from "lodash";


const HistoryTrades = (props) => {

    return (
        <div className="history-trades">
            <div className="history-trades-header">
                <i className="fal fa-history"></i>
                <p className="">История сделок (последние 10 сделок)</p>
            </div>
            <div className="history-trades-table">
                <table>
                    <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Символ</th>
                        {/*<th>Тип</th>*/}
                        <th>Кол-во (BTC)</th>
                        <th>Результат</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*<tr className="odd">*/}
                    {/*    <td>{time(_.now() / 1000)}</td>*/}
                    {/*    <td>BTCUSDT</td>*/}
                    {/*    <td><span className="buy-color">Покупка</span></td>*/}
                    {/*    <td>0.001</td>*/}
                    {/*    <td><span className="buy-color">1</span></td>*/}
                    {/*</tr>*/}
                    {/*<tr className="even">*/}
                    {/*    <td>{time(_.now() / 1000)}</td>*/}
                    {/*    <td>BTCUSDT</td>*/}
                    {/*    <td><span className="sell-color">Продажа</span></td>*/}
                    {/*    <td>0.001</td>*/}
                    {/*    <td><span className="sell-color">-0.25</span></td>*/}
                    {/*</tr>*/}
                    <Trades trades={props.binanceHistoryTrades} />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const Trades = (props) => {
    let trades = props.trades;
    trades.sort((a, b) => (b.time - a.time));
    trades = trades.slice(0, 10);
    let counter = trades.length;
    if (counter > 0) {
        const listItems = trades.map((el, i) => <tr key={i}>
            <td>{time(el.time / 1000)}</td>
            <td>{el.symbol.toUpperCase()}</td>
            {/*<td><span className={el.type.toLowerCase()==="sell"?"sell-color":"buy-color"}>{el.type.toLowerCase()==="sell"?"Продажа":"Покупка"}</span></td>*/}
            <td>{el.lot}</td>
            <td><span className={parseFloat(el.result)<0?"sell-color":"buy-color"}>{parseFloat(el.result).toFixed(8)}</span></td>
        </tr>);
        return (<>{listItems}</>)
    } else {
        return (
            <tr>
                <td>Нет сделок в истории</td>
            </tr>
        );
    }
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
    binanceHistoryTrades: state.binanceApi.binanceHistoryTrades
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTrades)
