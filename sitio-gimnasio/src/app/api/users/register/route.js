// const User = require('../../../db/models').User
import User from '@/db/models/user'
import { NextResponse } from "next/server";
import { writeFile, access, mkdir } from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import { sendMail } from '@/utils/utils';
import { default_athlethe_info } from '@/models/user_info';

async function saveFile(file) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const file_ext = file.name.split('.')
    const filename = '/user_images/' + uuidv4() + '.' + file_ext[file_ext.length - 1]
    try {
        await access(path.join(process.cwd(), 'public' + '/user_images/'))
    } catch (err) {
        await mkdir(path.join(process.cwd(), 'public' + '/user_images/'), { recursive: true })
    }

    try {
        await writeFile(path.join(process.cwd(), 'public' + filename), buffer);
        return filename
    }
    catch (err) {
        console.log("Error mientras se guardaba el fichero", err);
        throw new Error
    }
}

async function insertUserInDatabase(formData) {
    const { name, lastname, email, CI, phone, password, file } = formData
    const pwd = await bcrypt.hash(password, 10);
    try {
        const res = await User.create({
            name, lastname, email, CI, phone, password: pwd, profile_image: file, info: default_athlethe_info
        })
        return res.dataValues.id
    }
    catch (err) {
        if (err.original.code == 'ER_DUP_ENTRY') {
            return err.fields
        }
        console.log('Error creando usuario', err)
        throw new Error
    }
}

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
    let idOrDuplicated_fields
    try {
        idOrDuplicated_fields = await insertUserInDatabase(formData)
        if (typeof idOrDuplicated_fields !== "number" ) {
            console.log(idOrDuplicated_fields)
            return NextResponse.json({ message: 'Campos duplicados', data: { fields: Object.keys(idOrDuplicated_fields) }, status: 400 })
        }
    }
    catch (err) {
        return NextResponse.json({ message: 'Error guardando usuario', status: 500 })
    }
    try{
        sendMail(formData.email, 'Probando',
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
        let users = await User.findAll()
        users = users.filter(user => user.info.deposited_money === 100)
        // console.log(users[0].info)
        return Response.json({ data: users })
    }catch (err){
        console.log(err)
        return NextResponse.json({ message: 'Error obteniendo usuarios', status: 500 })
    }
}

