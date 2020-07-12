import React, { useState } from 'react';
import styles from './index.less'
import Item from '../Item';
export interface ItemBoxProps {
    title: string
}

const ItemBox: React.SFC<ItemBoxProps> = (props) => {
    const [itemList, setItemList] = useState([])
    const a = []
    for (let i = 0; i < 5; i++) {
        a.push(<Item key={i} context="text" />)
    }
    return (
        <div className={styles.itemBox}>
            <header className={styles.header}>{props.title}</header>
            <main className={styles.main}>
                <Item context="text" />
                <Item context="text" />
                <Item context="text" />
                <Item context="text" />
                <Item context="text" />
                <Item context="text" />
                <Item context="text" />
                <Item context="text" />
                <Item context="text" />
            </main>
        </div>
    );
}

export default ItemBox;