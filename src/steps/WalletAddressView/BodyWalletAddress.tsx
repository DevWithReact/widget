import React, { useContext, useState, useEffect, useCallback } from 'react'
import stylesCommon from '../../styles.module.css'

import PickView from '../../PickView'

import InputText from '../../common/Input/InputText'
import ButtonAction from '../../common/ButtonAction'

import IconChevronRight from '../../icons/chevron_right.svg'

import { APIContext } from '../../context'
import { NavContext } from '../../wrappers/context'
import { ItemType } from '../../context'

type BodyWalletAddressType = {
    onActionButton: () => void
    handleInputChange: (name: string, value: any) => void
    isFilled: boolean
    isLoading?: boolean
}

const BodyWalletAddress: React.FC<BodyWalletAddressType> = (props) => {
    const { handleInputChange, onActionButton, isFilled, isLoading = false } = props
    const { collected } = useContext(APIContext)
    const [selectedAddress, setSelectedAddress] = useState('')
    const { nextScreen, backScreen } = useContext(NavContext);

    const selectedCrypto = collected.selectedCrypto
    let items: ItemType[] = []
    if (selectedCrypto && collected.defaultAddrs[selectedCrypto.name])
        items = collected.defaultAddrs[selectedCrypto.name].map((addr) => ({ name: addr, id: addr }))

    useEffect(() => {
        handleInputChange('cryptocurrencyAddress', selectedAddress)
    }, [selectedAddress, handleInputChange])

    const handleAddressSelection = (name: string, index: number) => {
        setSelectedAddress(items[index].name)
        backScreen()
    }

    const onChange = useCallback((name: string, value: string) => {
        setSelectedAddress(value)
        handleInputChange(name, value)
    }, [handleInputChange])

    return (
        <main className={stylesCommon.body}>
            <InputText
                value={selectedAddress}
                icon={items.length > 0 ? IconChevronRight : undefined}
                iconPosition='end'
                onIconClick={() => nextScreen(<PickView onItemClick={handleAddressSelection} title="Select address" items={items} />)}
                name='cryptocurrencyAddress' onChange={onChange} className={stylesCommon['body__child']} label={`RECEIVER ${collected.selectedCrypto?.name} WALLET ADDRESS`} placeholder="" />
            <div className={`${stylesCommon['body__child']} ${stylesCommon.grow}`}>
                <ButtonAction onClick={onActionButton} text={isLoading ? 'Creating transaction...' : 'Continue'} disabled={!isFilled} />
            </div>
        </main>
    )
}

BodyWalletAddress.defaultProps = {

}

export default BodyWalletAddress