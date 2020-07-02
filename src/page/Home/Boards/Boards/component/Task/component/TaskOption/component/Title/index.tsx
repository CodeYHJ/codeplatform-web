import React, { useState, useEffect, useContext } from 'react';
import { Checkbox, Modal, Menu } from 'antd';
import LeftOutlined from "@ant-design/icons/lib/icons/LeftOutlined"

import styles from "./index.less"
import { MicroTaskContext } from '@store/microTask/microTaskContext';
export interface TitleProps {

}

const Title: React.SFC<TitleProps> = () => {
    const [visible, setVisible] = useState(false)
    const { microTaskStore, dispatchForeTask } = useContext(MicroTaskContext)
    useEffect(() => {
        const { nameOpen, dateOpen } = microTaskStore
        if (nameOpen || dateOpen) {
            setVisible(true)

        } else {
            setVisible(false)
        }
    }, [microTaskStore])
    return (
        <div className={styles.title}>
            <div className={styles.sub}>
                {visible && <LeftOutlined onClick={() => { dispatchForeTask({ type: "CLOSE_ALL" }) }} />}
            </div>
            Task Menu
            <div></div>
        </div>
    );
}

export default Title;