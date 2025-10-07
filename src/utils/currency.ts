export function formatCurrency(value: number | string): string {
  const numberValue = typeof value === "string" ? parseFloat(value) : value;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numberValue);
}

export function parseCurrencyToNumber(value: string | number): number {
  if (typeof value === "number") return value;

  if (!value) return 0;

  const cleanValue = value.replace(/[^\d.,]/g, "");

  if (cleanValue.includes(",") && cleanValue.includes(".")) {
    return parseFloat(cleanValue.replace(/\./g, "").replace(",", "."));
  }

  if (cleanValue.includes(",")) {
    return parseFloat(cleanValue.replace(",", "."));
  }

  return parseFloat(cleanValue);
}