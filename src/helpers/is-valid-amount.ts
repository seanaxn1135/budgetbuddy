export function isValidAmount(amount: string): boolean {
  return /^\d*(\.\d{0,2})?$/.test(amount)
}
