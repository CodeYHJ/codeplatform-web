import React, { useState, useEffect } from 'react';
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined"
import styles from "./index.less"

import { MyIcon } from '@component/MyIcon';
import { Popover, Divider, Input, Button, message } from 'antd';
import { createTaskRequest } from "@api/task";
export interface CreateTaskProps {
    handleRender: () => void
}

const CreateTask: React.SFC<CreateTaskProps> = (props) => {
    const [visible, setVisible] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [value, setValue] = useState('')

    const onClick = () => {
        setVisible(false)
    }
    const handleVisibleChange = (e: any) => {
        setVisible(e)
        setValue('')
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        if (value.trim().length === 0) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
        setValue(e.target.value.trim())
    }
    const Title = (
        <div className={styles.title}>
            <div></div>
            新建任务列表
            <CloseOutlined onClick={() => { setVisible(false) }} />
        </div>
    )
    const submitTask = () => {
        createTaskRequest({ name: value }).then(res => {
            const { status = false } = res
            if (status) {
                message.success({content:'创建成功',key:`${new Date().getTime()}`})
                setValue('')
                props.handleRender()
            }
        }).finally(() => {
            setVisible(false)
        })
    }
    const Content = (
        <div className={styles.content}>
            <div className={styles.inputBox}>
                <Input className={styles.input} size="large" onChange={onChange} placeholder="列表名称" value={value} />
            </div>
            <div className={styles.dividerBox}>
                <Divider className={styles.divider} />
            </div>
            <div className={styles.buttonBox}>
                <Button className={styles.button} type="primary" disabled={disabled} style={{ width: "100%" }} onClick={submitTask}>创建</Button>
            </div>
        </div>
    )
    return (
        <Popover
            content={Content}
            title={Title}
            trigger="click"
            visible={visible}
            placement="bottom"
            onVisibleChange={handleVisibleChange}
            overlayClassName={styles.popover}
        >
            <div className={styles.createTask}>
                <div onClick={onClick} className={styles.innerBox}>
                    <MyIcon type="icon-add" className={styles.icon} />
                    <span>新建任务列表</span>
                </div>
            </div>
        </Popover>

    );
}

export default CreateTask;