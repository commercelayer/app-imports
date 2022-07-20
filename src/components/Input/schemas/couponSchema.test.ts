import { csvCouponsSchema } from "./couponSchema"

describe("Validate csvCouponsSchema", () => {
  test("received input should have a valid Coupon schema", () => {
    expect(
      csvCouponsSchema.parse([
        {
          code: "XXXX123",
          promotion_rule_id: "XXXX123",
          usage_limit: 100,
        },
        {
          code: "XXXX123",
          promotion_rule_id: "XXXX123",
          usage_limit: "100",
          customer_single_use: true,
        },
      ])
    ).toStrictEqual([
      {
        code: "XXXX123",
        promotion_rule_id: "XXXX123",
        usage_limit: 100,
      },
      {
        code: "XXXX123",
        promotion_rule_id: "XXXX123",
        usage_limit: 100,
        customer_single_use: true,
      },
    ])
  })
})
