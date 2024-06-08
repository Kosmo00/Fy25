import { NextResponse } from "next/server";
import { redisClient } from "@/redis/db";
import Service from "@/db/models/service";
import User from "@/db/models/user";
import Log from "@/db/models/log";
import { QR_TOKEN_SEPARATOR, REDIS_ASSISTANCE_TOKEN_PREFIX } from "../constrains";


async function getToken(email){
    const token = await redisClient.get(REDIS_ASSISTANCE_TOKEN_PREFIX + email)
    return token
}

export async function POST(req){
    const { assistance_token, authorization, serviceName} = req.json()
    const [email, token] = assistance_token.split(QR_TOKEN_SEPARATOR)
    if(authorization !== process.env.REACT_NATIVE_SECRET){
        return NextResponse.json({message: 'No se encuentra autorizado para realizar esta operación'})
    }
    const t = await sequelize.transaction()
    try{
        const collector = await User.findOne({where: {email: 'qr1@kosmo.com'}})
        const user = await User.findOne({where: {email}})
        const saved_token = await getToken(email)
        if(saved_token !== token){
            return NextResponse.json({message: 'Token Expirado o inválido', status: 401})
        }
        const service = await Service.findOne({where: {name: serviceName}})
        const amount = service.price * (100 - user.info.discount_percent) / 100
        user.info.payed_money += amount
        await User.update({info: user.info}, {where: {id: user.id}, transaction: t})
        await Log.create(
            {
                log_type_id: 3,
                date: Date.now(),
                info: {
                    collector_id: collector.id,
                    collector_name: collector.name,
                    athlete_id: user.id,
                    athlete_name: user.name,
                    amount
                }
            },
            {
                transaction: t
            }
        )
        return NextResponse.json({data: '', status: 200})
    }catch(err){
        console.log(err)
        return NextResponse.json({message: 'Error interno', status: 500})
    }
}