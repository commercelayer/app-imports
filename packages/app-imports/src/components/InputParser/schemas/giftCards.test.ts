import { csvGiftCardsSchema } from './giftCards'

describe('Validate csvGiftCardsSchema', () => {
  test('received input should have a valid schema', () => {
    expect(
      csvGiftCardsSchema.parse([
        {
          code: 'XXXX123123',
          currency_code: 'EUR',
          balance_cents: '5000'
        },
        {
          code: 'ABC1234',
          currency_code: 'EUR',
          balance_cents: 30000,
          market_id: 'market:1234',
          gift_card_recipient_id: 'xYZkjABcde'
        },
        {
          code: 'with-iso-date',
          currency_code: 'EUR',
          balance_cents: 14000,
          single_use: 'true',
          expires_at: '2022-07-22T11:15:04.388Z'
        },
        {
          code: 'with-incomplete-date',
          currency_code: 'EUR',
          balance_cents: 30000,
          expires_at: '2022-07-22'
        },
        {
          code: 'XXXX123125',
          currency_code: 'EUR',
          balance_cents: '0'
        }
      ])
    ).toStrictEqual([
      {
        code: 'XXXX123123',
        currency_code: 'EUR',
        balance_cents: 5000
      },
      {
        code: 'ABC1234',
        currency_code: 'EUR',
        balance_cents: 30000,
        market_id: 'market:1234',
        gift_card_recipient_id: 'xYZkjABcde'
      },
      {
        code: 'with-iso-date',
        currency_code: 'EUR',
        balance_cents: 14000,
        single_use: true,
        expires_at: '2022-07-22T11:15:04.388Z'
      },
      {
        code: 'with-incomplete-date',
        currency_code: 'EUR',
        balance_cents: 30000,
        expires_at: '2022-07-22T00:00:00.000Z'
      },
      {
        code: 'XXXX123125',
        currency_code: 'EUR',
        balance_cents: 0
      }
    ])
  })
})
