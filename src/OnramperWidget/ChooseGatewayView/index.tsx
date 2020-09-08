import React, { useContext, useState, useEffect } from 'react';
import Header from '../common/Header'
import Footer from '../common/Footer'
import styles from '../styles.module.css'
import BodyChooseGateway from './BodyChooseGateway'
import { NavContext } from '../NavContext'
import { APIContext } from '../ApiContext'

import Step from '../steps/Step'

/* import WalletAddressView from '../steps/WalletAddressView' */

import { GatewayRateOption } from '../ApiContext'

const ChooseGatewayView = () => {
  const { nextScreen } = useContext(NavContext)
  const { data, inputInterface } = useContext(APIContext)
  const { handleInputChange } = inputInterface

  const [selectedGatewayIndex, setSelectedGatewayIndex] = useState(0)
  const [availableRates, setAvailableRates] = useState<GatewayRateOption[]>([])

  useEffect(() => {
    const availableRates = data.allRates.filter(g => g.available)
    setAvailableRates(availableRates)
  }, [data.allRates])

  useEffect(() => {
    handleInputChange('selectedGateway', availableRates[selectedGatewayIndex])
  }, [handleInputChange, selectedGatewayIndex, availableRates])

  return (
    <div className={styles.view}>
      <Header title="Choose gateway" backButton />
      <BodyChooseGateway onItemClick={(i) => setSelectedGatewayIndex(i)} ratesList={data.allRates} onActionButton={() => nextScreen(<Step nextStep={availableRates[selectedGatewayIndex].nextStep!} />)} />
      <Footer />
    </div>
  );
};

export default ChooseGatewayView;