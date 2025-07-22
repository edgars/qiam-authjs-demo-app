import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak"

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      id: "qiam",
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
      name: "QIAM",
      style: {
        logo: "https://konneqt.io/wp-content/uploads/2024/02/cropped-cropped-Qriar-labs-fundo-claro-32x32.png",
        logoDark: "https://konneqt.io/wp-content/uploads/2024/02/cropped-cropped-Qriar-labs-fundo-claro-32x32.png",
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      session.id_token = token.id_token as string
      return session
    },
  },
  events: {
    async signOut({ token }) {
      if (token?.provider === "qiam" && token?.id_token) {
        const logoutUrl = new URL(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`)
        logoutUrl.searchParams.set("id_token_hint", token.id_token as string)
        logoutUrl.searchParams.set("post_logout_redirect_uri", process.env.NEXTAUTH_URL || "http://localhost:3000")
        
        try {
          await fetch(logoutUrl.href, { method: "GET" })
        } catch (error) {
          console.error("Error during Keycloak logout:", error)
        }
      }
    },
  },
}

export default NextAuth(authOptions)