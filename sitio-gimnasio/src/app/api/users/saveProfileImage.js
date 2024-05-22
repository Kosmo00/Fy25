import { writeFile, access, mkdir } from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from 'uuid'

export async function saveFile(file) {
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
