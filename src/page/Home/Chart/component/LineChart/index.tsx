import React from 'react';
import {  Chart, Axis, Geom, Tooltip } from 'bizcharts'
import { Col } from 'antd';
import styles from './less.css'

export interface LineChartProps {

}

export const LineChart: React.SFC<LineChartProps> = () => {

    const data = [
        {
            year: "1991",
            value: 3
        },
        {
            year: "1992",
            value: 4
        },
        {
            year: "1993",
            value: 3.5
        },
        {
            year: "1994",
            value: 5
        },
        {
            year: "1995",
            value: 4.9
        },
        {
            year: "1996",
            value: 6
        },
        {
            year: "1997",
            value: 7
        },
        {
            year: "1998",
            value: 9
        },
        {
            year: "1999",
            value: 13
        }
    ];
    const cols = {
        value: {
            min: 0
        },
        year: {
            range: [0, 1]
        }
    };
    return (
        <Col md={24} lg={12}>

            <div className={styles.lineChart}>
                <h3 className={styles.title}>每周文章生产情况</h3>
                <Chart height={400} data={data} scale={cols} forceFit>
                    <Axis name="year" />
                    <Axis name="value" />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom type="line" position="year*value" size={2} />
                    <Geom
                        type="point"
                        position="year*value"
                        size={4}
                        shape={"circle"}
                        style={{
                            stroke: "#fff",
                            lineWidth: 1
                        }}
                    />
                </Chart>
            </div>
        </Col>
    );
}

