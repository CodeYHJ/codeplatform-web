import React, { useState } from 'react';
import { Input, Divider, Button, message } from 'antd';
import { upDateTaskName } from '@api/task';

export interface NameProps {
    taskid: number,
    upDateFn: () => void,
    upDateAllFn: () => void,
    closePopover: () => void,
}

const Name: React.SFC<NameProps> = (props) => {
    const [taskName, setTaskName] = useState('')
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value)
    }
    const confinName = () => {
        if (!taskName.trim().length) return;
        upDateTaskName({ id: props.taskid, name: taskName }).then(res => {
            const { status = false } = res
            if (status) {
                message.success({ content: '任务名修改成功', key: `${new Date().getTime()}` })
                props.upDateFn()
                props.closePopover()
            }
        })
    }
    return (
        <div>
            <Input onChange={onInputChange} />
            <Divider />
            <Button type="primary" style={{ width: "100%" }} onClick={confinName}>保存</Button>
        </div>
    );
}

export default Name;