import React, { useCallback } from 'react'
import styles from './styles.module.css'
import { ListItemType, _ListItemType } from '../types'

type ListType = {
    items: ListItemType[]
    onItemClick?: (index: number, item: ListItemType) => void
}

const List: React.FC<ListType> = (props) => {
    const { items } = props
    const { onItemClick = () => null } = props

    const handleItemClick = useCallback((index: number, item: ListItemType) => {
        onItemClick(index, item)
    }, [onItemClick])

    return (
        <div className={`${styles.list}`}>
            {
                items.map((item, i) =>
                    <ListItem
                        key={i}
                        index={i}
                        name={item.name}
                        info={item.info}
                        icon={item.icon}
                        onClick={() => handleItemClick(i, item)} />
                )
            }
        </div>
    )
}

const ListItem: React.FC<_ListItemType> = (props) => {
    const { index, name, info, icon } = props
    const { onClick = () => null } = props
    return (
        <div className={`${styles['list-item']}`} onClick={() => onClick(index)}>
            {icon ? <img alt="Icon" className={`${styles['list-item__child']} ${styles['list-item__icon']}`} src={icon} /> : null}
            <div className={styles['list-item__child']}>
                <span>{name}</span>
                {info ? <span className={`${styles['list-item__info']}`}>{info}</span> : null}
            </div>
        </div>
    )
}

export default List
