import React from 'react';
import styles from './index.less'
export enum BoardsType {
    NEW = "New",
    APPROV = "Approved",
    COMMIT = "Committed",
    DONE = "Done"
}
export interface TabTypeProps {

}

const TabType: React.SFC<TabTypeProps> = () => {
    return (
        <div className={styles.tabType}>
            <div className={styles.tab}>
                <span className={styles.text}>New</span>
            </div>
            <div className={styles.tab}>
                <span className={styles.text}>Approve</span>
            </div>
            <div className={styles.tab}>
                <span className={styles.text}>Committed</span>
            </div>
            <div className={styles.tab}>
                <span className={styles.text}>Done</span>
            </div>
        </div>
    );
}

export default TabType;