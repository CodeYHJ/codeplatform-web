import React, { useState, memo } from 'react';
import styles from './index.less'
import Item from '../Item';
import { BoardsType } from '../..';
// import { BoardsType } from '../TabType';
export interface ItemBoxProps {
    title: string,
    type: BoardsType
}

const ItemBox: React.SFC<ItemBoxProps> = (props) => {
    const [itemList, setItemList] = useState([])
    const a = []
    for (let i = 0; i < 5; i++) {
        a.push(<Item type={props.type} key={i} context="text" />)
    }
    return (
        <div className={styles.itemBox}>
            <Item type={props.type} context="text" />
            <Item type={props.type} context="text" />
            <Item type={props.type} context="text" />
            <Item type={props.type} context="text" />
            <Item type={props.type} context="text" />
            <Item type={props.type} context="text" />
            <Item type={props.type} context="text" />
            <Item type={props.type} context="text" />
            <Item type={props.type} context="text" />
            <Item type={props.type} context="text" />

        </div>
    );
}

export default memo(ItemBox);