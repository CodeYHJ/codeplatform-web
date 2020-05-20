import React, { useState, useContext, useEffect } from 'react';

import { Card, Input, Form, Avatar, Button, Col, Row, Modal } from 'antd';

import UserLogo from "@img/myLogo_round.png"

import { updateUser, UpdateUserRequest, singOut, getUserInfo } from '@api/user';

import { useHistory } from 'react-router-dom';
import { UserContext } from '@store/user/userContext';

import styles from './index.less'


 const Info: React.SFC = () => {

    const history = useHistory()

    const { dispatchForeUser } = useContext(UserContext)

    const [imgUrl, setImgUrl] = useState('')

    const [form] = Form.useForm()

    useEffect(() => {
        const userFn = async () => {
            const user = await getUserInfo().then(res => res.user);
        }
        userFn()
    }, [])

    const submit = () => {
        const list = ['img', 'password']
        const { img, password } = form.getFieldsValue(list)
        const requestData: UpdateUserRequest = {}
        if (typeof img === 'string' && img !== '') requestData.avatar_url = img
        if (typeof password === 'string' && password !== '') requestData.password = window.btoa(password)
        if (JSON.stringify(requestData) === '{}') return;
        updateUser(requestData).then(res => {
            const { avatar_url, password } = res
            let changeData: UpdateUserRequest = {}
            if (password) {
                Modal.info({
                    title: '修改成功，请用新密码重新登陆！',
                    onOk() {
                        dispatchForeUser({ type: "SIGN_OUT" })
                        history.push('/')
                        singOut()
                    }
                })
                return
            }
            if (avatar_url) changeData.avatar_url = avatar_url
            if (JSON.stringify(changeData) === '{}') return;
            dispatchForeUser({ type: 'CHANGE_USER_INFO', playload: changeData })
            form.resetFields(list)
            if (avatar_url) {
                form.setFieldsValue({ img: avatar_url, password: '' })
            }
        })
    }

    const imgFn = () => {
        if (imgUrl === '') {
            return <Avatar size={64} src={UserLogo} />
        } else {
            return <Avatar size={64} src={imgUrl} onError={() => {
                return false
            }} />

        }
    }

    const setImgFn = () => {
        const url = form.getFieldValue('img')
        if (url === '') {
            setImgUrl(UserLogo)
            return;
        };
        setImgUrl(url)
    }

    return (
        <div className={styles.infoPage}>
            <Row >
                <Col span={12}>
                    <Card title="个人信息" bordered={false} style={{ flex: 1 }} >
                        <Form layout="vertical" onFinish={submit} form={form} initialValues={{ name: '', img: '', password: '' }}>
                            <Form.Item label="头像（仅支持网络连接）">
                                {imgFn()}
                            </Form.Item>
                            <Form.Item name="img" rules={[{ type: 'url', message: '不是合法的url' }]}>
                                <Input id="img" placeholder="输入头像连接" onBlur={setImgFn} />
                            </Form.Item>

                            <Form.Item name="password" label="修改密码" rules={[
                                {
                                    min: 6,
                                    message: '密码不能少于6个'
                                }
                            ]}>
                                <Input.Password placeholder="输入更改的密码" />
                            </Form.Item>

                            <Form.Item name="submit">
                                <Button type="primary" htmlType="submit">更新</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div >

    );
}
export default Info;