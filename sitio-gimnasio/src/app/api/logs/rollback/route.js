import User from "@/db/models/user"
import Log from "@/db/models/log"
import { NextResponse } from "next/server"
import sequelize from "@/db/connection"
import { getToken } from "next-auth/jwt"

async function createRollbackLog(token, transaction, log_id){
    await Log.create(
        {
            log_type_id: 4,
            date: Date.now(),
            info: {
                admin_id: token.sub,
                admin_name: token.name,
                log_id
            }
        },
        {
            transaction
        }
    )
    await transaction.commit()
    return NextResponse.json({message: 'Operación revertida con éxito', status: 200})
}

async function rollbackAthletheAssistance(log, token, transaction){
    const amount = log.info.amount
    const athlethe_id = log.athlethe_id
    
    const user = await User.findByPk(athlethe_id, {include: 'role'})
    
    if(!user){
        return NextResponse.json({message: `Atleta no encontrado`, status: 404})
    }
    if(user.role.name !== 'athlethe'){
        return NextResponse.json({message: `El rol del usuario del registro no es atleta`, status: 404})
    }
    user.info.payed_money -= amount
    await user.update({info: user.info}, {transaction})
    return await createRollbackLog(token, transaction, log_id)
}   

async function rollbackAthletheRecharge(log, token, transaction){
    const amount = log.info.amount
    const athlethe_id = log.athlethe_id
    
    const user = await User.findByPk(athlethe_id, {include: 'role'})
    
    if(!user){
        return NextResponse.json({message: `Atleta no encontrado`, status: 404})
    }
    if(user.role.name !== 'athlethe'){
        return NextResponse.json({message: `El rol del usuario del registro no es atleta`, status: 404})
    }
    user.info.deposited_money -= amount
    await user.update({info: user.info}, {transaction})
    return await createRollbackLog(token, transaction, log_id)
}

async function rollbackTrainerPayment(log, token, transaction){
    const amount = log.info.amount
    const trainer_id = log.trainer_id
    
    const user = await User.findByPk(trainer_id, {include: 'role'})
    
    if(!user){
        return NextResponse.json({message: `Entrenador no encontrado`, status: 404})
    }
    if(user.role.name !== 'trainer'){
        return NextResponse.json({message: `El rol del usuario del registro no es entrenador`, status: 404})
    }
    user.info.amount_earned -= amount
    await user.update({info: user.info}, {transaction})
    return await createRollbackLog(token, transaction, log_id)
}

export async function POST(req){
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { log_id } = await req.json()
    const transaction = await sequelize.transaction()
    try{
        const log = await Log.findByPk(log_id, {
            include: 'logType'
        })
        if(!log){
            return NextResponse.json({message: 'Registro no encontrado', status: 404})
        }
        switch(log.logType.name){
            case 'AthletheRechargeLog':
                return await rollbackAthletheRecharge(log, token, transaction)
            case 'TrainerPaymentLog':
                return await rollbackTrainerPayment(log, token, transaction)
            case 'AthletheAssistanceLog':
                return await rollbackAthletheAssistance(log, token, transaction)
            default: 
                return NextResponse.json({message: 'La operación no es revertible', status: 403})
            }
    } catch(err){
        console.log(err)
        await transaction.rollback()
        return NextResponse.json({message: 'Error de servidor, intente de nuevo', status: 500})
    }
}

