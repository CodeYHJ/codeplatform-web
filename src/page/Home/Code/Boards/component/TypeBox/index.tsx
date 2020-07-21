import React from 'react';
import styles from "./index.less"
import { BoardsType } from '../..';
import { Select, Row, Col } from 'antd';
export interface TypeBoxProps {

}

const TypeBox: React.SFC<TypeBoxProps> = () => {
    return (
        <div className={styles.typeBox}>
            <Row gutter={24}>
                <Col span={6}>
                    <div className={styles.header}>{BoardsType.NEW}</div>
                </Col>
                <Col span={6}>
                    <div className={styles.header}>{BoardsType.APPROV}</div>
                </Col>
                <Col span={6}>
                    <div className={styles.header}>{BoardsType.COMMIT}</div>
                </Col>
                <Col span={6}>
                    <div className={styles.header}>{BoardsType.DONE}</div>
                </Col>
            </Row>
        </div>
    );
}

export default TypeBox;