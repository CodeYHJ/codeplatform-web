import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import Loading from '@component/Loading';
import { createRouteList, filterRoute } from '@util/createRoute';
export interface UserProps {

}
const routeList = filterRoute('user')
const routesMap = createRouteList(routeList);
const User: React.SFC<UserProps> = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Switch>

                {routesMap}

            </Switch>
        </Suspense>
    );
}

export default User;