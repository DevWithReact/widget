import React from 'react'
import styles from '../styles.module.css'

import LogoOnramper from '../icons/logo.svg'

function Range() {
    const min = 1, max = 6, actual = 2
    const actualInRange = actual < min ? min : actual > max ? max : actual
    const actialPosition = `${(actualInRange - min) / (max - min) * 100}%`
    return (
        <div>
            <div className={styles.range}>
                <div className={styles.range__section} style={{ backgroundColor: 'green' }} ></div>
                <div className={styles.range__section} style={{ backgroundColor: 'green' }} ></div>
                <div className={styles.range__section} style={{ backgroundColor: 'gold' }} ></div>
                <div className={styles.range__section} style={{ backgroundColor: 'gold' }} ></div>
                <div className={styles.range__section} style={{ backgroundColor: 'orange' }} ></div>
            </div>
            <div className={styles['range-label-container']} >
                <span className={styles['range-label__min']} >{min}%</span>
                <div style={{ left: actialPosition }} className={styles['range-label__actual']} >
                    <span className={styles.bubble}>{actual}%</span>
                </div>
                <span className={styles['range-label__max']} >{max}%</span>
            </div>
        </div>
    )
}

export default Range