import React, { useState, useEffect } from 'react';

import { Button, Table, Drawer, Input, Divider, Row, Col, Select } from 'antd';

import { ColumnProps } from 'antd/lib/table';

import { Form } from 'antd/lib';

import KeyOutlined from "@ant-design/icons/lib/icons/KeyOutlined"

import HighlightOutlined from "@ant-design/icons/lib/icons/HighlightOutlined"

import { getToken, setToken, updateToken, deleteToken } from '@api/auth';

import { MyIcon } from '@component/MyIcon';

const { Option } = Select;

import styles from './index.less'

export interface TokenProps {

}

interface ColumnsPropsExtends {
    align: string,
    oauthType: number,
}

const Token: React.SFC<TokenProps> = () => {

    const [loading, setLoading] = useState(false)

    const [dataSource, setDataSource] = useState([])

    const [visible, setVisible] = useState(false)

    const [status, setStatus] = useState(false)

    const [form] = Form.useForm()

    useEffect(() => {
        setLoading(true)
        getTokenFn()
    }, [])

    const getTokenFn = async () => {
        await getToken().then(res => {
            const { tokenList } = res
            setDataSource(tokenList)
        }).finally(() => {
            setLoading(false)
        })
    }
    const columns: ColumnProps<ColumnsPropsExtends>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center',

        },
        {
            title: 'Credential',
            dataIndex: 'credential',
            key: 'credential',
            align: 'center',

        },
        {
            title: 'OAuthType',
            dataIndex: 'oauthType',
            key: 'oauthType',
            align: 'center',
            render: (text, record, index) => {
                const { oauthType } = record
                if (oauthType === 1) {
                    return <MyIcon style={{ fontSize: '20px' }} type="icon-tubiaozhizuomoban" />
                } else if (oauthType === 2) {
                    return <MyIcon style={{ fontSize: '20px' }} type="icon-gitee-fill-round" />
                }
                else if (oauthType === 3) {
                    return <MyIcon style={{ fontSize: '20px' }} type="icon-github" />
                }
            }
        },
        {
            title: 'Options',
            dataIndex: 'opeions',
            key: 'opeions',
            align: 'center',
            width: 200,
            render: (text, record, index) => {
                return (
                    <Row gutter={24}>
                        <Col>
                            <Button type="primary" onClick={() => { onEdit(text, record, index) }}>编辑</Button></Col>
                        <Col>
                            <Button type="danger" onClick={() => { onDelete(text, record, index) }}>删除</Button>
                        </Col>
                    </Row>
                )
            }
        }
    ]
    const addToken = () => {
        const { name, credential, oauthType, id } = form.getFieldsValue(['name', 'credential', 'oauthType', 'id'])
        if (status) {
            updateToken({ id, name, credential, oauthtype: Number(oauthType) }).then(res => {
                const { status } = res
                if (status) {
                    setLoading(true)
                    getTokenFn()
                }
            }).finally(() => { setVisible(false) })
            return;
        }
        setToken({ name, credential, oauthtype: Number(oauthType) }).then(res => {
            const { status } = res
            if (status) {
                setLoading(true)
                getTokenFn()
            }
        }).finally(() => { setVisible(false) })
    }


    const onEdit = (text: any, record: any, index: any) => {
        record.oauthType = String(record.oauthType)
        form.setFieldsValue(record)
        setStatus(true)
        setVisible(true)
    }

    const onDelete = (text: any, record: any, index: any) => {
        const { id } = record
        deleteToken({ id }).finally(() => {
            getTokenFn()
        })
    }

    const onChange = (value: string) => {
        const fleldsValue = form.getFieldsValue(['name', 'credential', 'oauthType', 'id'])
        form.setFieldsValue(Object.assign(fleldsValue, { oauthType: value }))
    }
    return (
        <div className={styles.tokenPage}>
            <Row justify="end">
                <Button type="primary" style={{ textAlign: 'right' }} onClick={() => {
                    form.resetFields()
                    setVisible(true)
                }}>添加</Button>
            </Row>

            <Divider></Divider>
            <Row>
                <Table
                    loading={loading}
                    rowKey={(record) => String(record.key)}
                    style={{ flex: 1 }}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                />
            </Row>


            <Drawer
                title="Token Setting"
                placement="right"
                closable={false}
                visible={visible}
                getContainer={false}
                onClose={() => { setVisible(false) }}
                width={500}
                maskClosable
                style={{ position: 'absolute' }}
            >
                <Form layout="vertical" onFinish={addToken} form={form} initialValues={{ id: 0, name: '', credential: '', oauthType: '1' }}>
                    <Form.Item name="name" label="Token Name" rules={[
                        {
                            required: true,
                            message: '请输入Token Name!',
                        },
                    ]}>
                        <Input type="text" placeholder="请输入Token Name" prefix={<HighlightOutlined />} />
                    </Form.Item>
                    <Form.Item name="credential" label="Token" rules={[
                        {
                            required: true,
                            message: '请输入Token!',
                        },
                    ]}>
                        <Input.Password placeholder="请输入Token" prefix={<KeyOutlined />} />

                    </Form.Item>
                    <Form.Item label="Token Type" name="oauthType">
                        <Select onChange={onChange} size="small" style={{ width: 150 }}>
                            <Option value='1'>YuQue（雨雀）</Option>
                            <Option value='2'>Gitee</Option>
                            <Option value='3'>GitHub</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="submit">
                        <Button type="primary" htmlType="submit">{status ? '更新' : '添加'}</Button>
                    </Form.Item>
                </Form>

            </Drawer>
        </div>
    );
}
export default Token;
