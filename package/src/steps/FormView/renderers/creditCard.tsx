import React, { useState } from 'react'
import stylesCommon from '../../../styles.module.css'
import InputText from '../../../common/Input/InputText'

type CreditCardInputType = {
    handleInputChange: (name: string, value: any) => void
    errorObj?: { [key: string]: string }
    ccNumberValue?: string
    ccMonthValue?: string
    ccYearValue?: string
    ccCVVValue?: string
}

const CreditCardInput = React.forwardRef<HTMLDivElement, CreditCardInputType>((props, ref) => {

    const { ccNumberValue = '', ccMonthValue = '', ccYearValue = '', ccCVVValue = '' } = props

    const [isSlashed, setIsSlashed] = useState(false)

    const onChange = (name: string, v: string) => {
        let value = v
        if (name === 'ccExpiration') {
            if (!isSlashed && value.length === 2) {
                setIsSlashed(true)
            }
            else if (isSlashed && value.length === 4) {
                setIsSlashed(false)
                value = value.substr(0, 1)
            }

            let month = value.split('/')[0].replace(' ', '')
            let year = (value.split('/')[1] ?? '').replace(' ', '')
            if (year.length > 2) return
            props.handleInputChange('ccMonth', month)
            props.handleInputChange('ccYear', '20' + year)
        }
        else if (name === 'ccNumber') {
            const ccNumberValue = formatCardNumber(value.replace(/ /g, '')).replace(/ /g, '')
            if (ccNumberValue.length > 16) return
            props.handleInputChange(name, ccNumberValue)
        }
        else {
            props.handleInputChange(name, value)
        }
    }

    const formatCardNumber = (value: string) => {
        const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g
        const onlyNumbers = value.replace(/[^\d]/g, '')

        return onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
            [$1, $2, $3, $4].filter(group => !!group).join(' ')
        )
    }

    const formatExpiryDate = (value: string) => {
        if (isSlashed && value.length === 2)
            return value + ' / '

        const regex = /^(\d{0,2})(\d{0,2})$/g
        const onlyNumbers = value.replace(/[^\d]/g, '')

        return onlyNumbers.replace(regex, (regex, $1, $2) =>
            [$1, $2].filter(group => !!group).join(' / ')
        )
    }

    return (
        <>
            <InputText
                ref={ref}
                className={stylesCommon["body__child"]}
                label="Card number"
                name="ccNumber"
                error={props.errorObj?.['ccNumber']}
                onChange={onChange}
                placeholder='4111 1111 1111 1111'
                value={formatCardNumber(ccNumberValue)}
            />
            <div
                className={`${stylesCommon["body__child"]} ${stylesCommon["row-fields"]}`}
            >
                <InputText
                    className={stylesCommon["row-fields__child"]}
                    label="Expiry date"
                    name="ccExpiration"
                    error={props.errorObj?.['ccMonth'] || props.errorObj?.['ccYear']}
                    onChange={onChange}
                    placeholder='MM/YY'
                    value={formatExpiryDate(`${ccMonthValue}${ccYearValue.substring(2, 4)}`)}
                /* value={formatExpiryDate('1111')} */
                />
                <InputText
                    className={stylesCommon["row-fields__child"]}
                    label="CCV"
                    name="ccCVV"
                    error={props.errorObj?.['ccCVV']}
                    onChange={onChange}
                    placeholder='123'
                    value={ccCVVValue}
                />
            </div>
        </>
    )
})

export default CreditCardInput