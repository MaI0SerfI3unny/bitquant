import {connect} from 'react-redux'
import ReactTooltip from "react-tooltip"
import {toggleBinanceTradeStarted} from "../redux/actions"
import Logo from "../assets/img/logo-png.png"
import avatar from "../assets/img/ava.png"
import svg_binance from '../assets/img/svg/binance_svg.svg'
import svg_huobi from '../assets/img/svg/huobi_svg.svg'
import { useTranslation } from 'react-i18next'
import {BalancePow} from '../storage/storage.js'
import {useEffect,useState} from 'react'
import {checkBalance} from '../api/api.js'
import Modal from './Modal/Modal'

const NavBar = (props) => {
  const {tradeType,setTradeType,keys} = props
    const { t } = useTranslation();
    const [ d, setd] = useState([]);

    const userdata = JSON.parse(localStorage.getItem("userData"))


      useEffect(() => {
          setTimeout(() => {
           checkBalance(userdata.id,setd,tradeType)
        }, 4000)
      }, [tradeType])

      const changeStatusTrade = () => {
        try {
        const status = userdata.statusTrade === true ? false : true
        window.location.href = "/trade-app"
        JSON.parse(localStorage.setItem('userData',
        JSON.stringify({
          id: userdata.id,
          name: userdata.name,
          email: userdata.email,
          statusTrade: status
        })))
      }catch (e) {}
      }

    return (
        <div className="header">
            <div className="logo-mobile"><img src={Logo} alt="Logotype"/><h1>BitQuant</h1></div>
            <div className='containerButtonChanger'>
            { keys ?
              keys.filter(el => el.value !== null).length > 1 ?
              tradeType === 'binance' ?
            <div className="bitcoin-button">
              <img onClick={() => setTradeType('huobi')} style={{width: 40, height:40}} src={svg_binance} alt="binance"/>
            </div>
            :
            <div className="huobi-button">
              <img onClick={() => setTradeType('binance')} style={{width: 40, height:40}} src={svg_huobi} alt="binance"/>
            </div>
            : null : null}

              </div>

                <a style={{
                  marginRight: 15,
                  marginLeft: 15,
                  pointerEvents:  keys.filter(el => el.value !== null).length === 0 ? 'none' : '',
                  background: keys.filter(el => el.value !== null).length === 0 ? 'grey' : 'green'
                }}className="openTradeButton" href="#open-trade">Меню троговли</a>

            <div className="balance-info">
                <p className="">{t('currentBalance')}:</p>
                <h1 className="">{BalancePow(d)} $</h1>
            </div>
            <a style={{textDecoration:'none'}} href="#quit">
            <div className="user-info"  data-tip={t('quit')}>
                <p>{JSON.parse(localStorage.getItem("userData")).email}</p>
                <img className="ava" src={avatar} alt="Avatar"/>
            </div>
            </a>
            <ReactTooltip place="bottom" type="dark" effect="float"/>
            <Modal content="market" linkSignal={"open-trade"} keys={keys}/>
            <Modal content="leave" linkSignal={"quit"}/>
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
