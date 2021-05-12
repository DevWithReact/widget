import React, { useContext, useEffect, useState } from 'react';
import styles from './styles.module.css'
import commonStyles from '../../styles.module.css'

import { NavContext } from '../../NavContext'
import { CSSTransition } from 'react-transition-group';
import ButtonAction from '../ButtonAction'

interface HelpViewProps {
  buttonText?: string
  maxHeight?: string
  fixedHeight?: boolean
  onActionClick?: () => Promise<boolean>
  error?: string
}

const HelpView: React.FC<HelpViewProps> = (props) => {
  const transitionRef = React.useRef(null)
  const { backScreen } = useContext(NavContext);

  const [isActive, setIsActive] = useState(false)

  const { maxHeight = '350px', fixedHeight = false } = props
  const classPrefix = fixedHeight ? '--fixed' : ''

  const ANIMATION_TIMEOUT = 250

  useEffect(() => {
    setIsActive(true)
  }, [])



  const handleDismiss = () => {
    setIsActive(oldValue => !oldValue)
    setTimeout(backScreen, ANIMATION_TIMEOUT)
  }

  const handleOnButtonClick = async () => {
    if (props.error || await props.onActionClick?.()) {
      /* handleDismiss() */
    }
  }

  const style = {
    "--pane-max-height": maxHeight
  } as React.CSSProperties;

  return (

    <div className={`${commonStyles.view} ${styles['help-view']}`} onClick={handleDismiss}>
      <CSSTransition nodeRef={transitionRef} in={isActive}
        timeout={ANIMATION_TIMEOUT}
        classNames={{
          enter: styles['collapse-enter' + classPrefix],
          enterActive: styles['collapse-enter-active' + classPrefix],
          exit: styles['collapse-exit' + classPrefix],
          exitActive: styles['collapse-exit-active' + classPrefix]
        }}
        mountOnEnter={true}
        unmountOnExit={true}>
        <div ref={transitionRef} style={style} onClick={(e) => e.stopPropagation()} className={`${commonStyles.body} ${styles['help-pane']} ${styles['help-pane' + classPrefix]}`} >
          {props.children}
          {props.buttonText && <ButtonAction onClick={props.error ? handleDismiss : handleOnButtonClick} text={props.buttonText} />}
        </div>
      </CSSTransition>


    </div>
  );
};

export default HelpView;
