const initialState = {
    isBinanceSettings: false,
    isLogin: true,
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        // case SHOW_LOADER:
        //   return {...state, loading: true}
        case "TOGGLE_BINANCE_SETTINGS":
            return {
                ...state,
                isBinanceSettings: action.isBinanceSettings,
            }
        case "TOGGLE_LOGIN":
            return {
                ...state,
                isLogin: action.isLogin,
            }
        default: return state
    }
}