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
        console.log("Error occured saving file", err);
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
        console.log('Error creating user', err)
        throw new Error
    }
}

export async function POST(req) {
    const form = await req.formData()
    const file = form.get('file')
    let filename
    if (!file) {
        return NextResponse.json({ message: 'No file received' },{
            status: 400
        })
    }
    try {
        filename = await saveFile(file)
    }
    catch (err) {
        return NextResponse.json({ message: 'Error saving file' },{
            status: 500
        })
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
            return NextResponse.json({ message: 'Duplicated field', data: { fields: Object.keys(idOrDuplicated_fields) } },{
                status: 400
            })
        }
    }
    catch (err) {
        return NextResponse.json({ message: 'Error saving user', status: 500 })
    }
    sendMail(formData.email, 'Probando', `http://localhost:3000/api/verify?email=${formData.email}&token=${idOrDuplicated_fields}`)
    
    return NextResponse.json({ message: "Success" },{
        status: 201
    });
}
export async function GET() {
    return Response.json({ data: "testing" })
}