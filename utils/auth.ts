import { create, verify, getNumericDate } from "https://deno.land/x/djwt@v3.0.1/mod.ts"
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts"

const JWT_SECRET = crypto.randomUUID() || "drishti-secret-key-2024"
const key = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(JWT_SECRET),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign", "verify"],
)

export interface UserPayload {
  id: string
  email: string
  role: string
  subtype?: string
  organizationId?: string
}

export interface JWTPayload extends UserPayload {
  iat: number
  exp: number
}

export class AuthUtils {
  static async generateToken(user: UserPayload): Promise<string> {
    const payload: JWTPayload = {
      ...user,
      iat: getNumericDate(new Date()),
      exp: getNumericDate(new Date(Date.now() + 24 * 60 * 60 * 1000)), // 24 hours
    }

    return await create({ alg: "HS256", typ: "JWT" }, payload, key)
  }

  static async verifyToken(token: string): Promise<JWTPayload | null> {
    try {
      const payload = await verify(token, key)
      return payload as JWTPayload
    } catch {
      return null
    }
  }

  static extractToken(req: Request): string | null {
    const authHeader = req.headers.get("Authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return null
    }
    return authHeader.slice(7)
  }

  static async authenticate(req: Request): Promise<UserPayload | null> {
    const token = this.extractToken(req)
    if (!token) return null

    const payload = await this.verifyToken(token)
    if (!payload) return null

    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      subtype: payload.subtype,
      organizationId: payload.organizationId,
    }
  }

  static hashPassword(password: string): Promise<string> {
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(password)).then((hash) =>
      Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(""),
    )
  }

  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    const passwordHash = await this.hashPassword(password)
    return passwordHash === hash
  }
}
