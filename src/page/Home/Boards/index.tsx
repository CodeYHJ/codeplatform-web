import React, { Suspense, useCallback, useMemo } from 'react';

// import Info from "@page/Home/User/Info";
import Boards from "@page/Home/Boards/Boards";
import { Route, Redirect, Switch } from 'react-router-dom';
import Loading from '@component/Loading';
import { createRouteList, filterRoute } from '@util/createRoute';

export interface UserProps {

}

const routeList = filterRoute('boards') ;
const routesMap = createRouteList(routeList);

const User: React.SFC<UserProps> = () => {
console.log(routesMap,'111')
    
    return (
        <Suspense fallback={<Loading />}>
            <Switch>
            {/* {routesMap} */}
                {/* <Route path="/home/boards/boards" component={Boards}></Route> */}
                {/* <Route path="/home/boards/form" component={Token}></Route> */}
                {/* <Redirect  to="/home/boards/boards" /> */}
            </Switch>
        </Suspense>
    );
}

export default User;