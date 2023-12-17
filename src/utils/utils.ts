const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatAsPrice = (price: number) => priceFormatter.format(price);

export const getAuthToken = (): string => {
  const authToken = localStorage.getItem("authorization_token");
  if (!authToken) {
    return "";
  }

  return btoa(window.btoa(authToken));
};
