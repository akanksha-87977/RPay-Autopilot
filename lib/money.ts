export const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

export const paise = (rupees: number) => Math.round(rupees * 100);
export const rupees = (valueInPaise: number) => Math.round(valueInPaise / 100);
