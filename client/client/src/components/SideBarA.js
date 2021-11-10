import React,{useState,useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import {NavLink} from "react-router-dom";
import Logo from "../assets/img/logo-png.png"
import avatar from "../assets/img/ava.png"
//import {toggleBinanceTradeStarted} from "../redux/actions"
import LangSwitch from './LangSwitch/LangSwitch'
import { useTranslation } from 'react-i18next'
import storage,{BalancePow} from '../storage/storage.js'
import svg_binance from '../assets/img/svg/binance_svg.svg'
import svg_huobi from '../assets/img/svg/huobi_svg.svg'
import {checkBalance,checkKey} from '../api/api.js'


const SideBarA = (props) => {
  const {tradeType,setTradeType} = props
  const logOut = () => {
      localStorage.removeItem("userData")
      window.location.href = "/"
    }

    let menuref = useRef();
    const { t } = useTranslation();
    const [ d, setd] = useState([]);
    const [ keys, setKeys] = useState([]);
    const [stateOpen , setStateOpen] = useState(false);
    const userdata = JSON.parse(localStorage.getItem("userData"))

    useEffect(() => {
        setTimeout(() => {
          checkBalance(userdata.id,setd,tradeType)
          checkKey(userdata.id).then(data => {
            checkKey(userdata.id, userdata.password).then(data => {
              const arr = []
              for (const [key, value] of Object.entries(data.data)){arr.push({name: key, value: value})}
              setKeys(arr);
            });
          })
      }, 4000)
    }, [tradeType])

    // Effect for listen mousedown for mobile if user clicked over area sidebar
    useEffect(() => {
   document.addEventListener("mousedown", (event="") => {
       try {
         if (!menuref.current.contains(event.target)) {
           setStateOpen(false);
         }
       } catch (e) {}
   })
 })
    return (
      <>

      {/*===================================================== DESKTOP VERSION============================================================== */}

        <div className="sidebar">
            <div className="sidebar-logo">
                <img src={Logo} alt="" className="logo-img"/>
                <h1 className="logo-text">BitQuant</h1>
            </div>
            <div className="sidebar-menu">
                <div className="sidebar-menu-main">
                    <ul className="">
                    {storage.link_main.main.map(el =>
                        <li key={el.title}><NavLink to={el.link}  className="link" activeClassName='active'><i className={el.class}></i><p>{t(el.title)}</p></NavLink></li>
                    )}
                    </ul>
                </div>
                <div className="sidebar-menu-alt">
                    <ul className="">
                    {storage.link_main.alt.map(el =>
                      <li key={el.title}><NavLink to={el.link} className="link" activeClassName='active'><i className={el.class}></i><p>{t(el.title)}</p></NavLink></li>
                    )}
                    </ul>
                </div>
                <a style={{textDecoration:'none'}} onClick={() => setStateOpen(false)} href="#quit">
                <div className="user-info-s" data-tip="Выйти">
                    <p className=""></p>
                    <div className="ava"></div>
                </div>
                </a>
                  <LangSwitch/>
            </div>
        </div>


        {/*===================================================== MOBILE VERSION============================================================== */}


        <label  className={!stateOpen ? "menu-btn" : "checkedspan"} >
            <span onClick={() => !stateOpen ? setStateOpen(true) : setStateOpen(false)}></span>
          </label>
        <div ref={menuref} className="sidebarMobile" style={!stateOpen ? {left:'-100%', transition: "0.5s"}: {left: '0', transition: "0.5s"}}>
            <div className="sidebar-logo">
                <img src={Logo} alt="" className="logo-img"/>
                <h1 className="logo-text">BitQuant</h1>
            </div>
            <div className="sidebar-menu">
                <div className="sidebar-menu-main">
                    <ul>
                    {storage.link_main.main.map(el =>
                        <li key={el.title}><NavLink to={el.link} className="link" onClick={() => setStateOpen(false)} activeClassName='active'><i className={el.class}></i><p>{t(el.title)}</p></NavLink></li>
                    )}
                    </ul>

                </div>
                <div className="sidebar-menu-alt">
                    <ul className="">
                    {storage.link_main.alt.map(el =>
                      <li key={el.title}><NavLink to={el.link} className="link" onClick={() => setStateOpen(false)} activeClassName='active'><i className={el.class}></i><p>{t(el.title)}</p></NavLink></li>
                    )}
                    </ul>
                </div>

                <div style={{width: '100%', justifyContent: 'center',display: 'flex'}}>
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
                : " "
                : " "
                }
                </div>
                <a style={{textDecoration:'none'}} onClick={() => setStateOpen(false)} href="#quit">
                <div className="user-info-s" data-tip="Выйти">
                    <p className="">{JSON.parse(localStorage.getItem("userData")).email}</p>
                    <img className="ava-mobile" src={avatar} alt="Avatar"/>
                </div>
                </a>
                <div className="mobileBalance" style={{display:'flex'}}>
                <p>{t('currentBalance')}:</p><p style={{color: "#2F80ED",marginLeft: 10 }}>{BalancePow(d)} $</p>
                </div>
                <div style={{width: '100%', textAlign: 'center'}}>
                <a style={{
                  marginRight: 15,
                  marginLeft: 15,
                  pointerEvents:  keys.filter(el => el.value !== null).length === 0 ? 'none' : '',
                  background: keys.filter(el => el.value !== null).length === 0 ? 'grey' : 'green'
                }}
                className="openTradeButtonMobile"
                onClick={() => setStateOpen(false)}
                href="#open-trade">Меню троговли</a>
                </div>

                {/*
                  <div className="start-trade-info-mobile">
                  <button className={props.isBinanceTradeStarted?"stop-btn":"start-btn"} disabled={!props.isBinanceKeyValid} onClick={()=>props.toggleBinanceTradeStarted()}>
                  {props.isBinanceTradeStarted ? t('stopTrade') :t('startTrade')}
                  </button>
                  </div>

                  */}
            </div>
        </div>
        </>
    );
}


const mapDispatchToProps = {
    //createPost, showAlert
  //  toggleBinanceTradeStarted
}

const mapStateToProps = state => ({
    //alert: state.app.alert
    userData: state.serverApi.userData,
    binanceBalance: state.binanceApi.balance,
    isBinanceKeyValid: state.binanceApi.isBinanceKeyValid,
    isBinanceTradeStarted: state.binanceApi.isBinanceTradeStarted
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBarA)
