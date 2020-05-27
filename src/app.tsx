import React, { Suspense, lazy } from 'react';

import ReactDom from 'react-dom';

import Provider from "@store/index";

import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";

import { ErrorBoundary } from '@page/ErrorBoundary'

import Loading from "@component/Loading"

import { NotFound } from '@page/NotFound';

import styles from './app.less'


export interface AppProps {

}

const Login = lazy(() => import(/* webpackChunkName: "Login" */"@page/Login/index"))

const Home = lazy(() => import(/* webpackChunkName: "Home" */ "@page/Home/index"))

const Registered = lazy(() => import(/* webpackChunkName: "Registered" */ "@page/Registered/index"))


const App: React.SFC<AppProps> = () => {
    const history = useHistory()
    const auth = localStorage.getItem("user");
    if (!auth) history.replace('/login')

    return (
        <div className={styles.app}>
            <Router>
                <Provider>
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            <Redirect path="/" exact to="/login"></Redirect>
                            <Route path="/login" exact component={Login} />
                            <Route path="/registered" exact component={Registered} />
                            <Route path="/home" component={Home} />
                            <Route component={NotFound} />
                        </Switch>
                    </Suspense>
                </Provider>
            </Router>
        </div>
    );
}

ReactDom.render(<ErrorBoundary><App /></ErrorBoundary>, document.getElementById('app'))

export default App;