import React, { Suspense, lazy } from 'react';

import ReactDom from 'react-dom';

import Provider from "@store/index";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { ErrorBoundary } from '@page/ErrorBoundary'

import Loading from "@component/Loading"

import { NotFound } from '@page/NotFound';

import styles from './app.less'


export interface AppProps {

}

const Transition = lazy(() => import(/* webpackChunkName: "Transition" */"@page/Transition/index"))

const Login = lazy(() => import(/* webpackChunkName: "Login" ,webpackPrefetch: true*/"@page/Login/index"))

const Home = lazy(() => import(/* webpackChunkName: "Home" ,webpackPrefetch: true*/ "@page/Home/index"))

const Registered = lazy(() => import(/* webpackChunkName: "Registered" ,webpackPrefetch: true*/ "@page/Registered/index"))


const App: React.SFC<AppProps> = () => {
    return (
        <div className={styles.app}>
            <Router>
                <Provider>
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            <Route path="/" exact component={Transition}></Route>
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