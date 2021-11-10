import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import TradeApp from './pages/TradeApp'
import Instructions from './pages/Instructions'
import TermsOfUse from './pages/TermsOfUse'
import Auth from './pages/Auth'
import History from "./pages/History";
import Description from "./pages/Description"

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
            return (
                <Switch>
                    <Route path="/trade-app" exact>
                        <TradeApp />
                    </Route>
                    <Route path="/history" exact>
                        <History />
                    </Route>
                    <Route path="/instructions" exact>
                        <Instructions />
                    </Route>
                    <Route path="/description" exact>
                        <Description />
                    </Route>
                    <Route path="/terms-of-use" exact>
                        <TermsOfUse />
                    </Route>
                    <Redirect to="/trade-app" />
                </Switch>
            )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <Auth />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}
