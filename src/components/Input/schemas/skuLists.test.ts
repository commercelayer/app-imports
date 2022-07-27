import { csvSkuListSchema } from "./skuLists"

describe("Validate csvSkuListSchema", () => {
  test("received input should have a valid Sku Lists schema", () => {
    expect(
      csvSkuListSchema.parse([
        {
          name: "LIST-01",
          description: "Some text...",
          image_url: "http://....",
          manual: true,
        },
        {
          name: "LIST-02",
          description: "Some text...",
          image_url: "http://....",
          manual: false,
          sku_code_regex: "^(A|B).*$",
        },
      ])
    ).toStrictEqual([
      {
        name: "LIST-01",
        description: "Some text...",
        image_url: "http://....",
        manual: true,
      },
      {
        name: "LIST-02",
        description: "Some text...",
        image_url: "http://....",
        manual: false,
        sku_code_regex: "^(A|B).*$",
      },
    ])
  })
})