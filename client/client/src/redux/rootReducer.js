import {combineReducers} from 'redux'
import {appReducer} from './appReducer'
import {serverReducer} from './serverReducer'
import {binanceReducer} from './binanceReducer'
import {uiReducer}  from "./uiReducer"

export const rootReducer = combineReducers({
    serverApi: serverReducer,
    binanceApi: binanceReducer,
    uiApi: uiReducer,
    appApi: appReducer
})