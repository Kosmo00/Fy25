import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

function isAuthorized(token){
    return token?.role === 'qr-scanner'
}

export async function POST(req){
    const token = getToken({req, secret: process.env.NEXTAUTH_SECRET})
    if(!token){
        return NextResponse.json({message: 'Para realizar esta operación debe de estar autenticado'})
    }
    if (!isAuthorized(token)){
        return NextResponse.json({message: 'Su usuario no está autorizado para realizar la operación actual'})
    }
    try{
        const { email, assistance_token} = req.json()
        // const assistanceData = store.dispatch(checkAssistanceToken(email, assistance_token))
        return NextResponse.json({data: assistanceData, status: 200})
    }catch(err){
        console.log(err)
        return NextResponse.json({message: 'Internal Error'})
    }
}