export function isValidDescription(description: string): boolean {
  if (description.length === 0 || description.length > 50) {
    return false
  }

  return /^[\w\s-'&.!+%^()/0-9]+$/.test(description)
}
