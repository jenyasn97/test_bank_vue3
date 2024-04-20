const formatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
});

export function currency(value) {
  return formatter.format(value);
}
