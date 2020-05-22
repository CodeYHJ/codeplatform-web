import React, { useState, useEffect } from 'react';
import { Menu, Calendar, Button } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import styles from './index.less'
import { ClickParam } from 'antd/lib/menu';
import { deleteTaskRequest, upDateDeadTime, deleteAllMicroTask } from '@api/task';
import moment, { Moment } from 'moment';
import 'moment/locale/zh-cn';
export interface TaskOptionProps {
    openSub: () => void,
    sub: boolean,
    taskid: number,
    upDateFn: () => void,
    upDateAllFn: () => void,
    closePopover: () => void,
    closeSub: () => void
}


const TaskOption: React.SFC<TaskOptionProps> = (props) => {
    const [dateVisible, setDateVisible] = useState(false)
    const [calendarValue, setCalendarValue] = useState(moment())
    useEffect(() => {
        setDateVisible(props.sub)
    }, [props.sub])
    const handleClick = (e: ClickParam) => {
        const key = e.key
        if (key === '1') {
            setDateVisible(true)
            props.openSub()
        }
        if (key === '2') {
            deleteAllMicroTask({ taskid: props.taskid }).then(res => {
                const { status = false } = res
                if (status) {
                    props.upDateFn()
                    props.closePopover()
                }
            })
        }

        if (key === '3') {
            deleteTaskRequest({ taskid: props.taskid }).then(res => {
                const { status = false } = res
                if (status) {
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
                props.upDateFn()
                props.closePopover()
                props.closeSub()
            }
        })
    }
    const clear = () => {
        upDateDeadTime({ id: props.taskid }).then(res => {
            const { status = false } = res
            if (status) {
                props.upDateFn()
                props.closePopover()
                props.closeSub()
            }
        })
    }
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
        <Calendar className={styles.calendar} locale={locale} fullscreen={false} onPanelChange={onPanelChange} value={calendarValue} />
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
        return menu
    }
    return (
        <div className="taskOption">
            <HandleRender />
        </div>

    );
}

export default TaskOption;