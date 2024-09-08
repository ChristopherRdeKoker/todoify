// import NextAuth from "next-auth";
import NextAuth from "next-auth";
import authConfig from "./app/auth.config";

// import authConfig from "../app/auth.config";

export interface customError {
  error: string;
  location?: string;
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
  },
  ...authConfig,
  callbacks: {
    async jwt({ account, token, user }) {
      if (!user) return token;

      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      if (!token) return session;

      return { ...session, userCredentails: token };
    },
    async signIn({ account, user, credentials, email, profile }) {
      if (user) {
        return true;
      }
      return false;
    },
  },
});
