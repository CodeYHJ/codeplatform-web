

import React, { useState, useContext } from 'react';
import Body from "./component/Body"
import Title from "./component/Title";
import { Popover } from 'antd';
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined"
import { MicroTaskContext } from '@store/microTask/microTaskContext';


export interface TaskOptionsProps {
    taskid: number,
    upDateFn: () => void,
    upDateAllFn: () => void,
    hasMicro: boolean

}

const TaskOptions: React.SFC<TaskOptionsProps> = (props) => {
    const [visible, setVisible] = useState(false)
    const { dispatchForeTask } = useContext(MicroTaskContext)

    const handleVisibleChange = (visible: boolean) => {
        setVisible(visible)
        dispatchForeTask({ type: 'CLOSE_ALL' })

    }
    const closePopover = () => {
        setVisible(false)
    }
    return (
        <Popover trigger="click"
            title={<Title />}
            content={<Body taskid={props.taskid}
                upDateFn={props.upDateFn}
                upDateAllFn={props.upDateAllFn}
                closePopover={closePopover}
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