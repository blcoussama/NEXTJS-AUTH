import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma/prisma";
import authConfig from "./auth.config";
import { getUserById } from "./data/user"
import { getAccountByUserId } from "./data/account"


export const { auth, handlers: { GET, POST }, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
    callbacks: {
        async jwt({token}) {

            if(!token.sub) return token;

            const existingUser = await getUserById(token.sub)
            if(!existingUser) return token;

            const existingAccount = await getAccountByUserId(existingUser.id)

            token.isOauth = !!existingAccount;
            token.name = existingUser.name
            token.email = existingUser.email
            token.image = existingUser.image

            return token
        },
        async session({ token, session }) {

            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                    isOauth: token.isOauth,
                }    
            }
        }   
    }
})