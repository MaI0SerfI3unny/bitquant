import axios from "axios";
import _ from "lodash"
import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8'

const currentUrl = "http://localhost:5001/"
//const currentUrl = "https://bitquant.online/"
const binanceUrl = "https://fapi.binance.com/fapi/"
const huobiUrl = "https://api.huobi.pro"

const date = new Date(_.now());
const formatedTimestamp = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + 'T' + (date.getHours()-3) + ':' + date.getMinutes() + ":" + date.getSeconds();


// ========================================================= BINANCE SETTINGS ==================================================================
//                                              THIS FUNCTIONS WE USED ONLY INTO OTHER FUNCTIONS
//                                                           (NOT FOR EXPORT)


const getbinanceHistory = (apiKey,binanceSecret,container) => {
  const unixTimestamp = _.now()
  const datas = "symbol=" + 'ethusdt' +"&timestamp=" + unixTimestamp.toString();
  const signature = hmacSHA256(datas, binanceSecret);
  const headers = {
    'X-MBX-APIKEY': apiKey
  }
axios.get(`${binanceUrl}v1/userTrades?symbol=ethusdt&timestamp=${unixTimestamp.toString()}&signature=${signature}`, { headers: headers })
 .then((data) => {
   container(data);
 }).catch(e => {container('error')})
}

const getBinanceOpenTrade = (apiKey,binanceSecret,container) => {
  const unixTimestamp = _.now()
  const datas = "timestamp=" + unixTimestamp.toString();
  const signature = hmacSHA256(datas, binanceSecret);
  const headers = {
    'X-MBX-APIKEY': apiKey
  }
  axios.get(`${binanceUrl}v1/openOrders?timestamp=${unixTimestamp.toString()}&signature=${signature}`, { headers: headers })
    .then((data) => {
      container([data,'binance']);
    })
}

const getBalanceBinance = (apiKey,binanceSecret,container) => {
  const unixTimestamp = _.now()
  const datas = "recvWindow=50000&timestamp=" + unixTimestamp.toString();
  const signature = hmacSHA256(datas, binanceSecret);
  const headers = {
    'X-MBX-APIKEY': apiKey,
  }
  axios.get(`${binanceUrl}v2/account?recvWindow=50000&timestamp=${unixTimestamp.toString()}&signature=${signature}`,{headers: headers})
    .then((data) => {
      container(data.data.totalWalletBalance)
    })
}

// ==============================================================================================================================================

// ========================================================= HUOBI SETTINGS ==================================================================
//                                              THIS FUNCTIONS WE USED ONLY INTO OTHER FUNCTIONS
//

export const getOpenTradesHuobi = (apiKey, secret, container) => {
  const datas = `GET\napi.huobi.pro\n/v1/account/accounts\nAccessKeyId=${apiKey}&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=${encodeURIComponent(formatedTimestamp.toString())}`;
  const hash = Base64.stringify(hmacSHA256(Utf8.parse(datas), secret));
  const headers = {"Content-Type": "application/json"}
 axios.get(`${huobiUrl}/v1/account/accounts?AccessKeyId=${apiKey}&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=${encodeURIComponent(formatedTimestamp.toString())}&Signature=${encodeURIComponent(hash)}`, {headers: headers})
  .then((data) => {
    if (data.data.status === 'ok') {
      const order_id = data.data.data[0].id;
      const order_query = `GET\napi.huobi.pro\n/v1/order/openOrders\nAccessKeyId=${apiKey}&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=${encodeURIComponent(formatedTimestamp.toString())}`
      const hash_order = Base64.stringify(hmacSHA256(Utf8.parse(order_query), secret));

      axios.get(`${huobiUrl}/v1/order/openOrders?AccessKeyId=${apiKey}&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=${encodeURIComponent(formatedTimestamp.toString())}&Signature=${encodeURIComponent(hash_order)}`, {headers: headers})
      .then((bal) => {
        container([bal,'huobi']);
      })
    }
  })
}

export const getAllHuobiOrders = (apiKey, secret, container) => {
  const datas = `GET\napi.huobi.pro\n/v1/account/accounts\nAccessKeyId=10c19ab1-0a97f992-4fbc9700-edrfhh5h53&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=${encodeURIComponent(formatedTimestamp.toString())}`;
  const hash = Base64.stringify(hmacSHA256(Utf8.parse(datas), "94826d38-44245a1b-126992b7-9a623"));
  const headers = {"Content-Type": "application/json"}
 axios.get(`${huobiUrl}/v1/account/accounts?AccessKeyId=10c19ab1-0a97f992-4fbc9700-edrfhh5h53&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=${encodeURIComponent(formatedTimestamp.toString())}&Signature=${encodeURIComponent(hash)}`, {headers: headers})
  .then((data) => {
    if (data.data.status === 'ok') {
      const order_query = `GET\napi.huobi.pro\n/v1/order/orders\nAccessKeyId=10c19ab1-0a97f992-4fbc9700-edrfhh5h53&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=${encodeURIComponent(formatedTimestamp.toString())}&states=canceled&symbol=adausdt`
      const hash_order = Base64.stringify(hmacSHA256(Utf8.parse(order_query), "94826d38-44245a1b-126992b7-9a623"));

      axios.get(`${huobiUrl}/v1/order/orders?AccessKeyId=10c19ab1-0a97f992-4fbc9700-edrfhh5h53&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=${encodeURIComponent(formatedTimestamp.toString())}&states=canceled&symbol=adausdt&Signature=${encodeURIComponent(hash_order)}`, {headers: headers})
      .then((bal) => {
        console.log(bal);
      //  container([bal,'huobi']);
      })
    }
  })
}

export const getBalanceHuobi = (apiKey, secret, container) => {
  const datas = `GET\napi.huobi.pro\n/v1/account/accounts\nAccessKeyId=afwo04df3f-a7cd18e7-2514c36c-00622&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=${encodeURIComponent(formatedTimestamp.toString())}`;
  const hash = Base64.stringify(hmacSHA256(Utf8.parse(datas), "76b3447f-a484463b-730bfb4f-dabca"));
  const headers = {"Content-Type": "application/json"}
 axios.get(`${huobiUrl}/v1/account/accounts?AccessKeyId=afwo04df3f-a7cd18e7-2514c36c-00622&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=${encodeURIComponent(formatedTimestamp.toString())}&Signature=${encodeURIComponent(hash)}`, {headers: headers})
  .then((data) => {
    if (data.data.status === 'ok') {
      const order_id = data.data.data[0].id;
      const order_query = `GET\napi.huobi.pro\n/v1/account/accounts/${order_id}/balance\nAccessKeyId=afwo04df3f-a7cd18e7-2514c36c-00622&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=${encodeURIComponent(formatedTimestamp.toString())}&currency=ven`
      const hash_order = Base64.stringify(hmacSHA256(Utf8.parse(order_query), "76b3447f-a484463b-730bfb4f-dabca"));

      axios.get(`${huobiUrl}/v1/account/accounts/${order_id}/balance?AccessKeyId=afwo04df3f-a7cd18e7-2514c36c-00622&SignatureMethod=HmacSHA256&SignatureVersion=2&currency=ven&Timestamp=${encodeURIComponent(formatedTimestamp.toString())}&Signature=${encodeURIComponent(hash_order)}`, {headers: headers})
      .then((bal) => {
        console.log(bal);
      //  container([bal,'huobi']);
      })
    }
  })
}

export const userOpenHistory = (id,container,tradeType) => {
  axios.get(currentUrl + `api/auth/keys/${id}`).then((data) => {
   if (data.status === 200) {
     if (data.data.userKeys.length === 1) {
       if (data.data.userKeys[0].apiKey && data.data.userKeys[0].secretKey && data.data.userKeys[0].exchange === "BINANCE") {
         getBinanceOpenTrade(data.data.userKeys[0].apiKey, data.data.userKeys[0].secretKey, container)
       } else if (data.data.userKeys[0].apiKey && data.data.userKeys[0].secretKey && data.data.userKeys[0].exchange === "HUOBI") {
         getOpenTradesHuobi(data.data.userKeys[0].apiKey, data.data.userKeys[0].secretKey, container);
       }
     }else{
       const findType = data.data.userKeys.filter(el => el.exchange === tradeType.toUpperCase());
       if (findType[0].exchange.toUpperCase() === "BINANCE"){ getBinanceOpenTrade(findType[0].apiKey, findType[0].secretKey, container)}
       else if (findType[0].exchange.toUpperCase() === "HUOBI") {
         getOpenTradesHuobi(findType[0].apiKey, findType[0].secretKey, container);
         }
        }
   }
 }).catch(e => {container('error')})
}

// ==============================================================================================================================================


//======================== FUNCTION USED FOR REGISTATION. SENDING NEW USER

export const sendRegister = (form) => {
  return axios.post( currentUrl + 'api/auth/user/register', {name: form.name, email: form.email, password: form.password }
  ).catch((error) => {
    console.log("Something wrong with server");
  })
}
//======================== FUNCTION USED FOR LOGIN. TRYING SIGN IN

export const sendLogin = (form) => {
  return axios.post(currentUrl + 'api/auth/user/login', {email: form.email, password: form.password })
}

//======================== FUNCTION USED FOR TRADEAPP. CHECK DID USER HAVE SOME KEYS FOR MARKET

export const checkKey = (id,password) => {
  return axios.get(currentUrl + `api/auth/keys/${id}?password=${password}`)
  .catch(e => {
     return 401
    })
}

//======================== FUNCTION USED FOR TRADEAPP. CHANGE MARKET AND PUT NEW KEYS

export const sendKey  = (id, binanceApiKey, binanceSecret, type="BINANCE",password) => {
    return axios.post(currentUrl + `api/auth/keys?id=${id}&pass=${password}&exchange=${type}&apiKey=${binanceApiKey}&secretKey=${binanceSecret}`).catch((e) => {
      console.log(e)
    })
}
// THIS FUNCTION WE USED FOR RENDER WALLET INFO (BALANCE)
export const checkBalance = (id,container,tradeType) => {
  axios.get(currentUrl + `api/auth/keys/${id}`).then((data) => {
    if (data.data.userKeys.length === 1) {
      if (data.data.userKeys[0].apiKey && data.data.userKeys[0].secretKey && data.data.userKeys[0].exchange === "BINANCE") {
          getBalanceBinance(data.data.userKeys[0].apiKey, data.data.userKeys[0].secretKey, container)
        }
    }else {
      const findType = data.data.userKeys.filter(el => el.exchange === tradeType.toUpperCase());
      if (findType[0].exchange.toUpperCase() === "BINANCE"){
        getBalanceBinance(findType[0].apiKey, findType[0].secretKey, container)
      }else if (findType[0].exchange.toUpperCase() === "HUOBI") {
          container('error');
        }

    }
  }).catch(e => {console.log("Error Balance")})
}
/// ---------------------------------------------------------------- THIS FUNCTION WE USED FOR OUTPUT TRADE HISTORY FOR BINANCE OR HUOBI
export const userDataHistory =  (id,container,tradeType) => {
   axios.get(currentUrl + `api/auth/keys/${id}`).then((data) => {
    if (data.status === 200) {
      if (data.data.userKeys.length === 1) {
      if (data.data.userKeys[0].apiKey && data.data.userKeys[0].secretKey && data.data.userKeys[0].exchange === "BINANCE") {
        getbinanceHistory(data.data.userKeys[0].apiKey, data.data.userKeys[0].secretKey, container)}
      }else{
        const findType = data.data.userKeys.filter(el => el.exchange === tradeType.toUpperCase());
        if (findType[0].exchange.toUpperCase() === "BINANCE"){ getbinanceHistory(findType[0].apiKey, findType[0].secretKey, container)}
        else if (findType[0].exchange.toUpperCase() === "HUOBI") {
            container('error');
          }
         }
    }
  }).catch(e => {container('error')})
}
// ------------------------------------------------------------------------

export const getTrading = (id,market) => {
  if (market !== undefined) {
  return axios.get(currentUrl+ `api/trading?id=${id}&exchange=${market}`)
}
}

export const postTrading = (id, market, pass, container,error ) => {
  if (market !== undefined) {
  getTrading(id,market).then((res) => {
    axios.post(currentUrl + `api/trading`,
      {
        id: id,
        exchange: market,
        status: !res.data,
        password: pass
      }).then((data) => {
        container(data.data.status);
      }).catch((e) =>{
        error("incorrect");
      })
  })
}
}
