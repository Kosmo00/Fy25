import User from "@/db/models/user"
import Log from "@/db/models/log"
import { NextResponse } from "next/server"
import sequelize from "@/db/connection"
import { getToken } from "next-auth/jwt"

export async function POST(req){
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const collector_id = token.sub
    const collector_name = token.name
    const { userId, amount } = await req.json()
    const t = await sequelize.transaction()
    try{
        const user = await User.findByPk(userId, {
            include: 'role'
        })
        if(!user){
            console.log('Usuario no encontrado')
            return NextResponse.json({message: 'Usuario no encontrado', status: 404})
        }
        if(user.role.name !== 'athlete'){
            console.log('Usuario no atleta')
            return NextResponse.json({message: 'El usuario a recargar no es un atleta', status: 400})
        }
        
        user.info.deposited_money += amount * 100
        await User.update({info: user.info}, { where: {id: user.id}, transaction: t})
        await Log.create(
            {
                log_type_id: 1,
                date: Date.now(),
                info: {
                    collector_id,
                    collector_name,
                    athlete_id: user.id,
                    athlete_name: user.name,
                    amount: amount * 100
                }
            },
            {
                transaction: t
            }
        )
        await t.commit()
        return NextResponse.json({message: 'Pago realizado correctamente', status:200})
    } catch(err){
        console.log(err)
        await t.rollback()
        return NextResponse.json({message: 'Error de servidor, intente de nuevo', status: 500})
    }
}