// const User = require('../../../db/models').User
import { User } from '@/db/models'

export async function POST(req){
    const formData = await req.formData()
    console.log(formData.get('name'))

    return Response.json(req.body)
}