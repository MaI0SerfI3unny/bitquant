const initialState = {
    //binance data
    binanceWs: null,
    binanceWsConnected: false,
    binanceWsUrl: "wss://fstream.binance.com/ws",
    binanceOrderUrl: "https://fapi.binance.com/fapi/v1/order",
    binanceSecret: "7K2OaRlDiZBzMA0SM5nURCnseFv3qdMjpnByyY04e9KEutI22MYMhUGKLAtOrkC4",//"7K2OaRlDiZBzMA0SM5nURCnseFv3qdMjpnByyY04e9KEutI22MYMhUGKLAtOrkC4","PztXRVeyCnpIVzgUez2l1Wwi8egN0Us4UjYJNE6dMKOydxc5jDfOFDFGfq9VwpNK"
    binanceApiKey: "3nj4UCoZQ2K2tvYUMtxUt9jL0aTOc59nY0F6B0WJmzRUioFPTAOPcQVjllVb1VHN",//"3nj4UCoZQ2K2tvYUMtxUt9jL0aTOc59nY0F6B0WJmzRUioFPTAOPcQVjllVb1VHN","Aphy0kcR0Eyattd1Mn4OL6Xzszb27x8IdwmbzLvUhRcJCAwspsnA3Twmnjuidbc3"
    //server data
    serverWs: "wss://bitquant.online/ws/",
    serverWsConnected: false,
    serverWsUrl: "wss://bitquant.online/ws/",//"ws://23.105.248.184:5000",//"ws://localhost:5000",//"ws://23.105.231.112:5000"
    //app data
    active_strategy:{},
}

export const appReducer = (state = initialState, action) => {
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
        case "CREATE_SERVER_WS":
            return {
                ...state,
                serverWs: action.ws,
            }
        case "CHANGE_SERVER_WS_CONNECTED":
            return {
                ...state,
                serverWsConnected: action.connected
            }
        case "ACTIVE_STRATEGY_CHANGE":
            return {
                ...state,
                active_strategy: action.active_strategy
            }
        case "CHANGE_USER_DATA":
            return {
                ...state,
                userData: {...action.userData}
            }
        default: return state
    }
}
