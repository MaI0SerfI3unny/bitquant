import {connect} from 'react-redux'
import {} from "../redux/actions";
import { Line } from 'react-chartjs-2';
import Chart from "./Chart";


const ChartMain = (props) => {
    return (
        <div className="chart">
            <div className="chart-data">
                <div className="chart-data-title">
                    <div className="chart-data-title-text">
                        <i className="far fa-chart-line"></i>
                        <p className="">График сделок</p>
                    </div>
                    <div className="chart-data-title-link">
                        <p className="active">Текущая сессия</p>
                        <p className="">За все время</p>
                    </div>
                </div>
                <div className="chart-data-body">
                    <Chart></Chart>
                </div>
            </div>
            <div className="chart-analyze">
                <div className="chart-analyze-card">
                    <p>Сделок</p>
                    <h1>{props.alltrades}</h1>
                </div>
                <div className="chart-analyze-card">
                    <p>Прибыльные</p>
                    <h1 className="positive">{props.wintrades}</h1>
                </div>
                <div className="chart-analyze-card">
                    <p>Убыточные</p>
                    <h1 className="negative">{props.losstrades}</h1>
                </div>
                <div className="chart-analyze-card">
                    <p>Средняя прибыль (USDT)</p>
                    <h1 className="positive">{parseFloat(props.averagewin).toFixed(8)}</h1>
                </div>
                <div className="chart-analyze-card">
                    <p>Средний убыток (USDT)</p>
                    <h1 className="negative">{parseFloat(props.averageloss).toFixed(8)}</h1>
                </div>
                <div className="chart-analyze-card">
                    <p>Винрейт</p>
                    <h1 className="positive">{parseFloat(props.winrate).toFixed(2)} %</h1>
                </div>
                <div className="chart-analyze-card">
                    <p>Доход</p>
                    <h1>{parseFloat(props.profit).toFixed(8)} USDT</h1>
                </div>
            </div>
        </div>
    );
}
const mapDispatchToProps = {
    //createPost, showAlert
}

const mapStateToProps = state => ({
    //alert: state.app.alert
    profit: state.binanceApi.profit,
    wintrades: state.binanceApi.wintrades,
    losstrades: state.binanceApi.losstrades,
    alltrades: state.binanceApi.alltrades,
    averagewin: state.binanceApi.averagewin,
    averageloss: state.binanceApi.averageloss,
    winrate: state.binanceApi.winrate,
})

export default connect(mapStateToProps, mapDispatchToProps)(ChartMain)
