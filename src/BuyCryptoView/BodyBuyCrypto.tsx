import React, { useContext, useEffect, useState, useCallback } from 'react'
import stylesCommon from '../styles.module.css'

import InputButton from '../common/Input/InputButton'
import InputTextAmount from '../common/Input/InputTextAmount'
import ButtonAction from '../common/ButtonAction'
import ExpectedCrypto from './ExpectedCrypto'

import { APIContext } from '../context'

import { ListItemType } from '../common/types'
import { ItemType } from '../context'
import InfoBox from '../common/InfoBox'

type BodyBuyCryptoType = {
    onBuyCrypto: () => void,
    openPickCrypto: () => void,
    openPickCurrency: () => void,
    openPickPayment: () => void,
    onPriceError?: (errName: string) => void
    selectedCrypto?: ListItemType,
    selectedCurrency?: ListItemType,
    selectedPaymentMethod?: ListItemType
    handleInputChange: (name: string, value: any) => void
    errors?: { [key: string]: any }
    isFilled?: boolean
}



const BodyBuyCrypto: React.FC<BodyBuyCryptoType> = (props) => {
    const { openPickCrypto, onBuyCrypto, openPickCurrency, openPickPayment, onPriceError = (s: string) => null } = props
    const { selectedCrypto = LoadingItem, selectedCurrency = LoadingItem, selectedPaymentMethod = LoadingItem, errors = {}, isFilled = true } = props
    const { handleInputChange } = props
    const { collected } = useContext(APIContext);

    const [pairs, setPairs] = useState<ListItemType[]>()
    const [amountInCrypto, setAmountInCrypto] = useState(false)

    const generalErrors = Object.keys(errors).filter((errName) => !errName.startsWith('input-') && errors[errName])

    useEffect(() => {
        setPairs([selectedCurrency, selectedCrypto])
    }, [selectedCurrency, selectedCrypto])

    const handleSymbolChange = useCallback(
        (item: ListItemType | undefined) => {
            if (item) {
                handleInputChange('amountInCrypto', item.type === ItemType.Crypto)
                setAmountInCrypto(item.type === ItemType.Crypto)
            }
        }, [handleInputChange],
    )


    return (
        <main className={stylesCommon.body}>
            {
                generalErrors.map((errName, i) =>
                    <InfoBox key={i} in={errors[errName] !== undefined} type='error' className={`${stylesCommon['body__child']}`}>
                        {errors[errName]}
                        &nbsp;
                        {(errName === 'gateways' || errName === 'rate') && <button className={stylesCommon['button--link']} onClick={() => onPriceError(errName)}>Try again.</button>}
                    </InfoBox>
                )
            }
            {
                !errors['gateways'] && <>
                    <InputButton onClick={openPickCrypto} className={stylesCommon['body__child']} label="I want to buy" selectedOption={selectedCrypto.name} icon={selectedCrypto.icon} />
                    <div className={`${stylesCommon['body__child']} ${stylesCommon['row-fields']}`}>
                        <InputTextAmount error={errors['input-amount']?.message} name='amount' type='number' value={collected.amount} onChange={handleInputChange} className={`${stylesCommon['row-fields__child']} ${stylesCommon['grow']}`} label="Amount" symbol={selectedCurrency.symbol} placeholder="100" symbols={pairs} onSymbolChange={handleSymbolChange} />
                        <InputButton onClick={openPickCurrency} className={stylesCommon['row-fields__child']} label="Currency" selectedOption={selectedCurrency.name} icon={selectedCurrency.icon} />
                    </div>
                    <InputButton onClick={openPickPayment} iconPosition="end" className={stylesCommon['body__child']} label="Payment method" selectedOption={selectedPaymentMethod.name} icon={selectedPaymentMethod.icon} />
                    <ExpectedCrypto className={`${stylesCommon['body__child']} ${stylesCommon.grow}`} amountInCrypto={amountInCrypto} denom={amountInCrypto ? selectedCurrency.name : selectedCrypto.name} isLoading={collected.isCalculatingAmount} />
                    <div className={`${stylesCommon['body__child']}`}>
                        <ButtonAction onClick={onBuyCrypto} text='Get crypto' disabled={!isFilled || collected.isCalculatingAmount || Object.keys(generalErrors).length > 0} />
                    </div>
                </>
            }
        </main >
    )
}

const LOAGIND_TEXT = 'Loading...'
const LoadingItem = {
    name: LOAGIND_TEXT,
    icon: '',
    symbol: ''
}

export default BodyBuyCrypto