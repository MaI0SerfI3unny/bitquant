import React,{useState} from 'react'
import logo from '../../assets/img/logo-png.png'
import BINANCE from '../../assets/img/binance.png'
import HUOBI from '../../assets/img/huobi.png'
import exit from '../../assets/img/exit.png'
import MarketItem from './MarketItem/MarketItem'

const Modal = (props) => {
    const {content,linkSignal,keys} = props
    const [close,setClose] = useState(false)
    const logOut = () => {
        localStorage.removeItem("userData")
        window.location.href = "/"
    }
    const markets = [
      {
        value: BINANCE,
        name: 'binance'
      },
      {
        value: HUOBI,
        name: 'huobi'
      }]
  return(
    <>
    <div id={linkSignal} className="modal">
    <div className="modal-dialog">
    <div className="modal-content">
    {content === 'market' ?
          <>
            <div className="modal-header">
              <img src={logo} alt="model-Logo"/>
              <h3 className="modal-title">Выберите маркет</h3>
              <a href="#" className="close" onClick={() => setClose(true)}>×</a>
            </div>
            <div style={{display:'flex', padding:0}} className="modal-body">
              {keys ?
                keys.filter(el => el.value !== null).map((el,key) => <MarketItem key={key} type={keys.filter(el => el.value !== null).length === 1 ? 'single': 'multiple'} setClose={setClose} close={close} el={el} markets={markets}/>) : 'None'}
            </div>
          </>
    :
    <>
    <div className="modal-header">
      <img src={logo} alt="model-Logo"/>
      <h3 className="modal-title">Вы точно хотите выйти?</h3>
    </div>
    <div style={{justifyContent:'center',width:'100%',display:'flex'}}>
    <img className="sign_leave" style={{width:200}} src={exit} alt="leave"/>
    </div>
    <div className="modal-body-quit">
      <a href="#" className="quitButton">Нет</a>
      <a className="cancelButton" onClick={()=>logOut()}>Да</a>
    </div>
    </>
  }
      </div>
    </div>
  </div>
    </>
  )
}

export default Modal
