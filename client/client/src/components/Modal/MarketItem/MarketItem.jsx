import React,{useState,useEffect} from 'react'
import { postTrading,getTrading } from '../../../api/api.js'
import {toast, ToastContainer} from "react-toastify";

const MarketItem = (props) => {
  const {el,markets,type,close,setClose} = props
  const [pass,setPass] = useState('')
  const [status, setStatus] = useState('')
  const [error,setError] = useState('')
  const userdata = JSON.parse(localStorage.getItem("userData"))
  const notifySuccess = (data) => toast.success(data);
  const notifyError = (data) => toast.error(data)
  const [visible,setVisible] = useState(false)

  //const [] = useState('')
  useEffect(() => {
    getTrading(userdata.id, el.name).then((el) => {
      setStatus(el.data);
    })
  }, [visible,status])

  const checkConfirmationPassword = (market, status) => {
    if (error !== 'incorrect') {
      setPass('');
      setVisible(false)
      notifySuccess(`${el.name} ${status? 'отключён':'включён'}`)
    }else {
      setPass('');
    }
  }

  const setTrading = (el) => {
    if (pass.length !== 0) {
      postTrading(userdata.id,el.name, pass, setStatus, setError)
      checkConfirmationPassword(el.exchange, status)
    }else{ notifyError("Введите пароль аккаунта") }
  }

  useEffect(() => {
    setVisible(false)
    setClose(false)
  }, [close])

  return(
    <div className={type === 'single'? "MARKET_SINGLE" :"MARKET"} style={{
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white',
      width: type === 'single' ? '100%' : '50%',
      height: type === 'single' ? '200px': null
    }}>
      {visible?
        <div className="password_confirmation" style={{ marginTop: 20}}>
          <input type="password" name="binance" value={pass} onChange={(event) => setPass(event.target.value)} placeholder="Введите пароль аккаунта" />
          <button style={{width:174}} onClick={() => setTrading(el)}>Подтвердить</button>
        </div>
        :
        <div>
        <img style={{width: 100}} src={markets.filter(market => market.name.toUpperCase() === el.name)[0]['value']}/>
        <p style={{fontSize: 20}}>{el.exchange}</p>
        <p style={{
          color: status ? "green" : "red",
          fontWeight: 'bold'
        }}>{status ? 'Активный': "Неактивен"}</p>
        <button className="chooseMarket" onClick={() => setVisible(!visible)}>{status ? 'Остановить':'Запустить'} {el.name}</button>
        </div>}
      <ToastContainer />
    </div>
  )
}

export default MarketItem
