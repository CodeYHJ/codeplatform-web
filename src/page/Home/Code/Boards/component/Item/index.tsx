import React, { memo } from 'react';
import styles from './index.less'
import { Select } from 'antd';
import { BoardsType } from '../..';
const { Option } = Select

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
                    <Select defaultValue={props.type} style={{ width: 100 }} size="small" bordered={false}>
                        <Option value="New">New</Option>
                        <Option value="Approved">Approved</Option>
                        <Option value="Committed">Committed</Option>
                        <Option value="Done">Done</Option>
                    </Select>
                </div>

            </div>
        </div>
    );
}

export default memo(Item);