

import React, { useState } from 'react';
import Body from "./component/Body"
import Title from "./component/Title";
import { Popover } from 'antd';
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined"


export interface TaskOptionsProps {
    taskid: number,
    upDateFn: () => void,
    upDateAllFn: () => void,
    hasMicro: boolean

}

const TaskOptions: React.SFC<TaskOptionsProps> = (props) => {
    const [sub, setSub] = useState(false)
    const [visible, setVisible] = useState(false)

    const openSub = () => {
        setSub(true)
    }
    const closeSub = () => {
        setSub(false)
    }
    const handleVisibleChange = (visible: boolean) => {
        setVisible(visible)
    }
    const closePopover = () => {
        setVisible(false)
    }
    return (
        <Popover trigger="click"
            title={<Title sub={sub} back={closeSub} />}
            content={<Body taskid={props.taskid}
                sub={sub}
                openSub={openSub}
                upDateFn={props.upDateFn}
                upDateAllFn={props.upDateAllFn}
                closePopover={closePopover}
                closeSub={closeSub}
                hasMicro={props.hasMicro}
            />}
            placement="bottom"
            visible={visible}
            onVisibleChange={handleVisibleChange}>
            <EllipsisOutlined />
        </Popover >
    );
}

export default TaskOptions;