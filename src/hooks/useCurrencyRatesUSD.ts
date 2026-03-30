import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Currency, RatesUSD } from "../utils/types";
import useCurrencies from "./useCurrencies";

export default function useCurrencyRatesUSD(date: Date) {
  const allCurrencies = useCurrencies();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [ratesUSD, setRatesUSD] = useState<RatesUSD>({});
  const rates = useQuery({
    queryKey: ["ratesUSD", date.toISOString().split("T")[0]],
    queryFn: async () => {
      const response = await fetch(
        `https://api.frankfurter.dev/v2/rates?base=USD&date=${date.toISOString().split("T")[0]}`,
      );
      const data = await response.json();
      return data;
    },
  });

  useEffect(() => {
    if (allCurrencies.data && rates.data) {
      const ratesUSD1: RatesUSD = {};
      for (const currency of rates.data) {
        ratesUSD1[currency.quote] = Number(currency.rate);
      }
      setRatesUSD(ratesUSD1);
      console.log(ratesUSD1);
      const newCurrencies = allCurrencies.data.filter((currency: any) => {
        return ratesUSD1[currency.iso_code] !== undefined;
      });
      const usd = allCurrencies.data.find(
        (c: Currency) => c.iso_code === "USD",
      );
      if (usd) newCurrencies.push(usd);
      newCurrencies.sort((a: Currency, b: Currency) =>
        a.name.localeCompare(b.name),
      );
      setCurrencies(newCurrencies);
    }
  }, [allCurrencies.data, rates.data]);

  return {
    isPending: allCurrencies.isPending || rates.isPending,
    currenciesError: allCurrencies.error,
    ratesError: rates.error,
    ratesUSD,
    currencies,
  };
}
