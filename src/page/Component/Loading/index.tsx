import React from 'react';

import { Spin } from 'antd';
import styles from './index.less'
const Loading: React.SFC = () => {
    return (
        <div className={styles.spinLoading}>
            <Spin size="large" />
        </div>
    );
}

export default Loading;