import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  //   session: {
  //     strategy: "jwt",
  //   },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { email, password } = credentials;
        if (email !== "john@mail.com" || password !== "123") {
          throw new Error("Invalid creds");
        }
        return { id: "12345", name: "John", email: email };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
