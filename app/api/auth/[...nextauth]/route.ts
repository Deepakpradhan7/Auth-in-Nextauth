

import NextAuth from "next-auth/next";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { Account , User as AuthUser} from 'next-auth'
import connect from "@/utils/db";
import User from "@/models/User";
//@ts-ignore
import bcrypt from 'bcryptjs'


const authOptions:any = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password", placeholder: "Password" },
                email: { label: 'Email', type: 'email',placeholder: "Email" }
            },
            async authorize(credentials:any) {
                await connect()
                try {
                    const user = await User.findOne({email : credentials.email});
                    if(user) {
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                        if (isPasswordCorrect){
                            return user;
                        }
                    }
                } catch (error:any) {
                    throw new Error(error)
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? ''
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? '',
            clientSecret: process.env.GOOGLE_SECRET ?? ''
        })
    ],
    
    callbacks: {
        async signIn({user, account}: {user: AuthUser, account: Account}) {
            if( account.provider == 'credentials'){
                return true;
            }
            if (account.provider == 'google'){
               await connect();
               try {
                const existingUser = await User.findOne({email: user.email})
                if (!existingUser){
                    const newUser = new User({
                        email: user.email
                    })
                    await newUser.save();
                    return true;
                }
                return true;
               } catch (error) {
                console.log('Error saving user', error);
                return false
               }
            }
            if (account.provider == "github") {
                await connect();
                try {
                    const existingUser = await User.findOne({email : user.email});
                    if (!existingUser){
                        const newUser = new User({
                            email: user.email
                        })
                        await newUser.save();
                        return true;
                    }
                    return true;
                } catch (error) {
                    console.log('Error saving user', error);
                    return false
                }
            }
        }
    }
  
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }