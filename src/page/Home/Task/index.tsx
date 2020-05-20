import React, { useEffect, useState } from 'react';
import { Layout, Row, Col } from 'antd';
import Task from "./component/Task";
import styles from "./index.less"
import CreateTask from './component/CreateTask';
import { getTaskRequest } from '@api/task';

const { Content } = Layout

export interface NewTaskProps {

}

const NewTask: React.SFC<NewTaskProps> = () => {
    const [taskList, setTaskList] = useState([])
    const [render, setRender] = useState(false)
    useEffect(() => {

        const getTaskList = async () => {
            await getTaskRequest().then((res) => {
                const { taskList } = res
                const list = taskList.map(el => {
                    const data = { ...el }
                    return <Task key={el.id} data={data} updateAllFn={handleRender} />
                })
                setTaskList(list)

            })
        }
        getTaskList()

    }, [render])

    const handleRender = () => {
        setRender(!render)
    }
    return (
        <Layout className={styles.TaskPage}>
            <Content>
                <Row gutter={24} className={styles.coverStyle}>
                    {taskList}
                    <CreateTask handleRender={handleRender} />
                </Row>
            </Content>
        </Layout>
    )
}

export default NewTask;