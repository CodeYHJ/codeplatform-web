import React, { useEffect, useRef, useState } from 'react';
import { Input, Button, Divider, message } from 'antd';
import { findDOMNode } from 'react-dom';
import { createMicroRequest } from '@api/task';
const { TextArea } = Input;
export interface AddDropDownComProps {
    handleStatus: (status: boolean) => void,
    id:number,
    upDateFn:()=>void
}

const AddDropDown: React.SFC<AddDropDownComProps> = (props) => {
    const [text, setText] = useState('')
    const [disabled, setDisabled] = useState(true)
    const addDrop = useRef(null);
    const handleEvent = (e: any) => {
        const target = e.target;
        // 组件已挂载且事件触发对象不在div内
        let result = findDOMNode(addDrop.current).contains(target);
        if (!result) {
            props.handleStatus(false)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleEvent)
        return removeEvent
    }, [])

    const removeEvent = () => {
        document.removeEventListener('click', handleEvent)
    }

    const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target
        if (value.trim().length == 0) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
        setText(e.target.value)
    }
    // 新增微任务
    const onCreate = () => {
        createMicroRequest({id:props.id,name:text}).then(res=>{
            const {status=false}= res
            if(status){
                message.success({content:'新增微任务成功',key:`${new Date().getTime()}`})

                props.upDateFn()
                props.handleStatus(false)
            }
        })
    }

    return (
        <div ref={addDrop}>
            <div style={{ flex: 1, background: '#ffffff', borderRadius: '6px' }}>
                <div style={{ padding: '10px 10px 0 10px' }}>
                    <TextArea placeholder="请输入任务标题" onChange={onChangeTextArea} value={text} />
                </div>
                <Divider></Divider>
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '10px' }}>
                    <Button type="primary" disabled={disabled} style={{ margin: '0 10px' }} onClick={onCreate}>创建</Button>
                </div>

            </div>
        </div>

    );
}

export default AddDropDown;