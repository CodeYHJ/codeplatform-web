import React, { useEffect, useState } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts'
import { Col } from 'antd';
import styles from './index.less'
import { GetTasksNumMicro, getTrend } from '@api/char';
import { getDaysOfMonth } from '@util/';
import Test from '@page/Home/Test';

export interface LineChartProps {
}

export const LineChart: React.SFC<LineChartProps> = () => {
    const [data, setDate] = useState([])
    const createLineModal = (day: number, priority: string) => {
        return { priority, total: 0, complete: 0, day }
    }
    useEffect(() => {
        const get = async () => {
            await getTrend().then(res => {
                const { result } = res
                const day = new Date().getDate()
                const map = new Map()
                const priorityList = ['较低', '普通', '紧急', '非常紧急']

                result.forEach(el => {
                    const { day } = el
                    const complete = Number(el.complete)
                    const priority = priorityList[el.priority]

                    const transformItem = { ...el, ...{ complete, priority } }

                    const isMapHas = map.has(day)
                    if (isMapHas) {
                        map.get(day).push(transformItem)
                    } else {
                        map.set(day, [transformItem])
                    }
                })

                for (let i = 0; i < day; i++) {
                    const isMapHas = map.has(i)
                    if (isMapHas) {
                        const targetArray: any[] = map.get(i)
                        if (targetArray.length === 4) continue;
                        const getTargetPrioritys = targetArray.map(el => el.priority)
                        const difList = priorityList.filter(el => !(getTargetPrioritys.indexOf(el) > -1))
                        difList.forEach(el => targetArray.push(createLineModal(i, el)))
                        map.set(i, targetArray)
                    } else {
                        const createCachList: any[] = [];
                        priorityList.forEach((el: string) => createCachList.push(createLineModal(i, el)))
                        map.set(i, createCachList)
                    }
                }

                const transformList: any = [];
                [...map.values()].forEach(el => transformList.push(...el))


                setDate(transformList)
            })
        }
        get()

    }, [])
    const label = {
        formatter(text: string) {
            return Math.ceil(Number(text))
        }
    }
    const scale = {
        day: {
            range: [0, 1],
            tickCount: getDaysOfMonth()
        }
    }

    return (
        <Col md={24} xs={12}>
            <div className={styles.lineChart}>
                <h3 className={styles.title}>当月任务类型趋势图</h3>
                <Chart  height={400} data={data} scale={scale} forceFit>
                    <Axis name="day" />
                    <Axis name="total" />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom
                        type="line"
                        position="day*total"
                        size={2}
                        color={['priority', (priority: string) => {
                            if (priority === '较低') {
                                return '#8c8c8c'
                            }
                            if (priority === '普通') {
                                return '#1b9aee'
                            }
                            if (priority === '紧急') {
                                return '#fa8c15'
                            }
                            if (priority === '非常紧急') {
                                return '#ff4d4f'
                            }
                        }]}
                        shape={"smooth"} />
                    <Geom
                        type="point"
                        position="day*total"
                        size={4}
                        shape={"circle"}
                        color={"priority"}
                        style={{
                            stroke: "#fff",
                            lineWidth: 1
                        }}
                    />
                    {/* <Geom type="areaStack" position="day*complete" color="priority" />
                    <Geom type="lineStack" position="day*complete" size={2} color="priority" /> */}
                </Chart>
            </div>
        </Col>
    );
}

