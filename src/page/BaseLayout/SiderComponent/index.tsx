import React, { useState, useEffect } from 'react';

import { Layout, Menu, Modal } from 'antd';

import { useHistory } from "react-router-dom";

import { routes, routeType } from "@page/Home/router";

import { MyIcon } from '@component/MyIcon';

import SubMenu from 'antd/lib/menu/SubMenu';

import styles from '../index.less'

const { Sider } = Layout;

interface SiderComponentProps {
    hidden: boolean
}

export const SiderComponent: React.SFC<SiderComponentProps> = (props) => {

    const { hidden } = props

    const [className, setClassName] = useState(styles.logo)

    const [selectedKeys, setSelectedKeys] = useState([''])

    const history = useHistory()

    const { location } = history

    useEffect(() => {

        setSelectedKeys([location.pathname])

    }, [location.pathname])

    useEffect(() => {
        if (hidden) {
            setClassName(`${styles.logo} ${styles.logoMin}`)
        } else {
            setClassName(styles.logo)

        }
    }, [hidden])


    const filterClick = ({ key, keyPath }: any) => {

        const auth = localStorage.getItem('user')

        const controllerModal = () => {
            const modal = Modal.confirm({
                content: '你的权限已失效！点击确定将返回登录页面。',
                maskClosable: true,
                okText: '确定',
                onOk() {
                    history.push('/')
                },
                onCancel() {
                    modal.destroy()
                }
            })
        }
        if (!auth) {
            controllerModal()
            return;
        }
        setSelectedKeys(keyPath)

        history.push(key)

    }

    const navHome = () => {
        history.push('/home/chart')
    }

    const handleMenuItem = (route: routeType) => {
        return (
            <Menu.Item key={route.path}>
                <MyIcon type={route.svg} style={{ color: "#ffffff" }} />
                <span>{route.title}</span>
            </Menu.Item>
        )
    }
    const handleSubMenuItem = (route: routeType) => {
        const children = route.children.map(el => {
            return handleMenuItem(el)
        })
        return (
            <SubMenu
                key={route.path}
                data-key={route.path}
                title={
                    <span>
                        <MyIcon type={route.svg} />
                        <span>{route.title}</span>
                    </span>
                }
            >
                {children}
            </SubMenu>
        )
    }
    return (
        <Sider className={styles.sider} theme="light" collapsible collapsed={hidden} trigger={null}>

            <div className={className} onClick={navHome}>CodeYHJ</div>

            <Menu className={styles.Menu}
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["/home/chart"]}
                onClick={filterClick}
                selectedKeys={selectedKeys} >
                {routes.map(item => {
                    if (item.hasOwnProperty('children')) {
                        return handleSubMenuItem(item)
                    } else {
                        return handleMenuItem(item)
                    }
                }
                )}


            </Menu>
        </Sider>
    );
}
