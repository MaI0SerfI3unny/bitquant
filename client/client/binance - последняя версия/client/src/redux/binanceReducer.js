const initialState = {
    binanceWs: null,
    binanceWsConnected: false,
    binanceWsUrl: "wss://fstream.binance.com/ws",
    binanceOrderUrl: "https://fapi.binance.com/fapi/v1/order",
    binanceSecret: "",//"PztXRVeyCnpIVzgUez2l1Wwi8egN0Us4UjYJNE6dMKOydxc5jDfOFDFGfq9VwpNK",//"7K2OaRlDiZBzMA0SM5nURCnseFv3qdMjpnByyY04e9KEutI22MYMhUGKLAtOrkC4",
    binanceApiKey: "",//"Aphy0kcR0Eyattd1Mn4OL6Xzszb27x8IdwmbzLvUhRcJCAwspsnA3Twmnjuidbc3",//"3nj4UCoZQ2K2tvYUMtxUt9jL0aTOc59nY0F6B0WJmzRUioFPTAOPcQVjllVb1VHN",
    isBinanceKeyValid: false,
    balance: 0,
    binanceOpenTrades:[],
    binanceHistoryTrades:[],
    iter: [0],
    datas: [0],
    itercount: 0,
    profit: 0,
    wintrades: 0,
    losstrades: 0,
    alltrades: 0,
    averagewin: 0,
    averageloss: 0,
    winrate: 0,
    isBinanceTradeStarted: false,
    sessionTime: 0
}

export const binanceReducer = (state = initialState, action) => {
    switch (action.type) {
        // case SHOW_LOADER:
        //   return {...state, loading: true}
        case "CREATE_BINANCE_WS":
            return {
                ...state,
                binanceWs: action.ws,
            }
        case "CHANGE_BINANCE_WS_CONNECTED":
            return {
                ...state,
                binanceWsConnected: action.connected
            }
        case "BINANCE_OPEN_TRADES_UPDATE":
            return {
                ...state,
                binanceOpenTrades: [...action.trades]
            }
        case "BINANCE_HISTORY_TRADES_UPDATE":
            return {
                ...state,
                binanceHistoryTrades: [...action.trades]
            }
        case "BINANCE_CHART_DATA_UPDATE":
            return {
                ...state,
                iter: [...action.iter],
                datas: [...action.datas],
                profit: action.profit,
                wintrades: action.wintrades,
                losstrades: action.losstrades,
                alltrades: action.alltrades,
                averagewin: action.averagewin,
                averageloss: action.averageloss,
                winrate: action.winrate,
            }
        case "BINANCE_BALANCE_UPDATE":
            return {
                ...state,
                balance: action.balance,
            }
        case "BINANCE_API_KEY_CHANGE":
            return {
                ...state,
                binanceApiKey: action.binanceApiKey,
            }
        case "BINANCE_SECRET_CHANGE":
            return {
                ...state,
                binanceSecret: action.binanceSecret,
            }
        case "CHANGE_BINANCE_KEY_VALID":
            return {
                ...state,
                isBinanceKeyValid: action.isBinanceKeyValid,
                binanceApiKey: action.binanceApiKey,
                binanceSecret: action.binanceSecret,
            }
        case "TOGGLE_BINANCE_TRADE_STARTED":
            return {
                ...state,
                isBinanceTradeStarted: action.isBinanceTradeStarted,
            }
        case "CHANGE_SESSION_TIME":
            return {
                ...state,
                sessionTime: action.sessionTime,
            }
        default: return state
    }
}