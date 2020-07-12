import React, { useEffect, useState, useCallback } from 'react';
import { Layout, Row, Col, } from 'antd';
import Task from "./component/Task";
import styles from "./index.less"
import CreateTask from './component/CreateTask';
import { getTaskRequest } from '@api/task';
import BoardTab from './component/BoardTab'
import ItemBox from './component/ItemBox';
const { Content } = Layout

export interface BoardProps {

}

const Board: React.SFC<BoardProps> = () => {
    const [taskList, setTaskList] = useState([])
    const [render, setRender] = useState(false)
    useEffect(() => {
        const getTaskList = async () => {
            await getTaskRequest().then((res) => {
                const { taskList } = res
                const list = taskList.map(el => {
                    const data = { ...el }
                    return <Task key={el.id} data={data} upDateAllFn={handleRender} />
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
        <div className={styles.Board}>
            <BoardTab />
            <div className={styles.row}>
                <ItemBox title="new" />
                <ItemBox title="process" />
                <ItemBox title="commit" />
                <ItemBox title="done" />

            </div>


        </div>

    )
}

export default Board;