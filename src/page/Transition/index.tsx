import React, { useEffect, useContext, useState } from 'react';
import logo from "@img/myLogo.png"
import styles from './index.less'
import { Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { UserContext } from '@store/user/userContext';
import { MyIcon } from '@page/component/MyIcon';
export interface TransitionProps {

}

const Transition: React.SFC<TransitionProps> = () => {

    const history = useHistory()

    const { dispatchForeUser } = useContext(UserContext)

    useEffect(() => {
        const user = localStorage.getItem("user")
        if (user) {
            history.replace('/home/chart')
            dispatchForeUser({ type: 'CHANGE_USER_INFO', playload: JSON.parse(user) })
        } else {
            const timer = setTimeout(() => {
                history.replace('/login')
            }, 2000)
            return () => {
                clearTimeout(timer)
            }
        }
    }, [])

    return (
        <div className={styles.transition}>
            <MyIcon className={styles.logoSvg} type="icon-myLogo" />
            <div className={styles.name}>Admin</div>
            <div className={styles.spinLoading}>
                <Spin size="large" />
            </div>
        </div>
    );
}

export default Transition;