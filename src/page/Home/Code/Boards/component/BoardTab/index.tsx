import React, { useState } from 'react';
import styles from './index.less'
import { Input, Select } from 'antd';
const { Option } = Select
export interface BoardTabProps {

}

const BoardTab: React.SFC<BoardTabProps> = () => {
    const [defaultOptins, setDefaultOptions] = useState(['default'])
    return (
        <div className={styles.boardTab}>
            <Input.Group compact>
                <Select defaultValue={defaultOptins[0]}>
                    {defaultOptins.map(el => (<Option key={el} value={el}>{el}</Option>))}
                </Select>
            </Input.Group >
        </div>
    );
}

export default BoardTab;