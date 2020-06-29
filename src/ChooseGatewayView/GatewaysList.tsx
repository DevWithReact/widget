import React, { useState, useCallback } from 'react'
import styles from '../styles.module.css'
import GatewayOption, { GatewayOptionType } from './GatewayOption'

type GatewaysListType = {
    items: Omit<GatewayOptionType, 'index'>[],
    onClick: (index: number) => void
}

const GatewaysList: React.FC<GatewaysListType> = (props) => {
    const { items } = props //const
    const { onClick } = props

    const [selectedGateway, setSelectedGateway] = useState(0)

    const handleItemClick = useCallback((index: number) => {
        setSelectedGateway(index)
        onClick(index)
    }, [onClick])

    return (
        <main className={`${styles.body} ${styles['gateways-list']}`}>{/* TODO: change all custom lists to general list */}
            {console.log(selectedGateway)}
            {
                items.map((item, i) =>
                    <GatewayOption
                        key={i}
                        index={i}
                        name={item.name}
                        txTime={item.txTime}
                        kycLevel={item.kycLevel}
                        amount={item.amount}
                        denom={item.denom}
                        fee={item.fee}
                        logo={item.logo}
                        isOpen={i === selectedGateway}
                        onClick={handleItemClick}
                        selectedAmount={items[selectedGateway].amount} />
                )
            }
        </main>
    )
}

export default GatewaysList