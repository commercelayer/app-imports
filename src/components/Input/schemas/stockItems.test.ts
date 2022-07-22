import { csvStockItemsSchema } from "./stockItems"

describe("Validate csvStockItemsSchema", () => {
  test("received input should have a valid schema", () => {
    expect(
      csvStockItemsSchema.parse([
        {
          sku_code: "ABC",
          quantity: "100",
          stock_location_id: "XXX123",
        },
        {
          quantity: 40,
          stock_location_id: "XXX123",
          sku_id: "XYZ",
        },
      ])
    ).toStrictEqual([
      {
        sku_code: "ABC",
        quantity: 100,
        stock_location_id: "XXX123",
      },
      {
        sku_id: "XYZ",
        quantity: 40,
        stock_location_id: "XXX123",
      },
    ])
  })
})
