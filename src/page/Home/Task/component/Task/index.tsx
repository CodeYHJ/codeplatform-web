import React, { useState, useEffect } from 'react';
import AddDropDown from './component/Add';
import TaskBody from './component/TaskBody';
import { DatePicker, Modal, Col } from 'antd';
import { MyIcon } from '@component/MyIcon';
import styles from './index.less'
import TaskOption from './component/TaskOption';
import { BaseTask, getTaskByTaskId } from '@api/task';
import MicroTask from './component/MicroTask';
export interface TaskProps {
    data: BaseTask,
    updateAllFn: () => void
}



const Task: React.SFC<TaskProps> = (props) => {
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [addStatus, setAddStatus] = useState(false)
    const [taskData, setTaskData] = useState(props.data)
    const [upDate, setUpDate] = useState(false)

    useEffect(() => {
        getTaskByTaskId({ taskid: taskData.id }).then(res => {
            const { task } = res
            setTaskData(task)
        })
    }, [upDate])

    const showAddStatus = () => {
        setAddStatus(true)
    }
    const handleOk = () => {
        setConfirmLoading(true)
        setVisible(false)
        setConfirmLoading(false)
    }
    const handleCancel = () => {
        setVisible(false)
    }

    const IconFn = (
        <div className={styles.addIcon} onClick={showAddStatus}>
            <MyIcon type="icon-add" />
        </div>
    )

    const ModalFn = (
        <Modal
            title="Title"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <DatePicker />
        </Modal>
    )

    const Add = () => {
        if (addStatus) {
            return <AddDropDown id={taskData.id} handleStatus={setAddStatus} upDateFn={() => { setUpDate(!upDate) }} />
        }
        return IconFn
    }
    const TaskBody = () => {
        const list = taskData.microtasks.map(el => {
            return <MicroTask key={el.id} data={el} upDateFn={() => { setUpDate(!upDate) }} />
        })
        return list
    }
    return (
        <Col md={8} xs={5}>
            <div className={styles.task}>
                <div className={styles.title}>
                    <div className={styles.titleText} >
                        {taskData.name}
                    </div>
                    <TaskOption taskid={taskData.id} upDateFn={() => { setUpDate(!upDate) }} updateAllFn={props.updateAllFn} />
                </div>
                <div className={styles.taskList}>
                    {TaskBody()}
                    <Add />
                </div>
                {ModalFn}
            </div>
        </Col>


    );
}

export default Task;