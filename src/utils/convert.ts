import { Currency, RatesUSD } from "./types";

export const convert = (
  amount: number,
  from: Currency,
  to: Currency,
  rates: RatesUSD,
) => {
  if (from.iso_code === to.iso_code) return amount;

  // convert to USD first
  const usd = from.iso_code === "USD" ? amount : amount / rates[from.iso_code];

  // convert USD to target
  return to.iso_code === "USD" ? usd : usd * rates[to.iso_code];
};
