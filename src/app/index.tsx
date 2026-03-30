import CurrencyButton from "@/components/CurrencyButton";
import CurrencyPicker from "@/components/CurrencyPicker";
import { Ionicons } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useCurrencyRatesUSD from "../hooks/useCurrencyRatesUSD";
import { convert } from "../utils/convert";
import { Currency, RatesUSD } from "../utils/types";

type CurrencyType = "from" | "to";

export default function Index() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [currencyFrom, setCurrencyFrom] = useState<Currency>();
  const [currencyTo, setCurrencyTo] = useState<Currency>();
  const [valueFrom, setValueFrom] = useState(0);
  const [valueTo, setValueTo] = useState(0);
  const [currencyType, setCurrencyType] = useState<CurrencyType>("from");

  const { isPending, currenciesError, ratesError, ratesUSD, currencies } =
    useCurrencyRatesUSD(date);

  const convertValue = (
    changedType: CurrencyType,
    value: number,
    from: Currency,
    to: Currency,
    rates: RatesUSD,
  ) => {
    if (changedType === "from") {
      setValueFrom(value);
      setValueTo(convert(value, from, to, rates));
    } else {
      setValueTo(value);
      setValueFrom(convert(value, to, from, rates));
    }
  };

  useEffect(() => {
    if (currencies.length < 2) return;

    const usd = currencies.find((c) => c.iso_code === "USD");
    const eur = currencies.find((c) => c.iso_code === "EUR");

    if (usd && eur) {
      setCurrencyFrom(usd);
      setCurrencyTo(eur);
    } else {
      setCurrencyFrom(currencies[0]);
      setCurrencyTo(currencies[1]);
      console.log(currencies[0], currencies[1]);
    }
  }, [currencies]);

  if (isPending) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>Loading currencies...</Text>
        </View>
      </View>
    );
  }
  if (currenciesError || ratesError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error</Text>
      </View>
    );
  }
  if (!currencyFrom || !currencyTo) {
    if (currencies.length >= 2) {
      setCurrencyFrom(currencies[0]);
      setCurrencyTo(currencies[1]);
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dateContainer}
        onPress={() =>
          DateTimePickerAndroid.open({
            value: date,
            onChange: (event, date) => date && setDate(date),
            mode: "date",
            maximumDate: new Date(),
          })
        }
      >
        <Text style={styles.label}>Set conversion date: </Text>
        <Text style={styles.date}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {/* FROM */}

      {currencyFrom && currencyTo ? (
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <CurrencyButton
              currency={currencyFrom}
              onPress={() => {
                setCurrencyType("from");
                setOpen(true);
              }}
            />
            {/* TODO: add currency symbol before input */}
            <View style={styles.inputContainer}>
              <Text style={styles.currencySymbol}>{currencyFrom.symbol}</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                value={valueFrom.toString()}
                keyboardType="numeric"
                onChangeText={(text) => {
                  if (!currencyFrom || !currencyTo) return;
                  const value = Number(text);
                  if (isNaN(value)) return;
                  convertValue(
                    "from",
                    value,
                    currencyFrom,
                    currencyTo,
                    ratesUSD,
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.swapIconContainer}>
            <View style={styles.swapIconWrapper}>
              <Ionicons
                style={styles.swapIcon}
                name="swap-vertical"
                size={24}
                color="#007AFF"
              />
            </View>
          </View>
          <View style={styles.card}>
            <CurrencyButton
              currency={currencyTo}
              onPress={() => {
                setCurrencyType("to");
                setOpen(true);
              }}
            />
            <View style={styles.inputContainer}>
              <Text style={styles.currencySymbol}>{currencyTo.symbol}</Text>
              <TextInput
                style={styles.input}
                placeholder="Converted amount"
                value={valueTo.toString()}
                keyboardType="numeric"
                onChangeText={(text) => {
                  if (!currencyFrom || !currencyTo) return;
                  const value = Number(text);
                  if (isNaN(value)) return;
                  convertValue("to", value, currencyFrom, currencyTo, ratesUSD);
                }}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.error}>
            No currencies available for this conversion date. Please select
            another date or try again later.
          </Text>
        </View>
      )}

      {/* DATE */}

      {currencyFrom && currencyTo && (
        <Modal
          visible={open}
          animationType="fade"
          onRequestClose={() => setOpen(false)}
        >
          <CurrencyPicker
            onClose={() => setOpen(false)}
            onPressCurrency={(currency) => {
              if (currencyType === "from") {
                setCurrencyFrom(currency);
                convertValue("to", valueTo, currency, currencyTo, ratesUSD);
              } else {
                setCurrencyTo(currency);
                convertValue(
                  "from",
                  valueFrom,
                  currencyFrom,
                  currency,
                  ratesUSD,
                );
              }
            }}
            currencies={currencies}
            ratesUSD={ratesUSD}
            currentCurrency={
              currencyType === "from" ? currencyTo : currencyFrom
            }
          />
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f7fb",
    justifyContent: "center",
    gap: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "400",
  },

  cardsContainer: {
    gap: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    gap: 12,
    zIndex: 1,
  },

  swapIconContainer: {
    alignItems: "center",
  },

  swapIconWrapper: {
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: "50%",
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    zIndex: 2,
  },

  swapIcon: {},

  input: {
    fontSize: 22,
    fontWeight: "600",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 8,
    flex: 1,
  },

  currencySymbol: {
    fontSize: 22,
    fontWeight: "600",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 8,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    padding: 16,
    gap: 6,
    backgroundColor: "#f5f7fb",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  date: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
    backgroundColor: "#E5F0FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    overflow: "hidden",
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },

  error: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
  },
});
