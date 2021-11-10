import {connect} from 'react-redux'
import {
    accountData,
    balanceData,
    createBinanceWs,
    createServerWs,
    getUserData, positionRisk,
    ServerApiUserStrategyChange
} from "./redux/actions";
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes";
import SideBarA from "./components/SideBarA";
import NavBar from "./components/NavBar";
import {useEffect,useState} from "react";
import './i18n';
import { checkKey } from "./api/api.js"

function App(props) {
    let isAuthenticated = false
    const [tradeType, setTradeType] = useState('binance')
    const [keys, setKeys] = useState([]);
    const userdata = JSON.parse(localStorage.getItem("userData"))
    if (userdata && userdata.id && userdata.password) {
      isAuthenticated = true
    }else {
      isAuthenticated = false
    }
    useEffect(() => {
      if (isAuthenticated) {
        checkKey(userdata.id, userdata.password).then(data => {
          const arr = []
          for (const [key, value] of Object.entries(data.data)){arr.push({name: key, value: value})}
          setKeys(arr);
        });
      }
    }, [])
  //  console.log(keys.length !== 0 ? keys.filter(el => el.value !== null): 'None');

    const routes = useRoutes(isAuthenticated,tradeType,keys)
    return (
        <Router>
            <div className="app-wrapper">
                {isAuthenticated &&
                  <SideBarA
                  tradeType={tradeType}
                  setTradeType={setTradeType}
                  />}
                <div className="workspace">
                    {isAuthenticated &&
                      <NavBar
                      keys={keys}
                      tradeType={tradeType}
                      setTradeType={setTradeType}/>}
                    {routes}
                </div>
            </div>
        </Router>
    );
}

const mapDispatchToProps = {
    //createPost, showAlert
    createBinanceWs,
    createServerWs,
    ServerApiUserStrategyChange,
    accountData,
    balanceData,
    getUserData,
    positionRisk
}

const mapStateToProps = state => ({
    //alert: state.app.alert
    binanceWs: state.binanceApi.binanceWs,
    binanceWsConnected: state.binanceApi.binanceWsConnected,
    serverWsConnected: state.serverApi.serverWsConnected,
    serverWs: state.serverApi.serverWs,
    //binanceOpenTrades:state.binanceApi.binanceOpenTrades
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
