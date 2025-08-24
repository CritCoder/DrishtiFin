// Deno is available globally, no import needed
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts"

const kv = await Deno.openKv()

export interface DatabaseRecord {
  id: string
  createdAt: Date
  updatedAt: Date
}

export class Database {
  static async get<T>(key: Deno.KvKey): Promise<T | null> {
    const result = await kv.get(key)
    return result.value as T | null
  }

  static async set<T>(key: Deno.KvKey, value: T): Promise<void> {
    await kv.set(key, value)
  }

  static async delete(key: Deno.KvKey): Promise<void> {
    await kv.delete(key)
  }

  static async list<T>(prefix: Deno.KvKey): Promise<T[]> {
    const results: T[] = []
    const iter = kv.list({ prefix })

    for await (const entry of iter) {
      results.push(entry.value as T)
    }

    return results
  }

  static async listWithKeys<T>(prefix: Deno.KvKey): Promise<Array<{ key: Deno.KvKey; value: T }>> {
    const results: Array<{ key: Deno.KvKey; value: T }> = []
    const iter = kv.list({ prefix })

    for await (const entry of iter) {
      results.push({
        key: entry.key,
        value: entry.value as T,
      })
    }

    return results
  }

  static async count(prefix: Deno.KvKey): Promise<number> {
    let count = 0
    const iter = kv.list({ prefix })

    for await (const _ of iter) {
      count++
    }

    return count
  }

  static generateId(): string {
    return crypto.randomUUID()
  }

  static async atomic() {
    return kv.atomic()
  }
}

export { kv }
