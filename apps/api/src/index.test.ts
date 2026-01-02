import {
  env,
  createExecutionContext,
  waitOnExecutionContext,
} from "cloudflare:test"
import { describe, it, expect } from "vitest"
import app from "./index"

describe("API Health Check", () => {
  it("should return ok status", async () => {
    const ctx = createExecutionContext()
    const res = await app.fetch(new Request("http://localhost/"), env, ctx)
    await waitOnExecutionContext(ctx)

    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.status).toBe("ok")
    expect(data.message).toBe("Magami API")
  })
})
