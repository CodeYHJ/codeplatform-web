import React, { useEffect, useState } from 'react';
import { Statistic, Row, Col, Card } from 'antd';
import { MyIcon } from '@component/MyIcon';
import { HistogramChart } from './component/HistogramChart';
import { LineChart } from './component/LineChart';
import { getTasksToday, getTasksInWeek, getTasksNum } from '@api/char';
import styles from './index.less'
const Chart: React.SFC = () => {
    const initNum = {
        totalNum: 0,
        completedNum: 0,
        failNum: 0
    }
    const [day, setDay] = useState(initNum)
    const [week, setWeek] = useState(initNum)

    useEffect(() => {
        getTasksNum().then(res => {
            console.log(res, '22222')
        })
        const dayData = () => {
            getTasksToday().then(res => {
                if (res.tasksNum) {
                    setDay(res.tasksNum)
                }
            })
        }
        const weekData = () => {
            getTasksInWeek().then((res) => {
                if (res.tasksNum) {
                    setWeek(res.tasksNum)
                }
            })
        }
        // dayData()
        // weekData()
    }, [])
    return (
        <div className={styles.chartPage}>
            <Row gutter={[24, 24]} >
                <Col md={12} lg={6}>
                    <Card className={styles.cardStyle}>
                        <MyIcon className={`${styles.iconStyle} ${styles.general}`} style={{ fontSize: "50px", float: 'left' }} type="icon-priority" />
                        <Statistic className={styles.statisStyle} title="较低" value={day.completedNum} suffix={`/ ${day.totalNum}`} />
                    </Card>
                </Col>
                <Col md={12} lg={6}>
                    <Card className={styles.cardStyle}>
                        <MyIcon className={`${styles.iconStyle} ${styles.ordinary}`} style={{ fontSize: "50px", float: 'left' }} type="icon-priority" />
                        <Statistic className={styles.statisStyle} title="普通" value={week.completedNum} suffix={`/ ${day.totalNum}`} />
                    </Card>
                </Col>
                <Col md={12} lg={6}>
                    <Card className={styles.cardStyle}>
                        <MyIcon className={`${styles.iconStyle} ${styles.warn}`} style={{ fontSize: "50px", float: 'left' }} type="icon-priority" />
                        <Statistic className={styles.statisStyle} title="紧急" value={week.failNum} suffix={`/ ${day.totalNum}`} />
                    </Card>
                </Col>
                <Col md={12} lg={6}>
                    <Card className={styles.cardStyle}>
                        <MyIcon className={`${styles.iconStyle} ${styles.danger}`} style={{ fontSize: "50px", float: 'left' }} type="icon-priority" />
                        <Statistic className={styles.statisStyle} title="非常紧急" value={week.totalNum} suffix={`/ ${day.totalNum}`} />
                    </Card>
                </Col>
                {/* <HistogramChart /> */}
                <LineChart />
            </Row>

        </div>
    );
}

export default Chart;