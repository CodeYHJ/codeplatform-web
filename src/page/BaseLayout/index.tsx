import React, { useEffect, useContext, useState } from 'react';

import { Layout, Modal, Menu, Dropdown } from 'antd';

import { SiderComponent } from './SiderComponent';

import { useLocation, useHistory } from 'react-router-dom';

import { routes as routesList } from '@page/Home/router'

import { UserContext } from '@store/user/userContext';

import { singOut } from '@api/user';

import MenuUnfoldOutlined from "@ant-design/icons/lib/icons/MenuUnfoldOutlined"

import MenuFoldOutlined from "@ant-design/icons/lib/icons/MenuFoldOutlined"

const { Content, Header } = Layout;

import styles from './index.less'
export interface BaseLayoutProps {

}

export const BaseLayout: React.SFC<BaseLayoutProps> = (props) => {

    const history = useHistory()

    const { dispatchForeUser, userStore } = useContext(UserContext)

    const [hidden, setHidden] = useState(false)

    useEffect(() => {

        const auth = localStorage.getItem("user");

        if (!auth) {
            history.replace('/login')
        }

        if (userStore.name === '') {
            dispatchForeUser({ type: 'CHANGE_USER_INFO', playload: JSON.parse(auth) })
        }

    }, [])


    const out = () => {
        const model = Modal.confirm({
            content: '是否确定退出！',
            maskClosable: true,
            okText: '确定',
            onOk() {
                dispatchForeUser({ type: "SIGN_OUT" })
                history.push('/')
                singOut()
            },
            onCancel() {
                model.destroy()
            }
        })

    }
    const menu = () => {
        return (
            <Menu onClick={out}>
                <Menu.Item key="1">Sing Out</Menu.Item>
            </Menu>
        )
    }
    const hiddenIcon = () => {
        if (hidden) {
            return <MenuUnfoldOutlined />
        }
        return <MenuFoldOutlined />
    }

    const onHidden = () => {
        setHidden(!hidden)
    }
    return (

        <Layout className={styles.layoutPage} >

            <SiderComponent hidden={hidden} />

            <Layout>

                <Header className={styles.header}>
                    <div className={styles.hiddenIcon} onClick={onHidden}>
                        {hiddenIcon()}
                    </div>
                    <Dropdown overlay={menu} >
                        <div className={styles.userLogo}>
                            <img className={styles.userLogo_img} src={userStore.avatar_url}></img>
                            <span className={styles.userName}>{userStore.name}</span>
                        </div>
                    </Dropdown>

                </Header>

                <Content className={styles.content} >

                    {props.children}

                </Content>

            </Layout>

        </Layout>
    );
}
