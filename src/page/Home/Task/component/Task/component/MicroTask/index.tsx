import React, { useState, useRef, useEffect } from 'react';
import { Checkbox, Modal, Select, Form, Input, Dropdown, Button, Menu, message } from 'antd';
import { BaseMicrotask, upDateMicroTaskStatus, upDateMicroTaskDsc, upDateMicroTaskLevel, upDateMicroTaskRemark } from '@api/task';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
import CheckSquareOutlined from "@ant-design/icons/lib/icons/CheckSquareOutlined"
import BorderOutlined from "@ant-design/icons/lib/icons/BorderOutlined"
import styles from './index.less'
import { ClickParam } from 'antd/lib/menu';
import { isInWeek } from '@util/';
import { isTomorrow } from '@util/';
import moment from 'moment';

const { TextArea } = Input
export interface MicroTaskProps {
    data: BaseMicrotask,
    upDateFn: () => void
}

const MicroTask: React.SFC<MicroTaskProps> = (props) => {
    const [visible, setVisible] = useState(false)
    const [microTask, setMircroTask] = useState(null)
    const [buttonKey, setButtonKey] = useState('0')
    const [statusKey, setStatusKey] = useState('0')
    const [name, setName] = useState('')
    const [remark, setRemark] = useState(null)
    const [checked, setChecked] = useState(false)
    const [openRemark, setOpenRemark] = useState(false)
    const [tipLine, setTipLine] = useState('')
    const ref = useRef(null)
    useEffect(() => {
        const { priority, complete, dsc, remark } = props.data
        setMircroTask(props.data)
        setButtonKey(String(priority))
        setStatusKey(String(complete))
        setName(dsc)
        setRemark(remark)
        setChecked(complete === 1 ? true : false)
        const priorityList = [priority]
        priorityList.includes(0) && setTipLine(styles.tipLine_general)
        priorityList.includes(1) && setTipLine(styles.tipLine_ordinary)
        priorityList.includes(2) && setTipLine(styles.tipLine_warn)
        priorityList.includes(3) && setTipLine(styles.tipLine_danger)
    }, [props.data])
    const openModel = () => {
        setVisible(true)
    }
    const closeModel = () => {
        setVisible(false)
    }
    const onChange = (e: CheckboxChangeEvent) => {
        const { checked } = e.target
        const value = checked ? 1 : 0
        upDateMicroTaskStatus({ id: microTask.id, complete: value }).then(res => {
            const { status = false } = res
            if (status) {
                message.success({ content: '更新状态成功', key: `${new Date().getTime()}` })
                setChecked(checked)
            }
        }).then(() => {
            props.upDateFn()
        })
    }
    const ModalTitle = (
        <div className={styles.title}>任务</div>
    )
    const handleButtonMenuClick = (e: ClickParam) => {
        const key = e.key
        setButtonKey(key)
        upDateMicroTaskLevel({ id: microTask.id, priority: Number(key) }).then((res) => {
            message.success({ content: '更新优先级成功', key: `${new Date().getTime()}` })
            props.upDateFn()
        })
    }
    const handleStatusMenuClick = (e: ClickParam) => {
        const key = e.key
        setStatusKey(key)
        upDateMicroTaskStatus({ id: microTask.id, complete: Number(key) }).then((res) => {
            const { status = false } = res
            if (status) {
                message.success({ content: '更新状态成功', key: `${new Date().getTime()}` })
            }
            props.upDateFn()
        })
    }
    const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRemark(e.target.value)
    }
    const upDateEdit = () => {
        const localName = ref.current.innerText

        if (localName.trim().length === 0) {
            ref.current.innerHTML = name;
            return;
        };
        upDateMicroTaskDsc({ id: microTask.id, dsc: localName }).then(() => { props.upDateFn() })
    }
    const upDateRemark = () => {

        if (!remark || remark.trim().length === 0) return;
        if (microTask.remark === remark) {
            setOpenRemark(false)
            return;
        }
        upDateMicroTaskRemark({ id: microTask.id, remark: remark }).then((res) => {
            const { status = false } = res
            if (status) {
                message.success({ content: '更新备注成功', key: `${new Date().getTime()}` })
            }
            setOpenRemark(false)
        }).then(() => { props.upDateFn() })
    }

    const RenderButton = () => {

        if (buttonKey === '0') {
            return <Button className={styles.button_general}>较低</Button>
        }
        if (buttonKey === '1') {
            return <Button className={styles.button_ordinary}>普通</Button>
        }
        if (buttonKey === '2') {
            return <Button className={styles.button_warn}>紧急</Button>
        }
        if (buttonKey === '3') {
            return <Button danger>非常紧急</Button>
        }
    }
    const RenderStatus = () => {
        if (statusKey === '0') {
            return (
                <div className={styles.unCheck}>
                    <BorderOutlined className={styles.checkIcon} />
            未完成
                </div>
            )
        }
        if (statusKey === '1') {
            return (
                <div className={styles.check}>
                    <CheckSquareOutlined className={styles.checkIcon} />
            完成
                </div>
            )
        }
    }
    const RenderRemark = () => {
        if (openRemark) {
            return (
                <div>
                    <TextArea placeholder="待添加" value={remark} onChange={handleTextArea} />
                    <div className={styles.remarkButton}>
                        <Button className={styles.remark_cancle} onClick={() => { setOpenRemark(false) }}>取消</Button>
                        <Button type="primary" onClick={upDateRemark}>保存</Button>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ cursor: 'pointer' }} onClick={() => { setOpenRemark(true) }}>{remark ? remark : "待添加"}</div>
            )
        }
    }
    const RenderEndTime = () => {
        if (microTask && microTask.endtime) {
            const date = moment(microTask.endtime)
            if (isTomorrow(microTask.endTime)) {
                return (
                    <div className={styles.rang_tomorrow}>明天 截止</div>
                )
            }
            else if (isInWeek(microTask.endtime)) {
                return (
                    <div className={styles.rang_week}>{date.format('dddd')} 截止</div>
                )
            } else {
                return (
                    <div className={styles.rang_far}>{date.format("MMM Do")} 截止</div>
                )
            }

        }
    }
    const DropdownButtonMenu = (
        <Menu style={{ textAlign: 'center' }} onClick={handleButtonMenuClick} >
            <Menu.Item key="0">
                <Button className={styles.button_general}>较低</Button>
            </Menu.Item>
            <Menu.Item key="1">
                <Button className={styles.button_ordinary}>普通</Button>
            </Menu.Item>
            <Menu.Item key="2">
                <Button className={styles.button_warn}>紧急</Button>
            </Menu.Item>
            <Menu.Item key="3">
                <Button danger>非常紧急</Button>
            </Menu.Item>
        </Menu>
    )
    const DropdownStatusMenu = (
        <Menu onClick={handleStatusMenuClick} >
            <Menu.Item key="0">
                <div className={styles.unCheck}>
                    未完成
            </div>
            </Menu.Item>
            <Menu.Item key="1">
                <div className={styles.check}>
                    完成
            </div>
            </Menu.Item>

        </Menu>
    )
    return (
        <div className={styles.microTask} >
            <Checkbox className={styles.checkBox} checked={checked} onChange={onChange} />
            <div className={styles.content} onClick={openModel}>
                <div className={styles.name} >{name}</div>
                <div className={styles.endTime}>
                    {RenderEndTime()}
                </div>
            </div>
            <div className={tipLine + ' ' + styles.tipLine}></div>
            <Modal
                maskClosable={false}
                visible={visible}
                onCancel={closeModel}
                title={ModalTitle}
                footer={null}>
                <div className={styles.microDsc}>
                    <div className={styles.mTitle}
                        onBlur={upDateEdit}
                        title="点击即可编辑"
                    >
                        <div ref={ref}
                            className={styles.mTitleText}
                            contentEditable={true}
                            spellCheck={false}
                            suppressContentEditableWarning={true}
                        >
                            {name}
                        </div>
                    </div>
                    <Form labelCol={{ span: 4 }} labelAlign="left">
                        <Form.Item colon={false} label="状态" className={styles.mStatus}>
                            <Dropdown
                                className={styles.status}
                                overlay={DropdownStatusMenu}
                                placement="bottomLeft"
                                trigger={['click']}>
                                {RenderStatus()}
                            </Dropdown>
                        </Form.Item>
                        <Form.Item colon={false} label="备注" className={styles.mRemarks}>
                            {RenderRemark()}
                        </Form.Item>
                        <Form.Item colon={false} label="优先级" className={styles.mPriority}>
                            <Dropdown
                                className={styles.buttons}
                                overlay={DropdownButtonMenu}
                                placement="bottomLeft"
                                trigger={['click']}>
                                {RenderButton()}
                            </Dropdown>
                        </Form.Item>
                    </Form>

                </div>
            </Modal>
        </div>
    );
}

export default MicroTask;