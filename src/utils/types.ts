export type RatesUSD = {
  [isoCode: string]: number;
};

export type Currency = {
  iso_code: string;
  iso_numeric: string;
  name: string;
  symbol: string;
};