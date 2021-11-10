const initialState = {
    serverWs: null,
    serverWsConnected: false,
    serverWsUrl: "wss://bitquant.online",//"ws://23.105.248.184:5000",//"ws://localhost:5000",//"ws://23.105.231.112:5000"bitquant.online
    active_strategy:{},
    userData:{}
}

export const serverReducer = (state = initialState, action) => {
    switch (action.type) {
        // case SHOW_LOADER:
        //   return {...state, loading: true}
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