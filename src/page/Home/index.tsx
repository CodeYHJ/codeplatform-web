import React, { Suspense } from 'react';

import Loading from "@component/Loading"

import { Route, Switch, Redirect } from 'react-router-dom';

import { BaseLayout } from '@page/BaseLayout';

import { routes } from './router'

import { NotFound } from '@page/NotFound';

export interface HomeProps {
    routes: Route[]
}

const Home: React.SFC<HomeProps> = () => {
    return (
        <BaseLayout>
            <Suspense fallback={<Loading />}>
                <Switch>
                    {routes.map((route, index) => {
                        return <Route key={`subs${index}`} component={route.component} path={route.path}></Route>
                    })}

                    <Redirect exact from="/home" to="/home/chart" />

                    <Route component={NotFound}></Route>
                </Switch>
            </Suspense>
        </BaseLayout>
    )
}

export default Home;