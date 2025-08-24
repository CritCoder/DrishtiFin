import { AuthUtils, type UserPayload } from "../utils/auth.ts"

export interface AuthenticatedRequest extends Request {
  user?: UserPayload
}

export function requireAuth(allowedRoles?: string[]) {
  return async (req: Request): Promise<Response | null> => {
    const user = await AuthUtils.authenticate(req)

    if (!user) {
      return new Response(JSON.stringify({ error: "Authentication required" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      })
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return new Response(JSON.stringify({ error: "Insufficient permissions" }), {
        status: 403,
        headers: { "content-type": "application/json" },
      })
    }
    // Add user to request object
    ;(req as AuthenticatedRequest).user = user

    return null // Continue to next handler
  }
}

export function requireRole(role: string) {
  return requireAuth([role])
}

export function requireAnyRole(roles: string[]) {
  return requireAuth(roles)
}
