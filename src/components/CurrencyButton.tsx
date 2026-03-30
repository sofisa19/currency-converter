import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Currency } from "../utils/types";

const CurrencyButton = ({
  currency,
  onPress,
}: {
  currency: Currency;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.isoCode}>{currency.iso_code}</Text>
      <Text style={styles.name}>{currency.name}</Text>
    </TouchableOpacity>
  );
};

export default CurrencyButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    padding: 8,
  },
  isoCode: {
    fontSize: 22,
    fontWeight: "600",
  },
  name: {
    fontSize: 16,
    fontWeight: "400",
  },
});
