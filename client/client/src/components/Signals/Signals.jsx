import React from 'react'
import UnactiveSignals from './SignalsComponent/UnactiveSignals'
import ActiveSignals from './SignalsComponent/ActiveSignals'
import storage from '../../storage/storage.js'

const Signals = (props) =>  {
  const {t} = props
  return(
    <div className="binance-signals">
        <div className="binance-signals-title">
            <i className="fas fa-signal-3"></i>
            <h1 className="">{t('signal')}</h1>
        </div>
    <div className="binance-signals-card-wrap">
      {storage.signals.map((el,index) =>
        <div key={index} className="binance-signals-card">
            <div className="binance-signals-card-body">
                <h1>{el.name}</h1>
                {el.status === 'active' ? <ActiveSignals el={el}/> : <UnactiveSignals el={el}/>}
            </div>
        </div>
        )}
        </div>
      </div>
  )
}

export default Signals
