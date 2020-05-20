import React, { Suspense } from 'react';

import Info from "@page/Home/User/Info";
import Token from "@page/Home/User/Token";
import { Route, Redirect, Switch } from 'react-router-dom';
import Loading from '@component/Loading';

export interface UserProps {

}

const User: React.SFC<UserProps> = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Switch>
                <Route path="/home/user/info" component={Info}></Route>
                <Route path="/home/user/Token" component={Token}></Route>
                <Redirect exact from="/home/user" to="/home/user/info" />
            </Switch>
        </Suspense>
    );
}

export default User;