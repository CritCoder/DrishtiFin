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
      // You can add custom logic here to validate users
      // For now, we'll allow all sign-ins
      return true
    },
    async session({ session, token }) {
      // Customize the session object
      if (session.user) {
        // Add custom properties to the session
        session.user.role = 'student' // Default role, you can customize this
        session.user.permissions = ['view_own_profile', 'view_own_batches']
      }
      return session
    },
    async jwt({ token, user, account }) {
      // Persist user info to the token
      if (user) {
        token.role = 'student'
        token.permissions = ['view_own_profile', 'view_own_batches']
      }
      return token
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
})

export { handler as GET, handler as POST }