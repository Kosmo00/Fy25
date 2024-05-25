import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import { saveFile } from "../saveProfileImage"
import Role from "@/db/models/role"
import passwordGenerator from "generate-password"
import { default_admin_info, default_athlethe_info, default_qr_info, default_reception_info, default_trainer_info } from '@/models/user_info';
import { insertUserInDatabase } from "../createUser"
import { sendMail } from "@/utils/utils"

function isAuthorized(token){
    return (token?.role === 'admin' || token?.role === 'reception')
}

async function postedByAdminRole(formData){
    try{
        const role = await Role.findOne({where: { name: formData.role }})
        formData.role = role.id
    }
    catch(err){
        console.log(err)
        throw Error
    }
}

function postedByReceptionRole(formData){
    const password = passwordGenerator.generate({
        length: 10,
        numbers: true
    })

    formData.password = password
    formData.role = 1
}

async function prepareFormData(formData, token){
    if(token.role === 'admin'){
        await postedByAdminRole(formData)
    }
    if(token.role === 'reception'){
        postedByReceptionRole(formData)
    }
    switch(formData.role){
        case 1: 
            formData.info = default_athlethe_info
            break
        case 2:
            formData.info = default_qr_info
            break
        case 3: 
            formData.info = default_admin_info
            break
        case 4:
            formData.info = default_reception_info
            break
        case 5:
            formData.info = default_trainer_info
            break
        default:
            formData.info = default_athlethe_info
    }
}


export async function POST(req){
    const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
    if(!token){
        return NextResponse.json({message: 'Para realizar esta operación debe de estar autenticado'})
    }
    if (!isAuthorized(token)){
        return NextResponse.json({message: 'Su usuario no está autorizado para realizar la operación actual'})
    }
    const form = await req.formData()
    const file = form.get('file')
    let filename
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
    try{
        await prepareFormData(formData, token)
        const duplicated_fields = await insertUserInDatabase(formData)
        if (typeof duplicated_fields !== "string" ) {
            console.log(duplicated_fields)
            return NextResponse.json({ message: 'Campos duplicados', data: { fields: Object.keys(duplicated_fields) }, status: 400 })
        }
    }
    catch(err){
        console.log(err)
        return NextResponse.json({ message: 'Error guardando usuario', status: 500 })
    }
    try{
        sendMail(formData.email, 'Cuenta creada en Fy25',
            '<p>Hola,</p><p>Se te ha creado una cuenta en el sitio web de Fy25. Para iniciar sesión debe de introducir este email.'
            + ` La contraseña generada para usted fue: ${formData.password}</p>`
            + '<p>Por cuestiones de seguridad le recomendamos que la cambie en su primer inicio de sesión en su perfil de usuario.</p>'

        )
    } catch(err) {
        console.log(err)
        return NextResponse.json({message: 'Error enviando email'})
    }

    return NextResponse.json({ message: "Usuario agregado con éxito", status: 201 });
}
