import React, { useState, useEffect, useContext } from 'react';
import { Menu, Calendar, Button, message } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import styles from './index.less'
import { ClickParam } from 'antd/lib/menu';
import { deleteTaskRequest, upDateDeadTime, deleteAllMicroTask } from '@api/task';
import moment, { Moment } from 'moment';
import 'moment/locale/zh-cn';
import { MicroTaskContext } from '@store/microTask/microTaskContext';
import Name from './component/Name';
export interface TaskOptionProps {
    taskid: number,
    upDateFn: () => void,
    upDateAllFn: () => void,
    closePopover: () => void,
    hasMicro: boolean
}


const TaskOption: React.SFC<TaskOptionProps> = (props) => {
    const [dateVisible, setDateVisible] = useState(false)
    const [nameVisible, setNameVisible] = useState(false)
    const [calendarValue, setCalendarValue] = useState(moment())
    const { microTaskStore, dispatchForeTask } = useContext(MicroTaskContext)
    const closeAll = () => {
        setNameVisible(false)
        setDateVisible(false)
    }
    useEffect(() => {
        const { nameOpen, dateOpen } = microTaskStore
        closeAll()
        if (nameOpen) {
            setNameVisible(true)
        } else if (dateOpen) {
            setDateVisible(true)
        }
    }, [microTaskStore])

    const handleClick = (e: ClickParam) => {
        const key = e.key
        if (key === '0') {
            dispatchForeTask({ type: 'OPEN', playload: { nameOpen: true } })

        }
        if (key === '1') {
            dispatchForeTask({ type: 'OPEN', playload: { dateOpen: true } })
        }
        if (key === '2') {
            deleteAllMicroTask({ taskid: props.taskid }).then(res => {
                const { status = false } = res
                if (status) {
                    message.success({ content: '清空微任务成功', key: `${new Date().getTime()}` })
                    props.upDateFn()
                    props.closePopover()
                }
            })
        }

        if (key === '3') {
            deleteTaskRequest({ taskid: props.taskid }).then(res => {
                const { status = false } = res
                if (status) {
                    message.success({ content: '删除任务成功', key: `${new Date().getTime()}` })
                    props.upDateAllFn()
                    
                }
            })
        }
    }
    const onPanelChange = (value: Moment) => {
        setCalendarValue(value)
    }

    const confinDate = () => {
        upDateDeadTime({ id: props.taskid, endtime: calendarValue.format() }).then(res => {
            const { status = false } = res
            if (status) {
                message.success({ content: 'Dead Line 设置成功', key: `${new Date().getTime()}` })
                props.upDateFn()
                props.closePopover()
            }
        })
    }
    const disabledDate = (current: any) => {
        return current && current < moment().startOf('day');
    }
    const clear = () => {
        upDateDeadTime({ id: props.taskid }).then(res => {
            const { status = false } = res
            if (status) {
                props.upDateFn()
                props.closePopover()
            }
        })
    }
    const menu = (
        <Menu className={styles.cancleBoder} onClick={handleClick}>
            <Menu.Item key="0">
                编辑任务名字
        </Menu.Item >
            <Menu.Item key="1" disabled={!props.hasMicro}>
                设置当前列表所有任务截至时间
        </Menu.Item>
            <Menu.Item key="2" disabled={!props.hasMicro}>
                清空当前列表所有任务
        </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">删除任务</Menu.Item>
        </Menu>
    )
    const dateRender = (
        <Calendar className={styles.calendar} locale={locale} fullscreen={false} onPanelChange={onPanelChange} value={calendarValue} disabledDate={disabledDate} />
    )
    const HandleRender = () => {
        if (dateVisible) {
            return (
                <div>
                    {dateRender}
                    <div className={styles.dateButton}>
                        <Button type="default" style={{ marginRight: "30px" }} onClick={clear}>清除</Button>
                        <Button type="primary" onClick={confinDate} disabled={!calendarValue}>确定</Button>
                    </div>
                </div>
            )
        }
        if (nameVisible) {
            return <Name
                taskid={props.taskid}
                upDateAllFn={props.upDateAllFn}
                upDateFn={props.upDateFn}
                closePopover={props.closePopover}
            />
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