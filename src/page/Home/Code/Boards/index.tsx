import React, { useEffect, useState, useCallback } from 'react';
import { Layout, Row, Col, } from 'antd';
// import Task from "./component/Task";
import styles from "./index.less"
// import CreateTask from './component/CreateTask';
import { getTaskRequest } from '@api/task';
import BoardTab from './component/BoardTab'
import ItemBox from './component/ItemBox';
import Test from './component/Test';
import TypeBox from './component/TypeBox';

const { Content } = Layout

export enum BoardsType {
    NEW = "New",
    APPROV = "Approved",
    COMMIT = "Committed",
    DONE = "Done"
}
export interface BoardProps {

}

const Board: React.SFC<BoardProps> = () => {
    const [taskList, setTaskList] = useState([])
    const [render, setRender] = useState(false)
    useEffect(() => {
        // const getTaskList = async () => {
        //     await getTaskRequest().then((res) => {
        //         const { taskList } = res
        //         const list = taskList.map(el => {
        //             const data = { ...el }
        //             return <Task key={el.id} data={data} upDateAllFn={handleRender} />
        //         })
        //         setTaskList(list)

        //     })
        // }
        // getTaskList()

    }, [render])

    const handleRender = () => {
        setRender(!render)
    }
    return (
        <div className={styles.Board}>
            <BoardTab />
            <TypeBox />
            <div className={styles.content}>
                <Row gutter={[24, 0]}>
                    <Col span={6}>
                        <Test type={BoardsType.NEW} />
                    </Col>
                    <Col span={6}>

                        <Test type={BoardsType.APPROV} />

                    </Col>
                    <Col span={6}>

                        <Test type={BoardsType.COMMIT} />
                    </Col>
                    <Col span={6}>

                        <Test type={BoardsType.DONE} />

                    </Col>

                </Row>
            </div>



        </div>

    )
}

export default Board;