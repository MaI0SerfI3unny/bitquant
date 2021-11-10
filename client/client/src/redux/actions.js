import _ from "lodash"
import hmacSHA256 from "crypto-js/hmac-sha256";
import axios from "axios";


export function createBinanceWs() {
    return async (dispatch, getState) => {
        const { binanceWsUrl } = getState().binanceApi;
        return new Promise(async function (resolve, reject) {
            const ws = new WebSocket(binanceWsUrl)
            ws.onopen = (event) => {
                dispatch({
                    type: "CHANGE_BINANCE_WS_CONNECTED",
                    connected: true
                })
                console.log("binance connect to socket api")
            }
            ws.onclose = (event) => {
                dispatch({
                    type: "CHANGE_BINANCE_WS_CONNECTED",
                    connected: false
                })
                console.log("binance socket api closed")
            }
            ws.onmessage = (data) =>{
                console.log(data)
            }
            await dispatch({
                type: "CREATE_BINANCE_WS",
                ws: ws
            })
            return resolve("success");
        });
    };
}
export function createServerWs() {
    return async (dispatch, getState) => {
        const { serverWs, serverWsUrl } = getState().serverApi;
    //    const socket = new WebSocket(serverWsUrl)
      const socket = !serverWs
           ? require('socket.io-client')(serverWsUrl)//"http://botmarket24.online:2222"//("ws://23.105.248.184:55441/")("ws://localhost:55441/")//http://localhost:5000//https://botmarket24.online
            : serverWs;
            //, { transports: ['websocket'], query: `name=123`, secure: false, rejectUnauthorized: false }
        console.log("server ws api connected")
        await dispatch({
            type: "CREATE_SERVER_WS",
            ws: socket
        })
        if (!serverWs) {
            socket.on("room", function (data) {
                console.log(data);
            });
            socket.on("connect_error", error => {
                console.log("server ws api connection error: " + error)
                //dispatch(ServerApiInitSuccess(null));
            });
            socket.on("connect_timeout", timeout => {
                console.log("server ws api timeout: " + timeout)
                //dispatch(ServerApiInitSuccess(null));
            });
            socket.on("error", error => {
                console.log("server ws api error: " + error)
                //dispatch(ServerApiInitSuccess(null));
            });
            socket.on("close", data => {
                console.log("server ws api closed: " + data)
                dispatch({
                    type: "CHANGE_SERVER_WS_CONNECTED",
                    connected: false
                })
                //dispatch(ServerApiInitSuccess(null));
            });
            await new Promise(function (resolve, reject) {
                socket.on("connect", function (connect) {
                    console.log("server ws api connect");
                    //dispatch(ServerApiInitSuccess(socket));
                    dispatch({
                        type: "CHANGE_SERVER_WS_CONNECTED",
                        connected: true
                    })
                    resolve("success");
                });
            });
        } //else return dispatch(ServerApiInitSuccess(socket));
    };
}

export function positionRisk(symbol) {
    return (dispatch, getState) => {
        const {binanceSecret, binanceApiKey} = getState().binanceApi;
        const unixTimestamp = _.now()
        const datas = "symbol=" + symbol + "&timestamp=" + unixTimestamp.toString();
        const signature = hmacSHA256(datas, binanceSecret);
        const headers = {
            //'Content-Type': "application/json",//'application/x-www-form-urlencoded',
            'X-MBX-APIKEY': binanceApiKey
        }
        return axios.get(`https://fapi.binance.com/fapi/v2/positionRisk?symbol=${symbol}&timestamp=${unixTimestamp.toString()}&signature=${signature}`,
            {
                headers: headers
            }).then((response) => {
            console.log(response)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
            } else if (error.request) {
                console.log(error.request)
            } else if (error.message) {
                console.log(error.message)
            }
        })
    }
}
export function positionRiskAll() {
    return (dispatch, getState) => {
        const {binanceSecret, binanceApiKey} = getState().binanceApi;
        const unixTimestamp = _.now()
        const datas = "timestamp=" + unixTimestamp.toString();
        const signature = hmacSHA256(datas, binanceSecret);
        const headers = {
            //'Content-Type': "application/json",//'application/x-www-form-urlencoded',
            'X-MBX-APIKEY': binanceApiKey
        }
        return axios.get(`https://fapi.binance.com/fapi/v2/positionRisk?timestamp=${unixTimestamp.toString()}&signature=${signature}`,
            {
                headers: headers
            }).then((response) => {
            console.log(response)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
            } else if (error.request) {
                console.log(error.request)
            } else if (error.message) {
                console.log(error.message)
            }
        })
    }
}


async function historyData(binanceApiKey, binanceSecret, symbol) {
        const unixTimestamp = _.now()
        const datas = "recvWindow=50000&symbol=" + symbol +"&timestamp=" + unixTimestamp.toString();
        const signature = hmacSHA256(datas, binanceSecret);
        const headers = {
            //'Content-Type': "application/json",//'application/x-www-form-urlencoded',
            'X-MBX-APIKEY': binanceApiKey
        }
        const [res] = await Promise.all([axios.get(`https://fapi.binance.com/fapi/v1/userTrades?recvWindow=50000&symbol=${symbol}&timestamp=${unixTimestamp.toString()}&signature=${signature}`,
             {
                headers: headers
            }).catch((error) => {
            if (error.response) {
                console.log(error.response)
            } else if (error.request) {
                console.log(error.request)
            } else if (error.message) {
                console.log(error.message)
            }})])
        return res
}
async function historyData2(binanceApiKey, binanceSecret, symbol, from) {
    const unixTimestamp = _.now()
    const datas = "symbol=" + symbol + "&startTime=" + from +"&timestamp=" + unixTimestamp.toString();
    const signature = hmacSHA256(datas, binanceSecret);
    const headers = {
        //'Content-Type': "application/json",//'application/x-www-form-urlencoded',
        'X-MBX-APIKEY': binanceApiKey
    }
    const [res] = await Promise.all([axios.get(`https://fapi.binance.com/fapi/v1/userTrades?symbol=${symbol}&startTime=now&timestamp=${unixTimestamp.toString()}&signature=${signature}`,
        {
            headers: headers
        }).catch((error) => {
        if (error.response) {
            console.log(error.response)
        } else if (error.request) {
            console.log(error.request)
        } else if (error.message) {
            console.log(error.message)
        }})])
    return res
}

export function balanceData() {
    return (dispatch, getState) => {
        const { binanceSecret, binanceApiKey } = getState().binanceApi;
        const unixTimestamp = _.now()
        const datas = "recvWindow=50000&timestamp=" + unixTimestamp.toString();
        const signature = hmacSHA256(datas, binanceSecret);
        const headers = {
            //'Content-Type': "application/json",//'application/x-www-form-urlencoded',
            'X-MBX-APIKEY': binanceApiKey
        }
        return axios.get(`https://fapi.binance.com/fapi/v2/balance?recvWindow=50000&timestamp=${unixTimestamp.toString()}&signature=${signature}`,
            {
                headers: headers
            }).then((response) => {
        }).catch((error) => {
            if (error.response){
                console.log(error.response)
            }else if(error.request){
                console.log(error.request)
            }else if(error.message){
                console.log(error.message)
            }
        })
    };
}
export function accountData() {
    return (dispatch, getState) => {
        const { binanceSecret, binanceApiKey } = getState().binanceApi;
        const unixTimestamp = _.now()
        const datas = "recvWindow=50000&timestamp=" + unixTimestamp.toString();
        const signature = hmacSHA256(datas, binanceSecret);
        const headers = {
            //'Content-Type': "application/json",//'application/x-www-form-urlencoded',
            'X-MBX-APIKEY': binanceApiKey
        }
        return axios.get(`https://fapi.binance.com/fapi/v2/account?recvWindow=50000&timestamp=${unixTimestamp.toString()}&signature=${signature}`,
            {
                headers: headers
            }).then((response) => {
            console.log(response)
                dispatch({
                type: "BINANCE_BALANCE_UPDATE",
                balance: response.data.availableBalance
            })
        }).catch((error) => {
            if (error.response){
                console.log(error.response)
            }else if(error.request){
                console.log(error.request)
            }else if(error.message){
                console.log(error.message)
            }
        })
    };
}

async function openOrder(binanceOrderUrl, binanceSecret, binanceApiKey, symbol, side, quant) {
    const unixTimestamp = _.now()
    const amount = quant.toString().replace(",",".")
    const datas = "recvWindow=50000&symbol="+ symbol + "&side="+side.toString().toUpperCase()+"&type=MARKET&quantity="+amount+"&timestamp=" + unixTimestamp.toString();
    const signature = hmacSHA256(datas, binanceSecret);
    const headers = {
        //'Content-Type': "application/json",//'application/x-www-form-urlencoded',
        'X-MBX-APIKEY': binanceApiKey
    }
    const params = new URLSearchParams()
    params.append('recvWindow','50000')
    params.append('symbol', symbol)
    params.append('side', side.toString().toUpperCase())
    params.append('type', "MARKET")
    params.append('quantity', amount)
    params.append('timestamp', unixTimestamp.toString())
    params.append('signature', signature.toString())
    const [res] = await Promise.all([axios.post(binanceOrderUrl,
        params, {
            headers: headers
        }).catch((error) => {
        if (error.response) {
            console.log(error.response)
        } else if (error.request) {
            console.log(error.request)
        } else if (error.message) {
            console.log(error.message)
        }})])
    return res
    // axios.post(binanceOrderUrl,
    //     params, {
    //         headers: headers
    //     }).then((response) => {
    //         console.log("after send: " + _.now())
    //         console.log(response)
    //         // if(response.status===200){
    //         //     historyData(binanceApiKey,binanceSecret, "btcusdt")
    //         // }
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

export function ServerApiUserStrategyChange(strategy) {
    return async (dispatch, getState) => {
        const { serverWs, active_strategy } = getState().serverApi;
        await serverWs.off(active_strategy.name)
        await dispatch({
            type: "ACTIVE_STRATEGY_CHANGE",
            active_strategy: strategy
        });
        await dispatch({
            type: "CHANGE_SESSION_TIME",
            sessionTime: _.now()
        });
        return new Promise(function (resolve, reject) {
            serverWs.on(strategy.name, async function (data) {
                const { binanceOrderUrl, binanceSecret, binanceApiKey, binanceOpenTrades, binanceHistoryTrades, isBinanceTradeStarted, sessionTime } = getState().binanceApi
                if(isBinanceTradeStarted) {
                    if (data.data.command === "open_trade") {
                        console.log("opening trade...")
                        const res = await openOrder(binanceOrderUrl, binanceSecret, binanceApiKey, data.data.symbol, data.data.type, data.data.lot);
                        //console.log("after send")
                        if (res) {
                            console.log(res)
                            const history = await historyData(binanceApiKey, binanceSecret, data.data.symbol)
                            let buy_res_open = _.filter(history.data, function (el) {
                                return parseFloat(el.realizedPnl) === 0 && el.side === "BUY"
                            })
                            let sell_res_open = _.filter(history.data, function (el) {
                                return parseFloat(el.realizedPnl) === 0 && el.side === "SELL"
                            })
                            let buy_res_close = _.filter(history.data, function (el) {
                                return parseFloat(el.realizedPnl) !== 0 && el.side === "SELL"
                            })
                            let sell_res_close = _.filter(history.data, function (el) {
                                return parseFloat(el.realizedPnl) !== 0 && el.side === "BUY"
                            })
                            let buy_res_open_amount = _.sumBy(buy_res_open, function (o) {
                                return parseFloat(o.qty)
                            })
                            let sell_res_open_amount = _.sumBy(sell_res_open, function (o) {
                                return parseFloat(o.qty)
                            })
                            let buy_res_close_amount = _.sumBy(buy_res_close, function (o) {
                                return parseFloat(o.qty)
                            })
                            let sell_res_close_amount = _.sumBy(sell_res_close, function (o) {
                                return parseFloat(o.qty)
                            })
                            let a = (parseFloat(buy_res_open_amount).toFixed(3) - parseFloat(buy_res_close_amount).toFixed(3))
                            let b = (parseFloat(sell_res_open_amount).toFixed(3) - parseFloat(sell_res_close_amount).toFixed(3))
                            if(a>0.0001){
                                let arr = []//binanceOpenTrades
                                arr.push({
                                    symbol: data.data.symbol,
                                    type: data.data.type,
                                    lot: parseFloat(a).toFixed(3),
                                    time: _.now()
                                })
                                await dispatch({
                                    type: "BINANCE_OPEN_TRADES_UPDATE",
                                    trades: arr
                                });
                            }
                            else if(b>0.0001){
                                let arr = []//binanceOpenTrades
                                arr.push({
                                    symbol: data.data.symbol,
                                    type: data.data.type,
                                    lot: parseFloat(b).toFixed(3),
                                    time: _.now()
                                })
                                await dispatch({
                                    type: "BINANCE_OPEN_TRADES_UPDATE",
                                    trades: arr
                                });
                            }
                            else{
                                let arr = []//binanceOpenTrades
                                await dispatch({
                                    type: "BINANCE_OPEN_TRADES_UPDATE",
                                    trades: arr
                                });
                            }
                            // let arr2 = binanceHistoryTrades
                            // arr2.push({
                            //     symbol: data.data.symbol,
                            //     type: data.data.type,
                            //     lot: data.data.lot,
                            //     result: 0,
                            //     time: _.now()
                            // })
                            // await dispatch({
                            //     type: "BINANCE_HISTORY_TRADES_UPDATE",
                            //     trades: arr2
                            // });
                        } else {
                            console.log("Open trade error. See browser console")
                        }
                    } else if (data.data.command === "close_trade" && binanceOpenTrades.length>0) {
                        console.log("closing trade...")
                        const res = await openOrder(binanceOrderUrl, binanceSecret, binanceApiKey, data.data.symbol, data.data.type, data.data.lot);
                        if (res) {
                            console.log(res)
                            // let arr = binanceOpenTrades
                            // arr = _.filter(arr, (o) => o.symbol !== data.data.symbol)
                            // await dispatch({
                            //     type: "BINANCE_OPEN_TRADES_UPDATE",
                            //     trades: arr
                            // });
                            const history = await historyData(binanceApiKey, binanceSecret, data.data.symbol)
                            let buy_res_open = _.filter(history.data, function (el) {
                                return parseFloat(el.realizedPnl) === 0 && el.side === "BUY"
                            })
                            let sell_res_open = _.filter(history.data, function (el) {
                                return parseFloat(el.realizedPnl) === 0 && el.side === "SELL"
                            })
                            let buy_res_close = _.filter(history.data, function (el) {
                                return parseFloat(el.realizedPnl) !== 0 && el.side === "SELL"
                            })
                            let sell_res_close = _.filter(history.data, function (el) {
                                return parseFloat(el.realizedPnl) !== 0 && el.side === "BUY"
                            })
                            let buy_res_open_amount = _.sumBy(buy_res_open, function (o) {
                                return parseFloat(o.qty)
                            })
                            let sell_res_open_amount = _.sumBy(sell_res_open, function (o) {
                                return parseFloat(o.qty)
                            })
                            let buy_res_close_amount = _.sumBy(buy_res_close, function (o) {
                                return parseFloat(o.qty)
                            })
                            let sell_res_close_amount = _.sumBy(sell_res_close, function (o) {
                                return parseFloat(o.qty)
                            })
                            let a = (parseFloat(buy_res_open_amount).toFixed(3) - parseFloat(buy_res_close_amount).toFixed(3))
                            let b = (parseFloat(sell_res_open_amount).toFixed(3) - parseFloat(sell_res_close_amount).toFixed(3))
                            if(a>0.0001){
                                let arr = []//binanceOpenTrades
                                arr.push({
                                    symbol: data.data.symbol,
                                    type: data.data.type,
                                    lot: parseFloat(a).toFixed(3),
                                    time: _.now()
                                })
                                await dispatch({
                                    type: "BINANCE_OPEN_TRADES_UPDATE",
                                    trades: arr
                                });
                            }
                            else if(b>0.0001){
                                let arr = []//binanceOpenTrades
                                arr.push({
                                    symbol: data.data.symbol,
                                    type: data.data.type,
                                    lot: parseFloat(b).toFixed(3),
                                    time: _.now()
                                })
                                await dispatch({
                                    type: "BINANCE_OPEN_TRADES_UPDATE",
                                    trades: arr
                                });
                            }
                            else{
                                let arr = []//binanceOpenTrades
                                await dispatch({
                                    type: "BINANCE_OPEN_TRADES_UPDATE",
                                    trades: arr
                                });
                            }
                            if (history) {
                                console.log("session time: " + sessionTime)
                                console.log(history)
                                let history_data = []
                                for (let i = history.data.length - 1; i >= 0; i--) {
                                    if (history.data[i].symbol === data.data.symbol.toUpperCase()) {
                                        if (history.data[i].time >= sessionTime && parseFloat(history.data[i].realizedPnl) !== 0) {
                                            console.log(history.data[i])
                                            history_data.push(history.data[i])
                                            //break
                                        }
                                    }
                                }
                                console.log(history_data)
                                let arr2 = []//binanceHistoryTrades
                                for(let el of history_data){
                                    arr2.push({
                                        symbol: el.symbol,
                                        type: el.side === "BUY" ? "Buy" : "Sell",
                                        lot: el.qty,
                                        result: el.realizedPnl,
                                        time: el.time
                                    })
                                }
                                console.log(arr2)
                                // arr2.push({
                                //     symbol: history_data.symbol,
                                //     type: history_data.side === "BUY" ? "Buy" : "Sell",
                                //     lot: history_data.qty,
                                //     result: history_data.realizedPnl,
                                //     time: _.now()
                                // })
                                await dispatch({
                                    type: "BINANCE_HISTORY_TRADES_UPDATE",
                                    trades: arr2
                                });
                                let iter = []
                                let datas = []
                                let itercount = 0
                                let profit = 0
                                let wintrades = 0
                                let losstrades = 0
                                let alltrades = 0
                                let averagewin = 0
                                let averageloss = 0
                                let p = 0
                                let l = 0
                                let winrate = 0
                                iter.push(0)
                                datas.push(0)
                                if (arr2.length > 0) {
                                    let trades = arr2
                                    trades.sort((a, b) => (a.time - b.time));
                                    for (let el of trades) {
                                        if (el.result !== 0) {
                                            itercount++
                                            profit += parseFloat(el.result)
                                            console.log(profit)
                                            iter.push(itercount)
                                            datas.push(profit)
                                            if (el.result > 0) {
                                                wintrades++
                                                p += parseFloat(el.result)
                                            } else if (el.result < 0) {
                                                losstrades++
                                                l += parseFloat(el.result)
                                            }
                                            alltrades++
                                        }
                                    }
                                }
                                averagewin = (wintrades > 0) ? p / wintrades : 0
                                averageloss = (losstrades > 0) ? l / losstrades : 0
                                winrate = (wintrades > 0) ? wintrades / alltrades * 100 : 0
                                await dispatch({
                                    type: "BINANCE_CHART_DATA_UPDATE",
                                    iter,
                                    datas,
                                    profit,
                                    wintrades,
                                    losstrades,
                                    alltrades,
                                    averagewin,
                                    averageloss,
                                    winrate
                                });
                            } else {
                                console.log("Error get history function. See console")
                            }
                        } else {
                            console.log("Close trade error. See browser console")
                        }
                    }
                    dispatch(accountData())
                }
            });
            resolve("strategy change success")
        });
    };
}

export function toggleBinanceSettings() {
    return (dispatch, getState) => {
        const { isBinanceSettings } = getState().uiApi;
        dispatch({
            type: "TOGGLE_BINANCE_SETTINGS",
            isBinanceSettings: !isBinanceSettings
        })
    };
}

export function toggleLogin() {
    return (dispatch, getState) => {
        const { isLogin } = getState().uiApi;
        dispatch({
            type: "TOGGLE_LOGIN",
            isLogin: !isLogin
        })
    };
}
export function toggleBinanceTradeStarted() {
    return (dispatch, getState) => {
        const { isBinanceTradeStarted } = getState().binanceApi;
        dispatch({
            type: "TOGGLE_BINANCE_TRADE_STARTED",
            isBinanceTradeStarted: !isBinanceTradeStarted
        })
    };
}
export function changeBinanceApiKey(event) {
    return (dispatch, getState) => {
        dispatch({
            type: "BINANCE_API_KEY_CHANGE",
            binanceApiKey: event.target.value
        })
    };
}
export function changeBinanceSecret(event) {
    return (dispatch, getState) => {
        dispatch({
            type: "BINANCE_SECRET_CHANGE",
            binanceSecret: event.target.value
        })
    };
}
export function changeBinanceKeyValid(key, secret) {
    return async (dispatch, getState) => {
        //const {binanceSecret, binanceApiKey } = getState().binanceApi
        //historyData(binanceApiKey,binanceSecret, "btcusdt")//
        if(key) {
            // const history = await historyData(key, secret, "ethusdt")
            // let buy_res_open = _.filter(history.data, function (el) {
            //     return parseFloat(el.realizedPnl) === 0 && el.side === "BUY"
            // })
            // let sell_res_open = _.filter(history.data, function (el) {
            //     return parseFloat(el.realizedPnl) === 0 && el.side === "SELL"
            // })
            // let buy_res_close = _.filter(history.data, function (el) {
            //     return parseFloat(el.realizedPnl) !== 0 && el.side === "SELL"
            // })
            // let sell_res_close = _.filter(history.data, function (el) {
            //     return parseFloat(el.realizedPnl) !== 0 && el.side === "BUY"
            // })
            // let buy_res_open_amount = _.sumBy(buy_res_open, function (o) {
            //     return parseFloat(o.qty)
            // })
            // let sell_res_open_amount = _.sumBy(sell_res_open, function (o) {
            //     return parseFloat(o.qty)
            // })
            // let buy_res_close_amount = _.sumBy(buy_res_close, function (o) {
            //     return parseFloat(o.qty)
            // })
            // let sell_res_close_amount = _.sumBy(sell_res_close, function (o) {
            //     return parseFloat(o.qty)
            // })
            // let a = (parseFloat(buy_res_open_amount).toFixed(3) - parseFloat(buy_res_close_amount).toFixed(3))
            // let b = (parseFloat(sell_res_open_amount).toFixed(3) - parseFloat(sell_res_close_amount).toFixed(3))
            // if(a>0.0001)console.log("Open buy volume:" + parseFloat(a).toFixed(3))
            // if(b>0.0001)console.log("Open sell volume:" + parseFloat(b).toFixed(3))

            // console.log(b)
            // console.log("Open buy amount: " + a)
            // console.log(sell_res_close)
            // console.log(sell_res_close_amount)
            // console.log("Open buy amount: " + (buy_res_open_amount-buy_res_close_amount))
            // console.log("Open sell amount: " + (sell_res_open_amount-sell_res_close_amount))
        }

        const unixTimestamp = _.now()
        const datas = "recvWindow=50000&timestamp=" + unixTimestamp.toString();
        const signature = hmacSHA256(datas, secret);
        const headers = {
            //'Content-Type': "application/json",//'application/x-www-form-urlencoded',
            'X-MBX-APIKEY': key
        }
        return new Promise((resolve, reject)=>
            axios.get(`https://fapi.binance.com/fapi/v2/account?recvWindow=50000&timestamp=${unixTimestamp.toString()}&signature=${signature}`,
            {
                headers: headers
            }).then((response) => {
                console.log(response)
                dispatch({
                    type: "BINANCE_BALANCE_UPDATE",
                    balance: response.data.availableBalance
                })
                dispatch({
                    type: "CHANGE_BINANCE_KEY_VALID",
                    isBinanceKeyValid: true,
                    binanceApiKey: key,
                    binanceSecret: secret
                })
                //dispatch(positionRisk("btcusdt"))
                //dispatch(positionRiskAll())
                dispatch(accountData())
                resolve("success")
            }).catch((error) => {
                reject("error")
                if (error.response){
                    console.log(error.response)
                }else if(error.request){
                    console.log(error.request)
                }else if(error.message){
                    console.log(error.message)
                }
            })
        )
    };
}
export function getUserData(id) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject)=>
            axios.post(`/api/users/getUserData`,{id}).then((response) => {
                console.log(response)
                if(response.data.keyData){
                    dispatch(changeBinanceKeyValid(response.data.keyData.binanceApiKey, response.data.keyData.binanceSecret))
                }
                else{
                    console.log("keys off")
                }
                dispatch({
                    type: "CHANGE_USER_DATA",
                    userData: response.data.userData,
                })
                resolve("success")
            }).catch((error) => {
                reject("error")
                if (error.response){
                    console.log(error.response)
                }else if(error.request){
                    console.log(error.request)
                }else if(error.message){
                    console.log(error.message)
                }
            })
        )
    };
}
export function updateBinanceKeys() {
    return (dispatch, getState) => {
        const {binanceSecret, binanceApiKey} = getState().binanceApi
        const {userData} = getState().serverApi
        console.log(userData._id)
        return new Promise((resolve, reject)=>
            axios.post(`/api/users/updateBinanceKeys`,{id: userData._id, binanceSecret, binanceApiKey}).then((response) => {
                console.log(response)

                resolve("success")
            }).catch((error) => {
                reject("error")
                if (error.response){
                    console.log(error.response)
                }else if(error.request){
                    console.log(error.request)
                }else if(error.message){
                    console.log(error.message)
                }
            })
        )
    };
}
