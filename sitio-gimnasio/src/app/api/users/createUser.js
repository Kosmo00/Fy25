import User from '@/db/models/user'
import bcrypt from 'bcryptjs'

export async function insertUserInDatabase(formData) {
    let { name, lastname, email, CI, phone, password, file, info, notify_whatsapp, notify_email } = formData
    if(!notify_whatsapp){
        notify_whatsapp = false
    }
    if(!notify_email){
        notify_email = false
    }
    const pwd = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({
            name, lastname, email, CI, phone, password: pwd, profile_image: file, info, notify_email, notify_whatsapp
        })
        return user.id
    }
    catch (err) {
        if (err?.original?.code == 'ER_DUP_ENTRY') {
            return err.fields
        }
        console.log('Error creando usuario', err)
        throw new Error
    }
}
