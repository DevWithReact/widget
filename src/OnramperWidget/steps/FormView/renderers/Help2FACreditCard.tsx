import React from 'react'
import stylesCommon from '../../../styles.module.css'
import help_2fa_cc from '../../../icons/help_2fa_cc.jpg'

type Help2FACreditCardType = {

}

const Help2FACreditCard: React.FC<Help2FACreditCardType> = (props) => {

    return (
        <>
            <h4 className={stylesCommon['help-title']}>2FA Credit Card</h4>
            <p className={stylesCommon['help-text']}>Enter the 6 digit Bank verification code. You can find this in your pending transactions.</p>
            <img className={stylesCommon['help-img']} src={help_2fa_cc} alt="Pending transaction screenshot" />
        </>
    )
}

export default Help2FACreditCard