import { csvPricesSchema } from "./pricesSchema"

describe("Validate csvPricesSchema", () => {
  test("received input should have a valid Price List schema", () => {
    expect(
      csvPricesSchema.parse([
        {
          amount_cents: 10000,
          compare_at_amount_cents: 12000,
          price_list_id: "XXXX123",
          sku_code: "ABC001",
        },
        {
          amount_cents: 20000,
          compare_at_amount_cents: "30000",
          price_list_id: "XXXX123",
          sku_code: "ABC002",
        },
      ])
    ).toStrictEqual([
      {
        amount_cents: 10000,
        compare_at_amount_cents: 12000,
        price_list_id: "XXXX123",
        sku_code: "ABC001",
      },
      {
        amount_cents: 20000,
        compare_at_amount_cents: 30000,
        price_list_id: "XXXX123",
        sku_code: "ABC002",
      },
    ])
  })
})
