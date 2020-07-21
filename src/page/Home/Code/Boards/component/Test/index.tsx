import React from 'react';
import styles from './index.less'
import { BoardsType } from '../..';
import { Select, Row, Col } from 'antd';
const { Option } = Select
export interface TestProps {
    type: BoardsType,
    add?: boolean
}

const Test: React.SFC<TestProps> = (props) => {
    const Task = () => (
        <div className={styles.taskBox}>
            <header className={styles.title}>123213213</header>
            <div className={styles.statusBox}>
                <span className={styles.statusText}>status</span>
                <div className={styles.state}>
                    <Select defaultValue={props.type} style={{ width: 100 }} size="small" bordered={false}>
                        <Option value="New">New</Option>
                        <Option value="Approved">Approved</Option>
                        <Option value="Committed">Committed</Option>
                        <Option value="Done">Done</Option>
                    </Select>
                </div>
            </div>
        </div>
    )
    return (
        <div className={styles.test}>
            <main className={styles.main}>
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
            </main>
        </div>
    );
}

export default Test;