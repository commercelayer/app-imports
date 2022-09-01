export function isFalsy (value: any): boolean {
  if (value === '') {
    return true
  }

  // checking against null and undefined
  if (value == null) {
    return true
  }

  if (value === 0) {
    return true
  }

  if (value === false) {
    return true
  }

  return false
}
