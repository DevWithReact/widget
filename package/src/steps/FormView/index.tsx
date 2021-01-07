import React, { useContext, useState, useEffect } from 'react';
import Header from '../../common/Header'
import BodyForm from './BodyFormView'
import styles from '../../styles.module.css'
import Step from '../Step'
import ErrorView from '../../common/ErrorView'

import { APIContext, NextStep } from '../../ApiContext'
import { NavContext } from '../../NavContext'
import { areAllKeysFilled } from '../utils'

import { processError } from '../Step/utils'


const FormView: React.FC<{ nextStep: NextStep & { type: 'form' } }> = ({ nextStep }) => {
  const { nextScreen } = useContext(NavContext);
  const { inputInterface, collected, apiInterface } = useContext(APIContext);
  const [isFilled, setIsFilled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string>()
  const [errorObj, setErrorObj] = useState<{ [key: string]: string }>()
  const [title, setTitle] = useState('Purchase form')
  const [infoMsg, setInfoMsg] = useState('')

  const { data: nextStepData = [] } = nextStep

  useEffect(() => {
    if (nextStepData.length === 0) return

    // set title
    if (nextStepData.some(field => field.name === 'email') && nextStepData.length <= 2) {
      setTitle('Input your email')
    }
    else if (nextStepData.some(field => field.name === 'phoneNumber') && nextStepData.length <= 2) {
      setTitle('Input phone number')
    }
    else if (nextStepData.some(field => field.name === 'verifyEmailCode') && nextStepData.length <= 2) {
      setTitle('Verify your email')
    }
    else if (nextStepData[0].name === 'verifyPhoneCode' || nextStepData[0].name === 'verifyCreditCard') {
      if (nextStepData.length === 2 && (nextStepData[1].name === 'verifyPhoneCode' || nextStepData[1].name === 'verifyCreditCard'))
        setTitle('Enter verification codes')
      else if (nextStepData.length === 1)
        setTitle('Enter verification code')
    }
    /* else if (
      (nextStepData.some(field => field.name === 'state') || nextStepData.length === 1)
      || (
        nextStepData.some(field => field.name === 'firstName')
        && nextStepData.some(field => field.name === 'country')
        && !nextStepData.some(field => field.name === 'ccNumber')
      )
    ) {
      setTitle('Your personal information')
    } */

    // set infoMsg if needed
    if (nextStepData.some(field => field.name === 'bankIban') && nextStepData.length <= 2)
      setInfoMsg('Please, fill in the bank account number that you will use to send the wire transfer.')
  }, [nextStepData])

  const handleButtonAction = async () => {
    setIsLoading(true)
    setErrorObj(undefined)
    setErrorMsg(undefined)

    const params = nextStepData.reduce((acc, current) => {
      return { ...acc, [current.name]: collected[current.name] }
    }, {})
    try {
      const newNextStep = await apiInterface.executeStep(nextStep, params);
      nextScreen(<Step nextStep={newNextStep} />)
    } catch (error) {
      if (error.fatal) {
        nextScreen(<ErrorView type="TX" message={error.message} />)
        return
      }
      const processedError = processError(error, nextStepData)
      if (processedError.field)
        setErrorObj({ [processedError.field]: processedError.message })
      else if (processedError.fields)
        setErrorObj(processedError.fields.reduce((acc, actual) => { return ({ ...acc, [actual.field]: actual.message }) }, {}))
      else
        setErrorMsg(processedError.message)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    const keysList = nextStepData.filter((data) => !(data.type === 'boolean' && data.name !== 'termsOfUse')).map(nsd => nsd.name)
    const filled = areAllKeysFilled(collected, keysList)
    setIsFilled(filled)
  }, [collected, nextStepData])

  return (
    <div className={styles.view}>
      <Header title={title} backButton />
      <BodyForm
        fields={nextStepData}
        onActionButton={handleButtonAction}
        handleInputChange={inputInterface.handleInputChange}
        isLoading={isLoading}
        errorMsg={errorMsg}
        infoMsg={infoMsg}
        isFilled={isFilled}
        onErrorDismissClick={() => setErrorMsg(undefined)}
        errorObj={errorObj}
      />
    </div>
  );
};

export default FormView;
