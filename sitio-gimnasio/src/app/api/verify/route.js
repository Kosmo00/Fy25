import User from '@/db/models/user'
export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('email')
    const token = searchParams.get('token')
    const response = await User.update({ verified_email: true }, { where: { email: query, id: token } })
    if (response[0] === 1) {
        return Response.redirect(process.env.NEXT_PUBLIC_URL, 200);
    } else {
        return Response.json({ hola: "wrong token" },{
            status: 401
        });
    }
}

