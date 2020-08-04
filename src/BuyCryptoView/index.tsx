import React, { useContext, useEffect, useState } from 'react';
import Header from '../common/Header'
import Footer from '../common/Footer'
import BodyBuyCrypto from './BodyBuyCrypto'
import styles from '../styles.module.css'
import PickView from '../PickView'
import ChooseGatewayView from '../ChooseGatewayView'

import { NavContext } from '../wrappers/context'
import { APIContext } from '../context'
import { ListItemType } from '../common/types';

const BuyCryptoView: React.FC = () => {
  const [isFilled, setIsFilled] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: any } | undefined>({})
  const [selectedCrypto, setSelectedCrypto] = useState<ListItemType>()
  const [selectedCurrency, setSelectedCurrency] = useState<ListItemType>()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<ListItemType>()

  const [flagEffectPrice, setFlagEffectPrice] = useState(0)

  const { nextScreen, backScreen } = useContext(NavContext);
  const { data, inputInterface, collected } = useContext(APIContext);
  const { init, handleCryptoChange, handleCurrencyChange, handlePaymentMethodChange } = data

  useEffect(() => {
    setSelectedCrypto(collected.selectedCrypto)
  }, [collected.selectedCrypto])

  useEffect(() => {
    setSelectedCurrency(collected.selectedCurrency)
  }, [collected.selectedCurrency])

  useEffect(() => {
    setSelectedPaymentMethod(collected.selectedPaymentMethod)
  }, [collected.selectedPaymentMethod])

  useEffect(() => {
    async function initEffect() {
      await init();
    }
    initEffect()
  }, [init])

  useEffect(() => {
    async function handleCryptoChangeEffect() {
      await handleCryptoChange(selectedCrypto);
    }
    handleCryptoChangeEffect()
  }, [handleCryptoChange, selectedCrypto])

  useEffect(() => {
    async function handleCurrencyChangeEffect() {
      await handleCurrencyChange(selectedCurrency);
    }
    handleCurrencyChangeEffect()
  }, [handleCurrencyChange, selectedCurrency])

  useEffect(() => {
    async function handlePaymentMethodChangeEffect() {
      processErrors({ rate: undefined })
      const err = await handlePaymentMethodChange(selectedPaymentMethod);
      processErrors(err)
    }
    handlePaymentMethodChangeEffect()
  }, [handlePaymentMethodChange, selectedPaymentMethod, setErrors, flagEffectPrice])

  const processErrors = (err: any) => {
    if (err)
      setErrors(prev => ({ ...prev, ...err }))
    else setErrors(undefined)
  }

  const handleItemClick = (name: string, index: number, item: ListItemType) => {
    if (name === 'crypto')
      setSelectedCrypto(item)
    else if (name === 'currency')
      setSelectedCurrency(item)
    else if (name === 'paymentMethod')
      setSelectedPaymentMethod(item)
    backScreen()
  }

  useEffect(() => {
    if (selectedCrypto && selectedCurrency && selectedPaymentMethod && collected.amount > 0)
      setIsFilled(true)
    else
      setIsFilled(false)
  }, [setIsFilled, selectedCrypto, selectedCurrency, selectedPaymentMethod, collected.amount])

  return (
    <div className={styles.view}>
      <Header title="Buy crypto" />
      <BodyBuyCrypto
        onBuyCrypto={() => nextScreen(<ChooseGatewayView />)}
        openPickCrypto={() => nextScreen(<PickView name='crypto' title="Select cryptocurrency" items={data.availableCryptos} onItemClick={handleItemClick} searchable />)}
        openPickCurrency={() => nextScreen(<PickView name='currency' title="Select fiat currency" items={data.availableCurrencies} onItemClick={handleItemClick} searchable />)}
        openPickPayment={() => nextScreen(<PickView name='paymentMethod' title="Select payment method" items={data.availablePaymentMethods} onItemClick={handleItemClick} />)}
        selectedCrypto={selectedCrypto}
        selectedCurrency={selectedCurrency}
        selectedPaymentMethod={selectedPaymentMethod}
        handleInputChange={inputInterface.handleInputChange}
        errors={errors}
        isFilled={isFilled}
        onPriceError={() => {
          processErrors(undefined)
          setFlagEffectPrice(prev => prev + 1)
        }}
      />
      <Footer />
    </div>
  );
};

export default BuyCryptoView;