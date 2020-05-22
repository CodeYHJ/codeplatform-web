import React, { useEffect, useState } from 'react';
import { Statistic, Row, Col, Card } from 'antd';
import { MyIcon } from '@component/MyIcon';
import { HistogramChart } from './component/HistogramChart';
import { LineChart } from './component/LineChart';
import { getTasksToday, getTasksInWeek, getTasksNum } from '@api/char';
import styles from './index.less'
const Chart: React.SFC = () => {
    const initNum = {
        total: 0,
        complete: '0',
        priority: 0
    }
    const [generalNum, setGeneralNum] = useState(initNum)
    const [ordinaryNum, setOrdinaryNum] = useState(initNum)
    const [warnNum, setWarnNum] = useState(initNum)
    const [dangerNum, setDangerNum] = useState(initNum)
    useEffect(() => {
        const tasksNum = async () => {
            getTasksNum().then(res => {
                const { result } = res
                result.forEach(el => {
                    const { priority } = el
                    if (priority === 0) setGeneralNum(el)
                    if (priority === 1) setOrdinaryNum(el)
                    if (priority === 2) setWarnNum(el)
                    if (priority === 3) setDangerNum(el)
                })
            })
        }
        tasksNum()
    }, [])
    return (
        <div className={styles.chartPage}>
            <Row gutter={[24, 24]} >
                <Col md={6} xs={6}>
                    <Card className={styles.cardStyle}>
                        <MyIcon className={`${styles.iconStyle} ${styles.general}`} style={{ fontSize: "50px", float: 'left' }} type="icon-priority" />
                        <Statistic className={styles.statisStyle} title="较低" value={generalNum.complete} suffix={`/ ${generalNum.total}`} />
                    </Card>
                </Col>
                <Col md={6} xs={6}>
                    <Card className={styles.cardStyle}>
                        <MyIcon className={`${styles.iconStyle} ${styles.ordinary}`} style={{ fontSize: "50px", float: 'left' }} type="icon-priority" />
                        <Statistic className={styles.statisStyle} title="普通" value={ordinaryNum.complete} suffix={`/ ${ordinaryNum.total}`} />
                    </Card>
                </Col>
                <Col md={6} xs={6}>
                    <Card className={styles.cardStyle}>
                        <MyIcon className={`${styles.iconStyle} ${styles.warn}`} style={{ fontSize: "50px", float: 'left' }} type="icon-priority" />
                        <Statistic className={styles.statisStyle} title="紧急" value={warnNum.complete} suffix={`/ ${warnNum.total}`} />
                    </Card>
                </Col>
                <Col md={6} xs={6}>
                    <Card className={styles.cardStyle}>
                        <MyIcon className={`${styles.iconStyle} ${styles.danger}`} style={{ fontSize: "50px", float: 'left' }} type="icon-priority" />
                        <Statistic className={styles.statisStyle} title="非常紧急" value={dangerNum.complete} suffix={`/ ${dangerNum.total}`} />
                    </Card>
                </Col>
                {/* <HistogramChart /> */}
                <LineChart />
            </Row>

        </div>
    );
}

export default Chart;