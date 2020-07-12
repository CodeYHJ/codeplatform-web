import React from 'react';
import styles from './index.less'
import { Select } from 'antd';
const { Option } = Select
export enum BoardsType {
    INIT = 0,
    PROCESS,
    COMMIT,
    DONE
}
export interface ItemProps {
    context: string,
    type: BoardsType,
}

const Item: React.SFC<ItemProps> = (props) => {

    return (
        <div className={styles.item}>
            <div className={styles.context}>{props.context}</div>
            <div className={styles.state}>
                <span className={styles.stateTex}>state</span>
                <div className={styles.stateBox}>
                    <Select defaultValue="new" style={{ width: 100 }} size="small" bordered={false}>
                        {/* <Option value="new">new</Option> */}
                        <Option value="process">process</Option>
                        <Option value="commit">commit</Option>
                        <Option value="done">done</Option>
                    </Select>
                </div>

            </div>
        </div>
    );
}

export default Item;