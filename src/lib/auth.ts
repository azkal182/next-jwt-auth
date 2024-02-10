import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Axios } from "./axios";
import axios, { AxiosError } from "axios";
import { umask } from "process";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "Username",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // const user = { id: "1", name: "Admin", email: "admin@admin.com" };
        if (!credentials?.username || !credentials.password) {
          return null;
        }
        try {
          const { data: result } = await Axios.post("/auth/login", {
            username: credentials.username,
            password: credentials.password,
          });
          const access_token = result.data.access_token;
          const refresh_token = result.data.refresh_token;
          const user = result.data.user;
          // console.log(user);

          // console.log({
          //   user,
          //   access_token,
          //   refresh_token,
          // });
          return {
            ...user,
            access_token,
            refresh_token,
          };
        } catch (error) {
          // console.log(error.response.data)
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              throw new Error(JSON.stringify(error.response.data));
            }
            // Do something with this error...
          }
          // const error = e as AxiosError;
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      // console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          name: token.name,
          access_token: token.access_token,
          refresh_token: token.refresh_token,
        },
      };
      // if (token) {
      //     session.access_token = token.access_token;
      //     session.refresh_token = token.refresh_token;
      //   }
      return session;
    },
    jwt: ({ token, user }) => {
      // console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          username: u.username,
          name: u.name,
          access_token: u.access_token,
          refresh_token: u.refresh_token,
        };
      }

      // if (user) {
      //     return {
      //       ...token,
      //       access_token: user.access_token,
      //       refresh_token: user.refresh_token,
      //     };
      //   }
      return token;
    },
  },
};
