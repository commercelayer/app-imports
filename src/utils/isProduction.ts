export function isProduction(): boolean {
  return import.meta.env.NODE_ENV === 'production'
}
