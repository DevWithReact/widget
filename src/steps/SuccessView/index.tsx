import React from 'react';
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import BodySuccessView from './BodySuccessView'
import styles from '../../styles.module.css'

const SuccessViewView: React.FC = () => {

  return (
    <div className={styles.view}>
      <Header title="" backButton />
      <BodySuccessView />
      <Footer />
    </div>
  );
};

export default SuccessViewView;