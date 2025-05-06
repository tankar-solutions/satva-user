import { loadStripe } from "@stripe/stripe-js";
import { QueryClient } from "@tanstack/react-query";
import SettingServices from "@services/SettingServices";

let stripePromise;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
}); // Create a new QueryClient instance

const getStripe = async () => {
  try {
    const storeSetting = await queryClient.fetchQuery({
      queryKey: ["storeSetting"],
      queryFn: async () => await SettingServices.getStoreSetting(),
      staleTime: 4 * 60 * 1000, // 4 minutes
    });

    const stripeKey = storeSetting?.stripe_key;

    if (!stripeKey) {
      console.error("Stripe publishable key is missing in store settings.");
      return null;
    }

    if (!stripePromise) {
      stripePromise = loadStripe(stripeKey);
    }

    return stripePromise;
  } catch (error) {
    console.error(
      "Error fetching store setting:",
      error.response?.data || error.message
    );
    return null;
  }
};

export default getStripe;
