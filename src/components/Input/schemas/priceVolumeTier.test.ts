import { csvPriceVolumeTierSchema } from './priceVolumeTier'

describe('Validate csvPriceVolumeTierSchema', () => {
  test('eceived input should have a valid schema', () => {
    expect(
      csvPriceVolumeTierSchema.parse([
        {
          name: 'Six packs',
          up_to: 6,
          price_amount_cents: 12000,
          price_id: 'ABC001'
        },
        {
          name: 'Other pack',
          price_amount_cents: '1000',
          price_id: 'ABC002'
        }
      ])
    ).toStrictEqual([
      {
        name: 'Six packs',
        up_to: 6,
        price_amount_cents: 12000,
        price_id: 'ABC001'
      },
      {
        name: 'Other pack',
        price_amount_cents: 1000,
        price_id: 'ABC002'
      }
    ])
  })
})
