import React, { useEffect, useState } from 'react';
import { Statistic, Row, Col, Card } from 'antd';
import { MyIcon } from '@component/MyIcon';
import { HistogramChart } from './component/HistogramChart';
import { LineChart } from './component/LineChart';
import { getTasksToday, getTasksInWeek } from '@api/char';
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
        dayData()
        weekData()
    }, [])
    return (
        <div className={styles.chartPage}>
            <Row gutter={[24, 24]} >
                <Col md={12} lg={6}>
                    <Card className={styles.cardStyle}>
                        <MyIcon className={styles.iconStyle} style={{ fontSize: "50px", float: 'left' }} type="icon-milestone-today" />
                        <Statistic className={styles.statisStyle} title="Pedding" value={day.completedNum} suffix={`/ ${day.totalNum}`} />
                    </Card>
                </Col>
                <Col md={12} lg={6}>
                    <Card className={styles.cardStyle}>
                        <MyIcon className={styles.iconStyle} style={{ fontSize: "50px", float: 'left' }} type="icon-songxiyiwancheng-bian" />
                        <Statistic className={styles.statisStyle} title="Completed In Week" value={week.completedNum} />
                    </Card>
                </Col>
                <Col md={12} lg={6}>
                    <Card className={styles.cardStyle}>
                        <MyIcon className={styles.iconStyle} style={{ fontSize: "50px", float: 'left' }} type="icon-yanzhonggaojing" />
                        <Statistic className={styles.statisStyle} title="UnComplete In Week" value={week.failNum} />
                    </Card>
                </Col>
                <Col md={12} lg={6}>
                    <Card className={styles.cardStyle}>
                        <MyIcon className={styles.iconStyle} style={{ fontSize: "50px", float: 'left' }} type="icon-tongji1" />
                        <Statistic className={styles.statisStyle} title="Total In Week" value={week.totalNum} />
                    </Card>
                </Col>
                <HistogramChart />
                {/* <LineChart /> */}
            </Row>

        </div>
    );
}

export default Chart;