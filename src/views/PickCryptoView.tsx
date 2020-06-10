import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import List from '../components/List'
import styles from '../styles.module.css'
import IconBTC from '../icons/btc.svg'

const availableCryptos = [
  {
    icon: IconBTC,
    name: "BTC",
    info: "Bitcoin"
  },
  {
    icon: IconBTC,
    name: "BTC",
    info: "Bitcoin"
  },
  {
    icon: IconBTC,
    name: "BTC",
    info: "Bitcoin"
  },
  {
    icon: IconBTC,
    name: "BTC",
    info: "Bitcoin"
  },
  {
    icon: IconBTC,
    name: "BTC",
    info: "Bitcoin"
  },
]

const PickCryptoView = () => {
  return (
    <div className={styles.view}>
      <Header backButton title="Select cryptocurrency" />
      <List items={availableCryptos} />
      <Footer />
    </div>
  );
};

export default PickCryptoView;