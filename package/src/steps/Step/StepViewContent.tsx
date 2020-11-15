import React, { useContext, useEffect, useState } from 'react'
import stylesCommon from '../../styles.module.css'

import ErrorVisual from '../../common/ErrorVisual'

import ConfirmPaymentView from '../ConfirmPaymentView'
import UploadView from '../UploadView'
import PickOptionView from '../PickOptionView'
import FormView from '../FormView'
import SuccessView from '../SuccessView'
import IframeView from '../IframeView'
import WireTranserView from '../WireTranserView'

import { NavContext } from '../../NavContext'

import { NextStep } from '../../ApiContext'

export interface NewStepProps {
    nextStep?: NextStep
    isConfirmed?: boolean
}
const StepViewContent: React.FC<NewStepProps> = ({ nextStep, isConfirmed }) => {
    const { replaceScreen, backScreen/* , onlyScreen */ } = useContext(NavContext);
    const [isProcessingStep, setIsProcessingStep] = useState(true)

    useEffect(() => {
        if (!nextStep) {
            setIsProcessingStep(false)
            return
        }
        if ((isConfirmed !== undefined && !isConfirmed) || (!isConfirmed && (nextStep.type === 'iframe' || nextStep.type === 'requestBankTransaction'))) {
            replaceScreen(<ConfirmPaymentView nextStep={nextStep} />)
            return
        }
        switch (nextStep.type) {
            case 'form':
                replaceScreen(<FormView nextStep={nextStep} />)
                break;
            case 'file':
                replaceScreen(<UploadView nextStep={nextStep} />)
                break;
            case 'pickOne':
                replaceScreen(<PickOptionView nextStep={nextStep} />)
                break;
            case 'redirect':
                replaceScreen(<IframeView nextStep={nextStep} />)
                break;
            case 'completed':
                replaceScreen(<SuccessView txType='instant' />)//onlyScreen(<SuccessView txType='instant' />)
                break;
            case 'iframe':
                replaceScreen(<IframeView nextStep={nextStep} />)
                break;
            case 'requestBankTransaction':
                replaceScreen(<WireTranserView nextStep={nextStep} />)//onlyScreen(<WireTranserView nextStep={nextStep} />)
                break;
            default:
                break;
        }
        setIsProcessingStep(false)
    }, [nextStep, replaceScreen, backScreen, isConfirmed])

    return (
        <main className={stylesCommon.body}>
            {!isProcessingStep && <div className={`${stylesCommon['body__child']} ${stylesCommon['grow']}`}>
                <ErrorVisual message="An error occurred while trying to connect to server. Please try again later." />
            </div>}
        </main>
    )
}

export default StepViewContent