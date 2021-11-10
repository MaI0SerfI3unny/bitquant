import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

const UnactiveSignals = (props) => {
  const {el} = props
  const { t } = useTranslation();

  const pay = async () => {
      axios.post(`/api/payments/testPayment`).then((response) => {
          console.log(response)
      }).catch((error) => {
          if (error.response){
              console.log(error.response)
          }else if(error.request){
              console.log(error.request)
          }else if(error.message){
              console.log(error.message)
          }
      })
      // axios.post(`https://bitquant.online/api/payments/paymentStatus`, {data: "test"}).then((response) => {
      //     console.log(response)
      // }).catch((error) => {
      //     if (error.response){
      //         console.log(error.response)
      //     }else if(error.request){
      //         console.log(error.request)
      //     }else if(error.message){
      //         console.log(error.message)
      //     }
      // })
  }
  return(
    <>
    <div className="binance-signals-card-expiration">
        <h1>${el.price}/месяц</h1>
    </div>
    <div className="binance-signals-card-status">
        <button onClick={()=>pay()}>{t('subscribe')}</button>
    </div>
    </>
  )
}

export default UnactiveSignals
