import User from '@/db/models/user'
import { sendMail } from '@/utils/utils';
import bcrypt from 'bcryptjs'

export async function POST(req) {
    const { email } = await req.json()
    const exists = await User.findOne({ where: { email } })
    if (exists) {
        sendMail(email, "Cambio de contraseña F y 25", 
        // `http://localhost:3000/user/change_password?email=${email}&token=${exists.dataValues.id}&auth=true`
        `<p>Hola,</p><p>Has solicitado un cambio de contraseña. Haz clic en el siguiente enlace para continuar:</p><p><a href="http://localhost:3000/user/change_password?email=${email}&token=${exists.dataValues.id}&auth=true" class="link">Cambiar Contraseña</a></p><p>Si no solicitaste este cambio, por favor ignora este correo.</p>`

        )
        return Response.json({ message: "Correo enviado" }, {
            status: 200
        });
    } else {
        return Response.json({ message: "Error, el correo no está registrado" }, {
            status: 400
        });
    }
}
export async function PUT(req) {
    const { email, password } = await req.json()
    const pwd = await bcrypt.hash(password, 10);
    const updated = await User.update({ password: pwd }, { where: { email } })
    if(updated[0] === 1) {
        return Response.json({ message: "Contraseña cambiada" }, {
            status: 200
        });
    }else{
        return Response.json({ message: "Usuario no encontrado" }, {
            status: 404
        });
    }
}
