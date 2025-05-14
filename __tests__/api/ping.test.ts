import { createMocks } from "node-mocks-http"
import { GET } from "@/app/api/ping/route"

describe("Ping API", () => {
  it("should return 200 and database connection status", async () => {
    const { req } = createMocks({
      method: "GET",
    })

    const response = await GET(req)
    const data = await response.json()

    expect(data.status).toBe("ok")
    expect(data.database).toBe("connected")
    expect(data).toHaveProperty("timestamp")
  })
})
