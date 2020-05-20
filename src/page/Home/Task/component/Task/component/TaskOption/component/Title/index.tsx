import React, { useState, useEffect } from 'react';
import { Checkbox, Modal, Menu } from 'antd';
import LeftOutlined from "@ant-design/icons/lib/icons/LeftOutlined"

import styles from "./index.less"
export interface TitleProps {
    sub: boolean,
    back: () => void
}

const Title: React.SFC<TitleProps> = (props) => {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        setVisible(props.sub)
    }, [props.sub])
    return (
        <div className={styles.title}>
            <div className={styles.sub}>
                {visible && <LeftOutlined onClick={props.back} />}
            </div>
            Task Menu
            <div></div>
        </div>
    );
}

export default Title;