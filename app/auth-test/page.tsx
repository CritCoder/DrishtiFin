"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function AuthTest() {
  const { data: session, status } = useSession()

  if (status === "loading") return <p>Loading...</p>

  if (session) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Signed in as {session.user?.email}</h1>
        <p>Name: {session.user?.name}</p>
        <p>Email: {session.user?.email}</p>
        <Button onClick={() => signOut()} className="mt-4">
          Sign out
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Not signed in</h1>
      <div className="space-y-4">
        <Button onClick={() => signIn("google", { callbackUrl: '/app' })}>
          Sign in with Google
        </Button>
        <Button onClick={() => signIn("github", { callbackUrl: '/app' })}>
          Sign in with GitHub
        </Button>
      </div>
    </div>
  )
}