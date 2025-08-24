import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('NextAuth signIn callback:', { user, account, profile })
      // You can add custom logic here to validate users
      // For now, we'll allow all sign-ins
      return true
    },
    async redirect({ url, baseUrl, token }) {
      console.log('NextAuth redirect callback:', { url, baseUrl, token })
      
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      
      // For OAuth sign-ins, redirect to profile completion
      // New users need to complete their profile first
      return `${baseUrl}/complete-profile`
    },
    async session({ session, token }) {
      console.log('NextAuth session callback:', { session, token })
      // Customize the session object
      if (session.user) {
        // Add custom properties to the session
        session.user.role = 'student' // Default role, you can customize this
        session.user.permissions = ['view_own_profile', 'view_own_batches']
      }
      return session
    },
    async jwt({ token, user, account }) {
      console.log('NextAuth JWT callback:', { token, user, account })
      // Persist user info to the token
      if (user) {
        token.role = 'student'
        token.permissions = ['view_own_profile', 'view_own_batches']
      }
      return token
    },
  },
  session: {
    strategy: 'jwt',
  },
})

export { handler as GET, handler as POST }