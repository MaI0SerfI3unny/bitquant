import {connect} from 'react-redux'
import {} from "../../redux/actions";
import Chart from "./Chart";
import storage from '../../storage/storage.js'

const ChartMain = (props) => {
  const {t} = props
    return (
        <div className="chart">
            <div className="chart-data">
                <div className="chart-data-title">
                    <div className="chart-data-title-text">
                        <i className="far fa-chart-line"></i>
                        <p className="">{t("dealsHover")}</p>
                    </div>
                    <div className="chart-data-title-link">
                        <p className="active">{t("currentSession")}</p>
                        <p className="">{t('allTime')}</p>
                    </div>
                </div>
                <div className="chart-data-body">
                    <Chart/>
                </div>
            </div>
            <div className="chart-analyze">
            {storage.info_chart.map(el =>
              <div key={el.title} className="chart-analyze-card">
              <div className="border-chart-data">
                  <p>{t(el.title)}</p>
                  <h1 className={el.status === 'positive' || el.status === 'negative' ? el.status : ''}>{eval(el.value)}</h1>
                  </div>
              </div>)}
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
