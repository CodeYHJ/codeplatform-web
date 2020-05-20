import React, { useState, useEffect } from 'react';
import { Legend, Chart, Axis, Geom, Tooltip } from 'bizcharts'
import { Col } from 'antd';
import { getTaskInMonth } from '@api/char';
import styles from './index.less'

export interface HistogramChartProps {

}

export const HistogramChart: React.SFC<HistogramChartProps> = () => {

    const [initDv, setInitDv] = useState([])
    useEffect(() => {
        const getList = async () => {
            await getTaskInMonth().then(res => {
                const { tasksList } = res
                setInitDv(tasksList)
            })
        }
        getList()
    }, [])

    return (
        <Col md={24} lg={24}>
            <div className={styles.histogramChart}>
                <h3 className={styles.title}>当月任务完成图</h3>
                <Chart height={400} data={initDv} forceFit>
                    <Legend />
                    <Axis name="day" />
                    <Axis name="num" />
                    <Tooltip />
                    <Geom
                        type="interval"
                        position="day*num"
                        color={'name*num'}
                        adjust={[
                            {
                                type: "dodge",
                                marginRatio: 1 / 32,
                            }
                        ]}
                    />
                </Chart>
            </div>
        </Col>
    );
}

