import { csvPricesSchema } from "./prices"

describe("Validate csvPricesSchema", () => {
  test("should require `price_list_id` when parent resource is not set", () => {
    expect(
      csvPricesSchema({ hasParentResource: false }).parse([
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

  test("`price_list_id` is ignored when parent resource is already set", () => {
    expect(
      csvPricesSchema({ hasParentResource: true }).parse([
        {
          amount_cents: 10000,
          compare_at_amount_cents: 12000,
          sku_code: "ABC001",
        },
        {
          amount_cents: 20000,
          compare_at_amount_cents: "30000",
          sku_code: "ABC002",
        },
      ])
    ).toStrictEqual([
      {
        amount_cents: 10000,
        compare_at_amount_cents: 12000,
        sku_code: "ABC001",
      },
      {
        amount_cents: 20000,
        compare_at_amount_cents: 30000,
        sku_code: "ABC002",
      },
    ])
  })
})
