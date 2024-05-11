// const User = require('../../../db/models').User
import User from '@/db/models/user'
import { NextResponse } from "next/server";
import { writeFile, access, mkdir } from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from 'uuid'
import { createTransport } from 'nodemailer'
import bcrypt from 'bcryptjs'
import { sendMail } from '@/utils/utils';

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
            name, lastname, email, CI, phone, password: pwd, profile_image: file
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

function sendMail(email, id){
    createTransport({
        service: "gmail",
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL,
            pass: process.env.NEXT_PUBLIC_PASSWORD
        }
    }).sendMail({
        from: 'jhpiano9731@gmail.com', 
        to: email,  
        subject: 'Probando',
        text: `http://localhost:3000/api/verify?email=${email}&token=${id}`,
    }).catch(err => console.log(err))
}

export async function POST(req) {
    const form = await req.formData()
    const file = form.get('file')
    let filename
    if (!file) {
<<<<<<< HEAD
        return NextResponse.json({ message: 'No se recibió la imagen', status: 400 })
=======
        return NextResponse.json({ message: 'No file received' },{
            status: 400
        })
>>>>>>> main
    }
    try {
        filename = await saveFile(file)
    }
    catch (err) {
<<<<<<< HEAD
        return NextResponse.json({ message: 'Error guardando imagen', status: 500 })
=======
        return NextResponse.json({ message: 'Error saving file' },{
            status: 500
        })
>>>>>>> main
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
<<<<<<< HEAD
            return NextResponse.json({ message: 'Campos duplicados', data: { fields: Object.keys(idOrDuplicated_fields) }, status: 400 })
=======
            return NextResponse.json({ message: 'Duplicated field', data: { fields: Object.keys(idOrDuplicated_fields) } },{
                status: 400
            })
>>>>>>> main
        }
    }
    catch (err) {
        return NextResponse.json({ message: 'Error guardando usuario', status: 500 })
    }
<<<<<<< HEAD
    try{
        sendMail(formData.email, idOrDuplicated_fields)
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: 'Error enviando email'})
    }

    return NextResponse.json({ message: "Registro exitoso", status: 201 });
=======
    sendMail(formData.email, 'Probando', 
    // `http://localhost:3000/api/verify?email=${formData.email}&token=${idOrDuplicated_fields}`
    `<p>Hola,</p><p>Para verificar tu cuenta, haz clic en el siguiente enlace:</p><p><a href="http://localhost:3000/api/verify?email=${formData.email}&token=${idOrDuplicated_fields}" class="link">Verificar Cuenta</a></p><p>Si no solicitaste esta verificación, por favor ignora este correo.</p>`
)
    
    return NextResponse.json({ message: "Success" },{
        status: 201
    });
>>>>>>> main
}

export async function GET() {
    return Response.json({ data: "testing" })
}

