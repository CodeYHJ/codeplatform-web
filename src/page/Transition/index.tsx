import React, { useEffect, useContext } from 'react';
import logo from "@img/myLogo.png"
import styles from './index.less'
import { Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { UserContext } from '@store/user/userContext';
export interface TransitionProps {

}

const Transition: React.SFC<TransitionProps> = () => {
   
    const history = useHistory()

    const { dispatchForeUser, userStore } = useContext(UserContext)

    useEffect(() => {
        const user = localStorage.getItem("user")
        if (user) {
            history.replace('/home/chart')
            dispatchForeUser({ type: 'CHANGE_USER_INFO', playload: JSON.parse(user) })
        }else{
            history.replace('/login')
        }
    }, [])

    return (
        <div className={styles.transition}>
            <img className={styles.logo} src={logo}></img>
            <div className={styles.name}>Admin</div>
            <div className={styles.spinLoading}>
                <Spin size="large" />
            </div>
        </div>
    );
}

export default Transition;