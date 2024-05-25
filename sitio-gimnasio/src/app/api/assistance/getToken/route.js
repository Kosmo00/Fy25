import { NextResponse } from "next/server";
import { redisClient } from "@/app/redis/db";
import { v4 as uuidv4 } from "uuid";
import { getToken } from "next-auth/jwt";

const REDIS_ASSISTANCE_TOKEN_PREFIX = 'assistanceToken'

function isAuthorized(token){
    return token.role === 'athlete'
}

async function createToken(email){
    const token = uuidv4()
    await redisClient.set(REDIS_ASSISTANCE_TOKEN_PREFIX + email, token, {EX: 35})
    return token
}

export async function GET(req){
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
    try{
        if(!token){
            return NextResponse.json({message: 'Para realizar esta operación debe de estar autenticado'})
        }
        if (!isAuthorized(token)){
            return NextResponse.json({message: 'Su usuario no está autorizado para realizar la operación actual'})
        }
        const assistanceToken = await createToken(token.email)
        return NextResponse.json({data: {token: assistanceToken}, status: 200})
    } catch(err){
        console.log(err)
        return NextResponse.json({status: 500})
    }

}