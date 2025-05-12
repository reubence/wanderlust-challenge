import { createMocks } from "node-mocks-http"
import { NextRequest } from "next/server"
import { GET as pingGET } from "@/app/api/ping/route"
import { POST as searchPOST } from "@/app/api/search/route"

describe("API Tests", () => {
    it("should return 200 and database connection status for /api/ping", async () => {
        const response = await pingGET()
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data.status).toBe("ok")
        expect(data.database).toBe("connected")
        expect(data).toHaveProperty("timestamp")
    })

    it("should return search results for /api/search", async () => {
        const mockRequest = createMocks({
            url: "/api/search",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: {
                limit: 5,
            },
        });

        const nextRequest = new NextRequest(mockRequest.req.url!, {
            method: mockRequest.req.method,
            headers: mockRequest.req.headers as HeadersInit,
            body: JSON.stringify(mockRequest.req.body),
        });

        const response = await searchPOST(nextRequest)
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data).toHaveProperty("results")
        expect(Array.isArray(data.results)).toBe(true)
    })
})