import { useQuery } from "@tanstack/react-query";

const useCurrencies = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["currencies"],
    queryFn: async () => {
      const response = await fetch("https://api.frankfurter.dev/v2/currencies");
      const data = await response.json();
      return data;
    },
  });
  return { isPending, error, data };
};

export default useCurrencies;
