import React from 'react'

const ActiveSignals = (props) => {
  return(
    <>
    <div className="binance-signals-card-expiration">
        <p className="binance-signals-card-expiration-text">Действует до:</p>
        {/*<p className="binance-signals-card-expiration-data">{time(_.now()/1000)}</p>*/}
        <p className="binance-signals-card-expiration-data">Unlimited</p>
    </div>
    <div className="binance-signals-card-status">
        <i className="fas fa-check-circle"></i>
        <p>Активный</p>
    </div>
    </>
  )
}

export default ActiveSignals
