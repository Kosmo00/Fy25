import User from "@/db/models/user"
import Log from "@/db/models/log"
import { NextResponse } from "next/server"
import sequelize from "@/db/connection"
import { getToken } from "next-auth/jwt"

export async function POST(req){
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const collector_id = token.sub
    const collector_name = token.name
    const { userId } = await req.json()
    const t = await sequelize.transaction()
    try{
        const user = await User.findByPk(userId, {
            include: 'Role'
        })
        if(!user){
            return NextResponse.json({message: 'Usuario no encontrado', status: 404})
        }
        if(user.role.name !== 'trainer'){
            return NextResponse.json({message: 'El usuario a pagar no es un entrenador', status: 400})
        }
        const amount = user.info.amount_charged - user.info.amount_earned
        user.info.amount_earned = user.info.amount_charged
        await user.update({info: user.info}, {transaction: t})
        await Log.create(
            {
                log_type_id: 2,
                date: Date.now(),
                info: {
                    collector_id,
                    collector_name,
                    athlethe_id: user.id,
                    athlethe_name: user.name,
                    amount
                }
            },
            {
                transaction: t
            }
        )
        t.commit()
        return NextResponse.json({message: 'Pago realizado correctamente'})
    } catch(err){
        console.log(err)
        t.rollback()
        return NextResponse.json({message: 'Error de servidor, intente de nuevo', status: 500})
    }
}