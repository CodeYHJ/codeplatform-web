

import React, { useState } from 'react';
import Body from "./component/Body"
import Title from "./component/Title";
import { Popover } from 'antd';
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined"


export interface TaskOptionsProps {
    taskid: number,
    upDateFn: () => void,
    updateAllFn: () => void

}

const TaskOptions: React.SFC<TaskOptionsProps> = (props) => {
    const [sub, setSub] = useState(false)
    const openSub = () => {
        setSub(true)
    }
    const closeSub = () => {
        setSub(false)
    }

    return (

        <Popover trigger="click" title={<Title sub={sub} back={closeSub} />} content={<Body taskid={props.taskid} sub={sub} openSub={openSub} upDateFn={props.upDateFn} updateAllFn={props.updateAllFn} />} placement="bottom" >
            <EllipsisOutlined />
        </Popover >
    );
}

export default TaskOptions;