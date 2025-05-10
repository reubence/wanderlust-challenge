import { createMocks } from "node-mocks-http"
import { POST } from "@/app/api/search/route"

describe("Search API", () => {
  it("should return search results", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        limit: 5,
      },
    })

    const response = await POST(req)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty("results")
    expect(Array.isArray(data.results)).toBe(true)
  })
})
