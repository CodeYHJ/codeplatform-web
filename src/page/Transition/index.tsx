import React, { useEffect, useContext, useState } from 'react';
import styles from './index.less'
import { useHistory } from 'react-router-dom';
import { UserContext } from '@store/user/userContext';
import MyLogo from '@img/myLogo.svg'
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
            <img className={styles.logoSvg} src={MyLogo} />
            <div className={styles.name}>Admin</div>
            <div className={styles.spinBox}>
                <div className={styles.spin}>
                    <span className={styles.spanDot}>
                        <i className={styles.spinDotItem}></i>
                        <i className={styles.spinDotItem}></i>
                        <i className={styles.spinDotItem}></i>
                        <i className={styles.spinDotItem}></i>
                    </span>
                </div>
            </div>

        </div>
    );
}

export default Transition;