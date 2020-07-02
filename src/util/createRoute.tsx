import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { routeType, routes } from '@page/Home/router';

export const createRouteList = (routeList: routeType[]) => {
    const routeContain: any[] = [];
    // const redirect = (<Redirect key={routeList[0].path}  to={routeList[0].path} />)
    routeList.forEach(el => {
        const route = <Route key={el.path} path={el.path} component={el.component}></Route>
        routeContain.push(route)
    })
    // routeContain.push(redirect)
    return routeContain;
}
export const filterRoute = (routePath:string)=>{
   const targetRoute= routes.filter(el=>el.path===`/home/${routePath}`)
   return targetRoute;
}