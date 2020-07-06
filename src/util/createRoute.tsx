import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { routeType, routes } from '@page/Home/router';

export const createRouteList = (routeList: routeType[]) => {
    const routeContain: any[] = [];
    let targetRoute = routeList[0];
    if(Array.isArray(targetRoute.children)){
        targetRoute.children.forEach(el => {
            routeContain.push(<Route key={el.path} path={el.path} component={el.component}></Route>)
        })
        routeContain.push(<Redirect key={targetRoute.children[0].path}  to={targetRoute.children[0].path} />)
    }else{
        routeContain.push(<Route key={targetRoute.path} path={targetRoute.path} component={targetRoute.component}></Route>)
        routeContain.push(<Redirect key={targetRoute.path}  to={targetRoute.path} />)
    }


    return routeContain;
}
export const filterRoute = (routePath: string) => {
    const targetRoute = routes.filter(el => el.path === `/home/${routePath}`)

    return targetRoute;
}