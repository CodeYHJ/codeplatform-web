import React, { useEffect, useState } from 'react';

import { Table } from 'antd';
import { getTestList, TestResponse, getTestDsc } from '@api/test';
import { ColumnProps } from 'antd/lib/table';
import HourglassTwoTone from "@ant-design/icons/lib/icons/HourglassTwoTone"
import ScheduleTwoTone from "@ant-design/icons/lib/icons/ScheduleTwoTone"

export interface TestProps {

}

interface ColumnsPropsExtends {
    align: string,
    index: string
}

interface ColumnsPropsChildrenExtends {
    building: boolean;
    fullDisplayName: string;
    id: number;
    queueId: number;
    result: string;
    [key: string]: any
}

 const Test: React.SFC<TestProps> = () => {

    const [dataSource, setDataSource] = useState([])

    const [childrenSource, setChildrenSource] = useState([])

    const [loading, setLoading] = useState(false)

    const [expandedRowKeys, setExpandedRowKeys] = useState([])

    useEffect(() => {
        const testList = async () => {
            await getTestList().then(res => {
                const { list } = res
                list.forEach((el, index) => el.key = index)
                setDataSource(list)
            })
        }
        testList()
    }, [])

    const columns: ColumnProps<ColumnsPropsExtends>[] = [
        {
            title: '测试用例',
            dataIndex: 'name',
            key: 'name',
            align: 'center',

        },
        {
            title: '工作状态',
            dataIndex: 'working',
            key: 'working',
            align: 'center',
            render: (text) => {
                if (text) {
                    return (
                        <HourglassTwoTone />
                    )
                } else {
                    return (<ScheduleTwoTone />)
                }

            }
        },

    ]

    const pagination = {
        hideOnSinglePage: true
    }

    const expandedRowRender = () => {

        childrenSource.forEach((el, index) => {
            el.key = index
        });

        const childrenColumns: ColumnProps<ColumnsPropsChildrenExtends>[] = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                align: 'center',

            },
            {
                title: '名字',
                dataIndex: 'fullDisplayName',
                key: 'fullDisplayName',
                align: 'center',

            },
            {
                title: '工作状态',
                dataIndex: 'building',
                key: 'building',
                align: 'center',
                render: (text) => {
                    if (text) {
                        return (
                            <HourglassTwoTone />
                        )
                    } else {
                        return (<ScheduleTwoTone />)
                    }

                }
            },
            {
                title: '结果',
                dataIndex: 'result',
                key: 'result',
                align: 'center',

            }
        ]

        return (
            <Table
                loading={loading}
                style={{ flex: 1 }}
                dataSource={childrenSource}
                columns={childrenColumns}
                pagination={false}

            />
        )
    }
    const onExpand = (expanded: boolean, record: TestResponse) => {
        if (!expanded) {
            setExpandedRowKeys([])
            return;
        }
        const { name: testname } = record
        setLoading(true)
        getTestDsc(testname).then(res => {
            const { dscList } = res
            setChildrenSource(dscList)
        }).finally(() => {
            setLoading(false)
            setExpandedRowKeys([String(record.key)])
        })
    }
    return (
        <div className="testPage">
            <Table
                style={{ flex: 1 }}
                rowKey={(record) => String(record.key)}
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
                onExpand={onExpand}
                expandedRowKeys={expandedRowKeys}
                expandable={{ expandedRowRender }}
            />
        </div>

    );
}


export default Test;
