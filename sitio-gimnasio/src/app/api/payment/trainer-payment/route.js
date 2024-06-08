import User from "@/db/models/user"
import Log from "@/db/models/log"
import { NextResponse } from "next/server"
import sequelize from "@/db/connection"
import { getToken } from "next-auth/jwt"

export async function POST(req){
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const admin_id = token.sub
    const admin_name = token.name
    const { userId } = await req.json()
    const t = await sequelize.transaction()
    try{
        const user = await User.findByPk(userId, {
            include: 'role'
        })
        if(!user){
            return NextResponse.json({message: 'Usuario no encontrado', status: 404})
        }
        if(user.role.name !== 'trainer'){
            return NextResponse.json({message: 'El usuario a pagar no es un entrenador', status: 400})
        }
        const amount = user.info.amount_earned - user.info.amount_charged 
        user.info.amount_earned = user.info.amount_charged
        await User.update({info: user.info}, {where: {id: user.id}, transaction: t})
        await Log.create(
            {
                log_type_id: 2,
                date: Date.now(),
                info: {
                    admin_id,
                    admin_name,
                    trainer_id: user.id,
                    trainer_name: user.name,
                    amount
                }
            },
            {
                transaction: t
            }
        )
        await t.commit()
        return NextResponse.json({message: 'Pago realizado correctamente', status: 200})
    } catch(err){
        console.log(err)
        await t.rollback()
        return NextResponse.json({message: 'Error de servidor, intente de nuevo', status: 500})
    }
}