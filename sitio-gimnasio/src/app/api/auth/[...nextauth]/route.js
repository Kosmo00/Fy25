import NextAuth from "next-auth/next"
import Credentials from "next-auth/providers/credentials"
import User from "@/db/models/user"
import bcrypt from 'bcryptjs'

export const authOptions = {
    pages: {
        signIn: '/auth/login',
        signOut: '/'
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async session({session, token}) {
            if(session?.user){
                session.user.role = token.role
            }
            return session;
        },
        async jwt({token, user}) {
            if (user) {
                token.role = user.role;
            }
            return token
        }
    },
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req){
                const { email, password } = credentials
                if(!email || !password){
                    return null
                }
                try{
                    const user = await User.findOne({ 
                        where: { email },
                        include: 'role',
                    })
                    if(user && await bcrypt.compare(password, user.password)){
                            return {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                role: user.role.name,
                                verified_email: user.verified_email
                            }
                    }
                } catch(err){
                    console.log(err)
                }
                return null
            }
        })
    ]
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
