
import React from 'react';

import { RouteProps } from 'react-router-dom';

export const User = React.lazy(() => import(/* webpackChunkName: "User" */ "@page/Home/User/index"))

export const Info = React.lazy(() => import(/* webpackChunkName: "Info" */ "@page/Home/User/Info/index"))

export const Token = React.lazy(() => import(/* webpackChunkName: "Token" */ "@page/Home/User/Token/index"))

export const Chart = React.lazy(() => import(/* webpackChunkName: "Chart" */ "@page/Home/Chart/index"))

export const Task = React.lazy(() => import(/* webpackChunkName: "NewTask" */ "@page/Home/Task/index"))


export interface routeType extends RouteProps {
    title: string,
    exact?: boolean
    path: string,
    svg: string,
    children?: routeType[],
    component?: React.LazyExoticComponent<React.SFC<{}>>
}

export const routes: routeType[] = [
    { path: "/home/chart", title: "工作台", svg: "icon-tongji", component: Chart },
    { path: "/home/Task", title: "任务", svg: "icon-renwu1", component: Task },
    {
        path: '/home/user',
        svg: "icon-yonghu",
        title: 'User',
        component: User,
        children: [
            { path: "/home/user/info", title: "用户", svg: "icon-yonghu", component: Info },
            { path: "/home/user/token", title: "Token", svg: "icon-ziyuan", component: Token },
        ]
    },
];
