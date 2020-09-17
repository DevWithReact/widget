// Taken from https://api.moonpay.io/v3/currencies
// Generation script:
/*
c={}
a.map(b=>c[b.code.toUpperCase()]=b.addressRegex)
*/

export default {
  ADA: /^([1-9A-HJ-NP-Za-km-z]{59})|([1-9A-HJ-NP-Za-km-z]{104})$/,
  ATOM: /^(cosmos1)[0-9a-z]{38}$/,
  AVA: /^(bnb1)[0-9a-z]{38}$/,
  BAT: /^(0x)[0-9A-Fa-f]{40}$/,
  BCH: /^(bitcoincash:)?(q|p)[a-z0-9]{41}$/,
  BNB: /^(bnb1)[0-9a-z]{38}$/,
  BORA: /^(0x)[0-9A-Fa-f]{40}$/,
  BTC: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^(bc1)[0-9A-Za-z]{39,59}$/,
  BUSD: /^(bnb1)[0-9a-z]{38}$/,
  CELO: /^(0x)[0-9A-Fa-f]{40}$/,
  CHZ: /^(0x)[0-9A-Fa-f]{40}$/,
  CVC: /^(0x)[0-9A-Fa-f]{40}$/,
  DAI: /^(0x)[0-9A-Fa-f]{40}$/,
  DASH: /^[X|7][0-9A-Za-z]{33}$/,
  DGB: /^[DS][a-km-zA-HJ-NP-Z1-9]{25,34}$|^(dgb1)[0-9A-Za-z]{39,59}$/,
  DOGE: /^(D|A|9)[a-km-zA-HJ-NP-Z1-9]{33,34}$/,
  DROP: /^(simpleledger:)?(q|p)[a-z0-9]{41}$/,
  EOS: /^[1-5a-z\\\\.]{1,12}$/,
  EOSDT: /^[1-5a-z\\\\.]{1,12}$/,
  ERD: /^(0x)[0-9A-Fa-f]{40}$/,
  ETC: /^(0x)[0-9A-Fa-f]{40}$/,
  ETH: /^(0x)[0-9A-Fa-f]{40}$/,
  FUN: /^(0x)[0-9A-Fa-f]{40}$/,
  HBAR: /^0\\.0\\.\\d{1,6}$/,
  HIVE: /^[a-z][a-z0-9-.]{0,14}[a-z0-9]$/,
  KAVA: /^(kava1)[0-9a-z]{38}$/,
  LBC: /^(b|r)(?=[^0OIl]{32,33})[0-9A-Za-z]{32,33}$/,
  LTC: /^(L|M|3)[A-Za-z0-9]{33}$|^(ltc1)[0-9A-Za-z]{39}$/,
  LUNA: /^(terra1)[0-9A-Za-z]{38}$/,
  MANA: /^(0x)[0-9A-Fa-f]{40}$/,
  MIOTA: /^[A-Z9]{90}$/,
  NANO: /^(xrb_|nano_)[13456789abcdefghijkmnopqrstuwxyz]{60}$/,
  NEO: /^(A)[A-Za-z0-9]{33}$/,
  OKB: /^(0x)[0-9A-Fa-f]{40}$/,
  ONG: /^A[0-9a-zA-Z]{33}$/,
  ONT: /^(A)[A-Za-z0-9]{33}$/,
  PAX: /^(0x)[0-9A-Fa-f]{40}$/,
  QTUM: /^[Q|M][A-Za-z0-9]{33}$/,
  RVN: /^[Rr]{1}[A-Za-z0-9]{33,34}$/,
  SDT: /^(terra1)[0-9A-Za-z]{38}$/,
  SOL: /^[0-9a-zA-Z]{32,44}$/,
  SPICE: /^(simpleledger:)?(q|p)[a-z0-9]{41}$/,
  STMX: /^(0x)[0-9A-Fa-f]{40}$/,
  TOBA: /^(simpleledger:)?(q|p)[a-z0-9]{41}$/,
  TRX: /^T[1-9A-HJ-NP-Za-km-z]{33}$/,
  TUSD: /^(0x)[0-9A-Fa-f]{40}$/,
  USDC: /^(0x)[0-9A-Fa-f]{40}$/,
  USDH: /^(simpleledger:)?(q|p)[a-z0-9]{41}$/,
  USDT: /^(0x)[0-9A-Fa-f]{40}$/,
  VET: /^(0x)[0-9A-Fa-f]{40}$/,
  WAVES: /^(3P)[0-9A-Za-z]{33}$/,
  WAXP: /^[1-5a-z\\.]{1,12}$/,
  XLM: /^G[A-D]{1}[A-Z2-7]{54}$/,
  XRP: /^r[1-9A-HJ-NP-Za-km-z]{25,34}$/,
  XTZ: /^(tz[1,2,3]|KT1)[a-zA-Z0-9]{33}$/,
  ZEC: /^(t)[A-Za-z0-9]{34}$/,
  ZIL: /^zil1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{38}$/,
  ZRX: /^(0x)[0-9A-Fa-f]{40}$/,
} as { [crypto: string]: RegExp | undefined };
