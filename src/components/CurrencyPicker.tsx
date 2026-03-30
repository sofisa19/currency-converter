import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Currency, RatesUSD } from "../utils/types";
import CurrencyPickerItem from "./CurrencyPickerItem";

const CurrencyPicker = ({
  currencies,
  onClose,
  onPressCurrency,
  ratesUSD,
  currentCurrency,
}: {
  onClose: () => void;
  onPressCurrency: (currency: Currency) => void;
  currencies: Currency[];
  ratesUSD: RatesUSD;
  currentCurrency: Currency;
}) => {
  const [search, setSearch] = useState("");

  const filteredCurrencies = currencies.filter((currency) => {
    return (
      currency.name.toLowerCase().includes(search.toLowerCase()) ||
      currency.iso_code.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Select Currency</Text>
        <TextInput
          style={styles.search}
          placeholder="Search currency"
          value={search}
          onChangeText={setSearch}
        />
        <FlatList
          style={styles.list}
          data={filteredCurrencies}
          keyExtractor={(item) => item.iso_code}
          renderItem={({ item }) => (
            <CurrencyPickerItem
              currency={item}
              onPress={() => {
                onPressCurrency(item);
                onClose();
              }}
              currentCurrency={currentCurrency}
              ratesUSD={ratesUSD}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default CurrencyPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  search: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
});
