
import React, { useState, useContext, useEffect } from 'react';

import { Input, Button, Row, Col, message } from 'antd';

import { getPeriodOfTime } from "@util/index"

import { singIn } from "@api/user"

import { useHistory, Link } from "react-router-dom"

import { UserContext } from "@store/user/userContext"

import logo from "@img/myLogo.png"

import styles from "./index.less";

const Login: React.SFC = () => {

    const [loading, setLoading] = useState(false)

    const [name, setName] = useState('')

    const [password, setPassword] = useState('')

    const { dispatchForeUser, userStore } = useContext(UserContext)

    const history = useHistory()


    const onChangeOfName = (e: React.FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const onChangeOfPassword = (e: React.FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const onClick = () => {

        if (!name.length) {
            message.error("请输入名字")
            return;
        }

        if (password.length < 6) {
            message.error("密码长度不能少于6")
            return;
        }

        setLoading(true)

        singIn({ name, password: window.btoa(password) }).then(res => {
            const { user } = res
            if (!user) return;
            dispatchForeUser({ type: "SIGN_IN", playload: user })

            setLoading(false)

            history.push("/home/chart")

        }).catch(err => {

            console.log("登陆错误:", err)

            setLoading(false)

        })
    }

    return (

        <Row className={styles.LoginPage}>

            <Col flex={5} className={getPeriodOfTime()}></Col>

            <Col flex={1} >

                <div className={styles.formBox}>

                    <div className={styles.logo}>

                        <img src={logo}></img>

                    </div>

                    <div className={styles.pageName}>Login</div>

                    <div className={styles.inputBox}>

                        <Input className={styles.userInput} placeholder="用户名" allowClear onChange={onChangeOfName} onPressEnter={onClick} />

                        <Input.Password className={styles.userPassword} placeholder="密码" onChange={onChangeOfPassword} onPressEnter={onClick} />

                        <div className={styles.link}>
                            <Link to="/registered">注册</Link>
                        </div>

                    </div>

                    <Button size="large" className={styles.confin} shape="round" type="primary" loading={loading} onClick={onClick}>Sing In</Button>

                </div>
            </Col>
        </Row>
    );
}

export default Login;