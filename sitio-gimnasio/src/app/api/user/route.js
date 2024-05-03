// const User = require('../../../db/models').User
// import { User } from '@/db/models'


export async function GET() {
    return Response.json({ data: "aaaaaaaaaaaaaaaaaaaaaaaaa" })
}
export async function POST(req) {
    const { messages } = await req.json()
    return Response.json({working: messages})
  }