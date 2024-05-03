import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
    pages: {
        signin: '/auth/signin'
    },
    session: {
        strategy: 'jwt'
    },
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req){
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                
                return user
            }
        })
    ]
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
