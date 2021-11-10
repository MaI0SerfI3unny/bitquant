import {connect} from 'react-redux'
import {
    accountData,
    balanceData,
    createBinanceWs,
    createServerWs,
    getUserData, positionRisk,
    ServerApiUserStrategyChange
} from "./redux/actions";
import {BrowserRouter as Router, NavLink} from 'react-router-dom'
import {useRoutes} from "./routes";
import SideBarA from "./components/SideBarA";
import NavBar from "./components/NavBar";
import {useEffect} from "react";
import {connectSocket} from "./socket/socket.js"

function App(props) {
    let isAuthenticated = false
    const userdata = JSON.parse(localStorage.getItem("userData"))
    connectSocket()
    if (userdata && userdata.id) {

        console.log(userdata.id)
        isAuthenticated = true
    }
    else {
        isAuthenticated = false
    }
    useEffect(() => {

        props.createServerWs().then(data => {
            console.log("server ws create: " + data)
        })
    }, [])
    // useEffect(() => {
    //     if(props.binanceWsConnected===true){
    //         console.log(props.binanceWs)
    //     }
    // }, [props.binanceWsConnected])
    useEffect(() => {
        if(props.serverWsConnected===true && isAuthenticated){
            console.log(props.serverWs)
            props.getUserData(userdata.id).then(data=>{
                console.log(data)
                props.ServerApiUserStrategyChange({name: "Demo"}).then(data=>{
                    console.log(data)
                    //props.positionRisk("btcusdt")
                }).catch((error)=>{
                    console.log(error)
                })
            }).catch((error)=>{
                console.log(error)
            })
        }
    }, [props.serverWsConnected])
    // useEffect(() => {
    //     props.accountData()
    // }, [])
    // useEffect(()=>{
    //     console.log(props.binanceOpenTrades)
    // },[props.binanceOpenTrades])
    const routes = useRoutes(isAuthenticated)
    connectSocket()
    return (
        <Router>
            <div className="app-wrapper">
                {isAuthenticated && <SideBarA></SideBarA>}
                <div className="workspace">
                    {isAuthenticated && <NavBar></NavBar>}
                    {routes}
                </div>
            </div>
        </Router>
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
    return datecurrent;
}

const mapDispatchToProps = {
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
