import React, { useState, useEffect } from 'react';
import { Menu, Calendar } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import styles from './index.less'
import { ClickParam } from 'antd/lib/menu';
import { deleteTaskRequest } from '@api/task';
export interface TaskOptionProps {
    openSub: () => void,
    sub: boolean,
    taskid: number,
    upDateFn: () => void,
    updateAllFn: () => void
}


const TaskOption: React.SFC<TaskOptionProps> = (props) => {
    const [dateVisible, setDateVisible] = useState(false)
    useEffect(() => {
        setDateVisible(props.sub)
    }, [props.sub])
    const handleClick = (e: ClickParam) => {
        const key = e.key
        if (key === '1') {
            setDateVisible(true)
            props.openSub()
        }
        if (key === '3') {
            deleteTaskRequest({ taskid: props.taskid }).then(res => {
                const { status = false } = res
                if (status) {
                    props.updateAllFn()
                }
            })
        }
    }
    const onPanelChange = () => { }

    const menu = (
        <Menu className={styles.cancleBoder} onClick={handleClick}>
            <Menu.Item key="0">
                编辑任务名字
        </Menu.Item>
            <Menu.Item key="1" >
                设置当前列表所有任务截至时间
        </Menu.Item>
            <Menu.Item key="2">
                清空当前列表所有任务
        </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">删除任务</Menu.Item>
        </Menu>
    )
    const dateRender = (
        <Calendar className={styles.calendar} locale={locale} fullscreen={false} onPanelChange={onPanelChange} />
    )
    const HandleRender = () => {
        if (dateVisible) {
            return dateRender
        }
        return menu
    }
    return (
        <div className="taskOption">
            <HandleRender />
        </div>

    );
}

export default TaskOption;