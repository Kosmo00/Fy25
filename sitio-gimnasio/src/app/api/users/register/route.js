import User from '@/db/models/user'
import { NextResponse } from "next/server";
import { sendMail } from '@/utils/utils';
import { saveFile } from '../saveProfileImage';
import { insertUserInDatabase } from '../createUser';
import { default_athlete_info } from '@/models/user_info';

export async function POST(req) {
    const form = await req.formData()
    const file = form.get('file')
    let filename
    if (!file) {
        return NextResponse.json({ message: 'No se recibió la imagen', status: 400 })
    }
    try {
        filename = await saveFile(file)
    }
    catch (err) {
        return NextResponse.json({ message: 'Error guardando imagen', status: 500 })
    }
    let formData = {}
    for (const pair of form.entries()) {
        formData[pair[0]] = pair[1]
    }
    formData['file'] = filename
    formData['info'] = default_athlete_info
    let idOrDuplicated_fields
    try {
        idOrDuplicated_fields = await insertUserInDatabase(formData)
        if (typeof idOrDuplicated_fields !== "string" ) {
            return NextResponse.json({ message: 'Campos duplicados', data: { fields: Object.keys(idOrDuplicated_fields) }, status: 400 })
        }
    }
    catch (err) {
        return NextResponse.json({ message: 'Error guardando usuario', status: 500 })
    }
    try{
        sendMail(formData.email, 'Registro en Fy25',
            '<p>Hola,</p><p>Para verificar tu cuenta, haz clic en el siguiente enlace:</p><p>'
            + `<a href="http://localhost:3000/api/verify?email=${formData.email}&token=${idOrDuplicated_fields}" `
            + 'class="link">Verificar Cuenta</a></p><p>Si no solicitaste esta verificación, por favor ignora este correo.</p>'

        )
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: 'Error enviando email'})
    }

    return NextResponse.json({ message: "Registro exitoso", status: 201 });
}

export async function GET() {
    try{
        let users = await User.findAll({where: {role_id: 1}})
        // users = users.filter(user => user.info.deposited_money === 100)
        // console.log(users[0].info)
        return Response.json({ data: users })
    }catch (err){
        console.log(err)
        return NextResponse.json({ message: 'Error obteniendo usuarios', status: 500 })
    }
}

