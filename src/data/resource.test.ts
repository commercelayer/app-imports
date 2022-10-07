import { showResourceNiceName } from './resources'

describe('showResourceNiceName', () => {
  test('Should return the full resource name', () => {
    expect(showResourceNiceName('sku_lists')).toBe('SKU Lists')
  })

  test('Should return the the id name if not found in dictionary', () => {
    expect(showResourceNiceName('new_resource' as any)).toBe('new_resource')
  })
})
