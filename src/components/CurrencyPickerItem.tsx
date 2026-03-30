import { convert } from "@/utils/convert";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Currency, RatesUSD } from "../utils/types";

const CurrencyPickerItem = ({
  currency,
  onPress,
  currentCurrency,
  ratesUSD,
}: {
  currency: Currency;
  onPress: () => void;
  currentCurrency: Currency;
  ratesUSD: RatesUSD;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.isoCode}>{currency.iso_code}</Text>
      {currency.iso_code === currentCurrency.iso_code && (
        <Text style={styles.check}>✓</Text>
      )}
      <Text style={styles.rate}>
        <Text style={styles.listCurrencySymbol}>{currentCurrency.symbol}</Text>{" "}
        1 = <Text style={styles.listCurrencySymbol}>{currency.symbol}</Text>{" "}
        <Text style={styles.listCurrencyAmount}>
          {convert(1, currentCurrency, currency, ratesUSD).toFixed(4)}
        </Text>
      </Text>
    </TouchableOpacity>
  );
};

export default CurrencyPickerItem;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    padding: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "400",
  },
  isoCode: {
    fontSize: 16,
    fontWeight: "600",
  },
  check: {
    fontSize: 16,
    fontWeight: "400",
  },
  rate: {
    fontSize: 16,
    fontWeight: "400",
  },
  listCurrencySymbol: {
    fontSize: 16,
    fontWeight: "400",
  },
  listCurrencyAmount: {
    fontSize: 16,
    fontWeight: "400",
  },
});
