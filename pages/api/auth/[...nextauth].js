// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   // Configure one or more authentication providers
//   providers: [
//     CredentialsProvider({
//       // The name to display on the sign in form (e.g. 'Sign in with...')
//       name: "Credentials",
//       // The credentials is used to generate a suitable form on the sign in page.
//       // You can specify whatever fields you are expecting to be submitted.
//       // e.g. domain, username, password, 2FA token, etc.
//       // You can pass any HTML attribute to the <input> tag through the object.
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const res = await fetch("/your/endpoint", {
//           method: "POST",
//           body: JSON.stringify(credentials),
//           headers: { "Content-Type": "application/json" },
//         });
//         const user = await res.json();

//         // If no error and we have user data, return it
//         if (res.ok && user) {
//           return user;
//         }
//         // Return null if user data could not be retrieved
//         return null;
//       },
//     }),
//   ],
// };

// export default NextAuth(authOptions);
