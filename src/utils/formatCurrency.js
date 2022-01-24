export function formatCurrencyInput(value) {
  if (value === "") return "";
  return (parseFloat(value) / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  });
}

export function formatCurrency(value) {
  if (value === "") return "";
  return (parseFloat(value) / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "BRL",
  });
}
